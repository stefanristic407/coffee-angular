import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { AnyARecord } from 'dns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-vat-management',
    templateUrl: './vat-management.component.html',
    styleUrls: ['./vat-management.component.scss'],
})
export class VatManagementComponent implements OnInit {
    // tslint:disable: indent
    saveshippingmode = false;
    editshippingmode = true;
    roasterId: any;
    shipId: any;
    shippData: any;
    resetButtonValue = 'Save';
    breadItems: any[];
    options: any;
    selectedTab = { name: 'Vat Management', code: '', index: 0 };
    selectedIndex = 0;
    details: FormGroup;
    shippingDetails = {
        id: '',
        name: '',
        price: '',
        day_min: '',
        day_max: '',
    };
    selectedMobileTab = '';
    constructor(
        private router: Router,
        private toastrService: ToastrService,
        public userService: UserserviceService,
        public cookieService: CookieService,
        private route: ActivatedRoute,
        public fb: FormBuilder,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.getShippingInfo();
        this.options = [
            { name: 'Vat Management', code: '', index: 0 },
            { name: 'Shipping Details', code: '', index: 1 },
        ];
        this.route.queryParams.subscribe((params) => {
            if (params.type) {
                this.selectedMobileTab = params.type;
                this.selectedTab = params.type === 'VAT' ? this.options[0] : this.options[1];
                this.settingBreadCrumb(params.type);
            } else {
                this.selectedMobileTab = '';
                this.settingBreadCrumb();
            }
        });
    }
    settingBreadCrumb(type = null) {
        if (type) {
            this.breadItems = [
                { label: 'Home', routerLink: '/' },
                { label: 'Product Settings', routerLink: '/features/vat-management' },
                { label: type === 'VAT' ? 'VAT Management' : 'Shipping Details' },
            ];
        } else {
            this.breadItems = [{ label: 'Home', routerLink: '/' }, { label: 'Product Settings' }];
        }
    }
    getShippingInfo() {
        this.userService.getRoasterShippingTypes(this.roasterId).subscribe((result) => {
            if (result.success) {
                this.shippData = result.result;
                if (this.shippData.length !== 0) {
                    this.shippingDetails = this.shippData[0];
                    this.shipId = this.shippingDetails.id;
                    this.details = this.fb.group({
                        name: [this.shippingDetails.name, Validators.compose([Validators.required])],
                        day_min: [this.shippingDetails.day_min, Validators.compose([Validators.required])],
                        day_max: [this.shippingDetails.day_max, Validators.compose([Validators.required])],
                        price: [this.shippingDetails.price, Validators.compose([Validators.required])],
                    });
                } else {
                    this.details = this.fb.group({
                        name: ['', Validators.compose([Validators.required])],
                        day_min: [null, Validators.compose([Validators.required])],
                        day_max: [null, Validators.compose([Validators.required])],
                        price: [null, Validators.compose([Validators.required])],
                    });
                }
            }
        });
    }
    saveShippingInfo() {
        if (this.shippData.length === 0) {
            this.resetButtonValue = 'Saving';
            const body = this.details.value;
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
                const data = this.details.value;
                this.userService.updateRoasterShippingTypes(this.roasterId, this.shipId, data).subscribe((res) => {
                    if (res.success) {
                        this.resetButtonValue = 'Save';
                        this.toastrService.success('Shipping Details Updated successfully');
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
        return this.details.controls;
    }
    selectTabs() {
        if (this.selectedTab.index === 0) {
            this.selectMobileTab('VAT');
        } else {
            this.selectMobileTab('Shipment');
        }
    }

    // Mobile view methods
    selectMobileTab(feature) {
        this.selectedMobileTab = feature;
        this.router.navigate(['/features/vat-management'], { queryParams: { type: feature } });
    }
    getHeading() {
        let header = 'Product Settings';
        if (this.selectedMobileTab) {
            header = this.selectedMobileTab === 'VAT' ? 'VAT Management' : 'Shipment Details';
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
