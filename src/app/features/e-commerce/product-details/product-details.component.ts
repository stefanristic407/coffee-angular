import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService, RoasterserviceService, UserserviceService } from '@services';
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
    variantTypeArray: any = [];
    productDescriptionLength = 0;
    recommendationTextLength = 0;
    recipeTextLength = 0;
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
    @ViewChildren(VarientDetailsComponent) varientComponent: QueryList<VarientDetailsComponent>;
    currentVariant = 0;
    allCrates = [];
    roastLevelArray: any = [];
    productName: any = '';
    constructor(
        public globals: GlobalsService,
        private fb: FormBuilder,
        public services: RoasterserviceService,
        private cookieService: CookieService,
        private toasterService: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private roasterService: RoasterserviceService,
        private userService: UserserviceService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
            is_public: [false],
            name: ['', Validators.compose([Validators.required])],
            purchase_type: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])],
            is_variants_included: [false],
            varients: this.fb.array([this.createEmptyVarient()]),
            crates: this.fb.array([]),
            vat_setting_id: ['', Validators.compose([Validators.required])],
            is_price_including_vat: [false],
        });
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.productID = params.id;
            } else {
                this.createTypeVariantArray();
            }
        });
        this.boughtArray = [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
        ];
        this.roastLevelArray = [
            { label: 'Light', value: 1 },
            { label: 'Light Medium', value: 2 },
            { label: 'Medium', value: 3 },
            { label: 'Medium Dark', value: 4 },
            { label: 'Dark', value: 5 },
        ];
        this.brewingMethodArray = [
            { label: 'Pour Over', value: 'pour-over' },
            { label: 'Coffeemaker', value: 'coffee-maker' },
            { label: 'French Press', value: 'french-press' },
            { label: 'AeroPress', value: 'aeropress' },
            { label: 'Moka Pot', value: 'mocha-pot' },
            { label: 'Chemix', value: 'chemex' },
            { lable: 'Presskanna eller Chemex', value: 'Presskanna eller Chemex' },
        ];
        this.eligibleArray = [
            { label: 'One Time', value: 'one-time' },
            { label: 'Subscription', value: 'subscription' },
        ];
        this.productForm.controls.is_variants_included.valueChanges.subscribe((value) => {
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
            if (res && res.result) {
                res.result.forEach((ele) => {
                    const vatObj = { label: ele.vat_percentage + '% ' + ele.transaction_type, value: ele.id };
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
        // disable mousewheel on a input number field when in focus
        // (to prevent Cromium browsers change the value when scrolling)
        $(document).on('wheel', 'input[type=number]', function (e) {
            $(this).blur();
        });
        this.supplyBreadCrumb();
    }
    getProductDetails(id) {
        this.services.getProductDetails(this.roasterId, id).subscribe(
            (res) => {
                if (res && res.result) {
                    const productDetails = res.result;
                    const productFields = [
                        'name',
                        'purchase_type',
                        'description',
                        'is_public',
                        'is_variants_included',
                        'vat_setting_id',
                        'is_price_including_vat',
                    ];
                    productFields.forEach((ele) => {
                        const getValue = productDetails[ele];
                        this.productForm.controls[ele].setValue(getValue);
                    });
                    this.productName = productDetails.name;
                    this.varients = this.productForm.get('varients') as FormArray;
                    this.varients.removeAt(0);

                    let increment = 0;
                    this.allCrates = [];
                    // tslint:disable-next-line: forin
                    for (const key in res.result.variants) {
                        const getVariant = res.result.variants[key];
                        const coffeeBatchID = getVariant[0].weight_variants[0].rc_batch_id;
                        const getBatchDetails = this.roastedBatches.find((ele) => ele.id === coffeeBatchID);
                        if (getBatchDetails === undefined) {
                            this.varients.push(this.createEmptyVarient());
                            const boxDetails = {
                                modify: false,
                                product_weight_variant_id: '_ghg005pti',
                                unit: 'lb',
                                value: 0,
                            };
                            this.onWeightCreate(boxDetails);
                            return;
                        }
                        const varient: any = {};
                        if (getBatchDetails) {
                            (varient.varient_name = 'Varient ' + (this.varients.length + 1)),
                                this.roastedFields.forEach((ele) => {
                                    const getValue = getBatchDetails[ele] ? getBatchDetails[ele] : '';
                                    varient[ele] = getValue;
                                });
                        }
                        varient.rc_batch_id = coffeeBatchID;
                        varient.weight_variants = getVariant[0].weight_variants;
                        varient.roaster_recommendation = getVariant[0].variant_details.roaster_recommendation;
                        varient.brewing_method = getVariant[0].variant_details.brewing_method;
                        const variantForm = this.fb.group(varient);
                        const weight_variants = getVariant[0].weight_variants;
                        weight_variants.forEach((ele) => {
                            const getCrate = productDetails.crates.find(
                                (item) => item.weight === ele.weight && ele.weight_unit === item.crate_unit,
                            );
                            if (getCrate) {
                                getCrate.has_weight = true;
                                getCrate.product_weight_variant_id = ele.product_weight_variant_id;
                                this.allCrates.push(getCrate);
                            }
                        });
                        if (getBatchDetails) {
                            const flavour_profile = getBatchDetails.flavour_profile;
                            variantForm.controls.flavour_profile.setValue(flavour_profile);
                            variantForm.controls.weight_variants.setValue(weight_variants);
                        }
                        this.varients.push(variantForm);
                        if (getBatchDetails) {
                            this.getRoastingProfile(increment, getBatchDetails.roasting_profile_id);
                            this.getOrderDetails(increment, getBatchDetails.order_id);
                        }
                        increment++;
                    }
                    this.crates = this.productForm.get('crates') as FormArray;
                    this.crates.removeAt(0);
                    this.allCrates = productDetails.crates;
                    productDetails.crates.forEach((crate) => {
                        if (crate.has_weight) {
                            const crateForm = this.createEmptyCrate();
                            crateForm.controls.weight.setValue(crate.weight);
                            crateForm.controls.id.setValue(crate.id);
                            crateForm.controls.weight_name.setValue(crate.weight + ' ' + crate.crate_unit);
                            crateForm.controls.product_weight_variant_id.setValue(crate.product_weight_variant_id);
                            crateForm.controls.crate_capacity.setValue(crate.crate_capacity);
                            this.crates.push(crateForm);
                        }
                    });
                    this.createTypeVariantArray();
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
        this.createTypeVariantArray();
    }
    removeVarient(index: any) {
        this.varients.removeAt(index);
    }
    removeVarientDrop(index: any) {
        this.variantTypeArray.splice(index, 1);
        this.varients.removeAt(index);
        this.currentVariant = this.currentVariant - 1;
    }
    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/',
        };
        const obj2: MenuItem = {
            label: 'Inventory',
        };
        const obj3: MenuItem = {
            label: 'E-commerce catalog management',
            routerLink: '/features/products-list',
        };
        const obj4: MenuItem = {
            label: 'Product',
            routerLink: '/',
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj3);
        this.breadCrumbItem.push(obj4);
    }
    onBatchChange(idx) {
        this.varients = this.productForm.get('varients') as FormArray;
        const getVarient = this.varients.controls[idx];
        if (getVarient && getVarient.value) {
            const selectedID = getVarient.value.rc_batch_id;
            const getBatchDetails = this.roastedBatches.find((ele) => ele.id === selectedID);
            if (getBatchDetails) {
                this.getRoastingProfile(idx, getBatchDetails.roasting_profile_id);
                this.getOrderDetails(idx, getBatchDetails.order_id);
                this.roastedFields.forEach((ele) => {
                    const getValue = getBatchDetails[ele] ? getBatchDetails[ele] : '';
                    getVarient['controls'][ele].setValue(getValue);
                });
            }
        }
    }
    createEmptyVarient() {
        const getVarients = this.productForm ? (this.productForm.get('varients') as FormArray) : [];
        return this.fb.group({
            rc_batch_id: ['', Validators.compose([Validators.required])],
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
            brewing_method: ['', Validators.compose([Validators.required])],
            roaster_recommendation: ['', Validators.compose([Validators.required])],
        });
    }
    createEmptyCrate() {
        return this.fb.group({
            id: '',
            weight: [0, Validators.compose([Validators.required])],
            crate_unit: 'lb',
            boxField: '1 box',
            weight_name: '0 lb',
            product_weight_variant_id: '',
            crate_capacity: ['', Validators.compose([Validators.required])],
        });
    }
    onWeightDelete(event) {
        this.crates.removeAt(event);
    }
    onWeightCreate(event) {
        this.crates = this.productForm.get('crates') as FormArray;
        if (!event.modify) {
            const getCrate = this.createEmptyCrate();
            getCrate.controls.weight.setValue(event.value);
            getCrate.controls.crate_unit.setValue(event.unit);
            getCrate.controls.weight_name.setValue(event.value + ' ' + event.unit);
            getCrate.controls.product_weight_variant_id.setValue(event.product_weight_variant_id);
            this.crates.push(getCrate);
        } else {
            const getObj = this.crates.value.find(
                (ele) => ele.product_weight_variant_id === event.product_weight_variant_id,
            );
            if (this.productID) {
                const getcrate = this.allCrates.find(
                    (ele) => ele.product_weight_variant_id === event.product_weight_variant_id,
                );
                if (getcrate) {
                    getcrate.hasChanged = true;
                }
            }
            const indexValue = this.crates.value.indexOf(getObj);
            if (getObj) {
                this.crates.controls[indexValue]['controls'].crate_unit.setValue(event.unit);
                this.crates.controls[indexValue]['controls'].weight.setValue(event.value);
                this.crates.controls[indexValue]['controls'].weight_name.setValue(event.value + ' ' + event.unit);
            }
        }
    }
    onCancel(): void {
        this.router.navigate(['/features/products-list']);
    }
    wordCounter(event) {
        const wordlimit = event.target.value ? 51 - event.target.value.split(/\s+/).length : 50;
        this.productDescriptionLength = event.target.value ? event.target.value.split(/\s+/).length : 0;
        if (wordlimit <= 0 && event.keyCode !== 8) {
            this.productDescriptionLength = 0;
            event.preventDefault();
        }
    }
    onPasteDescription(flag, idx?) {
        if (flag === 'description') {
            const getValue = this.productForm.controls.description.value;
            const value = getValue.split(/\s+/);
            const wordlimit = getValue ? 50 - value.length : 50;
            this.productDescriptionLength = value.length;
            if (wordlimit <= 0) {
                value.splice(50);
                let updatedString = '';
                value.forEach((ele) => {
                    updatedString = updatedString + ' ' + ele;
                });
                this.productDescriptionLength = 50;
                this.productForm.controls.description.setValue(updatedString);
            }
        } else if (flag === 'recommendation') {
            const getValue = this.productForm.controls.varients['controls'][idx].controls.roaster_recommendation.value;
            const value = getValue.split(/\s+/);
            const wordlimit = getValue ? 10 - value.length : 10;
            this.recommendationTextLength = value.length;
            if (wordlimit <= 0) {
                value.splice(10);
                let updatedString = '';
                value.forEach((ele) => {
                    updatedString = updatedString + ' ' + ele;
                });
                this.recommendationTextLength = 10;
                this.productForm.controls.varients['controls'][idx].controls.roaster_recommendation.setValue(
                    updatedString,
                );
            }
        } else if (flag === 'recipes') {
            const getValue = this.productForm.controls.varients['controls'][idx].controls.recipes.value;
            const value = getValue.split(/\s+/);
            const wordlimit = getValue ? 50 - value.length : 50;
            this.recipeTextLength = value.length;
            if (wordlimit <= 0) {
                value.splice(50);
                let updatedString = '';
                value.forEach((ele) => {
                    updatedString = updatedString + ' ' + ele;
                });
                this.recipeTextLength = 50;
                this.productForm.controls.varients['controls'][idx].controls.recipes.setValue(updatedString);
            }
        }
    }
    onSave(): void {
        if (this.validateForms()) {
            const productObj = this.productForm.value;
            if (this.productID) {
                this.updateProductDetails(productObj);
            } else {
                this.createNewProduct(productObj);
            }
        } else {
            this.productForm.markAllAsTouched();
            this.varientComponent.forEach((child, childIndex) => {
                child.weightForm.markAllAsTouched();
            });
            this.toasterService.error('Please fill all Data');
        }
    }
    createNewProduct(productObj) {
        this.services.addProductDetails(this.roasterId, productObj).subscribe(
            (res) => {
                if (res && res.success) {
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
        delete productObj.varients;
        const getOldCrate = this.allCrates.filter((ele) => ele.hasChanged || ele.has_weight);
        productObj.crates = productObj.crates.concat(getOldCrate);
        productObj.crates.forEach((ele) => {
            delete ele.id;
            delete ele.boxField;
            delete ele.product_weight_variant_id;
        });
        this.services.updateProductDetails(this.roasterId, this.productID, productObj).subscribe(
            (res) => {
                if (res && res.success) {
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
            const variantForm = child.weightForm.value;
            const getWeightArray = variantForm.weights;
            const getVarientDetails = child.varientDetails.value;
            getWeightArray.forEach((weight, index) => {
                const weightObj = weight;
                weightObj.featured_image_id = weight.featured_image_id ? weight.featured_image_id : undefined;
                const productImagesArray = [];
                if (weightObj && weightObj.product_images) {
                    weightObj.product_images.forEach((ele) => {
                        if (ele.fileDetails && ele.image_id) {
                            productImagesArray.push(ele.image_id);
                        }
                    });
                }
                weightObj.variant_id = index + 1;
                weightObj.rc_batch_id = getVarientDetails.rc_batch_id;
                weightObj.product_images = productImagesArray;
                weightObj.is_public = !weight.is_public;
                const weightVariantID = weight.product_weight_variant_id ? weight.product_weight_variant_id : false;
                weightObj.variant_details = {
                    brewing_method: getVarientDetails.brewing_method,
                    roaster_recommendation: getVarientDetails.roaster_recommendation,
                    recipes: getVarientDetails.recipes,
                };
                let showToaster = false;
                if (childIndex === this.varientComponent.length - 1 && index === getWeightArray.length - 1) {
                    showToaster = true;
                }
                if (weight.isNew) {
                    this.addNewGrindVariant(productID, weightObj, showToaster);
                } else if (weightVariantID) {
                    this.updateGrindVariant(weightObj, showToaster, weightVariantID);
                }
            });
        });
    }
    addNewGrindVariant(productID, weigthObj, showToaster) {
        delete weigthObj.product_weight_variant_id;
        delete weigthObj.fileDetails;
        weigthObj.status = weigthObj.status.toUpperCase();
        weigthObj.grind_variants.forEach((ele) => {
            ele.id = undefined;
            ele.grind_variant_id = undefined;
        });
        this.services.addProductWeightVarients(this.roasterId, productID, weigthObj).subscribe(
            (res) => {
                if (res.success && showToaster) {
                    this.toasterService.success('Product created successfully');
                    this.router.navigate(['/features/products-list']);
                }
                if (!res.success) {
                    this.toasterService.error('Errow while adding weight varients');
                }
            },
            (err) => {
                this.toasterService.error('Errow while adding weight varients');
            },
        );
    }
    updateGrindVariant(weightObj, showToaster, weightVariantID) {
        delete weightObj.product_weight_variant_id;
        weightObj.status = weightObj.status.toUpperCase();
        weightObj.grind_variants.map((ele) => {
            ele.id = ele.grind_variant_id ? ele.grind_variant_id : undefined;
        });
        this.services.updateProductWeightVarients(this.roasterId, this.productID, weightObj, weightVariantID).subscribe(
            (res) => {
                if (showToaster && res.success) {
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
    togglePublic(flag) {
        this.productForm.controls.is_public.setValue(flag);
        this.onSave();
    }
    createTypeVariantArray() {
        this.variantTypeArray = [];
        const variant = this.productForm.get('varients') as FormArray;
        variant['value'].forEach((ele, index) => {
            this.variantTypeArray.push({ label: ele.varient_name, value: index });
        });
        this.variantTypeArray.push({ label: '', value: 'button' });
        this.currentVariant = this.variantTypeArray.length - 2;
        console.log(this.currentVariant);
    }
    getRoastingProfile(idx, profileID) {
        this.varients = this.productForm.get('varients') as FormArray;
        const getVarient = this.varients.controls[idx];
        getVarient['controls'].roast_level.setValue('');
        getVarient['controls'].roast_time.setValue('');
        this.userService.getRoastingProfileDetail(this.roasterId, profileID).subscribe((res) => {
            if (res && res.result) {
                const level = this.roastLevelArray.find((ele) => ele.value === res.result.roast_level);
                if (level) {
                    getVarient['controls'].roast_level.setValue(level.label);
                }
                getVarient['controls'].roast_time.setValue(res.result.roast_duration);
            }
        });
    }
    getOrderDetails(idx, orderID) {
        this.varients = this.productForm.get('varients') as FormArray;
        const getVarient = this.varients.controls[idx];
        getVarient['controls'].origin.setValue('');
        getVarient['controls'].region.setValue('');
        getVarient['controls'].harvest_year.setValue('');
        this.roasterService.getViewOrderDetails(this.roasterId, orderID).subscribe((res) => {
            if (res && res.result) {
                getVarient['controls'].origin.setValue(res.result.origin);
                getVarient['controls'].region.setValue(res.result.region);
                getVarient['controls'].harvest_year.setValue(res.result.harvest_date);
            }
        });
    }
    productNameValue(event: any) {
        this.productName = event.target.value;
    }
}
