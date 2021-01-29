import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { UserserviceService } from '@services';
import { FormService } from '@services';
import { SourcingService } from '../../sourcing.service';
import { ConfirmComponent } from '@shared';

@Component({
    selector: 'app-available-confirm-order',
    templateUrl: './available-confirm-order.component.html',
    styleUrls: ['./available-confirm-order.component.scss'],
    providers: [DialogService],
})
export class AvailableConfirmOrderComponent implements OnInit {
    breadItems: any[];
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
    orderPlaced = false;
    totalPrice;
    shipInfo: any;
    shipAddress: any;
    roAddress: any;
    addressData: any;
    editAddress = false;
    cities: any[] = [];

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
    }

    refreshData() {
        new Promise((resolve) => this.sourcing.availableDetailList(resolve)).then(() => {
            this.refreshBreadCrumb();
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

    refreshBreadCrumb() {
        this.breadItems = [
            { label: 'Home', routerLink: '/features/welcome-aboard' },
            { label: 'Sourcing Module', routerLink: '/sourcing' },
            {
                label: this.sourcing.harvestDetail.name,
                routerLink: `/sourcing/coffee-details/${this.sourcing.harvestDetail.estate_id}/${this.sourcing.harvestDetail.id}`,
            },
            { label: 'Confirm order' },
        ];
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

    changeQuantity(event: any = null) {
        if (event) {
            this.infoForm.value.quantity = event.value;
        }
        setTimeout(() => {
            if (this.flagData === 'buyNow') {
                if (this.infoForm.value.service) {
                    this.totalPrice =
                        (this.sourcing.harvestDetail.price + this.shipInfo.unit_price) * this.infoForm.value.quantity;
                } else {
                    this.totalPrice = this.sourcing.harvestDetail.price * this.infoForm.value.quantity;
                }
            } else if (this.flagData === 'sample') {
                this.totalPrice = this.sourcing.harvestDetail.price * this.infoForm.value.quantity;
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

    placeOrder() {
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
                .onClose.subscribe((action: any) => {
                    if (action === 'yes') {
                        const data = {
                            quantity_count: this.infoForm.value.quantity,
                            shipping_address_id: this.roAddress.id,
                            billing_address_id: this.roAddress.id,
                            prebook_order_id: this.prebookOrderId,
                            is_fully_serviced_delivery: this.infoForm.value.service,
                        };
                        this.roasterService
                            .placeOrder(this.roasterId, this.sourcing.harvestData, data)
                            .subscribe((res: any) => {
                                if (res.success) {
                                    this.orderPlaced = true;
                                } else {
                                    this.toastrService.error('Error while Placing the order');
                                }
                            });
                    }
                });
        } else {
            this.formSrv.markGroupDirty(this.infoForm);
        }
    }

    changeCountry() {
        if (this.addressForm.value.country) {
            this.globals.getCountry(this.addressForm.value.country).cities.forEach((element) => {
                this.cities.push({ label: element, value: element });
            });
        }
    }

    saveAddress() {
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

    getShipInfo(resolve: any = null) {
        this.userService
            .getShippingInfo(this.roasterId, this.sourcing.harvestDetail.estate_id)
            .subscribe((res: any) => {
                if (res.success) {
                    this.shipInfo = res.result;
                    this.shipAddress = res.result.warehouse_address;
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
