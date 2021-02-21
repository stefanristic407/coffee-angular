import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
    orderType: string;
    prebookOrderId: any;
    infoForm: FormGroup;
    addressForm: FormGroup;
    orderSettings: any;
    isLoaded = false;
    orderPlaced = false;
    orderDetail: any;
    totalPrice;
    shipInfo: any;
    shipAddress: any;
    roAddress: any;
    addressData: any;
    editAddress = false;
    cities: any[] = [];

    // Variables for only prebook order
    batchId: string;

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
        this.route.data.subscribe((data) => {
            this.orderType = data.orderType;
        });

        this.route.queryParamMap.subscribe((params) => {
            if (params.has('gc_id')) {
                this.sourcing.harvestId = params.get('gc_id');
            }
            if (params.has('estateId') && params.has('lotId')) {
                this.sourcing.estateId = params.get('estateId');
                this.sourcing.lotId = params.get('lotId');
            }
            if (this.orderType === 'booked' || this.orderType === 'sample') {
                this.getHarvest();
            } else if (this.orderType === 'preBooked') {
                this.getLot();
                this.getPrebookBatch();
            }
        });

        this.prebookOrderId = 0;
    }

    getHarvest() {
        if (this.sourcing.harvestId) {
            new Promise((resolve, reject) => this.sourcing.availableDetailList(resolve, reject))
                .then(() => {
                    this.refreshBreadCrumb();
                    this.getBasicData();
                })
                .catch(() => {
                    this.toastrService.error('Error while retrieving data');
                    this.router.navigateByUrl('/sourcing/coffee-list');
                });
        } else {
            this.router.navigateByUrl('/error');
        }
    }

    getLot() {
        if (this.sourcing.lotId) {
            new Promise((resolve) => this.sourcing.getLotDetails(resolve)).then(() => {
                this.refreshBreadCrumb();
                this.getBasicData();
            });
        } else {
            this.router.navigateByUrl('/error');
        }
    }

    getBasicData() {
        const promises = [];
        if (this.orderType === 'booked') {
            promises.push(new Promise((resolve) => this.getShipInfo(resolve)));
        }
        promises.push(new Promise((resolve) => this.getRoAddress(resolve)));
        promises.push(new Promise((resolve) => this.getOrderSettins(resolve)));
        Promise.all(promises).then(() => {
            this.refreshForm();
            this.refreshOrderDetails();
            this.changeService();
            this.isLoaded = true;
        });
    }

    refreshBreadCrumb() {
        this.breadItems = [
            { label: 'Home', routerLink: '/' },
            { label: 'Sourcing Module', routerLink: '/sourcing' },
            this.orderType === 'preBooked'
                ? {
                      label: this.sourcing.lot.name,
                      routerLink: `/sourcing/estate-details/${this.sourcing.lot.estate_id}`,
                  }
                : {
                      label: this.sourcing.harvestDetail.name,
                      routerLink: `/sourcing/coffee-details/${this.sourcing.harvestDetail.estate_id}/${this.sourcing.harvestDetail.id}`,
                  },
            { label: 'Confirm order' },
        ];
    }

    refreshOrderDetails() {
        if (this.orderType === 'preBooked') {
            this.orderDetail = [
                {
                    field: 'customer',
                    label: this.globals.languageJson?.customer,
                    value: this.sourcing.lot.estate_name,
                },
                { field: 'origin', label: this.globals.languageJson?.origin, value: this.sourcing.lot.country },
                {
                    field: 'variety',
                    label: this.globals.languageJson?.variety,
                    value: this.sourcing.lot.varietiesStr,
                },
                { field: 'species', label: this.globals.languageJson?.species, value: this.sourcing.lot.species },
                { field: 'cupScore', label: 'Avg, grade', value: this.sourcing.lot.avg_cup_score },
                { field: 'production', label: 'Avg. Production', value: this.sourcing.lot.avg_precipitation },
                { field: 'token', label: 'Token amount', value: `$${this.orderSettings.token_amount}` },
            ];
        } else {
            this.orderDetail = [
                {
                    field: 'customer',
                    label: this.globals.languageJson?.customer,
                    value: this.sourcing.harvestDetail.estate_name,
                },
                {
                    field: 'origin',
                    label: this.globals.languageJson?.origin,
                    value: this.sourcing.harvestDetail.country,
                },
                {
                    field: 'variety',
                    label: this.globals.languageJson?.variety,
                    value: this.sourcing.harvestDetail.varieties,
                },
                {
                    field: 'species',
                    label: this.globals.languageJson?.species,
                    value: this.sourcing.harvestDetail.species,
                },
                {
                    field: 'cupScore',
                    label: this.globals.languageJson?.cupping_score,
                    value: this.sourcing.harvestDetail.cupping.cup_score,
                },
            ];
        }
        if (this.orderType === 'booked') {
            this.orderDetail = this.orderDetail.concat([
                {
                    field: 'quantity',
                    label: this.globals.languageJson?.available_quantity,
                    value: `${this.sourcing.harvestDetail.quantity_count}/${this.sourcing.harvestDetail.quantity}${this.sourcing.harvestDetail.quantity_unit}`,
                },
                {
                    field: 'price',
                    label: this.globals.languageJson?.rate_per_kg,
                    value: `$${this.sourcing.harvestDetail.price}USD/kg`,
                },
            ]);
        } else if (this.orderType === 'sample') {
            this.orderDetail = this.orderDetail.concat([
                {
                    field: 'sample_price',
                    label: 'Sample Price',
                    value: `$${this.orderSettings.sample_price}`,
                },
            ]);
        }
    }

    refreshForm() {
        this.infoForm = this.fb.group({
            terms: [null, Validators.compose([Validators.required])],
        });
        if (this.orderType === 'booked') {
            this.infoForm.addControl(
                'quantity',
                new FormControl(
                    null,
                    Validators.compose([
                        Validators.required,
                        Validators.min(this.shipInfo.minimum_quantity || 0),
                        Validators.max(this.sourcing.harvestDetail.quantity_count),
                    ]),
                ),
            );
            this.infoForm.addControl('service', new FormControl(''));
        }
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
            if (this.orderType === 'booked') {
                if (this.infoForm.value.service) {
                    this.totalPrice =
                        (this.sourcing.harvestDetail.price + this.shipInfo.unit_price) * this.infoForm.value.quantity;
                } else {
                    this.totalPrice = this.sourcing.harvestDetail.price * this.infoForm.value.quantity;
                }
            } else if (this.orderType === 'sample') {
                this.totalPrice = this.orderSettings.sample_price;
            } else {
                this.totalPrice = this.orderSettings.token_amount;
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
                        if (this.orderType === 'booked') {
                            this.submitOrder();
                        } else if (this.orderType === 'sample') {
                            this.submitSample();
                        } else if (this.orderType === 'preBooked') {
                            this.submitPreBook();
                        }
                    }
                });
        } else {
            this.formSrv.markGroupDirty(this.infoForm);
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
        this.roasterService.placeOrder(this.roasterId, this.sourcing.harvestId, data).subscribe((res: any) => {
            if (res.success) {
                this.orderPlaced = true;
            } else {
                this.toastrService.error('Error while Placing the order');
            }
        });
    }

    submitSample() {
        const doneData = {
            shipping_address_id: this.addressData.id,
            billing_address_id: this.addressData.id,
            prebook_order_id: this.prebookOrderId,
        };
        this.userService.addRequestSample(this.roasterId, this.sourcing.harvestId, doneData).subscribe((res: any) => {
            if (res.success) {
                this.orderPlaced = true;
            } else {
                this.toastrService.error('Error while Placing the order');
            }
        });
    }

    submitPreBook() {
        const data = {
            shipping_address_id: this.addressData.id,
            billing_address_id: this.addressData.id,
        };
        if (this.batchId) {
            this.userService.addPrebookLots(this.roasterId, this.batchId, data).subscribe((res: any) => {
                if (res.success) {
                    this.orderPlaced = true;
                } else {
                    this.toastrService.error('Error while Placing the prebook order');
                }
            });
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

    getOrderSettins(resolve: any = null) {
        this.roasterService.getOrderSettings(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.orderSettings = res.result;
            }
            if (resolve) {
                resolve();
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

    getPrebookBatch() {
        this.userService
            .getPrebookBatchList(this.roasterId, this.sourcing.estateId, this.sourcing.lotId)
            .subscribe((res: any) => {
                if (res.success && res.result.length) {
                    console.log('Batch:', res.result);
                    this.batchId = res.result[0].id;
                }
            });
    }
}
