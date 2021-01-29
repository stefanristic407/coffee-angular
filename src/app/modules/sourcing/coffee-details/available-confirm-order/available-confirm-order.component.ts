import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { SourcingService } from '../../sourcing.service';
import { CookieService } from 'ngx-cookie-service';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserserviceService } from '@services';
import { FormService } from '@services';
import { ConfirmComponent } from '@shared';

@Component({
    selector: 'app-available-confirm-order',
    templateUrl: './available-confirm-order.component.html',
    styleUrls: ['./available-confirm-order.component.scss'],
    providers: [DialogService],
})
export class AvailableConfirmOrderComponent implements OnInit {
    breadItems: any[] = [
        { label: 'Home', routerLink: '/features/welcome-aboard' },
        { label: 'Sourcing Module', routerLink: '/sourcing' },
        { label: 'Finca La Pmapa', routerLink: '/sourcing/coffee-details' },
        { label: 'Confirm order' },
    ];
    serviceItems: any[] = [
        { label: 'Import & Delivery service', value: true },
        { label: 'I don’t need Import & delivery service', value: false },
    ];

    roasterId: any;
    flagData: string;
    prebookOrderId: any;
    infoForm: FormGroup;
    addressForm: FormGroup;
    isLoaded = false;
    total = 103.21;
    shipInfo: any;
    shipAddress: any;
    roAddress: any;
    addressData: any;
    editAddress = false;
    cities: any[] = [];
    orderPlaced = false;

    constructor(
        public dialogSrv: DialogService,
        private fb: FormBuilder,
        private formSrv: FormService,
        public router: Router,
        public globals: GlobalsService,
        private route: ActivatedRoute,
        public sourcing: SourcingService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        private roasterService: RoasterserviceService,
        private userService: UserserviceService,
    ) {}

    ngOnInit(): void {
        this.roasterId = this.cookieService.get('roaster_id');

        this.route.queryParamMap.subscribe((params) => {
            if (params.has('gc_id')) {
                this.sourcing.harvestData = params.get('gc_id');
                this.flagData = params.get('flag');
                this.refreshData();
            }
        });

        if (this.sourcing.prebook_flag === true) {
            this.prebookOrderId = this.sourcing.prebook_order_id;
        } else {
            this.prebookOrderId = 0;
        }
        console.log('prebookID' + this.prebookOrderId);
    }

    refreshForm() {
        this.infoForm = this.fb.group({
            quantity: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.min(this.shipInfo.minimum_quantity || 0),
                    Validators.max(this.sourcing.harvestDetail.quantity_count),
                ]),
            ],
            service: [true],
            terms: [null, Validators.compose([Validators.required])],
        });
        this.changeQuantity();
    }

    refreshAddressForm() {
        this.addressForm = this.fb.group({
            country: ['', Validators.compose([Validators.required])],
            state: [''],
            address_line1: ['', Validators.compose([Validators.required])],
            address_line2: [''],
            city: ['', Validators.compose([Validators.required])],
            zipcode: ['', Validators.compose([Validators.required])],
        });
        this.addressForm.patchValue(this.roAddress);
        this.changeCountry();
        this.editAddress = true;
    }

    refreshData() {
        new Promise((resolve) => this.sourcing.availableDetailList(resolve)).then(() => {
            const promises = [];
            if (this.flagData === 'buyNow') {
                // promises.push(new Promise((resolve) => this.getShipInfo(resolve)));
            }
            promises.push(new Promise((resolve) => this.getShipInfo(resolve)));
            promises.push(new Promise((resolve) => this.getRoAddress(resolve)));
            Promise.all(promises).then(() => {
                this.refreshForm();
                this.changeService();
                this.isLoaded = true;
            });
        });
    }

    changeQuantity(event: any = null) {
        if (event) {
            this.infoForm.value.quantity = event.value;
        }
        console.log('Cala total', event);
        setTimeout(() => {
            if (this.flagData === 'buyNow') {
                if (this.infoForm.value.service) {
                    this.total =
                        (this.sourcing.harvestDetail.price + this.shipInfo.unit_price) * this.infoForm.value.quantity;
                } else {
                    this.total = this.sourcing.harvestDetail.price * this.infoForm.value.quantity;
                }
            } else if (this.flagData === 'sample') {
                this.total = this.sourcing.harvestDetail.price * this.infoForm.value.quantity;
            }
        });
    }

    changeService() {
        if (this.infoForm.value.service) {
            this.addressData = this.shipAddress;
        } else {
            this.addressData = this.roAddress;
        }
        this.changeQuantity();
    }

    changeCountry() {
        if (this.addressForm.value.country) {
            this.globals.getCountry(this.addressForm.value.country).cities.forEach((element) => {
                this.cities.push({ label: element, value: element });
            });
            console.log('Cities', this.cities);
        }
    }

    placeOrder() {
        console.log('Order Form Data:', this.infoForm.value);
        if (this.infoForm.valid) {
            this.dialogSrv
                .open(ConfirmComponent, {
                    data: {
                        title: this.globals.languageJson.confirm_order,
                        desp: this.globals.languageJson.are_you_sure,
                    },
                    showHeader: false,
                    styleClass: 'confirm-dialog',
                })
                .onClose.subscribe((res: any) => {
                    if (res === 'yes') {
                        this.submitOrder();
                    }
                });
        } else {
            this.formSrv.markGroupDirty(this.infoForm);
        }
    }

    saveAddress() {
        console.log('Adress Form Data:', this.addressForm.value);
        if (this.addressForm.valid) {
            const postData = {
                type: 'shipping',
                ...this.addressForm.value,
            };
            if (this.roAddress?.id) {
                this.userService.editAddress(this.roasterId, this.roAddress?.id, postData).subscribe((res: any) => {
                    if (res.success) {
                        this.toastrService.success('Address has been Edited');
                        this.getRoAddress();
                        this.editAddress = false;
                    } else {
                        this.toastrService.error('Error while Editing the address');
                    }
                });
            } else {
                this.userService.addAddresses(this.roasterId, postData).subscribe((res: any) => {
                    if (res.success) {
                        console.log('add address response:', res.result);
                        this.toastrService.success('Address has been added');
                        this.editAddress = false;
                    } else {
                        this.toastrService.error('Error while adding the address');
                    }
                });
            }
        } else {
            this.formSrv.markGroupDirty(this.addressForm);
        }
    }

    submitOrder() {
        const data = {
            quantity_count: this.infoForm.value.quantity,
            shipping_address_id: this.roAddress.id,
            billing_address_id: this.roAddress.id,
            prebook_order_id: this.prebookOrderId,
            is_fully_serviced_delivery: this.infoForm.value.service,
        };
        console.log('Post data:', data);
        this.roasterService.placeOrder(this.roasterId, this.sourcing.harvestData, data).subscribe((res: any) => {
            if (res.success) {
                this.orderPlaced = true;
            } else {
                this.toastrService.error('Error while Placing the order');
            }
        });
    }

    getShipInfo(resolve: any = null) {
        this.userService
            .getShippingInfo(this.roasterId, this.sourcing.harvestDetail.estate_id)
            .subscribe((res: any) => {
                if (res.success) {
                    this.shipInfo = res.result;
                    this.shipAddress = res.result.warehouse_address;
                    console.log('Ship Info:', this.shipInfo);
                }
                if (resolve) {
                    resolve();
                }
            });
    }

    getRoAddress(resolve: any = null) {
        this.userService.getAddresses(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.roAddress = res.result[0];
                console.log('Roaster Address:', this.roAddress);
                if (resolve) {
                    resolve();
                }
            }
        });
    }

    orderSampleDone() {
        const doneData = {
            shipping_address_id: this.addressData.id,
            billing_address_id: this.addressData.id,
            prebook_order_id: this.prebookOrderId,
        };
        this.userService.addRequestSample(this.roasterId, this.sourcing.harvestData, doneData).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('Order has been placed Successfully');
                this.router.navigate(['/sourcing/order-placed']);
            } else {
                this.toastrService.error('Error while Placing the order');
            }
        });
    }
}
