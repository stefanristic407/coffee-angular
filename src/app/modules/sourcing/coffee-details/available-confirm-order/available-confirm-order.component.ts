import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { COUNTRY_LIST } from '@constants';
import { AddressType, OrderType, OrganizationType } from '@enums';
import { environment } from '@env/environment';
import { GcOrderSettings, PriceTier } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, CommonService, ResizeService, RoasterService, UserService } from '@services';
import { ConfirmComponent, SentenceCasePipe } from '@shared';
import { convertKg } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { SourcingService } from '../../sourcing.service';

@Component({
    selector: 'app-available-confirm-order',
    templateUrl: './available-confirm-order.component.html',
    styleUrls: ['./available-confirm-order.component.scss'],
    providers: [DecimalPipe, SentenceCasePipe],
})
export class AvailableConfirmOrderComponent extends ResizeableComponent implements OnInit {
    public readonly COUNTRY_LIST = COUNTRY_LIST;
    public readonly OrganizationType = OrganizationType;
    readonly OrderType = OrderType;
    readonly env = environment;
    breadItems: any[];
    serviceItems: any[] = [
        { label: 'Import & Delivery service', value: true, disabled: false },
        { label: 'I don’t need Import & delivery service', value: false, disabled: false },
    ];

    roasterId: any;
    orderType: OrderType;
    prebookOrderId = 0;
    infoForm: FormGroup;
    addressForm: FormGroup;
    orderSettings: GcOrderSettings;
    isLoaded = false;
    isSubmitted = false;
    orderPlaced = false;
    createdOrder: any;
    orderDetail: any;
    minimumQuantity: number;
    coffeePrice: number;
    shipmentPrice: number;
    shipmentPriceCurrency: string;
    totalPrice: number;
    totalPriceCurrency: string;
    shipInfo: any;
    shipAddress: any;
    deliveryAddress: any;
    addressData: any;
    billingAddress: any;
    editAddress = false;
    isBilling = false;
    cities: any[] = [];
    priceTiers: PriceTier[] = [];
    activePriceTier: PriceTier | null = null;
    InDRestrictions = {
        maxQuanity: null as number | null,
        minQuanity: null as number | null,
        maxQuanityByUnit: null as number | null, // Based on Kg per Bag
        minQuanityByUnit: null as number | null, // Based on Kg per Bag
    };

    constructor(
        private commonService: CommonService,
        private dialogSrv: DialogService,
        private fb: FormBuilder,
        private roasterService: RoasterService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
        protected resizeService: ResizeService,
        public authService: AuthService,
        public sourcing: SourcingService,
        private sentenceCasePipe: SentenceCasePipe,
        private decimalPipe: DecimalPipe,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.roasterId = this.authService.getOrgId();
        this.route.data.subscribe((data) => {
            this.orderType = data.orderType;
        });

        this.route.queryParamMap.subscribe((params) => {
            if (params.has('gc_id')) {
                this.sourcing.harvestId = +params.get('gc_id');
            }
            if (this.orderType === OrderType.Booked || this.orderType === OrderType.Sample) {
                this.getHarvest();
            }
        });
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

    getBasicData() {
        const promises = [];
        if (this.orderType === OrderType.Booked) {
            promises.push(new Promise((resolve) => this.getShipInfo(resolve)));
        }
        promises.push(new Promise((resolve) => this.getRoAddress(resolve)));
        promises.push(new Promise((resolve) => this.getOrderSettings(resolve)));
        Promise.all(promises).then(() => {
            this.refreshForm();
            this.refreshOrderDetails();
            this.changeService();
            this.isLoaded = true;
        });
    }

    refreshBreadCrumb() {
        this.breadItems = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('sourcing'), routerLink: '/sourcing' },
            {
                label: this.sourcing.harvestDetail.name,
                routerLink: `/sourcing/coffee-details/${this.sourcing.harvestDetail.id}`,
            },
            { label: this.translator.instant('confirm_order') },
        ];
    }

    refreshOrderDetails() {
        this.orderDetail = [
            {
                field: 'customer',
                label: this.translator.instant('customer'),
                value: this.sourcing.harvestDetail.estate_name,
                width: 14,
            },
            {
                field: 'origin',
                label: this.translator.instant('origin'),
                value: this.sourcing.harvestDetail.country,
                width: 10,
            },
            {
                field: 'name',
                label: this.translator.instant('availability_name'),
                value: this.sourcing.harvestDetail.name,
                width: 14,
            },
            {
                field: 'variety',
                label: this.translator.instant('variety'),
                value: this.sourcing.harvestDetail.varieties,
                width: 12,
            },
            {
                field: 'species',
                label: this.translator.instant('species'),
                value: this.sourcing.harvestDetail.species,
                width: 12,
            },
            {
                field: 'cupScore',
                label: this.translator.instant('cupping_score'),
                value: this.sourcing.harvestDetail.cupping.cup_score,
                width: 12,
            },
        ];
        if (this.orderType === OrderType.Booked) {
            this.orderDetail = this.orderDetail.concat([
                {
                    field: 'quantity',
                    label: this.translator.instant('available_quantity'),
                    value: `${this.decimalPipe.transform(
                        this.sourcing.harvestDetail.quantity_count,
                    )} ${this.sentenceCasePipe.transform(this.sourcing.harvestDetail.quantity_type)}/${
                        this.sourcing.harvestDetail.quantity
                    }${this.sourcing.harvestDetail.quantity_unit}`,
                    width: 15,
                },
                {
                    field: 'price',
                    label: this.translator.instant('rate_per_kg'),
                    value: `${this.decimalPipe.transform(this.sourcing.harvestDetail.price, '1.2-4')} ${
                        this.sourcing.harvestDetail.price_unit
                    }/kg`,
                    width: 11,
                },
            ]);
        } else if (this.orderType === OrderType.Sample) {
            this.orderDetail = this.orderDetail.concat([
                {
                    field: 'sample_price',
                    label: this.translator.instant('sample_price'),
                    value: `${this.decimalPipe.transform(this.orderSettings.sample_price, '1.2-4')} ${
                        this.orderSettings.sample_price_currency
                    }`,
                    width: 12,
                },
            ]);
        }
    }

    get shippingError(): string {
        if (!this.shipInfo) {
            return 'Import & Delivery service is not available for this estate';
        }
        if (
            this.InDRestrictions.maxQuanityByUnit < this.sourcing.harvestDetail.minimum_purchase_quantity ||
            this.InDRestrictions.minQuanityByUnit > this.sourcing.harvestDetail.quantity_count
        ) {
            return `Import & Delivery service is not proper for this purchase(Shipping quantity: ${this.InDRestrictions.minQuanity}kg-${this.InDRestrictions.maxQuanity}kg)`;
        }
        return null;
    }

    refreshForm() {
        this.infoForm = this.fb.group({
            terms: [null, Validators.compose([Validators.required])],
        });
        if (this.orderType === OrderType.Booked) {
            const quantityFc = new FormControl(null, [this.quantityValidator]);
            this.infoForm.addControl('quantity', quantityFc);
            if (this.shippingError) {
                this.serviceItems[0].disabled = true;
                this.infoForm.addControl('service', new FormControl(false));
            } else {
                this.serviceItems[0].disabled = false;
                this.infoForm.addControl('service', new FormControl(true));
            }
        }
        this.changeQuantity();
    }

    quantityValidator: ValidatorFn = (control: AbstractControl): ValidationErrors => {
        const countValue = parseInt(control.value, 10);
        const errors: any = {};
        if (!/^\d+$/.test(control.value) || parseInt(control.value, 10) < 1) {
            errors.valid = 'Please provide a valid value';
        }
        if (countValue < this.sourcing.harvestDetail.minimum_purchase_quantity) {
            errors.min_purchase = `The minimum purchase is at least ${this.sourcing.harvestDetail.minimum_purchase_quantity} ${this.sourcing.harvestDetail.quantity_type}`;
        }
        if (countValue > this.sourcing.harvestDetail.quantity_count) {
            errors.max_purchase = `Only ${this.sourcing.harvestDetail.quantity_count} ${this.sourcing.harvestDetail.quantity_type} of coffee are available for the purchase`;
        }
        if (this.infoForm.value.service) {
            if (countValue < this.InDRestrictions.minQuanityByUnit) {
                errors.min_shipping = `Shipping is only available on purchasing at least ${this.InDRestrictions.minQuanityByUnit} ${this.sourcing.harvestDetail.quantity_type}`;
            }
            if (countValue > this.InDRestrictions.maxQuanityByUnit) {
                errors.max_shipping = `Shipping is available for a maximum of ${this.InDRestrictions.maxQuanityByUnit} ${this.sourcing.harvestDetail.quantity_type}`;
            }
        }
        return errors;
    };

    refreshAddressForm(isBilling) {
        this.addressForm = this.fb.group({
            country: ['', Validators.compose([Validators.required])],
            state: ['', Validators.compose([Validators.required])],
            address_line1: ['', Validators.compose([Validators.required])],
            address_line2: [''],
            city: ['', Validators.compose([Validators.required])],
            zipcode: [''],
        });
        this.addressForm.patchValue(isBilling ? this.billingAddress : this.deliveryAddress);
        this.changeCountry();
        this.editAddress = true;
        this.isBilling = isBilling;
    }

    changeQuantity() {
        setTimeout(() => {
            if (this.orderType === OrderType.Booked) {
                const totalKg = convertKg(
                    +this.sourcing.harvestDetail.quantity * this.infoForm.value.quantity,
                    this.sourcing.harvestDetail.quantity_unit,
                );

                this.updateShipmentUnitPrice(totalKg);
                this.coffeePrice = this.sourcing.harvestDetail.price * totalKg;
                if (this.infoForm.value.service) {
                    this.shipmentPrice = this.activePriceTier?.amount || 0;
                } else {
                    this.shipmentPrice = 0;
                }
                this.shipmentPriceCurrency = this.activePriceTier?.currency || this.sourcing.harvestDetail.price_unit;
                this.totalPrice = this.coffeePrice + this.shipmentPrice;
                this.totalPriceCurrency = this.sourcing.harvestDetail.price_unit;
            } else if (this.orderType === OrderType.Sample) {
                this.totalPrice = this.orderSettings.sample_price;
                this.totalPriceCurrency = this.orderSettings.sample_price_currency;
            }
        });
    }

    updateShipmentUnitPrice(itemInKg: number) {
        const tier = this.priceTiers.find((item) => itemInKg >= item.min_quantity && itemInKg <= item.max_quantity);
        if (tier) {
            this.activePriceTier = tier;
        } else {
            this.activePriceTier = null;
        }
    }

    changeService() {
        if (this.infoForm.value.service) {
            this.addressData = this.shipAddress;
        } else {
            this.addressData = this.deliveryAddress;
        }
        this.changeQuantity();
        if (this.orderType === OrderType.Booked) {
            this.infoForm.controls.quantity.updateValueAndValidity();
        }
    }

    placeOrder() {
        if (this.infoForm.invalid) {
            this.infoForm.markAllAsTouched();
            return;
        }
        const promises = [];
        if (!this.infoForm.value.service && !this.deliveryAddress?.id) {
            const postData = {
                type: AddressType.SHIPPING,
                ...this.deliveryAddress,
            };
            promises.push(
                new Promise((resolve, reject) =>
                    this.userService.addAddresses(this.roasterId, postData).subscribe((res: any) => {
                        if (res.success) {
                            this.deliveryAddress.id = res.result.id;
                            resolve(res);
                        } else {
                            reject();
                        }
                    }),
                ),
            );
        }
        if (!this.billingAddress?.id) {
            const postData = {
                type: AddressType.BILLING,
                ...this.billingAddress,
            };
            promises.push(
                new Promise((resolve, reject) =>
                    this.userService.addAddresses(this.roasterId, postData).subscribe((res: any) => {
                        if (res.success) {
                            this.billingAddress.id = res.result.id;
                            resolve(res);
                        } else {
                            reject();
                        }
                    }),
                ),
            );
        }

        this.isSubmitted = true;
        Promise.all(promises)
            .then(() => {
                this.dialogSrv
                    .open(ConfirmComponent, {
                        data: {
                            title: this.translator.instant('confirm_your_purchase'),
                            desp: this.translator.instant('ro_confirm_purchase_desp'),
                        },
                    })
                    .onClose.subscribe((action: any) => {
                        if (action === 'yes') {
                            if (this.orderType === OrderType.Booked) {
                                this.submitOrder();
                            } else if (this.orderType === OrderType.Sample) {
                                this.submitSample();
                            }
                        }
                    });
            })
            .catch(() => this.toastrService.error('Error while adding the address'));
    }

    submitOrder() {
        const data: any = {
            shipping_price: this.activePriceTier?.amount,
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
            this.isSubmitted = false;
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
            this.isSubmitted = false;
        });
    }

    changeCountry() {
        if (this.addressForm.value.country) {
            this.cities = this.commonService.getCountry(this.addressForm.value.country).cities;
            if (this.cities.indexOf(this.addressForm.value.state) < 0) {
                this.addressForm.get('state').setValue(null);
            }
            this.cities = this.cities.map((element) => {
                return { label: element, value: element };
            });
        }
    }

    saveAddress() {
        if (this.addressForm.valid) {
            const type = this.isBilling ? AddressType.BILLING : AddressType.SHIPPING;
            const id = this.isBilling ? this.billingAddress?.id : this.deliveryAddress?.id;
            const postData = {
                type,
                ...this.addressForm.value,
            };
            if (id) {
                this.userService.editAddress(this.roasterId, id, postData).subscribe((res: any) => {
                    if (res.success) {
                        this.toastrService.success(this.translator.instant('address_has_been_updated_successfully'));
                        this.getRoAddress(null, true);
                        this.editAddress = false;
                    } else {
                        this.toastrService.error('Error while updating the address');
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

    getOrderSettings(resolve: any = null) {
        this.roasterService.getGcOrderSettings().subscribe((res) => {
            if (res.success) {
                this.orderSettings = res.result;
            }
            if (resolve) {
                resolve();
            }
        });
    }

    get priceRateByTier(): null | number {
        return null;
    }

    getShipInfo(resolve: any = null) {
        this.userService.getShippingInfo(this.roasterId, this.sourcing.harvestDetail.estate_id).subscribe(
            (res: any) => {
                if (res.success) {
                    this.shipInfo = res.result;
                    this.shipAddress = res.result.warehouse_address;
                    this.priceTiers = res.result.price_tiers;
                    this.priceTiers.forEach((tier) => {
                        if (
                            this.InDRestrictions.maxQuanity === null ||
                            this.InDRestrictions.maxQuanity < tier.max_quantity
                        ) {
                            this.InDRestrictions.maxQuanity = tier.max_quantity;
                        }
                        if (
                            this.InDRestrictions.minQuanity === null ||
                            this.InDRestrictions.minQuanity > tier.min_quantity
                        ) {
                            this.InDRestrictions.minQuanity = tier.min_quantity;
                        }
                    });

                    const kgInBg = convertKg(
                        +this.sourcing.harvestDetail.quantity,
                        this.sourcing.harvestDetail.quantity_unit,
                    );
                    this.InDRestrictions.maxQuanityByUnit = Math.floor(this.InDRestrictions.maxQuanity / kgInBg);
                    this.InDRestrictions.minQuanityByUnit = Math.ceil(this.InDRestrictions.minQuanity / kgInBg);
                }
                if (resolve) {
                    resolve();
                }
            },
            (error: HttpErrorResponse) => {
                resolve();
            },
        );
    }

    getRoAddress(resolve: any = null, requireUpdating?) {
        this.userService.getAddresses(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                const defaultAddress = {
                    country: this.authService.currentOrganization.country,
                    state: this.authService.currentOrganization.state,
                    address_line1: this.authService.currentOrganization.address_line1,
                    address_line2: this.authService.currentOrganization.address_line2,
                    city: this.authService.currentOrganization.city,
                    zipcode: this.authService.currentOrganization.zipcode,
                };
                this.deliveryAddress =
                    (res.result || []).find((item) => item.type === AddressType.SHIPPING) ?? defaultAddress;
                this.billingAddress =
                    (res.result || []).find((item) => item.type === AddressType.BILLING) ?? defaultAddress;
                if (requireUpdating && !this.infoForm.value?.service) {
                    this.addressData = this.deliveryAddress;
                }

                if (resolve) {
                    resolve();
                }
            }
        });
    }
}
