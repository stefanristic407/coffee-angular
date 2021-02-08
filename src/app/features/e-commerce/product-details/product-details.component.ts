import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService, RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { VarientDetailsComponent } from '../varient-details/varient-details.component';

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
    crates: FormArray;
    brewingMethodArray = [];
    boughtArray = [];
    roasterId: any = '';
    vatSettings: any = [];
    roastedBatches: any = [];
    productID = '';
    roastedFields = [
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
    //@ViewChild(VarientDetailsComponent, { static: false }) varientDetails;
    //@ViewChildren('cmp') varientComponent: QueryList<VarientDetailsComponent>;
    @ViewChildren(VarientDetailsComponent) varientComponent: QueryList<VarientDetailsComponent>;
    constructor(
        public globals: GlobalsService,
        private fb: FormBuilder,
        public services: RoasterserviceService,
        private cookieService: CookieService,
        private toasterService: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
            is_public: [false],
            name: ['', Validators.compose([Validators.required])],
            //bought_on_platform: [true],
            purchase_type: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])],
            is_variants_included: [false],
            varients: this.fb.array([this.createEmptyVarient()]),
            crates: this.fb.array([this.createEmptyCrate()]),
            vat_setting_id: ['', Validators.compose([Validators.required])],
            is_price_including_vat: [false],
        });
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.productID = params.id;
            }
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
        this.productForm.controls['is_variants_included'].valueChanges.subscribe((value) => {
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
        this.services.getRoastedBatches(this.roasterId).subscribe(
            (res) => {
                this.roastedBatches = res.result ? res.result : [];
                if (this.productID) {
                    this.getProductDetails(this.productID);
                }
            },
            (err) => {
                if (this.productID) {
                    this.getProductDetails(this.productID);
                }
            },
        );
        this.supplyBreadCrumb();
    }
    getProductDetails(id) {
        this.services.getProductDetails(this.roasterId, id).subscribe(
            (res) => {
                if (res && res['result']) {
                    const productDetails = res['result'];
                    const productFields = [
                        'name',
                        'purchase_type',
                        'description',
                        'is_public',
                        'is_variants_included',
                        'crates',
                        'vat_setting_id',
                        'is_price_including_vat',
                    ];
                    productFields.forEach((ele) => {
                        const getValue = productDetails[ele];
                        this.productForm['controls'][ele].setValue(getValue);
                    });
                    this.varients = this.productForm.get('varients') as FormArray;
                    this.varients.removeAt(0);
                    // tslint:disable-next-line: forin
                    for (const key in res['result']['variants']) {
                        const getVariant = res['result']['variants'][key];
                        const coffeeBatchID = getVariant[0]['weight_variants'][0]['rc_batch_id'];
                        const getBatchDetails = this.roastedBatches.find((ele) => ele['id'] == coffeeBatchID);
                        const varient = {};
                        (varient['varient_name'] = 'Varient ' + (this.varients.length + 1)),
                            this.roastedFields.forEach((ele) => {
                                const getValue = getBatchDetails[ele] ? getBatchDetails[ele] : '';
                                varient[ele] = getValue;
                            });
                        varient['rc_batch_id'] = coffeeBatchID;
                        varient['weight_variants'] = getVariant[0]['weight_variants'];
                        varient['roaster_recommendation'] = getVariant[0]['variant_details']['roaster_recommendation'];
                        varient['brewing_method'] = getVariant[0]['variant_details']['brewing_method'];
                        const variantForm = this.fb.group(varient);
                        const weight_variants = getVariant[0]['weight_variants'];
                        const flavour_profile = getBatchDetails['flavour_profile'];
                        variantForm['controls']['flavour_profile'].setValue(flavour_profile);
                        variantForm['controls']['weight_variants'].setValue(weight_variants);
                        this.varients.push(variantForm);
                    }
                }
            },
            (err) => {
                this.toasterService.error('Error while getting product details');
            },
        );
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
        this.varients = this.productForm.get('varients') as FormArray;
        const getVarient = this.varients['controls'][idx];
        if (getVarient && getVarient['value']) {
            const selectedID = getVarient['value']['rc_batch_id'];
            const getBatchDetails = this.roastedBatches.find((ele) => ele['id'] == selectedID);
            this.roastedFields.forEach((ele) => {
                const getValue = getBatchDetails[ele] ? getBatchDetails[ele] : '';
                getVarient['controls'][ele].setValue(getValue);
            });
        }
    }
    createEmptyVarient() {
        const getVarients = this.productForm ? (this.productForm.get('varients') as FormArray) : [];
        return this.fb.group({
            rc_batch_id: '',
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
            brewing_method: '',
            roaster_recommendation: '',
        });
    }
    createEmptyCrate() {
        return this.fb.group({
            weight: [0, Validators.compose([Validators.required])],
            crate_unit: 'lb',
            id: '',
            crate_capacity: [0, Validators.compose([Validators.required])],
        });
    }
    onCancel(): void {
        console.log('oncancel');
    }
    onSave(): void {
        if (this.validateForms()) {
            const productObj = this.productForm['value'];
            if (this.productID) {
                this.updateProductDetails(productObj);
            } else {
                this.createNewProduct(productObj);
            }
        } else {
            this.toasterService.error('Please fill all Data');
        }
    }
    createNewProduct(productObj) {
        this.services.addProductDetails(this.roasterId, productObj).subscribe(
            (res) => {
                if (res && res['success']) {
                    this.GrindVarientsDetails(res.result.id);
                } else {
                    this.toasterService.error('Error while add a Product');
                }
            },
            (err) => {
                this.toasterService.error('Error while add a Product');
            },
        );
    }
    updateProductDetails(productObj) {
        this.services.updateProductDetails(this.roasterId, this.productID, productObj).subscribe(
            (res) => {
                if (res && res['success']) {
                    this.GrindVarientsDetails(this.productID);
                } else {
                    this.toasterService.error('Error while add a Product');
                }
            },
            (err) => {
                this.toasterService.error('Error while add a Product');
            },
        );
    }
    GrindVarientsDetails(productID) {
        this.varientComponent.forEach((child, childIndex) => {
            const variantForm = child.weightForm['value'];
            const getWeightArray = variantForm['weights'];
            const getVarientDetails = child.varientDetails['value'];
            getWeightArray.forEach((weight, index) => {
                const weightObj = weight;
                weightObj['featured_image_id'] = weight['featured_image_id'] ? weight['featured_image_id'] : undefined;
                const productImagesArray = [];
                weightObj['product_images'].forEach((ele) => {
                    if (ele['fileDetails'] && ele['image_id']) {
                        productImagesArray.push(ele['image_id']);
                    }
                });
                weightObj['variant_id'] = index + 1;
                weightObj['rc_batch_id'] = getVarientDetails['rc_batch_id'];
                weightObj['product_images'] = productImagesArray;
                weightObj['is_public'] = !weight['is_public'];
                const weight_varient_id = weight['product_weight_variant_id']
                    ? weight['product_weight_variant_id']
                    : false;
                weightObj['variant_details'] = {
                    brewing_method: getVarientDetails['brewing_method'],
                    roaster_recommendation: getVarientDetails['roaster_recommendation'],
                    recipes: getVarientDetails['recipes'],
                };
                let showToaster = false;
                if (childIndex === this.varientComponent.length - 1 && index === getWeightArray.length - 1) {
                    showToaster = true;
                }
                if (!this.productID || !weight_varient_id) {
                    this.addNewGrindVariant(productID, weightObj, showToaster);
                } else if (weight_varient_id) {
                    this.updateGrindVariant(weightObj, showToaster, weight_varient_id);
                }
            });
        });
    }
    addNewGrindVariant(productID, weigthObj, showToaster) {
        weigthObj['status'] = weigthObj['status'].toUpperCase();
        this.services.addProductWeightVarients(this.roasterId, productID, weigthObj).subscribe(
            (res) => {
                if (res['success'] && showToaster) {
                    this.toasterService.success('Product created successfully');
                    this.router.navigate(['/features/products-list']);
                }
                if (!res['success']) {
                    this.toasterService.error('Errow while adding weight varients');
                }
            },
            (err) => {
                this.toasterService.error('Errow while adding weight varients');
            },
        );
    }
    updateGrindVariant(weightObj, showToaster, weight_variant_id) {
        delete weightObj['product_weight_variant_id'];
        weightObj['status'] = weightObj['status'].toUpperCase();
        weightObj['grind_variants'].map((ele) => {
            ele['id'] = ele['grind_variant_id'] ? ele['grind_variant_id'] : undefined;
        });
        this.services
            .updateProductWeightVarients(this.roasterId, this.productID, weightObj, weight_variant_id)
            .subscribe(
                (res) => {
                    if (showToaster && res['success']) {
                        this.toasterService.success('Product updated successfully');
                        this.router.navigate(['/features/products-list']);
                    }
                },
                (err) => {
                    this.toasterService.error('Errow while updating weight varients');
                },
            );
    }
    validateForms() {
        let returnFlag = true;
        if (!this.productForm.valid) {
            returnFlag = false;
            return returnFlag;
        }
        this.varientComponent.forEach((child) => {
            if (!child.weightForm.valid) {
                returnFlag = false;
                return;
            }
        });
        return returnFlag;
    }
    onPublish(): void {
        console.log('onpublish');
    }
    togglePublic(flag) {
        this.productForm['controls']['is_public'].setValue(flag);
    }
}
