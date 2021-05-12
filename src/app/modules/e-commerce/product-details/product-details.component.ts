import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService, RoasterserviceService, UserserviceService, ECommerceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { VariantDetailsComponent } from '../variant-details/variant-details.component';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    eligibleArray: any = [];
    productForm: FormGroup;
    variants: FormArray;
    crates: FormArray;
    brewingMethodArray = [];
    boughtArray = [];
    roasterId: any = '';
    vatSettings: any = [];
    roastedBatches: any = [];
    productID = '';
    type: string;
    variantTypeArray: any = [];
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
        'remaining_quantity',
    ];
    @ViewChildren(VariantDetailsComponent) variantComponent: QueryList<VariantDetailsComponent>;
    currentVariant = 0;
    allCrates = [];
    roastLevelArray: any = [];
    productName: any = '';
    visibilityOptions = [
        { label: 'Public', value: true },
        { label: 'Private', value: false },
    ];
    removedWeightVariants: any = [];
    boughtOnPlatformOptions = [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
    ];
    flavoursList: any[];
    isPublished: boolean;

    constructor(
        public globals: GlobalsService,
        private fb: FormBuilder,
        private cookieService: CookieService,
        private toasterService: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private roasterService: RoasterserviceService,
        private userService: UserserviceService,
        private eCommerceService: ECommerceService,
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
            variants: this.fb.array([this.createEmptyVariant()]),
            crates: this.fb.array([]),
            vat_setting_id: ['', Validators.compose([Validators.required])],
            is_price_including_vat: [false],
            is_external_product: [true],
        });
        this.route.params.subscribe((params) => {
            this.type = params.type;
            if (this.type === 'b2c') {
                this.getFlavoursData();
            }
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
                this.variants = this.productForm.get('variants') as FormArray;
                while (this.variants.length !== 0) {
                    this.variants.removeAt(0);
                }
                this.variants.push(this.createEmptyVariant());
            }
        });
        this.eCommerceService.getVatSettings().subscribe((res) => {
            this.vatSettings = [];
            if (res && res.result) {
                res.result.forEach((ele) => {
                    const vatObj = { label: ele.vat_percentage + '% ' + ele.transaction_type, value: ele.id };
                    this.vatSettings.push(vatObj);
                });
            }
        });
        this.eCommerceService.getRoastedBatches({ per_page: 10000 }).subscribe(
            (res) => {
                this.roastedBatches = res.result ? res.result : [];
                if (this.productID && this.productID !== 'add') {
                    this.getProductDetails();
                }
            },
            (err) => {
                if (this.productID && this.productID !== 'add') {
                    this.getProductDetails();
                }
            },
        );
        this.supplyBreadCrumb();
    }

    getFlavoursData() {
        this.userService.getFlavourProfile().subscribe(
            (res: any) => {
                this.flavoursList = res.result.map((item) => {
                    return {
                        flavour_profile_id: item.id,
                        flavour_profile_name: item.name,
                    };
                });
            },
            (err) => {
                console.log(err);
            },
        );
    }

    getProductDetails() {
        this.eCommerceService.getProductDetails(this.productID, this.type).subscribe(
            (res) => {
                if (res && res.result) {
                    const productDetails = res.result;
                    this.isPublished = res.result.is_published;
                    this.breadCrumbItem = [
                        { label: this.globals.languageJson?.home, routerLink: '/' },
                        {
                            label: this.globals.languageJson?.ecommerce,
                        },
                        {
                            label: this.globals.languageJson[`${this.type}_product_catalog`],
                            routerLink: `/e-commerce/product-list/${this.type}`,
                        },
                        { label: res.result.name },
                    ];
                    this.productForm.patchValue({
                        name: productDetails.name,
                        purchase_type: productDetails.purchase_type,
                        description: productDetails.description,
                        is_public: productDetails.is_public,
                        is_variants_included: productDetails.is_variants_included,
                        vat_setting_id: productDetails.vat_setting_id,
                        is_price_including_vat: productDetails.is_price_including_vat,
                        is_external_product: this.type === 'b2b' ? true : productDetails.is_price_including_vat,
                    });
                    this.productName = productDetails.name;
                    this.variants = this.productForm.get('variants') as FormArray;
                    this.variants.removeAt(0);

                    let increment = 0;
                    this.allCrates = [];
                    for (const key of Object.keys(res.result.variants)) {
                        const getVariant = res.result.variants[key];
                        const coffeeBatchID = getVariant[0].weight_variants[0].rc_batch_id;
                        const getBatchDetails = this.roastedBatches.find((ele) => ele.id === coffeeBatchID);
                        if (getBatchDetails === undefined) {
                            this.variants.push(this.createEmptyVariant());
                            const boxDetails = {
                                modify: false,
                                product_weight_variant_id: '_ghg005pti',
                                unit: 'lb',
                                value: 0,
                            };
                            this.onWeightCreate(boxDetails);
                            return;
                        }
                        const variant: any = {};
                        if (getBatchDetails) {
                            variant.variant_name = 'Variant ' + (this.variants.length + 1);
                            this.roastedFields.forEach((ele) => {
                                const getValue = getBatchDetails[ele] ? getBatchDetails[ele] : '';
                                variant[ele] = getValue;
                            });
                        }
                        variant.rc_batch_id = coffeeBatchID;
                        variant.weight_variants = getVariant[0].weight_variants;
                        variant.roaster_recommendation = getVariant[0].variant_details.roaster_recommendation;
                        variant.brewing_method = getVariant[0].variant_details.brewing_method;
                        const variantForm = this.fb.group(variant);
                        const weightVariants = getVariant[0].weight_variants;
                        weightVariants.forEach((ele) => {
                            const getCrate = productDetails.crates.find(
                                (item) => item.weight === ele.weight && ele.weight_unit === item.crate_unit,
                            );
                            if (getCrate) {
                                getCrate.has_weight = true;
                                getCrate.product_weight_variant_id = ele.product_weight_variant_id;
                                getCrate.variant_name = `Variant ${key}`;
                                this.allCrates.push(getCrate);
                            }
                        });
                        if (getBatchDetails) {
                            const flavourProfile = getBatchDetails.flavour_profile;
                            variantForm.controls.flavour_profile.setValue(flavourProfile);
                            variantForm.controls.weight_variants.setValue(weightVariants);
                        }
                        this.variants.push(variantForm);
                        if (getBatchDetails) {
                            this.getRoastingProfile(increment, getBatchDetails.roasting_profile_id);
                            this.getOrderDetails(increment, getBatchDetails.order_id);
                        }
                        increment++;
                    }
                    this.crates = this.productForm.get('crates') as FormArray;
                    this.crates.removeAt(0);
                    for (const crate of productDetails.crates) {
                        if (crate.has_weight) {
                            const crateForm = this.createEmptyCrate();
                            crateForm.patchValue({
                                weight: crate.weight,
                                crate_unit: crate.crate_unit,
                                id: crate.id,
                                weight_name: `${crate.weight} ${crate.crate_unit}`,
                                product_weight_variant_id: crate.product_weight_variant_id,
                                crate_capacity: crate.crate_capacity,
                                variant_name: crate.variant_name,
                            });
                            this.crates.push(crateForm);
                        }
                    }
                    this.createTypeVariantArray();
                }
            },
            (err) => {
                this.toasterService.error('Error while getting product details');
            },
        );
    }
    addNewVariants(): void {
        this.variants = this.productForm.get('variants') as FormArray;
        this.variants.push(this.createEmptyVariant());
        this.createTypeVariantArray();
    }
    removeVariant(index: any) {
        const weights = this.variantComponent.toArray()[index].weightForm.value.weights;
        if (weights?.length) {
            weights.forEach((element) => {
                const event = {
                    productWeightVariantId: element.product_weight_variant_id,
                    isNew: element.isNew,
                    weight: element.weight,
                    weight_unit: element.weight_unit,
                };
                this.onWeightDelete(event, element.product_weight_variant_id);
            });
        }
        this.variants.removeAt(index);
    }
    removeVariantDrop(index: any) {
        this.variantTypeArray.splice(index, 1);
        this.variants.removeAt(index);
        this.currentVariant = this.currentVariant > 0 ? this.currentVariant - 1 : null;
    }
    supplyBreadCrumb(): void {
        this.breadCrumbItem = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            {
                label: this.globals.languageJson?.ecommerce,
            },
            {
                label: this.globals.languageJson[`${this.type}_product_catalog`],
                routerLink: `/e-commerce/product-list/${this.type}`,
            },
            { label: 'product' },
        ];
    }
    onBatchChange(idx) {
        this.variants = this.productForm.get('variants') as FormArray;
        const getVariant: any = this.variants.controls[idx];
        if (getVariant && getVariant.value) {
            const selectedID = getVariant.value.rc_batch_id;
            const getBatchDetails = this.roastedBatches.find((ele) => ele.id === selectedID);
            if (getBatchDetails) {
                this.getRoastingProfile(idx, getBatchDetails.roasting_profile_id);
                this.getOrderDetails(idx, getBatchDetails.order_id);
                this.roastedFields.forEach((ele) => {
                    const getValue = getBatchDetails[ele] ? getBatchDetails[ele] : '';
                    getVariant.controls[ele].setValue(getValue);
                });
            }
        }
    }
    createEmptyVariant() {
        const getVariants = this.productForm ? (this.productForm.get('variants') as FormArray) : [];
        return this.fb.group({
            rc_batch_id: ['', Validators.compose([Validators.required])],
            variant_name: 'Variant ' + (getVariants.length + 1),
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
            remaining_quantity: '',
            weight_variants: [],
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
            variant_name: '',
        });
    }

    onWeightDelete(event, productWeightVariantId?) {
        let canRemove = true;
        this.variantComponent.forEach((child) => {
            if (
                child.weightForm.value.weights.find(
                    (item) => item.weight === event.weight && item.weight_unit === event.weight_unit,
                ) &&
                event.productWeightVariantId !== productWeightVariantId
            ) {
                canRemove = false;
                return;
            }
        });
        this.crates = this.productForm.get('crates') as FormArray;
        if (canRemove) {
            this.crates.removeAt(
                this.crates.value.findIndex((item) => item.product_weight_variant_id === event.productWeightVariantId),
            );
        }
        if (!event.isNew) {
            this.removedWeightVariants.push(event.productWeightVariantId);
        }
    }
    onWeightCreate(event) {
        this.crates = this.productForm.get('crates') as FormArray;
        const getObjs = this.crates.value.filter((ele) => ele.weight === event.value && ele.crate_unit === event.unit);
        console.log(this.variantComponent);
        if (!event.modify) {
            if (!getObjs?.length) {
                const getCrate = this.createEmptyCrate();
                getCrate.patchValue({
                    weight: event.value,
                    crate_unit: event.unit,
                    weight_name: `${event.value} ${event.unit}`,
                    product_weight_variant_id: event.product_weight_variant_id,
                    variant_name: event.variant_name,
                });
                this.crates.push(getCrate);
            }
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
                if (
                    getObjs?.length &&
                    getObjs.find((item) => item.product_weight_variant_id !== event.product_weight_variant_id)
                ) {
                    this.crates.removeAt(indexValue);
                } else {
                    this.crates.controls[indexValue].patchValue({
                        crate_unit: event.unit,
                        weight: event.value,
                        weight_name: `${event.value} ${event.unit}`,
                    });
                }
            } else {
                if (!getObjs?.length) {
                    const getCrate = this.createEmptyCrate();
                    getCrate.patchValue({
                        weight: event.value,
                        crate_unit: event.unit,
                        weight_name: `${event.value} ${event.unit}`,
                        product_weight_variant_id: event.product_weight_variant_id,
                        variant_name: event.variant_name,
                    });
                    this.crates.push(getCrate);
                }
            }
        }
    }
    onCancel(): void {
        this.router.navigate([`/e-commerce/product-list/${this.type}`]);
    }

    onSave(): void {
        if (this.validateForms()) {
            const productObj = this.productForm.value;
            if (this.productID) {
                this.GrindVariantsDetails(this.productID, false);
            } else {
                this.createNewProduct(productObj);
            }
        } else {
            this.productForm.markAllAsTouched();
            this.variantComponent.forEach((child, childIndex) => {
                child.weightForm.markAllAsTouched();
            });
            this.toasterService.error('Please fill all Data');
        }
    }
    createNewProduct(productObj) {
        this.eCommerceService.addProductDetails(productObj, this.type).subscribe(
            (res) => {
                if (res && res.success) {
                    this.GrindVariantsDetails(res.result.id, true);
                } else {
                    this.toasterService.error('Error while add a Product');
                }
            },
            (err) => {
                this.toasterService.error('Error while add a Product');
            },
        );
    }
    updateProductDetails() {
        const productObj = Object.assign({}, this.productForm.value);
        delete productObj.variants;
        productObj.crates.forEach((ele) => {
            delete ele.id;
            delete ele.boxField;
            delete ele.product_weight_variant_id;
            delete ele.variant_name;
            delete ele.weight_name;
        });
        this.eCommerceService.updateProductDetails(this.productID, productObj, this.type).subscribe(
            (res) => {
                if (res && res.success) {
                    this.toasterService.success(`Product updated successfully`);
                    this.router.navigate([`/e-commerce/product-list/${this.type}`]);
                } else {
                    this.toasterService.error('Error while add a Product');
                }
            },
            (err) => {
                this.toasterService.error('Error while add a Product');
            },
        );
    }
    GrindVariantsDetails(productID, isNew) {
        const promises: any[] = [];
        this.variantComponent.forEach((child, childIndex) => {
            const variantForm = child.weightForm.value;
            const getWeightArray = variantForm.weights;
            const getVariantDetails = child.variantDetails.value;
            getWeightArray.forEach((weight, index) => {
                const weightObj = Object.assign({}, weight);
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
                weightObj.rc_batch_id = getVariantDetails.rc_batch_id;
                weightObj.product_images = productImagesArray;
                weightObj.is_public = !weight.is_public;
                const weightVariantID = weight.product_weight_variant_id ? weight.product_weight_variant_id : false;
                weightObj.variant_details = {
                    brewing_method: getVariantDetails.brewing_method,
                    roaster_recommendation: getVariantDetails.roaster_recommendation,
                    recipes: getVariantDetails.recipes,
                };
                if (weight.isNew) {
                    promises.push(
                        new Promise((resolve, reject) => {
                            this.addNewGrindVariant(productID, weightObj, resolve, reject);
                        }),
                    );
                } else if (weightVariantID) {
                    promises.push(
                        new Promise((resolve, reject) => {
                            this.updateGrindVariant(weightObj, weightVariantID, resolve, reject);
                        }),
                    );
                }
            });
        });
        for (const weightVariant of this.removedWeightVariants) {
            promises.push(
                new Promise((resolve, reject) => {
                    this.deleteWeightVariant(productID, weightVariant, resolve, reject);
                }),
            );
        }
        Promise.all(promises)
            .then(() => {
                if (isNew) {
                    this.toasterService.success(`Product created successfully`);
                    this.router.navigate([`/e-commerce/product-list/${this.type}`]);
                } else {
                    this.updateProductDetails();
                }
            })
            .catch(() => {});
    }

    deleteWeightVariant(productID, weightVariant, resolve, reject) {
        this.eCommerceService.deleteProductWeightVariants(productID, weightVariant, this.type).subscribe((res) => {
            if (res.success) {
                resolve();
            } else {
                this.toasterService.error('Errow while removing weight variants');
                reject();
            }
        });
    }

    addNewGrindVariant(productID, weigthObj, resolve, reject) {
        delete weigthObj.product_weight_variant_id;
        delete weigthObj.fileDetails;
        weigthObj.status = weigthObj.status.toUpperCase();
        weigthObj.grind_variants.forEach((ele) => {
            ele.id = undefined;
            ele.grind_variant_id = undefined;
        });
        this.eCommerceService.addProductWeightVariants(productID, weigthObj, this.type).subscribe(
            (res) => {
                if (res.success) {
                    resolve();
                } else {
                    this.toasterService.error('Errow while adding weight variants');
                    reject();
                }
            },
            (err) => {
                this.toasterService.error('Errow while adding weight variants');
                reject();
            },
        );
    }
    updateGrindVariant(weightObj, weightVariantID, resolve, reject) {
        delete weightObj.product_weight_variant_id;
        weightObj.status = weightObj.status.toUpperCase();
        weightObj.grind_variants.map((ele) => {
            ele.id = ele.grind_variant_id ? ele.grind_variant_id : undefined;
        });
        this.eCommerceService
            .updateProductWeightVariants(this.productID, weightObj, weightVariantID, this.type)
            .subscribe(
                (res) => {
                    if (res.success) {
                        resolve();
                    } else {
                        this.toasterService.error('Errow while updating weight variants');
                        reject();
                    }
                },
                (err) => {
                    this.toasterService.error('Errow while updating weight variants');
                },
            );
    }
    validateForms() {
        let returnFlag = true;
        if (!this.productForm.valid) {
            returnFlag = false;
            return returnFlag;
        }
        this.variantComponent.forEach((child) => {
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
        const variantTypeArray = [];
        const variant = this.productForm.get('variants') as FormArray;
        variant.value.forEach((ele, index) => {
            variantTypeArray.push({ label: ele.variant_name, value: index });
        });
        variantTypeArray.push({ label: '', value: 'button' });
        this.variantTypeArray = variantTypeArray;
        this.currentVariant = this.variantTypeArray.length - 2;
    }
    getRoastingProfile(idx, profileID) {
        this.variants = this.productForm.get('variants') as FormArray;
        const getVariant = this.variants.controls[idx];
        getVariant.patchValue({
            roast_level: '',
            roast_time: '',
        });
        this.userService.getRoastingProfileDetail(this.roasterId, profileID).subscribe((res) => {
            if (res && res.result) {
                const level = this.roastLevelArray.find((ele) => ele.value === res.result.roast_level);
                getVariant.patchValue({
                    roast_level: level.label ?? '',
                    roast_time: res.result.roast_duration,
                });
            }
        });
    }
    getOrderDetails(idx, orderID) {
        this.variants = this.productForm.get('variants') as FormArray;
        const getVariant = this.variants.controls[idx];
        getVariant.patchValue({
            origin: '',
            region: '',
            harvest_year: '',
        });
        this.roasterService.getViewOrderDetails(this.roasterId, orderID).subscribe((res) => {
            if (res && res.result) {
                getVariant.patchValue({
                    origin: res.result.origin,
                    region: res.result.region,
                    harvest_year: res.result.harvest_date,
                });
            }
        });
    }
    productNameValue(event: any) {
        this.productName = event.target.value;
    }

    getSelectedBatchLabel(batchId: any) {
        const batch = this.roastedBatches.find((item) => item.id === batchId);
        return `Batch #${batchId} - ${batch.roast_batch_name}`;
    }
}
