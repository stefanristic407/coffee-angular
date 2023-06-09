import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService, CommonService, GlobalsService, ResizeService, UserService } from '@services';
import { RoasterService } from '@services';
import { SourcingService } from '../../sourcing.service';
import { ConfirmComponent } from '@shared';
import { COUNTRY_LIST } from '@constants';
import { ResizeableComponent } from '@base-components';
import { PrebookStatus } from '@enums';
import { AddressType } from 'src/core/enums/availability/address-type.enum';
import { GcOrderSettings } from '@models';

@Component({
    selector: 'app-prebook-confirm-order',
    templateUrl: './prebook-confirm-order.component.html',
    styleUrls: ['./prebook-confirm-order.component.scss'],
})
export class PrebookConfirmOrderComponent extends ResizeableComponent implements OnInit {
    public readonly COUNTRY_LIST = COUNTRY_LIST;
    breadItems: any[];
    serviceItems: any[] = [
        { label: 'Import & Delivery service', value: true },
        { label: 'I don’t need Import & delivery service', value: false },
    ];

    roasterId: any;
    prebookOrderId: any;
    infoForm: FormGroup;
    addressForm: FormGroup;
    orderSettings: GcOrderSettings;
    isLoaded = false;
    orderPlaced = false;
    orderDetail: any;
    totalPrice;
    shipInfo: any;
    billingAddress: any;
    editAddress = false;
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
        private toastrService: ToastrService,
        private roasterService: RoasterService,
        private userService: UserService,
        protected resizeService: ResizeService,
        private authService: AuthService,
        private commonService: CommonService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.roasterId = this.authService.getOrgId();

        this.route.paramMap.subscribe((params) => {
            if (params.has('estateId') && params.has('lotId')) {
                this.sourcing.estateId = +params.get('estateId');
                this.sourcing.lotId = +params.get('lotId');
            }
            this.getLot();
        });

        this.prebookOrderId = 0;
    }

    getLot() {
        if (this.sourcing.lotId) {
            new Promise((resolve) => this.sourcing.getLotDetails(resolve)).then(() => {
                this.refreshBreadCrumb();
                this.getBasicData();
                this.getPrebookBatch();
            });
        } else {
            this.router.navigateByUrl('/error');
        }
    }

    getBasicData() {
        const promises = [];
        promises.push(new Promise((resolve) => this.getRoAddress(resolve)));
        promises.push(new Promise((resolve) => this.getOrderSettings(resolve)));
        Promise.all(promises).then(() => {
            this.refreshForm();
            this.refreshOrderDetails();
            this.changeQuantity();
            this.isLoaded = true;
        });
    }

    refreshBreadCrumb() {
        this.breadItems = [
            { label: 'Home', routerLink: '/' },
            { label: 'Sourcing Module', routerLink: '/sourcing' },
            { label: this.sourcing.lot.name, routerLink: `/sourcing/estate-details/${this.sourcing.lot.estate_id}` },
            { label: 'Confirm order' },
        ];
    }

    refreshOrderDetails() {
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
    }

    refreshForm() {
        this.infoForm = this.fb.group({
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
        this.addressForm.patchValue(this.billingAddress);
        this.changeCountry();
        this.editAddress = true;
    }

    changeQuantity(event: any = null) {
        if (event) {
            this.infoForm.value.quantity = event.value;
        }
        setTimeout(() => {
            this.totalPrice = this.orderSettings.token_amount;
        });
    }

    placeOrder() {
        if (this.infoForm.valid) {
            if (!this.billingAddress?.id) {
                this.toastrService.error('Please update billing address');
                return;
            }
            this.dialogSrv
                .open(ConfirmComponent, {
                    data: {
                        title: this.globals.languageJson.confirm_order,
                        desp: this.globals.languageJson.are_you_sure,
                    },
                })
                .onClose.subscribe((action: any) => {
                    if (action === 'yes') {
                        this.submitPreBook();
                    }
                });
        } else {
            this.infoForm.markAllAsTouched();
        }
    }

    submitPreBook() {
        const data = {
            shipping_address_id: this.billingAddress.id,
            billing_address_id: this.billingAddress.id,
        };
        if (this.batchId) {
            this.userService.addPrebookLots(this.roasterId, this.batchId, data).subscribe((res: any) => {
                if (res.success) {
                    this.orderPlaced = true;
                } else {
                    this.toastrService.error('Error while Placing the prebook order');
                }
            });
        } else {
            this.toastrService.error('There is no batch');
        }
    }

    changeCountry() {
        if (this.addressForm.value.country) {
            this.commonService.getCountry(this.addressForm.value.country).cities.forEach((element) => {
                this.cities.push({ label: element, value: element });
            });
        }
    }

    saveAddress() {
        if (this.addressForm.valid) {
            const postData = {
                type: AddressType.BILLING,
                ...this.addressForm.value,
            };
            if (this.billingAddress?.id) {
                this.userService
                    .editAddress(this.roasterId, this.billingAddress?.id, postData)
                    .subscribe((res: any) => {
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

    getRoAddress(resolve: any = null) {
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
                this.billingAddress =
                    (res.result || []).find((item) => item.type === AddressType.BILLING) ?? defaultAddress;
                if (resolve) {
                    resolve();
                }
            }
        });
    }

    getPrebookBatch() {
        const curDate: Date = new Date();
        const curYear = curDate.getFullYear();
        const year = curDate.getMonth() < this.sourcing.lot.harvest_start ? curYear : curYear + 1;
        this.userService
            .getPrebookBatchList(this.sourcing.estateId, this.sourcing.lotId, { year })
            .subscribe((res: any) => {
                if (res.success && res.result.length) {
                    if (res.result[0].prebook_status === PrebookStatus.Active) {
                        this.batchId = res.result[0].id;
                    } else {
                        this.toastrService.error('There is no prebookable batch');
                    }
                }
            });
    }
}
