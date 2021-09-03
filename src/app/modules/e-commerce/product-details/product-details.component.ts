import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import * as moment from 'moment';
import { ECommerceService, AuthService, UserService } from '@services';
import { convert2Kg, convertKg, fileRequired, maxWordCountValidator } from '@utils';
import { COUNTRY_LIST } from '@constants';
import { DestroyableComponent } from '@base-components';
import { ApiResponse, Crate } from '@models';
import { ProductType } from '@enums';
import { VariantDetailsComponent } from '../variant-details/variant-details.component';
@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent extends DestroyableComponent implements OnInit {
    readonly ProductType = ProductType;
    breadCrumbItem: MenuItem[] = [];
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
    eligibleArray = [
        { label: 'One Time', value: 'one-time' },
        { label: 'Subscription', value: 'subscription' },
    ];
    brewingMethodArray = [
        { label: 'Pour Over', value: 'pour-over' },
        { label: 'Espresso', value: 'espresso' },
        { label: 'Coffeemaker', value: 'coffee-maker' },
        { label: 'French Press', value: 'french-press' },
        { label: 'AeroPress', value: 'aeropress' },
        { label: 'Moka Pot', value: 'mocha-pot' },
        { label: 'Chemix', value: 'chemex' },
        { label: 'Presskanna eller Chemex', value: 'Presskanna eller Chemex' },
        { label: 'None', value: '' },
    ];
    roastLevelArray = [
        { label: 'Light', value: 1 },
        { label: 'Light Medium', value: 2 },
        { label: 'Medium', value: 3 },
        { label: 'Medium Dark', value: 4 },
        { label: 'Dark', value: 5 },
    ];
    visibilityOptions = [
        { label: 'Public', value: true },
        { label: 'Private', value: false },
    ];
    boughtOnPlatformOptions = [
        { label: 'Yes', value: false },
        { label: 'No', value: true },
    ];
    productForm: FormGroup;
    roasterId: any = '';
    vatSettings: any = [];
    roastedBatches: any = [];
    productID: number;
    type: ProductType;
    variantTypeArray: any = [];
    @ViewChildren(VariantDetailsComponent) variantComponent: QueryList<VariantDetailsComponent>;
    currentVariant = 0;
    allCrates: Crate[] = [];
    productName: any = '';
    removedWeightVariants: any = [];
    flavoursList: any[];
    isPublished = false;
    thisYear = new Date().getFullYear();
    countryArray: any[] = COUNTRY_LIST;
    variantCnt = 0;
    isSetDefault = false;

    constructor(
        private authService: AuthService,
        private eCommerceService: ECommerceService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toasterService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
    ) {
        super();
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        const promises: any[] = [];
        this.route.paramMap.subscribe((params) => {
            if (params.has('type')) {
                this.type = params.get('type') as ProductType;
            }
            this.refreshProductForm();
            if (this.type === ProductType.b2c) {
                promises.push(new Promise((resolve, reject) => this.getFlavoursData(resolve, reject)));
            }
            if (params.has('id')) {
                this.productID = +params.get('id');
            } else {
                this.createTypeVariantArray();
            }
        });
        promises.push(new Promise((resolve, reject) => this.getVatData(resolve, reject)));
        promises.push(new Promise((resolve, reject) => this.getRoasterBatches(resolve, reject)));
        Promise.all(promises).then(() => {
            if (this.productID) {
                this.getProductDetails();
            }
        });

        this.supplyBreadCrumb();
        this.syncIsExternalProduct();
    }

    supplyBreadCrumb(productName?: string): void {
        this.breadCrumbItem = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('ecommerce') },
            {
                label: this.translator.instant(`${this.type}_product_catalog`),
                routerLink: `/e-commerce/product-list/${this.type}`,
            },
            { label: productName || this.translator.instant('add_product') },
        ];
    }

    refreshProductForm() {
        this.productForm = this.fb.group({
            name: [''],
            purchase_type: [''],
            description: [''],
            is_public: [false],
            is_variants_included: [false],
            variants: this.fb.array([this.createEmptyVariant()]),
            crates: this.fb.array([]),
            vat_setting_id: [null],
            is_price_including_vat: [this.type === ProductType.b2c],
            is_external_product: [false],
        });
        this.checkVarientForm();
    }

    // Enable validating when publish
    setValidators() {
        this.productForm.get('name').setValidators([Validators.required]);
        this.productForm.get('purchase_type').setValidators([Validators.required]);
        this.productForm.get('description').setValidators([Validators.required, maxWordCountValidator(300)]);
        this.productForm.get('vat_setting_id').setValidators([Validators.required]);
        Object.keys(this.productForm.controls).forEach((key) => {
            this.productForm.get(key).updateValueAndValidity();
        });

        (this.productForm.get('variants') as FormArray).controls.forEach((variantForm: FormGroup) => {
            variantForm.get('rc_batch_id').setValidators([Validators.required]);
            variantForm.get('roast_level').setValidators([Validators.required]);
            variantForm.get('body').setValidators([Validators.required]);
            variantForm.get('acidity').setValidators([Validators.required]);
            variantForm.get('aroma').setValidators([Validators.required]);
            variantForm.get('flavour').setValidators([Validators.required]);
            variantForm.get('processing').setValidators([Validators.required]);
            Object.keys(variantForm.controls).forEach((key) => {
                variantForm.get(key).updateValueAndValidity();
            });
        });

        this.variantComponent.forEach((child) => {
            child.setValidators();
        });
    }

    // Enable validating when publish
    clearValidators() {
        this.productForm.get('name').clearValidators();
        this.productForm.get('purchase_type').clearValidators();
        this.productForm.get('description').clearValidators();
        this.productForm.get('vat_setting_id').clearValidators();
        Object.keys(this.productForm.controls).forEach((key) => {
            this.productForm.get(key).updateValueAndValidity();
        });

        (this.productForm.get('variants') as FormArray).controls.forEach((variantForm: FormGroup) => {
            variantForm.get('rc_batch_id').clearValidators();
            variantForm.get('roast_level').clearValidators();
            variantForm.get('body').clearValidators();
            variantForm.get('acidity').clearValidators();
            variantForm.get('aroma').clearValidators();
            variantForm.get('flavour').clearValidators();
            variantForm.get('processing').clearValidators();
            Object.keys(variantForm.controls).forEach((key) => {
                variantForm.get(key).updateValueAndValidity();
            });
        });

        this.variantComponent.forEach((child) => {
            child.clearValidators();
        });
    }

    checkVarientForm() {
        const externalItems: AbstractControl[] = [];
        const internalItems: AbstractControl[] = [];
        (this.productForm.get('variants') as FormArray).controls.forEach((variantForm: FormGroup) => {
            externalItems.push(variantForm.get('roaster_ref_no'));
            externalItems.push(variantForm.get('roast_level'));
            externalItems.push(variantForm.get('estate_name'));
            externalItems.push(variantForm.get('origin'));
            externalItems.push(variantForm.get('region'));
            externalItems.push(variantForm.get('harvest_year'));
            externalItems.push(variantForm.get('body'));
            externalItems.push(variantForm.get('acidity'));
            externalItems.push(variantForm.get('aroma'));
            externalItems.push(variantForm.get('flavour'));
            externalItems.push(variantForm.get('processing'));
            externalItems.push(variantForm.get('roaster_notes'));

            internalItems.push(variantForm.get('rc_batch_id'));
        });
        externalItems.forEach((item) => {
            if (this.productForm.value.is_external_product) {
                item.enable();
            } else {
                item.disable();
            }
        });
        internalItems.forEach((item) => {
            if (this.productForm.value.is_external_product) {
                item.disable();
            } else {
                item.enable();
            }
        });
    }

    syncIsExternalProduct() {
        this.productForm
            .get('is_external_product')
            .valueChanges.pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((isExternal: boolean) => {
                setTimeout(() => this.checkVarientForm());
            });
    }

    getVatData(resolve, reject) {
        this.eCommerceService.getVatSettings().subscribe((res: ApiResponse<any>) => {
            if (res.success) {
                this.vatSettings = (res.result || []).map((ele) => {
                    return { label: ele.vat_percentage + '% ' + ele.transaction_type, value: ele.id };
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
                    this.roastedBatches = (res.result || []).map((item) => {
                        item.roast_batch_name = `Batch #${item.id} - ${item.roast_batch_name}`;
                        return item;
                    });
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
            (res: ApiResponse<any>) => {
                if (res.success && res.result) {
                    const productDetails = res.result;
                    this.variantCnt = Object.keys(res.result?.variants).length;
                    this.isPublished = !!res.result.is_published;
                    if (this.isPublished) {
                        this.setValidators();
                    }
                    this.isSetDefault = true;
                    this.supplyBreadCrumb(productDetails.name || 'NA');
                    this.productForm.patchValue({
                        name: productDetails.name,
                        purchase_type: productDetails.purchase_type,
                        description: productDetails.description,
                        is_public: productDetails.is_public,
                        is_variants_included: productDetails.is_variants_included,
                        vat_setting_id: productDetails.vat_setting_id || null,
                        is_price_including_vat: productDetails.is_price_including_vat,
                        is_external_product: this.type === ProductType.b2b ? false : productDetails.is_external_product,
                    });
                    this.productName = productDetails.name;
                    const variantsFormArray = this.productForm.get('variants') as FormArray;
                    variantsFormArray.removeAt(0);

                    this.allCrates = [];
                    for (const key of Object.keys(res.result.variants)) {
                        const getVariant = res.result.variants[key];
                        let coffeeBatchID = getVariant[0].weight_variants[0].rc_batch_id || null;
                        const getBatchDetails = this.roastedBatches.find((ele) => ele.id === coffeeBatchID);
                        if ((coffeeBatchID && !getBatchDetails) || productDetails.is_external_product) {
                            coffeeBatchID = null;
                        }
                        const variant: any = {
                            rc_batch_id: coffeeBatchID,
                            weight_variants: getVariant[0].weight_variants,
                            roaster_recommendation: getVariant[0].variant_details.roaster_recommendation ?? '',
                            brewing_method: getVariant[0].variant_details.brewing_method ?? '',
                            recipes: getVariant[0].variant_details.recipes ?? '',
                            variant_name: 'Variant ' + (variantsFormArray.length + 1),
                        };
                        if (getBatchDetails) {
                            this.roastedFields.forEach((ele) => {
                                if (ele === 'harvest_year') {
                                    variant[ele] = getBatchDetails.harvest_date || '';
                                } else if (ele === 'roast_time') {
                                    variant[ele] = getBatchDetails.roast_duration;
                                } else if (ele === 'flavour_profiles') {
                                    variant[ele] = getBatchDetails.flavour_profile;
                                } else {
                                    variant[ele] = getBatchDetails[ele] || '';
                                }
                            });
                        }
                        if (productDetails.is_external_product) {
                            for (const ele of this.roastedFields) {
                                let getValue;
                                if (ele === 'flavour_profiles') {
                                    if (getVariant[0].variant_details.flavour_profile) {
                                        getValue = getVariant[0].variant_details.flavour_profile
                                            .split(',')
                                            .map((item) => +item);
                                        getValue = this.flavoursList.filter((item) =>
                                            getValue.includes(item.flavour_profile_id),
                                        );
                                    }
                                    variant.external_flavour_profiles = getValue || [];
                                } else {
                                    variant[ele] = getVariant[0].variant_details[ele] ?? '';
                                }
                            }
                        }
                        variant.harvest_year =
                            variant.harvest_year && moment(variant.harvest_year).isValid()
                                ? new Date(variant.harvest_year)
                                : null;

                        const variantForm = this.createEmptyVariant(productDetails.is_external_product);
                        variantForm.patchValue(variant);
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
                                    getCrate.weight = convertKg(getCrate.weight, getCrate.crate_unit);
                                    this.allCrates.push(getCrate);
                                }
                            }
                            ele.weight = convertKg(ele.weight, ele.weight_unit);
                        });
                        variantForm.patchValue({ weight_variants: weightVariants });
                        variantsFormArray.push(variantForm);
                    }

                    if (!productDetails.is_external_product) {
                        const crateFormArray = this.productForm.get('crates') as FormArray;
                        if (productDetails.crates?.length) {
                            crateFormArray.removeAt(0);
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
                                    crateFormArray.push(crateForm);
                                }
                            }
                        }
                    }
                    this.createTypeVariantArray();
                    this.checkVarientForm();
                }
            },
            (err) => {
                this.toasterService.error('Error while getting product details');
            },
        );
    }

    addNewVariants(): void {
        const variantsFormArray = this.productForm.get('variants') as FormArray;
        variantsFormArray.push(this.createEmptyVariant(this.productForm.value.is_external_product));
        this.createTypeVariantArray();
        this.checkVarientForm();
        setTimeout(() => {
            this.currentVariant = variantsFormArray.length - 1;
        }, 0);
    }

    removeVariant(index: any) {
        const variantsFormArray = this.productForm.get('variants') as FormArray;
        if (index === this.currentVariant) {
            this.currentVariant = index === 0 ? variantsFormArray.length - 1 : 0;
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
            variantsFormArray.removeAt(index);
            variantTypeArray.splice(index, 1);
            this.variantTypeArray = variantTypeArray;
        }, 200);
    }

    onBatchChange(idx) {
        const variantsFormArray = this.productForm.get('variants') as FormArray;
        const getVariant: any = variantsFormArray.controls[idx];
        if (getVariant && getVariant.value) {
            const selectedID = getVariant.value.rc_batch_id;
            const getBatchDetails = this.roastedBatches.find((ele) => ele.id === selectedID);
            if (getBatchDetails) {
                this.roastedFields.forEach((ele) => {
                    const getValue = getBatchDetails[ele] ? getBatchDetails[ele] : '';
                    getVariant.controls[ele].setValue(getValue);
                });
                getVariant.patchValue({
                    flavour_profiles: getBatchDetails.flavour_profile,
                    roast_time: getBatchDetails.roast_duration,
                    harvest_year: new Date(getBatchDetails.harvest_date),
                });
            }
        }
    }

    createEmptyVariant(isExternalProduct?: boolean) {
        this.variantCnt++;
        return this.fb.group({
            rc_batch_id: [null, Validators.compose(this.isPublished ? [Validators.required] : [])],
            variant_name: 'Variant ' + this.variantCnt,
            roaster_ref_no: '',
            batch_ref_no: { value: '', disabled: true },
            roasting_profile_name: { value: '', disabled: true },
            roast_level: [null, Validators.compose(this.isPublished ? [Validators.required] : [])],
            roast_time: { value: '', disabled: true },
            estate_name: '',
            origin: '',
            region: '',
            harvest_year: null,
            body: ['', Validators.compose(this.isPublished ? [Validators.required] : [])],
            acidity: ['', Validators.compose(this.isPublished ? [Validators.required] : [])],
            aroma: ['', Validators.compose(this.isPublished ? [Validators.required] : [])],
            flavour: ['', Validators.compose(this.isPublished ? [Validators.required] : [])],
            processing: ['', Validators.compose(isExternalProduct && this.isPublished ? [Validators.required] : [])],
            flavour_profiles: [],
            external_flavour_profiles: [],
            roaster_notes: ['', Validators.compose(this.isPublished ? [maxWordCountValidator(300)] : [])],
            recipes: ['', Validators.compose(this.isPublished ? [maxWordCountValidator(300)] : [])],
            brewing_method: '',
            roaster_recommendation: ['', Validators.compose(this.isPublished ? [maxWordCountValidator(10)] : [])],
            remaining_quantity: { value: '', disabled: true },
            weight_variants: [],
        });
    }

    createEmptyCrate() {
        return this.fb.group({
            id: '',
            weight: [0, Validators.compose(!this.isPublished ? [] : [Validators.required])],
            crate_unit: 'lb',
            boxField: '1 box',
            weight_name: '0 lb',
            product_weight_variant_id: '',
            crate_capacity: [0, Validators.compose(!this.isPublished ? [] : [Validators.required])],
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
        const crateFormArray = this.productForm.get('crates') as FormArray;
        if (canRemove) {
            crateFormArray.removeAt(
                crateFormArray.value.findIndex((ix) => ix.product_weight_variant_id === event.productWeightVariantId),
            );
        }
        if (!event.isNew) {
            this.removedWeightVariants.push(event.productWeightVariantId);
        }
    }

    onWeightCreate(event) {
        if (this.type === ProductType.b2b) {
            const crateFormArray = this.productForm.get('crates') as FormArray;
            const sameItems = crateFormArray.value.filter(
                (ix) => ix.weight === event.value && ix.crate_unit === event.unit,
            );
            const existingItem = crateFormArray.value.find(
                (ix) => ix.product_weight_variant_id === event.product_weight_variant_id,
            );
            if (!sameItems?.length && !existingItem) {
                const getCrate = this.createEmptyCrate();
                getCrate.patchValue({
                    weight: event.value || 0,
                    crate_unit: event.unit,
                    weight_name: `${event.value || 0} ${event.unit}`,
                    product_weight_variant_id: event.product_weight_variant_id,
                    variant_name: event.variant_name,
                });
                crateFormArray.push(getCrate);
            }

            if (event.modify && existingItem) {
                const indexValue = crateFormArray.value.indexOf(existingItem);
                if (
                    sameItems?.length &&
                    sameItems.find((ix) => ix.product_weight_variant_id !== event.product_weight_variant_id)
                ) {
                    crateFormArray.removeAt(indexValue);
                } else {
                    crateFormArray.controls[indexValue].patchValue({
                        crate_unit: event.unit,
                        weight: event.value || 0,
                        weight_name: `${event.value || 0} ${event.unit}`,
                    });
                }
            }
        }
    }

    saveAsDraft() {
        this.productForm.controls.is_public.setValue(false);
        this.clearValidators();
        this.onSave();
    }

    publishProduct() {
        this.productForm.controls.is_public.setValue(true);
        this.setValidators();
        this.onSave();
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
                return returnFlag;
            }
        });
        return returnFlag;
    }

    onSave(): void {
        if (!this.validateForms()) {
            this.productForm.markAllAsTouched();
            this.variantComponent.forEach((child) => {
                child.markAllAsTouched();
            });
            this.toasterService.error('Please fill all Data and upload feature image.');
            return;
        }

        // First have to upload all product images
        this.uploadImages();
    }

    uploadImages() {
        const promises = [];
        this.variantComponent.forEach((child) => {
            promises.push(new Promise((resolve, reject) => child.uploadImages(resolve, reject)));
        });

        Promise.all(promises)
            .then(() => {
                Promise.all(promises)
                    .then(() => {
                        this.saveProduct();
                    })
                    .catch(() => {
                        this.toasterService.error('Error while uploading images');
                    });
            })
            .catch(() => {});
    }

    saveProduct() {
        const productObj = JSON.parse(JSON.stringify(this.productForm.value));
        delete productObj.variants;
        for (const key of Object.keys(productObj)) {
            if (!productObj[key]) {
                delete productObj[key];
            }
        }
        if (this.type === ProductType.b2b) {
            const crates: Crate[] = productObj.crates || [];
            // productObj.crates = crates
            // Anastasia will solve this once https://www.bugherd.com/projects/234279/tasks/816 is solved
            productObj.crates = (this.allCrates || [])
                .filter((ix) => !crates.find((iy) => iy.weight === ix.weight && iy.crate_unit === ix.crate_unit))
                .concat(crates)
                .filter((ix) => ix.weight)
                .map((item) => {
                    return {
                        weight: convert2Kg(item.weight, item.crate_unit),
                        crate_unit: item.crate_unit,
                        crate_capacity: item.crate_capacity,
                    };
                });
        } else {
            delete productObj.crates;
        }
        if (this.productID) {
            this.updateProductDetails(productObj);
        } else {
            this.createNewProduct(productObj);
        }
    }

    createNewProduct(productObj) {
        this.eCommerceService.addProductDetails(productObj, this.type).subscribe(
            (res: ApiResponse<any>) => {
                if (res && res.success) {
                    this.productID = res.result.id;
                    this.grindVariantsDetails(true);
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
        this.eCommerceService.updateProductDetails(this.productID, productObj, this.type).subscribe(
            (res) => {
                if (res && res.success) {
                    this.grindVariantsDetails(false);
                } else {
                    this.toasterService.error('Error while update a Product');
                }
            },
            (err) => {
                this.toasterService.error('Error while update a Product');
            },
        );
    }

    grindVariantsDetails(isNew) {
        const promises: any[] = [];
        let includeDefault = false;
        for (const variantComponet of this.variantComponent) {
            if (includeDefault) {
                break;
            }
            const getWeightArray = variantComponet.weightForm.value.weights;
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
                weightObj.featured_image_id = weight.featured_image_id?.image_id ?? undefined;
                weightObj.product_images = weightObj.product_images
                    .filter((item) => item?.image_id)
                    .map((item) => item.image_id);
                weightObj.status =
                    weightObj.status === 'IN-DRAFT' && this.productForm.value.is_public ? 'IN-STOCK' : weightObj.status;
                weightObj.variant_id = childIndex + 1;
                if (!!getVariantDetails.rc_batch_id && !this.productForm.value.is_external_product) {
                    weightObj.rc_batch_id = getVariantDetails.rc_batch_id;
                } else {
                    delete weightObj.rc_batch_id;
                }
                weightObj.is_public = !weight.is_public;
                weightObj.weight = convert2Kg(weightObj.weight, weightObj.weight_unit);

                const weightVariantID = weight.product_weight_variant_id ? weight.product_weight_variant_id : false;
                weightObj.variant_details = {
                    brewing_method: getVariantDetails.brewing_method,
                    roaster_recommendation: getVariantDetails.roaster_recommendation,
                    recipes: getVariantDetails.recipes,
                };
                if (this.type === ProductType.b2c) {
                    if (this.productForm.value.is_external_product) {
                        weightObj.variant_details.flavour_profiles = (
                            getVariantDetails.external_flavour_profiles || []
                        ).map((item) => item.flavour_profile_id ?? item);
                    } else {
                        weightObj.variant_details.flavour_profiles = getVariantDetails.flavour_profiles?.map(
                            (item) => item.flavour_profile_id ?? item,
                        );
                    }
                    weightObj.variant_details.processing = getVariantDetails.processing;
                    weightObj.variant_details.body = getVariantDetails.body || 0;
                    weightObj.variant_details.acidity = getVariantDetails.acidity || 0;
                    weightObj.variant_details.aroma = getVariantDetails.aroma || 0;
                    weightObj.variant_details.flavour = getVariantDetails.flavour || 0;
                    weightObj.variant_details.roaster_ref_no = getVariantDetails.roaster_ref_no;
                    weightObj.variant_details.estate_name = getVariantDetails.estate_name;
                    weightObj.variant_details.origin = getVariantDetails.origin;
                    weightObj.variant_details.region = getVariantDetails.region;
                    weightObj.variant_details.roaster_notes = getVariantDetails.roaster_notes;
                    weightObj.variant_details.roast_level = getVariantDetails.roast_level;
                    weightObj.variant_details.harvest_year = getVariantDetails.harvest_year
                        ? moment(getVariantDetails.harvest_year).format('yyyy-MM-DD')
                        : null;
                }
                const grindVariants: any = [];
                for (const grind of weightObj.grind_variants) {
                    if (grind.available_quantity && grind.sku_number) {
                        if (!grind.grind_variant_id) {
                            delete grind.grind_variant_id;
                        }
                        grindVariants.push(grind);
                    }
                }
                weightObj.grind_variants = grindVariants;
                delete weightObj.product_weight_variant_id;
                delete weightObj.fileDetails;
                weightObj.status = weightObj.status.toUpperCase();
                weightObj.is_public = !weightObj.is_hide;
                delete weightObj.is_hide;
                weightObj.grind_variants.map((ele) => {
                    ele.id = ele.grind_variant_id ? ele.grind_variant_id : undefined;
                    ele.grind_variant_id = ele.grind_variant_id ? ele.grind_variant_id : undefined;
                });
                for (const key of Object.keys(weightObj)) {
                    if (!weightObj[key]) {
                        delete weightObj[key];
                    }
                }

                if (weight.isNew) {
                    promises.push(
                        new Promise((resolve, reject) => {
                            this.addNewGrindVariant(this.productID, weightObj, resolve, reject);
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
                    this.deleteWeightVariant(this.productID, weightVariant, resolve, reject);
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

    addNewGrindVariant(productID, weightObj, resolve, reject) {
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

    createTypeVariantArray() {
        const variantTypeArray = [];
        const variant = this.productForm.get('variants') as FormArray;
        variant.value.forEach((ele, index) => {
            variantTypeArray.push({ label: ele.variant_name, value: index });
        });
        variantTypeArray.push({ label: '', value: 'button' });
        this.variantTypeArray = variantTypeArray;
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

    get isExternalFlag() {
        return !!this.productForm?.value?.is_external_product;
    }

    onChangeSetDefault(value) {
        this.isSetDefault = value.checked;
    }

    getFlavourName(id) {
        const flavour = this.flavoursList.find((item) => item.flavour_profile_id === id);
        return flavour.flavour_profile_name;
    }
}
