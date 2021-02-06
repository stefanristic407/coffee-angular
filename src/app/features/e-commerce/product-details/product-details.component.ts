import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalsService, RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    eligibleArray: any = [];
    productForm: FormGroup;
    varients: FormArray;
    boxDetails: FormArray;
    brewingMethodArray = [];
    boughtArray = [];
    roasterId: any = '';
    vatSettings: any = [];
    roastedBatches: any = [];
    constructor(
        public globals: GlobalsService,
        private fb: FormBuilder,
        public services: RoasterserviceService,
        private cookieService: CookieService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
            isPublic: [false],
            name: ['', Validators.compose([Validators.required])],
            //bought_on_platform: [true],
            eligible_for: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])],
            product_option: [false],
            varients: this.fb.array([this.createEmptyVarient()]),
            boxDetails: this.fb.array([this.createEmptyBox()]),
            vat_type: ['', Validators.compose([Validators.required])],
            inclusive_vat: [false],
        });
        this.boughtArray = [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
        ];
        this.brewingMethodArray = [
            { label: 'Pour Over', value: 'pour-over' },
            { label: 'Coffeemaker', value: 'coffee-maker' },
            { label: 'French Press', value: 'french-press' },
            { label: 'AeroPress', value: 'aeropress' },
            { label: 'Moka Pot', value: 'mocha-pot' },
            { label: 'Chemix', value: 'chemex' },
        ];
        this.eligibleArray = [
            { label: 'One Time', value: 'one-time' },
            { label: 'Subscription', value: 'subscription' },
        ];
        this.productForm.controls['product_option'].valueChanges.subscribe((value) => {
            console.log(value);
            if (!value) {
                this.varients = this.productForm.get('varients') as FormArray;
                while (this.varients.length !== 0) {
                    this.varients.removeAt(0);
                }
                this.varients.push(this.createEmptyVarient());
            }
        });
        this.services.getVatSettings(this.roasterId).subscribe((res) => {
            this.vatSettings = [];
            if (res && res['result']) {
                res['result'].forEach((ele) => {
                    const vatObj = { label: ele['vat_percentage'] + '% ' + ele['transaction_type'], value: ele['id'] };
                    this.vatSettings.push(vatObj);
                });
            }
        });
        this.services.getRoastedBatches(this.roasterId).subscribe((res) => {
            this.roastedBatches = res.result ? res.result : [];
        });
        this.supplyBreadCrumb();
    }
    addNewVarients(): void {
        this.varients = this.productForm.get('varients') as FormArray;
        this.varients.push(this.createEmptyVarient());
    }
    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/features/welcome-aboard',
            disabled: false,
        };
        const obj2: MenuItem = {
            label: this.globals.languageJson?.products,
            routerLink: 'features/add-product',
            disabled: false,
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
    }
    onBatchChange(idx) {
        console.log(idx);
        this.varients = this.productForm.get('varients') as FormArray;
        const getVarient = this.varients['controls'][idx];
        if (getVarient && getVarient['value']) {
            const selectedID = getVarient['value']['id'];
            const getBatchDetails = this.roastedBatches.find((ele) => ele['id'] == selectedID);
            const updateFields = [
                'roaster_ref_no',
                'batch_ref_no',
                'roasting_profile_name',
                'roast_level',
                'roast_time',
                'estate_name',
                'origin',
                'region',
                'harvest_year',
                'body',
                'acidity',
                'aroma',
                'flavour',
                'processing',
                'flavour_profile',
                'roaster_notes',
                'recipes',
            ];
            updateFields.forEach((ele) => {
                const getValue = getBatchDetails[ele] ? getBatchDetails[ele] : '';
                getVarient['controls'][ele].setValue(getValue);
            });
        }
    }
    createEmptyVarient() {
        const getVarients = this.productForm ? (this.productForm.get('varients') as FormArray) : [];
        return this.fb.group({
            id: '',
            varient_name: 'Varient ' + (getVarients.length + 1),
            roaster_ref_no: '',
            batch_ref_no: '',
            roasting_profile_name: '',
            roast_level: '',
            roast_time: '',
            estate_name: '',
            origin: '',
            region: '',
            harvest_year: '',
            body: '',
            acidity: '',
            aroma: '',
            flavour: '',
            processing: '',
            flavour_profile: [],
            roaster_notes: '',
            recipes: '',
            recommended_breweing_method: '',
            recommendation_text: '',
        });
    }
    createEmptyBox() {
        return this.fb.group({
            weight: ['0', Validators.compose([Validators.required])],
            crate_unit: 'lb',
            crate_capacity: ['0', Validators.compose([Validators.required])],
        });
    }
    onCancel(): void {
        console.log('oncancel');
    }
    onSave(): void {}
    onPublish(): void {
        console.log('onpublish');
    }
    togglePublic(flag) {
        console.log(flag);
    }
}
