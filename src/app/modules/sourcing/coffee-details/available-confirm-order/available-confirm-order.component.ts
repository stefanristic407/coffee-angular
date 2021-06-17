import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService, ResizeService, AuthService, RoasterserviceService, UserserviceService } from '@services';
import { SourcingService } from '../../sourcing.service';
import { ConfirmComponent } from '@shared';
import { COUNTRY_LIST } from '@constants';
import { OrganizationType } from '@enums';
import { ResizeableComponent } from '@base-components';
import { environment } from '@env/environment';

@Component({
    selector: 'app-available-confirm-order',
    templateUrl: './available-confirm-order.component.html',
    styleUrls: ['./available-confirm-order.component.scss'],
})
export class AvailableConfirmOrderComponent extends ResizeableComponent implements OnInit {
    public readonly COUNTRY_LIST = COUNTRY_LIST;
    public readonly OrganizationType = OrganizationType;
    readonly env = environment;
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
    createdOrder: any;
    orderDetail: any;
    minimumQuantity: number;
    coffeePrice: number;
    shipmentPrice: number;
    totalPrice: number;
    shipInfo: any;
    shipAddress: any;
    deliveryAddress: any;
    addressData: any;
    billingAddress: any;
    editAddress = false;
    isBilling = false;
    cities: any[] = [];

    // Variables for only prebook order
    batchId: string;

    constructor(
        public dialogSrv: DialogService,
        private fb: FormBuilder,
        public router: Router,
        public globals: GlobalsService,
        private route: ActivatedRoute,
        public sourcing: SourcingService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        private roasterService: RoasterserviceService,
        private userService: UserserviceService,
        protected resizeService: ResizeService,
        public authService: AuthService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        console.log(this.authService.currentOrganization);
        this.roasterId = this.authService.getOrgId();
        this.route.data.subscribe((data) => {
            this.orderType = data.orderType;
        });

        this.route.queryParamMap.subscribe((params) => {
            if (params.has('gc_id')) {
                this.sourcing.harvestId = +params.get('gc_id');
            }
            if (params.has('estateId') && params.has('lotId')) {
                this.sourcing.estateId = +params.get('estateId');
                this.sourcing.lotId = +params.get('lotId');
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
                      routerLink: `/sourcing/coffee-details/${this.sourcing.harvestDetail.id}`,
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
            this.calcMinimumQuanity();
            this.infoForm.addControl(
                'quantity',
                new FormControl(
                    null,
                    Validators.compose([
                        Validators.required,
                        (control: AbstractControl) => Validators.min(this.minimumQuantity)(control),
                        Validators.max(this.sourcing.harvestDetail.quantity_count),
                    ]),
                ),
            );
            this.infoForm.addControl('service', new FormControl(true));
        }
        this.changeQuantity();
    }

    refreshAddressForm(isBilling) {
        this.addressForm = this.fb.group({
            country: ['', Validators.compose([Validators.required])],
            state: ['', Validators.compose([Validators.required])],
            address_line1: ['', Validators.compose([Validators.required])],
            address_line2: [''],
            city: ['', Validators.compose([Validators.required])],
            zipcode: ['', Validators.compose([Validators.required])],
        });
        this.addressForm.patchValue(isBilling ? this.billingAddress : this.deliveryAddress);
        this.changeCountry();
        this.editAddress = true;
        this.isBilling = isBilling;
    }

    changeQuantity(event: any = null) {
        if (event) {
            this.infoForm.value.quantity = event.value;
        }
        setTimeout(() => {
            if (this.orderType === 'booked') {
                const mass = this.sourcing.harvestDetail.quantity * this.infoForm.value.quantity;
                this.coffeePrice = this.sourcing.harvestDetail.price * mass;
                if (this.infoForm.value.service) {
                    this.shipmentPrice = this.shipInfo.unit_price * mass;
                } else {
                    this.shipmentPrice = 0;
                }
                this.totalPrice = this.coffeePrice + this.shipmentPrice;
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
            this.addressData = this.deliveryAddress;
        }
        this.changeQuantity();
        this.calcMinimumQuanity();
    }

    calcMinimumQuanity() {
        if (this.infoForm.value.service) {
            this.minimumQuantity = Math.max(
                this.shipInfo.minimum_quantity || 0,
                this.sourcing.harvestDetail.minimum_purchase_quantity || 0,
            );
        } else {
            this.minimumQuantity = this.sourcing.harvestDetail.minimum_purchase_quantity || 0;
        }
        const quantityControl = this.infoForm.get('quantity');
        if (quantityControl) {
            quantityControl.setValue(this.infoForm.value.quantity);
        }
    }

    placeOrder() {
        if (this.infoForm.valid) {
            if (!this.billingAddress?.id) {
                this.toastrService.error('Please update billing address');
                return;
            }
            if (!this.infoForm.value.service) {
                if (!this.deliveryAddress?.id) {
                    this.toastrService.error('Please update delivery address');
                    return;
                }
            }
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
            this.infoForm.markAllAsTouched();
        }
    }

    submitOrder() {
        const data: any = {
            quantity_count: this.infoForm.value.quantity,
            billing_address_id: this.billingAddress.id,
            prebook_order_id: this.prebookOrderId,
            is_fully_serviced_delivery: this.infoForm.value.service,
        };
        if (!this.infoForm.value.service) {
            data.shipping_address_id = this.deliveryAddress.id;
        }
        this.roasterService.placeOrder(this.roasterId, this.sourcing.harvestId, data).subscribe((res: any) => {
            if (res.success) {
                this.orderPlaced = true;
                this.createdOrder = res.result;
            } else {
                this.toastrService.error('Error while Placing the order');
            }
        });
    }

    submitSample() {
        const doneData = {
            shipping_address_id: this.deliveryAddress.id,
            billing_address_id: this.billingAddress.id,
            prebook_order_id: this.prebookOrderId,
        };
        this.userService.addRequestSample(this.roasterId, this.sourcing.harvestId, doneData).subscribe((res: any) => {
            if (res.success) {
                this.orderPlaced = true;
                this.createdOrder = res.result;
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
            const type = this.isBilling ? 'billing' : 'delivery';
            const id = this.isBilling ? this.billingAddress?.id : this.deliveryAddress?.id;
            const postData = {
                type,
                ...this.addressForm.value,
            };
            if (id) {
                this.userService.editAddress(this.roasterId, id, postData).subscribe((res: any) => {
                    if (res.success) {
                        this.toastrService.success('Address has been Edited');
                        this.getRoAddress(null, true);
                        this.editAddress = false;
                    } else {
                        this.toastrService.error('Error while Editing the address');
                    }
                });
            } else {
                this.userService.addAddresses(this.roasterId, postData).subscribe((res: any) => {
                    if (res.success) {
                        this.toastrService.success('Address has been added');
                        this.getRoAddress(null, true);
                        this.editAddress = false;
                    } else {
                        this.toastrService.error('Error while adding the address');
                    }
                });
            }
        } else {
            this.addressForm.markAllAsTouched();
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

    getRoAddress(resolve: any = null, requireUpdating?) {
        this.userService.getAddresses(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.deliveryAddress = (res.result || []).find((item) => item.type === 'delivery') ?? {};
                this.billingAddress = (res.result || []).find((item) => item.type === 'billing') ?? {};
                if (requireUpdating && !this.infoForm.value?.service) {
                    this.addressData = this.deliveryAddress;
                }

                console.log('this.addressData', this.addressData);
                console.log('this.deliveryAddress', this.deliveryAddress);
                console.log('this.billingAddress', this.billingAddress);
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
