import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VatType } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';

export enum SettingType {
    VAT = 0,
    Shipment = 1,
    SAMPLE = 2,
}

@Component({
    selector: 'app-product-setting',
    templateUrl: './product-setting.component.html',
    styleUrls: ['./product-setting.component.scss'],
})
export class ProductSettingComponent implements OnInit {
    readonly VatType = VatType;
    saveshippingmode = false;
    editshippingmode = true;
    roasterId: any;
    shipId: any;
    shippData: any;
    resetButtonValue = 'Save';
    breadItems: any[];
    options: any;
    selectedTab = { name: this.translator.instant('vat_management'), code: '', index: 0 };
    selectedIndex = 0;
    detailsForm: FormGroup;
    shippingDetails = {
        id: '',
        name: '',
        price: '',
        price_unit: '',
        day_min: '',
        day_max: '',
    };
    selectedMobileTab = '';
    dayMinListArray = [];
    baseCurrency: string;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.getShippingInfo();
        this.options = [
            { name: this.translator.instant('vat_management'), code: '', index: 0 },
            { name: this.translator.instant('shipping_details'), code: '', index: 1 },
            { name: this.translator.instant('sample_price'), code: '', index: 2 },
        ];
        this.dayMinListArray = [
            {
                label: 'Days',
                value: 'Days',
            },
        ];
        this.route.queryParams.subscribe((params) => {
            if (params.type) {
                this.selectedMobileTab = params.type;
                this.selectedTab = this.options[SettingType[params.type]] || this.options[SettingType.VAT];
                this.settingBreadCrumb(params.type);
            } else {
                this.selectedMobileTab = '';
                this.settingBreadCrumb();
            }
        });

        this.authService.organizationSubject.subscribe((res) => {
            this.baseCurrency = res?.base_currency;
        });
    }

    settingBreadCrumb(type = null) {
        this.breadItems = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('inventory') },
            { label: this.translator.instant('product_settings') },
        ];
    }

    getShippingInfo() {
        this.userService.getRoasterShippingTypes(this.roasterId).subscribe((result) => {
            if (result.success) {
                this.shippData = result.result;
                if (this.shippData.length !== 0) {
                    this.shippingDetails = this.shippData[0];
                    this.shipId = this.shippingDetails.id;
                    this.detailsForm = this.fb.group({
                        name: [this.shippingDetails.name, Validators.compose([Validators.required])],
                        day_min: [this.shippingDetails.day_min, Validators.compose([Validators.required])],
                        day_max: [this.shippingDetails.day_max, Validators.compose([Validators.required])],
                        price: [this.shippingDetails.price, Validators.compose([Validators.required])],
                        price_unit: [this.baseCurrency, Validators.compose([Validators.required])],
                    });
                } else {
                    this.detailsForm = this.fb.group({
                        name: ['', Validators.compose([Validators.required])],
                        day_min: [null, Validators.compose([Validators.required])],
                        day_max: [null, Validators.compose([Validators.required])],
                        price: [null, Validators.compose([Validators.required])],
                        price_unit: [this.baseCurrency, Validators.compose([Validators.required])],
                    });
                }
            }
        });
    }

    saveShippingInfo() {
        if (this.detailsForm.invalid) {
            this.detailsForm.markAllAsTouched();
            this.toastrService.error('Please fill mandatory fields.');
            return;
        }
        if (this.shippData.length === 0) {
            this.resetButtonValue = 'Saving';
            const body = this.detailsForm.value;
            this.userService.addRoasterShippingDetails(this.roasterId, body).subscribe((response) => {
                if (response.success) {
                    this.resetButtonValue = 'Save';
                    this.toastrService.success('Shipping  Details saved successfully');
                    this.getShippingInfo();
                    this.editshippingmode = true;
                    this.saveshippingmode = false;
                } else {
                    this.toastrService.error('Error while saving shipping  details');
                    this.resetButtonValue = 'Save';
                }
            });
        } else {
            if (this.shipId) {
                this.resetButtonValue = 'Saving';
                const data = this.detailsForm.value;
                this.userService.updateRoasterShippingTypes(this.roasterId, this.shipId, data).subscribe((res) => {
                    if (res.success) {
                        this.resetButtonValue = 'Save';
                        this.toastrService.success('Shipping details updated successfully');
                        this.getShippingInfo();
                        this.editshippingmode = true;
                        this.saveshippingmode = false;
                    } else {
                        this.toastrService.error('Error while updating shipping  details');
                        this.resetButtonValue = 'Save';
                    }
                });
            }
        }
    }

    editShippingInfo() {
        this.saveshippingmode = true;
        this.editshippingmode = false;
    }

    get detailsFormControl() {
        return this.detailsForm.controls;
    }

    selectTabs() {
        if (this.selectedTab.index === 0) {
            this.selectMobileTab('VAT');
        } else if (this.selectedTab.index === 1) {
            this.selectMobileTab('Shipment');
        } else {
            this.selectMobileTab('SAMPLE');
        }
    }

    // Mobile view methods
    selectMobileTab(feature) {
        this.selectedMobileTab = feature;
        this.router.navigate(['/product-setting'], { queryParams: { type: feature } });
    }

    getHeading() {
        let header = this.translator.instant('product_settings');
        if (this.selectedMobileTab) {
            header =
                this.selectedMobileTab === 'VAT'
                    ? this.translator.instant('vat_management')
                    : this.translator.instant('shipment_details');
        }
        return header;
    }

    getDescription() {
        let description = 'Set-up your billing details, terms and conditions of use, privacy and cookie policies here.';
        if (this.selectedMobileTab) {
            description =
                this.selectedMobileTab === 'VAT'
                    ? 'Manage VAT for green coffee and B2B orders'
                    : 'Set shipping price and estimated delivery time';
        }
        return description;
    }
}
