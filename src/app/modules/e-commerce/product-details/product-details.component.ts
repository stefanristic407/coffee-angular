import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService, RoasterserviceService, UserserviceService, ECommerceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { VariantDetailsComponent } from '../variant-details/variant-details.component';
import { maxWordCountValidator } from '@utils';
import { COUNTRY_LIST, LBUNIT } from '@constants';
import * as moment from 'moment';
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
        'flavour_profiles',
        'roaster_notes',
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
        { label: 'Yes', value: false },
        { label: 'No', value: true },
    ];
    flavoursList: any[];
    isPublished: boolean;
    thisYear = new Date().getFullYear();
    countryArray: any[] = COUNTRY_LIST;
    count = 0;

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
        const promises: any[] = [];
        this.route.params.subscribe((params) => {
            this.type = params.type;
            this.productForm = this.fb.group({
                is_public: [false],
                name: ['', Validators.compose([Validators.required])],
                purchase_type: ['', Validators.compose([Validators.required])],
                description: ['', Validators.compose([Validators.required, maxWordCountValidator(300)])],
                is_variants_included: [false],
                variants: this.fb.array([this.createEmptyVariant()]),
                crates: this.fb.array([]),
                vat_setting_id: ['', Validators.compose([Validators.required])],
                is_price_including_vat: [this.type === 'b2c'],
                is_external_product: [false],
            });
            if (this.type === 'b2c') {
                promises.push(
                    new Promise((resolve, reject) => {
                        this.getFlavoursData(resolve, reject);
                    }),
                );
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
            { label: 'Presskanna eller Chemex', value: 'Presskanna eller Chemex' },
            { label: 'None', value: '' },
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
        promises.push(
            new Promise((resolve, reject) => {
                this.getVatData(resolve, reject);
            }),
        );
        promises.push(
            new Promise((resolve, reject) => {
                this.getRoasterBatches(resolve, reject);
            }),
        );
        Promise.all(promises).then(() => {
            if (this.productID && this.productID !== 'add') {
                this.getProductDetails();
            }
        });
        this.supplyBreadCrumb();
    }

    getVatData(resolve, reject) {
        this.eCommerceService.getVatSettings().subscribe((res) => {
            this.vatSettings = [];
            if (res && res.result) {
                res.result.forEach((ele) => {
                    const vatObj = { label: ele.vat_percentage + '% ' + ele.transaction_type, value: ele.id };
                    this.vatSettings.push(vatObj);
                });
                resolve();
            } else {
                reject();
            }
        });
    }

    getRoasterBatches(resolve, reject) {
        this.eCommerceService.getRoastedBatches({ per_page: 10000 }).subscribe(
            (res) => {
                if (res.success) {
                    this.roastedBatches = res.result ? res.result : [];
                    resolve();
                } else {
                    reject();
                }
            },
            (err) => {
                reject();
            },
        );
    }

    getFlavoursData(resolve, reject) {
        this.userService.getFlavourProfile().subscribe(
            (res: any) => {
                if (res.success) {
                    this.flavoursList = res.result.map((item) => {
                        return {
                            flavour_profile_id: item.id,
                            flavour_profile_name: item.name,
                        };
                    });
                    resolve();
                } else {
                    reject();
                }
            },
            (err) => {
                console.log(err);
                reject();
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
                        is_external_product: this.type === 'b2b' ? false : productDetails.is_external_product,
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
                        if (!getBatchDetails && !productDetails.is_external_product) {
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
                        variant.rc_batch_id = coffeeBatchID;
                        variant.weight_variants = getVariant[0].weight_variants;
                        variant.roaster_recommendation = getVariant[0].variant_details.roaster_recommendation ?? '';
                        variant.brewing_method = getVariant[0].variant_details.brewing_method;
                        variant.recipes = getVariant[0].variant_details.recipes ?? '';
                        variant.variant_name = 'Variant ' + (this.variants.length + 1);
                        if (getBatchDetails) {
                            this.roastedFields.forEach((ele) => {
                                const getValue = getBatchDetails[ele] ? getBatchDetails[ele] : '';
                                variant[ele] = getValue;
                            });
                        }
                        if (productDetails.is_external_product) {
                            this.roastedFields.forEach((ele) => {
                                let getValue;
                                if (ele === 'flavour_profiles') {
                                    getValue = getVariant[0].variant_details.flavour_profile
                                        .split(',')
                                        .map((item) => +item);
                                    getValue = this.flavoursList.filter((item) =>
                                        getValue.includes(item.flavour_profile_id),
                                    );
                                } else if (ele === 'harvest_year') {
                                    getValue = new Date(getVariant[0].variant_details[ele]);
                                } else {
                                    getValue = getVariant[0].variant_details[ele] ?? '';
                                }
                                variant[ele] = getValue;
                            });
                        }
                        const variantForm = this.fb.group(variant);
                        const weightVariants = getVariant[0].weight_variants;
                        weightVariants.forEach((ele) => {
                            if (!productDetails.is_external_product) {
                                const getCrate = productDetails.crates?.find(
                                    (item) => item.weight === ele.weight && ele.weight_unit === item.crate_unit,
                                );
                                if (getCrate) {
                                    getCrate.has_weight = true;
                                    getCrate.product_weight_variant_id = ele.product_weight_variant_id;
                                    getCrate.variant_name = `Variant ${key}`;
                                    getCrate.weight =
                                        getCrate.crate_unit === 'lb'
                                            ? getCrate.weight / LBUNIT
                                            : getCrate.crate_unit === 'g'
                                            ? getCrate.weight * 1000
                                            : getCrate.weight;
                                    this.allCrates.push(getCrate);
                                }
                            }

                            ele.weight =
                                ele.weight_unit === 'lb'
                                    ? ele.weight / LBUNIT
                                    : ele.weight_unit === 'g'
                                    ? ele.weight * 1000
                                    : ele.weight;
                        });
                        if (productDetails.is_external_product) {
                            variantForm.patchValue({
                                weight_variants: weightVariants,
                                flavour_profiles: variant.flavour_profiles,
                            });
                        } else if (getBatchDetails) {
                            const flavourProfile = getBatchDetails.flavour_profile;
                            variantForm.patchValue({
                                weight_variants: weightVariants,
                                flavour_profiles: flavourProfile,
                            });
                        }
                        this.variants.push(variantForm);
                        if (getBatchDetails && !productDetails.is_external_product) {
                            this.getRoastingProfile(increment, getBatchDetails.roasting_profile_id);
                            this.getOrderDetails(increment, getBatchDetails.order_id);
                        }
                        increment++;
                    }
                    if (!productDetails.is_external_product) {
                        this.crates = this.productForm.get('crates') as FormArray;
                        this.crates.removeAt(0);
                        if (productDetails.crates) {
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
        setTimeout(() => {
            this.currentVariant = this.variants.length - 1;
        }, 0);
    }
    removeVariant(index: any) {
        this.variants = this.productForm.get('variants') as FormArray;
        if (index === this.currentVariant) {
            this.currentVariant = index === 0 ? this.variants.length - 1 : 0;
        }
        const variantTypeArray = Object.assign([], this.variantTypeArray);
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
        setTimeout(() => {
            this.variants.removeAt(index);
            variantTypeArray.splice(index, 1);
            this.variantTypeArray = variantTypeArray;
        }, 200);
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
                getVariant.get('flavour_profiles').setValue(getBatchDetails.flavour_profile);
            }
        }
    }
    createEmptyVariant() {
        this.count++;
        return this.fb.group({
            rc_batch_id: '',
            variant_name: 'Variant ' + this.count,
            roaster_ref_no: '',
            batch_ref_no: '',
            roasting_profile_name: '',
            roast_level: ['', Validators.compose([Validators.required])],
            roast_time: '',
            estate_name: '',
            origin: '',
            region: '',
            harvest_year: '',
            body: ['', Validators.compose([Validators.required])],
            acidity: ['', Validators.compose([Validators.required])],
            aroma: ['', Validators.compose([Validators.required])],
            flavour: ['', Validators.compose([Validators.required])],
            processing: ['', Validators.compose([Validators.required])],
            flavour_profiles: [],
            roaster_notes: ['', Validators.compose([maxWordCountValidator(300)])],
            recipes: ['', Validators.compose([maxWordCountValidator(300)])],
            brewing_method: '',
            roaster_recommendation: ['', Validators.compose([maxWordCountValidator(10)])],
            remaining_quantity: '',
            weight_variants: [],
        });
    }
    createEmptyCrate() {
        return this.fb.group({
            id: '',
            weight: [0, Validators.compose(this.type === 'b2c' ? [] : [Validators.required])],
            crate_unit: 'lb',
            boxField: '1 box',
            weight_name: '0 lb',
            product_weight_variant_id: '',
            crate_capacity: ['', Validators.compose(this.type === 'b2c' ? [] : [Validators.required])],
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
        if (this.type === 'b2b') {
            this.crates = this.productForm.get('crates') as FormArray;
            const getObjs = this.crates.value.filter(
                (ele) => ele.weight === event.value && ele.crate_unit === event.unit,
            );
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
    }
    onCancel(): void {
        this.router.navigate([`/e-commerce/product-list/${this.type}`]);
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
            this.variantComponent.forEach((child, childIndex) => {
                child.weightForm.markAllAsTouched();
            });
            this.toasterService.error('Please fill all Data and upload feature image.');
        }
    }
    createNewProduct(productObj) {
        if (this.type === 'b2c') {
            delete productObj.crates;
        } else {
            productObj.crates.map((item) => {
                item.weight =
                    item.crate_unit === 'lb'
                        ? item.weight * LBUNIT
                        : item.crate_unit === 'g'
                        ? item.weight / 1000
                        : item.weight;
                return item;
            });
        }
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
    updateProductDetails(productObj) {
        delete productObj.variants;
        if (this.type === 'b2b') {
            for (const crate of this.allCrates) {
                if (
                    !productObj.crates.find(
                        (item) => item.weight === crate.weight && item.crate_unit === crate.crate_unit,
                    )
                ) {
                    productObj.crates.push(crate);
                }
            }
            productObj.crates.forEach((ele) => {
                delete ele.id;
                delete ele.boxField;
                delete ele.product_weight_variant_id;
                delete ele.variant_name;
                delete ele.weight_name;
            });
        } else {
            delete productObj.crates;
        }
        this.eCommerceService.updateProductDetails(this.productID, productObj, this.type).subscribe(
            (res) => {
                if (res && res.success) {
                    this.GrindVariantsDetails(this.productID, false);
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
        let includeDefault = false;
        for (const variantComponet of this.variantComponent) {
            if (includeDefault) {
                break;
            }
            const variantForm = variantComponet.weightForm.value;
            const getWeightArray = variantForm.weights;
            if (getWeightArray.find((item) => item.is_default_product)) {
                includeDefault = true;
                break;
            }
        }
        this.variantComponent.forEach((child, childIndex) => {
            const variantForm = child.weightForm.value;
            const getWeightArray = variantForm.weights;
            const getVariantDetails = child.variantDetails.value;
            getWeightArray.forEach((weight, index) => {
                const weightObj = Object.assign({}, weight);
                if (!includeDefault && childIndex === 0 && index === 0) {
                    weightObj.is_default_product = true;
                }
                weightObj.featured_image_id = weight.featured_image_id ?? undefined;
                const productImagesArray = [];
                if (weightObj && weightObj.product_images) {
                    weightObj.product_images.forEach((ele) => {
                        if (ele.fileDetails && ele.image_id) {
                            productImagesArray.push(ele.image_id);
                        }
                    });
                }
                weightObj.variant_id = childIndex + 1;
                if (!!getVariantDetails.rc_batch_id && !this.productForm.value.is_external_product) {
                    weightObj.rc_batch_id = getVariantDetails.rc_batch_id;
                } else {
                    delete weightObj.rc_batch_id;
                }
                weightObj.product_images = productImagesArray;
                weightObj.is_public = !weight.is_public;
                weightObj.weight =
                    weightObj.weight_unit === 'lb'
                        ? weightObj.weight * LBUNIT
                        : weightObj.weight_unit === 'g'
                        ? weightObj.weight / 1000
                        : weightObj.weight;

                const weightVariantID = weight.product_weight_variant_id ? weight.product_weight_variant_id : false;
                weightObj.variant_details = {
                    brewing_method: getVariantDetails.brewing_method,
                    roaster_recommendation: getVariantDetails.roaster_recommendation,
                    recipes: getVariantDetails.recipes,
                };
                if (this.type === 'b2c') {
                    weightObj.variant_details.flavour_profiles = getVariantDetails.flavour_profiles.map(
                        (item) => item.flavour_profile_id ?? item,
                    );
                    weightObj.variant_details.processing = getVariantDetails.processing;
                    weightObj.variant_details.body = getVariantDetails.body;
                    weightObj.variant_details.acidity = getVariantDetails.acidity;
                    weightObj.variant_details.aroma = getVariantDetails.aroma;
                    weightObj.variant_details.flavour = getVariantDetails.flavour;
                    weightObj.variant_details.roaster_ref_no = getVariantDetails.roaster_ref_no;
                    weightObj.variant_details.estate_name = getVariantDetails.estate_name;
                    weightObj.variant_details.origin = getVariantDetails.origin;
                    weightObj.variant_details.region = getVariantDetails.region;
                    weightObj.variant_details.roaster_notes = getVariantDetails.roaster_notes;
                    weightObj.variant_details.roast_level = getVariantDetails.roast_level;
                    weightObj.variant_details.harvest_year = getVariantDetails.harvest_year
                        ? moment(getVariantDetails.harvest_year).format('yyyy-MM-DD')
                        : '';
                }
                const grindVariants = weightObj.grind_variants.map((item) => {
                    if (!item.grind_variant_id) {
                        delete item.grind_variant_id;
                    }
                    return item;
                });
                weightObj.grind_variants = grindVariants;
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
                this.toasterService.success(`Product ${isNew ? 'created' : 'updated'} successfully`);
                this.router.navigate([`/e-commerce/product-list/${this.type}`]);
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

    addNewGrindVariant(productID, weightObj, resolve, reject) {
        delete weightObj.product_weight_variant_id;
        delete weightObj.fileDetails;
        weightObj.status = weightObj.status.toUpperCase();
        weightObj.grind_variants.forEach((ele) => {
            ele.id = undefined;
            ele.grind_variant_id = undefined;
        });
        this.eCommerceService.addProductWeightVariants(productID, weightObj, this.type).subscribe(
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
        delete weightObj.fileDetails;
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
                getVariant.patchValue({
                    roast_level: res.result.roast_level,
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
            harvest_year: '',
        });
        this.roasterService.getViewOrderDetails(this.roasterId, orderID).subscribe((res) => {
            if (res && res.result) {
                getVariant.patchValue({
                    origin: res.result.origin,
                    harvest_year: new Date(res.result.harvest_date),
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

    handleChangeBrewingMethod(event: any, index) {
        const variantForm = (this.productForm.get('variants') as FormArray).controls[index];
        if (!event.value) {
            variantForm.get('roaster_recommendation').clearValidators();
            variantForm.get('roaster_recommendation').setValue('');
        } else {
            variantForm
                .get('roaster_recommendation')
                .setValidators(Validators.compose([Validators.required, maxWordCountValidator(10)]));
            variantForm.get('roaster_recommendation').updateValueAndValidity();
        }
    }
}
