import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from '@app/shared';
import { ResizeableComponent } from '@base-components';
import { BREWING_METHOD_ITEMS, COUNTRY_LIST, PRODUCT_STATUS_ITEMS } from '@constants';
import { FileModule, ProductStatus, ProductType, QuantityUnit } from '@enums';
import { ApiResponse, RoastingProfile } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, FileService, GeneralService, InventoryService, ResizeService } from '@services';
import {
    convert2Kg,
    convertKg,
    fileRequired,
    maxWordCountValidator,
    quantityMinValidator,
    toSentenceCase,
} from '@utils';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent extends ResizeableComponent implements OnInit {
    readonly ProductType = ProductType;
    readonly BREWING_METHOD_ITEMS = [...BREWING_METHOD_ITEMS, { label: 'None', value: '' }];
    breadCrumbItem: MenuItem[] = [];
    eligibleArray = [
        { label: 'One time', value: 'one-time' },
        { label: 'Subscription', value: 'subscription' },
        { label: 'Both', value: 'both' },
    ];
    roastLevelArray: any[];
    visibilityOptions = [
        { label: 'Public', value: true },
        { label: 'Private', value: false },
    ];
    boughtOnPlatformOptions = [
        { label: 'Yes', value: false },
        { label: 'No', value: true },
    ];
    weightTypeArray = [
        { label: 'lb', value: 'lb' },
        { label: 'kg', value: 'kg' },
        { label: 'g', value: 'g' },
    ];
    statusArray = PRODUCT_STATUS_ITEMS.filter((item) => item.value !== ProductStatus.INDRAFT);
    grindArray = [
        { label: 'Whole beans', value: 'whole-beans' },
        { label: 'Extra coarse', value: 'extra-coarse' },
        { label: 'Coarse', value: 'coarse' },
        { label: 'Medium coarse', value: 'medium-coarse' },
        { label: 'Medium', value: 'medium' },
        { label: 'Fine', value: 'fine' },
        { label: 'Extra fine', value: 'extra-fine' },
    ];
    productForm: FormGroup;
    vatSettings: any = [];
    roastedBatches: any = [];
    productID: number;
    type: ProductType;
    currentVariantIdx = 0;
    productName: any = '';
    flavoursList: any[];
    roastingProfileArray: RoastingProfile[] = [];
    isPublished = false;
    countryArray: any[] = COUNTRY_LIST;
    isLoading = true;
    isSubmitted = false;
    baseCurrency: string;
    grindFields = [
        { label: 'grind', field: 'id', width: 14 },
        { label: 'weight', field: 'weight', width: 10 },
        { label: 'roasted_coffee_batch', field: 'roasted_coffee_batch', width: 20 },
        { label: 'roast_level', field: 'roast_level_id', width: 20 },
        { label: 'grind_level', field: 'grind', width: 15 },
        { label: 'price', field: 'price', width: 15 },
        { label: 'remaining_quantity', field: 'remaining_quantity', width: 16 },
        { label: 'actions', field: 'actions', width: 10 },
    ];

    get isExternal() {
        return !!this.productForm?.value?.is_external_product;
    }

    constructor(
        private authService: AuthService,
        private cdr: ChangeDetectorRef,
        private dialogService: DialogService,
        private fb: FormBuilder,
        private fileService: FileService,
        private generalService: GeneralService,
        private inventorySrv: InventoryService,
        private route: ActivatedRoute,
        private router: Router,
        private toasterService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        const promises: any[] = [];
        this.route.paramMap.subscribe((params) => {
            if (params.has('type')) {
                this.type = params.get('type') as ProductType;
            }
            this.createProductForm();
            if (params.has('id')) {
                this.productID = +params.get('id');
            }
        });
        promises.push(new Promise((resolve, reject) => this.getFlavoursData(resolve, reject)));
        promises.push(new Promise((resolve, reject) => this.getVatData(resolve, reject)));
        promises.push(new Promise((resolve, reject) => this.getRoasterBatches(resolve, reject)));
        promises.push(new Promise((resolve, reject) => this.getRoastingProfiles(resolve, reject)));
        promises.push(new Promise((resolve, reject) => this.getRoastLevels(resolve, reject)));
        Promise.all(promises).then(() => {
            if (this.productID) {
                this.getProductDetails();
            }
        });
        if (!this.productID) {
            this.isLoading = false;
        }

        this.supplyBreadCrumb();
        if (this.type === ProductType.b2c) {
            this.syncIsExternalProduct();
        }
        this.authService.organizationSubject.subscribe((res) => {
            this.baseCurrency = res?.base_currency;
        });
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

    syncIsExternalProduct() {
        this.productForm
            .get('is_external_product')
            .valueChanges.pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(() => {
                setTimeout(() => this.checkGrindForm());
            });
    }

    // Basic data

    getVatData(resolve, reject) {
        this.inventorySrv.getVatSettings().subscribe((res) => {
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
        this.inventorySrv.getRoastedBatches({ per_page: 10000 }).subscribe((res) => {
            if (res.success) {
                this.roastedBatches = (res.result || []).map((item) => {
                    item.name = `Batch #${item.id} - ${item.name}`;
                    return item;
                });
                resolve();
            } else {
                reject();
            }
        });
    }

    getFlavoursData(resolve, reject) {
        this.generalService.getFlavourProfile().subscribe((data) => {
            if (data.success) {
                this.flavoursList = data.result.map((item) => {
                    return { label: item.name, value: item.id };
                });
                resolve();
            } else {
                reject();
            }
        });
    }

    getRoastLevels(resolve, reject) {
        this.generalService.getRoastLevels().subscribe((res) => {
            if (res.success) {
                this.roastLevelArray = (res.result || []).map((ix) => ({
                    label: toSentenceCase(ix.name),
                    value: ix.id,
                }));
                resolve();
            } else {
                resolve();
            }
        });
    }

    getRoastingProfiles(resolve, reject) {
        this.inventorySrv.getRoastingProfiles().subscribe((data) => {
            if (data.success) {
                this.roastingProfileArray = data.result || [];
                resolve();
            } else {
                reject();
            }
        });
    }

    getProductDetails() {
        this.isLoading = true;
        this.inventorySrv.getProduct(this.productID).subscribe(
            (res) => {
                if (res.success && res.result) {
                    const productDetails = res.result;
                    console.log('productDetails', productDetails);
                    this.isPublished = !!res.result.is_published;
                    this.supplyBreadCrumb(productDetails.name || 'NA');
                    this.productForm.patchValue({
                        name: productDetails.name,
                        purchase_type: productDetails.purchase_type,
                        description: productDetails.description,
                        is_public: productDetails.is_public,
                        vat_setting_id: productDetails.vat_setting_id || null,
                        is_price_including_vat: productDetails.is_price_including_vat,
                        is_external_product: this.type === ProductType.b2b ? false : productDetails.is_external_product,
                    });
                    this.productName = productDetails.name;

                    const weightFormArr = this.productForm.get('weightVariants') as FormArray;
                    if (res.result.weight_variants?.length) {
                        // Remove empty weight variant form for the new product
                        weightFormArr.removeAt(0);
                    }
                    (res.result.weight_variants || []).forEach((weightVariant: any) => {
                        const weightForm = this.createWeightForm(this.isPublished);
                        weightForm.patchValue({
                            ...weightVariant,
                            weight: convertKg(weightVariant.weight, weightVariant.weight_unit),
                            featured_image_id: weightVariant.featured_image,
                            images: weightVariant.images || [],
                            grind_variants: [], // To prevent pre-patch
                        });

                        const grindFormList = weightForm.get('grind_variants') as FormArray;
                        (weightVariant.grind_variants || []).forEach((grindVariant) => {
                            const grindForm = this.creatGrindForm(this.isPublished);
                            grindForm.patchValue({
                                ...grindVariant,
                                grind_variant_id: grindVariant.id,
                                harvest_year: grindVariant.harvest_year
                                    ? moment(grindVariant.harvest_year).toDate()
                                    : null,
                                flavour_profiles: (grindVariant.flavour_profiles || []).map((item) => {
                                    return {
                                        label: this.flavoursList.find((ix) => ix.value === item)?.label,
                                        value: item,
                                    };
                                }),
                            });
                            this.saveOriginalData(grindForm);
                            // Fetch roasted batch details
                            if (!this.isExternal) {
                                this.onBatchChange(grindForm, true);
                            }
                            grindFormList.push(grindForm);
                        });

                        this.saveOriginalData(weightForm);
                        weightFormArr.push(weightForm);
                        this.checkWeightForm(weightForm);
                    });

                    if (this.isPublished) {
                        this.setProductValidators();
                    }
                    this.checkGrindForm();
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            (err) => {
                this.toasterService.error('Error while getting product details');
            },
        );
    }

    // Weight variant

    onChangeWeightTab() {
        (this.productForm.get('weightVariants') as FormArray).controls.forEach((weightForm: FormGroup) => {
            (weightForm.get('grind_variants') as FormArray).controls.forEach((grindForm: FormGroup) => {
                // Disable edit mode for all grind forms
                this.onCancelGrind(grindForm);
            });
            // Disable edit mode for all weight forms
            this.onCancelWeight(weightForm);
        });
    }

    createWeightForm(isPublic = false, editable = false): FormGroup {
        const weightForm: FormGroup = this.fb.group({
            editable: [editable], // Form is editable or not
            originalData: { value: null, disabled: true }, // To save original data
            id: null,
            weight: [0],
            weight_unit: QuantityUnit.g,
            status: [this.isPublished ? ProductStatus.INSTOCK : ProductStatus.INDRAFT],
            featured_image_id: [null],
            images: this.fb.array([]),
            grind_variants: this.fb.array([]),
        });
        if (this.type === ProductType.b2b) {
            weightForm.addControl('crate_capacity', new FormControl(null));
        }
        const productImages = weightForm.get('images') as FormArray;
        for (let i = 0; i < 3; i++) {
            productImages.push(new FormControl(null));
        }
        if (isPublic) {
            this.setWeightValidators(weightForm);
        }
        return weightForm;
    }

    setWeightValidators(weightForm: FormGroup) {
        weightForm.get('weight').setValidators([Validators.required, Validators.min(1)]);
        weightForm.get('featured_image_id').setValidators([fileRequired()]);
        weightForm.get('crate_capacity')?.setValidators([Validators.required, Validators.min(1)]);
        Object.keys(weightForm.controls).forEach((key) => {
            weightForm.get(key).updateValueAndValidity();
        });

        (weightForm.get('grind_variants') as FormArray).controls.forEach((grindForm: FormGroup) => {
            this.setGrindValidators(grindForm);
        });
    }

    clearWeightValidators(weightForm: FormGroup) {
        weightForm.get('weight').clearValidators();
        weightForm.get('featured_image_id').clearValidators();
        weightForm.get('crate_capacity')?.clearValidators();
        Object.keys(weightForm.controls).forEach((key) => {
            weightForm.get(key).updateValueAndValidity();
        });

        (weightForm.get('grind_variants') as FormArray).controls.forEach((grindForm: FormGroup) => {
            this.clearGrindValidators(grindForm);
        });
    }

    checkWeightForm(weightForm: FormGroup): void {
        const grinds = (weightForm.get('grind_variants').value || []).filter((ix) => !!ix.grind_variant_id);
        // Should not be able to edit crate capacity if there is grind variants
        if (grinds.length) {
            weightForm.get('weight')?.disable();
            weightForm.get('weight_unit')?.disable();
            weightForm.get('crate_capacity')?.disable();
        }
    }

    get editWeightMode(): boolean {
        const weightFormArr = this.productForm.get('weightVariants') as FormArray;
        return !!weightFormArr.controls.find((fg) => fg.value.editable);
    }

    addWeightVariant() {
        const weightFormArr = this.productForm.get('weightVariants') as FormArray;
        weightFormArr.controls.forEach((fg: FormGroup) => {
            this.onCancelWeight(fg);
        });
        weightFormArr.push(this.createWeightForm(this.isPublished, true));
        setTimeout(() => {
            this.currentVariantIdx = weightFormArr.length - 1;
            this.cdr.detectChanges();
        }, 0);
    }

    removeWeightVariant(weightForm: FormGroup, index: number = null) {
        const weightFormArr = weightForm.parent as FormArray;
        if (index === null) {
            index = weightFormArr.controls.findIndex((item) => item.value.id === weightForm.value.id);
        }
        setTimeout(() => {
            weightFormArr.removeAt(index);
            if (index === this.currentVariantIdx) {
                this.currentVariantIdx = index === 0 ? weightFormArr.length - 1 : 0;
            }
            this.cdr.detectChanges();
        }, 0);
    }

    editWeight(weightForm: FormGroup) {
        const weightFormArr = weightForm.parent as FormArray;
        weightFormArr.controls.forEach((fg: FormGroup) => {
            this.onCancelWeight(fg);
        });
        weightForm.get('editable').setValue(true);
        this.cdr.detectChanges();
    }

    onCancelWeight(weightForm: FormGroup) {
        if (weightForm.getRawValue().editable) {
            if (weightForm.value.id) {
                this.loadOriginalData(weightForm);
                weightForm.get('editable').setValue(false);
            } else {
                // Have to remove weight form for the new weight item which is not saved
                this.removeWeightVariant(weightForm);
            }
        }
    }

    onChangeImage() {
        this.cdr.detectChanges();
    }

    onSaveWeightVariant(weightForm: FormGroup) {
        if (!this.productID) {
            this.toasterService.error(this.translator.instant('please_save_product_details_first'));
            return;
        }
        if (!weightForm.valid) {
            weightForm.markAllAsTouched();
            this.toasterService.error(this.translator.instant('please_check_form_data'));
            return;
        }

        // First have to upload all product images
        this.isSubmitted = true;
        new Promise((resolve, reject) => this.uploadImages(weightForm, resolve, reject))
            .then(() => {
                const postData = {
                    ...weightForm.value,
                    weight: convert2Kg(weightForm.getRawValue().weight, weightForm.getRawValue().weight_unit),
                    weight_unit: weightForm.getRawValue().weight_unit,
                    featured_image_id: weightForm.value.featured_image_id?.id,
                    images: weightForm.value.images.filter((element) => element?.id).map((element) => element.id),
                };

                if (this.type === ProductType.b2b) {
                    postData.crate_capacity = weightForm.get('crate_capacity').value;
                }
                delete postData.grind_variants;
                if (weightForm.value.id) {
                    this.updateWeightVariant(postData, weightForm);
                } else {
                    this.createWeightVariant(postData, weightForm);
                }
            })
            .catch((err) => {
                this.toasterService.error('Error while uploading images');
                this.isSubmitted = true;
                this.cdr.detectChanges();
            });
    }

    uploadImages(weightForm: FormGroup, pResolve, pReject) {
        const promises: any[] = [];
        const featuredControl: FormControl = weightForm.get('featured_image_id') as FormControl;
        if (featuredControl.value?.file) {
            promises.push(
                new Promise((resolve, reject) => {
                    this.uploadImage(featuredControl, resolve, reject);
                }),
            );
        }
        if (featuredControl.value?.image_id && (!featuredControl.value?.image_url || featuredControl.value?.file)) {
            featuredControl.setValue({ ...featuredControl.value, image_id: null });
        }
        (weightForm.get('images') as FormArray).controls.forEach((imageControl: FormControl) => {
            if (imageControl.value?.file) {
                promises.push(
                    new Promise((resolve, reject) => {
                        this.uploadImage(imageControl, resolve, reject);
                    }),
                );
            }
            if (imageControl.value?.id && (!imageControl.value?.url || imageControl.value?.file)) {
                imageControl.setValue({ ...imageControl.value, id: null });
            }
        });

        Promise.all(promises)
            .then(() => pResolve())
            .catch(() => pReject());
    }

    uploadImage(formControl: AbstractControl, resolve, reject) {
        const file = formControl.value.file;
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('name', file.name);
        formData.append('file_module', FileModule.Product);

        this.fileService.uploadFiles(formData).subscribe((uploadedFile) => {
            if (uploadedFile.success) {
                formControl.setValue({ id: uploadedFile.result.id, url: uploadedFile.result.url });
                resolve();
            } else {
                this.toasterService.error('Error while uploading image.');
                reject();
            }
        });
    }

    createWeightVariant(postData: any, weightForm: FormGroup) {
        this.isSubmitted = true;
        this.inventorySrv.createWeightVariant(this.productID, postData).subscribe((res) => {
            if (res.success) {
                this.toasterService.success('Weight variant created successfully');
                weightForm.patchValue({ id: res.result.id, editable: false });
                this.saveOriginalData(weightForm);
            }
            this.isSubmitted = false;
            this.cdr.detectChanges();
        });
    }

    updateWeightVariant(postData: any, weightForm: FormGroup) {
        this.isSubmitted = true;
        this.inventorySrv.updateWeightVariant(this.productID, postData.id, postData).subscribe((res) => {
            if (res.success) {
                this.toasterService.success('Weight variant updated successfully');
                weightForm.get('editable').setValue(false);
                this.saveOriginalData(weightForm);
            }
            this.isSubmitted = false;
            this.cdr.detectChanges();
        });
    }

    deleteWeightVariant(weightForm: FormGroup, index: number) {
        if (weightForm.value.id) {
            this.dialogService
                .open(ConfirmComponent, {
                    data: {
                        type: 'delete',
                        desp: this.translator.instant('confirm_delete_weight_variant_desp'),
                    },
                })
                .onClose.subscribe((action: any) => {
                    if (action === 'yes') {
                        this.inventorySrv.deleteWeightVariant(this.productID, weightForm.value.id).subscribe(
                            (res) => {
                                if (res.success) {
                                    this.toasterService.success('Weight variant deleted successfully');
                                    this.removeWeightVariant(weightForm);
                                } else {
                                    this.toasterService.error('Error while deleting weight variant');
                                }
                            },
                            (err) => {
                                this.toasterService.error('Error while deleting weight variant');
                            },
                        );
                    }
                });
        } else {
            this.removeWeightVariant(weightForm, index);
        }
    }

    // Grind variant

    creatGrindForm(isPublic = false, editable = false): FormGroup {
        // editable should be true when we add new grind
        const grindForm = this.fb.group({
            // Main fields
            editable: [editable], // Form is editable or not
            originalData: { value: null, disabled: true }, // To save original data
            grind_variant_id: '',
            grind: [null],
            price: [0],
            available_quantity: [0],
            available_quantity_type: this.type === 'b2b' ? 'boxes' : 'bags',
            sku_number: [''],
            is_default_variant: [false],
            // Common fields which should be disabled for internal products
            roast_level_id: [{ value: null, disabled: true }],
            estate_name: [{ value: '', disabled: true }],
            origin: [{ value: '', disabled: true }],
            flavour_profiles: [{ value: '', disabled: true }],
            // Internal fields
            rc_batch_id: [{ value: null, disabled: true }],
            rc_batch_name: { value: '', disabled: true }, // Need onlyto show
            batch_ref_no: { value: '', disabled: true },
            remaining_quantity: { value: '', disabled: true }, // Need onlyto show
            quantity_unit: { value: '', disabled: true }, // Need onlyto show
            // External fields
            roaster_ref_no: [{ value: '', disabled: true }],
            region: [{ value: '', disabled: true }],
            harvest_year: [{ value: null, disabled: true }],
            aroma: [{ value: null, disabled: true }],
            acidity: [{ value: null, disabled: true }],
            body: [{ value: null, disabled: true }],
            flavour: [{ value: null, disabled: true }],
            processing: [{ value: null, disabled: true }],
            roaster_notes: [{ value: '', disabled: true }],
            recipes: [{ value: '', disabled: true }],
            brewing_method: [{ value: null, disabled: true }],
            recommendation_text: [{ value: '', disabled: true }],
        });
        if (isPublic) {
            this.setGrindValidators(grindForm);
        }
        return grindForm;
    }

    setGrindValidators(grindForm: FormGroup) {
        grindForm.get('grind').setValidators([Validators.required]);
        grindForm.get('price').setValidators([Validators.required, Validators.min(1)]);
        grindForm.get('available_quantity').setValidators([Validators.required, Validators.min(1)]);
        grindForm.get('sku_number').setValidators([Validators.required]);
        grindForm.get('roast_level_id').setValidators([Validators.required]);
        grindForm.get('rc_batch_id').setValidators([Validators.required]);
        grindForm.get('aroma').setValidators([Validators.required]);
        grindForm.get('acidity').setValidators([Validators.required]);
        grindForm.get('body').setValidators([Validators.required]);
        grindForm.get('flavour').setValidators([Validators.required]);
        grindForm.get('processing').setValidators([Validators.required]);
        grindForm.get('recommendation_text').setValidators([Validators.required]);
        Object.keys(grindForm.controls).forEach((key) => {
            grindForm.get(key).updateValueAndValidity();
        });
    }

    clearGrindValidators(grindForm: FormGroup) {
        grindForm.get('grind').clearValidators();
        grindForm.get('price').clearValidators();
        grindForm.get('available_quantity').clearValidators();
        grindForm.get('sku_number').clearValidators();
        grindForm.get('roast_level_id').clearValidators();
        grindForm.get('rc_batch_id').clearValidators();
        grindForm.get('aroma').clearValidators();
        grindForm.get('acidity').clearValidators();
        grindForm.get('body').clearValidators();
        grindForm.get('flavour').clearValidators();
        grindForm.get('processing').clearValidators();
        grindForm.get('recommendation_text').clearValidators();
        Object.keys(grindForm.controls).forEach((key) => {
            grindForm.get(key).updateValueAndValidity();
        });
    }

    checkGrindForm() {
        const externalItems: AbstractControl[] = [];
        const internalItems: AbstractControl[] = [];
        (this.productForm.get('weightVariants') as FormArray).controls.forEach((weightForm: FormGroup) => {
            (weightForm.get('grind_variants') as FormArray).controls.forEach((grindForm: FormGroup) => {
                externalItems.push(grindForm.get('roast_level_id'));
                externalItems.push(grindForm.get('estate_name'));
                externalItems.push(grindForm.get('origin'));
                externalItems.push(grindForm.get('flavour_profiles'));
                externalItems.push(grindForm.get('roaster_ref_no'));
                externalItems.push(grindForm.get('region'));
                externalItems.push(grindForm.get('harvest_year'));
                externalItems.push(grindForm.get('aroma'));
                externalItems.push(grindForm.get('acidity'));
                externalItems.push(grindForm.get('body'));
                externalItems.push(grindForm.get('flavour'));
                externalItems.push(grindForm.get('processing'));
                externalItems.push(grindForm.get('roaster_notes'));
                externalItems.push(grindForm.get('recipes'));
                externalItems.push(grindForm.get('brewing_method'));
                externalItems.push(grindForm.get('recommendation_text'));

                internalItems.push(grindForm.get('rc_batch_id'));
                internalItems.push(grindForm.get('batch_ref_no'));
            });
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

    get editGrindMode(): boolean {
        const grindFormArr = (this.productForm.get('weightVariants') as FormArray).controls[this.currentVariantIdx].get(
            'grind_variants',
        ) as FormArray;
        return !!grindFormArr.controls.find((fg) => fg.value.editable);
    }

    addGrindVariant(): void {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    desp: this.translator.instant(`confirm_add_grind_variant_desp_${this.type}`),
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    const grindFormArr = (this.productForm.get('weightVariants') as FormArray).controls[
                        this.currentVariantIdx
                    ].get('grind_variants') as FormArray;
                    grindFormArr.controls.forEach((fg: FormGroup) => {
                        this.onCancelGrind(fg);
                    });
                    grindFormArr.push(this.creatGrindForm(this.isPublished, true));
                    this.checkGrindForm();
                    this.cdr.detectChanges();
                }
            });
    }

    removeGrindVariant(grindForm: FormGroup) {
        const grindFormArr = grindForm.parent as FormArray;
        const index = grindFormArr.controls.findIndex(
            (item) => item.value.grind_variant_id === grindForm.value.grind_variant_id,
        );
        grindFormArr.removeAt(index);
        this.cdr.detectChanges();
    }

    onBatchChange(grindForm: FormGroup, haveToSave = false) {
        const batch = this.roastedBatches.find((element) => element.id === grindForm.get('rc_batch_id').value);
        if (batch) {
            this.inventorySrv.getRoastedBatch(batch.id).subscribe((res) => {
                if (res && res.result) {
                    grindForm.patchValue({
                        ...res.result,
                        rc_batch_name: res.result.name,
                        roaster_ref_no: res.result.batch_ref_no,
                        flavour_profiles: (res.result?.flavour_profiles || []).map((item) => {
                            return {
                                label: this.flavoursList.find((ix) => ix.value === item)?.label,
                                value: item,
                            };
                        }),
                    });
                    if (haveToSave) {
                        this.saveOriginalData(grindForm);
                    }
                    this.cdr.detectChanges();
                }
            });
        }
    }

    getGrindMenuItems(grindForm: FormGroup) {
        return [
            { label: this.translator.instant('edit'), command: () => this.editGrind(grindForm) },
            { label: this.translator.instant('duplicate'), command: () => this.duplicateGrind(grindForm) },
            { label: this.translator.instant('delete'), command: () => this.deleteGrindVariant(grindForm) },
        ];
    }

    editGrind(grindForm: FormGroup) {
        const grindFormArr = grindForm.parent as FormArray;
        grindFormArr.controls.forEach((fg: FormGroup) => {
            this.onCancelGrind(fg);
        });
        grindForm.get('editable').setValue(true);
        this.cdr.detectChanges();
    }

    onCancelGrind(grindForm: FormGroup) {
        if (grindForm.getRawValue().editable) {
            if (grindForm.value.grind_variant_id) {
                this.loadOriginalData(grindForm);
                grindForm.get('editable').setValue(false);
            } else {
                // Have to remove grind form for the new grind item which is not saved
                this.removeGrindVariant(grindForm);
            }
        }
    }

    duplicateGrind(grindForm: FormGroup) {
        const grindFormArr = grindForm.parent as FormArray;
        grindFormArr.controls.forEach((fg: FormGroup) => {
            this.onCancelGrind(fg);
        });
        const newForm = this.creatGrindForm();
        newForm.patchValue({ ...grindForm.getRawValue(), grind_variant_id: '', is_default_variant: false });
        grindFormArr.push(newForm);
        this.checkGrindForm();
        newForm.get('editable').setValue(true);
    }

    updateIsDefault(defaultGrindForm: FormGroup) {
        if (defaultGrindForm.get('is_default_variant').value) {
            (this.productForm.get('weightVariants') as FormArray).controls.forEach((weightForm: FormGroup) => {
                (weightForm.get('grind_variants') as FormArray).controls.forEach((grindForm: FormGroup) => {
                    grindForm.get('is_default_variant').setValue(false);
                    this.saveOriginalData(grindForm);
                });
            });
            defaultGrindForm.get('is_default_variant').setValue(true);
            this.saveOriginalData(defaultGrindForm);
        }
    }

    changeDefulat(grindForm: FormGroup) {
        if (grindForm.get('originalData').value?.is_default_variant) {
            this.toasterService.error(this.translator.instant('default_variant_deselect_note'));
            grindForm.get('is_default_variant').setValue(true);
            grindForm.get('is_default_variant').markAsPristine();
        }
    }

    showDefaultVariantMsg(grindForm: FormGroup) {
        if (!grindForm.get('originalData').value?.is_default_variant && grindForm.get('is_default_variant').value) {
            this.toasterService.success(this.translator.instant('default_variant_select_note'));
        }
    }

    onSaveGrind(grindForm: FormGroup) {
        if (!grindForm.valid) {
            grindForm.markAllAsTouched();
            this.toasterService.error(this.translator.instant('please_check_form_data'));
            return;
        }

        const postData = { ...grindForm.value };
        if (this.isExternal) {
            postData.flavour_profiles = (grindForm.value.flavour_profiles || []).map((item) => item.value);
            postData.harvest_year = grindForm.value.harvest_year
                ? moment(grindForm.value.harvest_year).format('yy-MM-DD')
                : null;
        }

        const weightForm = grindForm.parent?.parent;
        const weightId = weightForm.value.id;
        if (grindForm.value.grind_variant_id) {
            this.updateGrindVariant(weightId, grindForm.value.grind_variant_id, postData, grindForm);
        } else {
            this.createGrindVariant(weightId, postData, grindForm);
        }
    }

    createGrindVariant(wightId: number, postData: any, grindForm: FormGroup) {
        this.isSubmitted = true;
        this.inventorySrv.createGrindVariant(this.productID, wightId, postData).subscribe((res) => {
            if (res.success) {
                this.toasterService.success('Grind variant created successfully');
                this.showDefaultVariantMsg(grindForm);
                grindForm.patchValue({ grind_variant_id: res.result.id, editable: false });
                this.onBatchChange(grindForm, true);
                this.checkWeightForm(grindForm.parent.parent as FormGroup);
                this.updateIsDefault(grindForm);
            }
            this.isSubmitted = false;
            this.cdr.detectChanges();
        });
    }

    updateGrindVariant(wightId: number, grindId: number, postData: any, grindForm: FormGroup) {
        this.isSubmitted = true;
        this.inventorySrv.updateGrindVariant(this.productID, wightId, grindId, postData).subscribe((res) => {
            if (res.success) {
                this.toasterService.success('Grind variant updated successfully');
                this.showDefaultVariantMsg(grindForm);
                grindForm.get('editable').setValue(false);
                this.onBatchChange(grindForm, true);
                this.updateIsDefault(grindForm);
            }
            this.isSubmitted = false;
            this.cdr.detectChanges();
        });
    }

    deleteGrindVariant(grindForm: FormGroup) {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp: this.translator.instant('confirm_delete_grind_variant_desp'),
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.inventorySrv
                        .deleteGrindVariant(
                            this.productID,
                            grindForm.parent.parent.value.id,
                            grindForm.value.grind_variant_id,
                        )
                        .subscribe(
                            (res) => {
                                if (res.success) {
                                    this.toasterService.success('Grind variant deleted successfully');
                                    this.removeGrindVariant(grindForm);
                                } else {
                                    this.toasterService.error('Error while deleting grind variant');
                                }
                            },
                            (err) => {
                                this.toasterService.error('Error while deleting grind variant');
                            },
                        );
                }
            });
    }

    // Product details

    createProductForm() {
        this.productForm = this.fb.group({
            name: ['', [Validators.required]],
            purchase_type: ['', [Validators.required]],
            description: ['', [Validators.required, maxWordCountValidator(300)]],
            vat_setting_id: [null, [Validators.required]],
            is_price_including_vat: [this.type === ProductType.b2c],
            is_public: [false],
            is_external_product: [false],
            weightVariants: this.fb.array([this.createWeightForm()]),
        });
    }

    setProductValidators() {
        (this.productForm.get('weightVariants') as FormArray).controls.forEach((weightForm: FormGroup) => {
            this.setWeightValidators(weightForm);
        });
    }

    clearProductValidators() {
        (this.productForm.get('weightVariants') as FormArray).controls.forEach((weightForm: FormGroup) => {
            this.clearWeightValidators(weightForm);
        });
    }

    publishProduct() {
        this.productForm.controls.is_public.setValue(true);
        this.setProductValidators();
        if (!this.productForm.valid) {
            this.productForm.controls.is_public.setValue(false);
            this.toasterService.error(this.translator.instant('please_check_ecom_product_data'));
            this.productForm.markAllAsTouched();
        } else {
            this.onSaveProduct();
        }
    }

    onChangeVisibility() {
        if (this.productForm.value.is_public) {
            this.setProductValidators();
            // Revert status is validation is failed
            if (!this.productForm.valid) {
                this.productForm.controls.is_public.setValue(false);
                this.toasterService.error(this.translator.instant('please_check_ecom_product_data'));
                this.productForm.markAllAsTouched();
            } else {
                this.onSaveProduct();
            }
        } else {
            this.clearProductValidators();
            this.onSaveProduct();
        }
    }

    onSaveProduct(): void {
        if (!this.productForm.valid) {
            this.productForm.markAllAsTouched();
            if (this.productForm.value.is_public) {
                this.toasterService.error(this.translator.instant('please_check_ecom_product_data'));
            } else {
                this.toasterService.error(this.translator.instant('please_check_ecom_product_details'));
            }
            return;
        }
        const postData = JSON.parse(JSON.stringify(this.productForm.value));
        delete postData.weightVariants;
        if (this.productID) {
            this.updateProductDetails(postData);
        } else {
            this.createProduct(postData);
        }
    }

    createProduct(postData) {
        this.isSubmitted = true;
        this.inventorySrv
            .createProduct({ ...postData, business_type: this.type })
            .subscribe((res: ApiResponse<any>) => {
                if (res && res.success) {
                    this.productID = res.result.id;
                    this.productForm.markAsPristine();
                    this.toasterService.success('Product created successfully. Please go on to complete the variants');
                } else {
                    this.toasterService.error('Error while add a Product');
                }
                this.isSubmitted = false;
                this.cdr.detectChanges();
            });
    }

    updateProductDetails(postData) {
        this.isSubmitted = true;
        this.inventorySrv.updateProduct(this.productID, postData).subscribe((res) => {
            if (res && res.success) {
                this.toasterService.success('Product updated successfully');
                this.goTolist();
            } else {
                this.toasterService.error('Error while update a Product');
            }
            this.isSubmitted = false;
            this.cdr.detectChanges();
        });
    }

    // Common
    saveOriginalData(fg: FormGroup): void {
        const originalData = fg.getRawValue();
        delete originalData.originalData; // To prevent updating originalData field
        delete originalData.grind_variants;
        fg.get('originalData').setValue(originalData);
        fg.markAsPristine();
    }

    loadOriginalData(fg: FormGroup): void {
        fg.patchValue(fg.getRawValue().originalData || {});
        fg.markAsPristine();
    }

    pristine(fg: FormGroup): boolean {
        for (const key in fg.controls) {
            if (Object.prototype.hasOwnProperty.call(fg.controls, key)) {
                if (key === 'grind_variants' || key === 'weightVariants') {
                    continue;
                }
                if (!fg.controls[key].pristine) {
                    return false;
                }
            }
        }
        return true;
    }

    makePending(fc: FormControl) {
        // FOr the p-inputNumber pristine issue
        fc.markAsDirty();
    }

    goTolist() {
        this.router.navigate([`/e-commerce/product-list/${this.type}`]);
    }

    getRoastLevel(id: number = null) {
        return (this.roastLevelArray || []).find((ix) => ix.value === id);
    }
}
