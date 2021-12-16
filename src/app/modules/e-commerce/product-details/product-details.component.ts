import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmComponent } from '@app/shared';
import { ResizeableComponent } from '@base-components';
import { BREWING_METHOD_ITEMS, COUNTRY_LIST } from '@constants';
import { FileModule, ProductStatus, ProductType } from '@enums';
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
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { DropdownItem } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
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
    statusArray = [
        { label: 'In Stock', value: ProductStatus.INSTOCK },
        { label: 'Out of Stock', value: ProductStatus.SOLD },
    ];
    grindArray = [
        { label: 'Whole beans', value: 'whole-beans' },
        { label: 'Extra coarse', value: 'extra-coarse' },
        { label: 'Coarse', value: 'coarse' },
        { label: 'Medium coarse', value: 'medium-coarse' },
        { label: 'Medium', value: 'medium' },
        { label: 'Fine', value: 'fine' },
        { label: 'Extra fine', value: 'extra-fine' },
    ];
    isDefaultVariantOptions = [
        { label: 'yes', value: true },
        { label: 'no', value: false },
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
    baseCurrency: string;
    grindFields = [
        { label: 'grind', field: 'id', width: 14 },
        { label: 'weight', field: 'weight', width: 10 },
        { label: 'roasted_coffee_batch', field: 'roasted_coffee_batch', width: 20 },
        { label: 'grind_level', field: 'grind', width: 14 },
        { label: 'price', field: 'price', width: 14 },
        { label: 'remaining_quantity', field: 'remaining_quantity', width: 18 },
        { label: 'actions', field: 'actions', width: 10 },
    ];

    get isExternal() {
        return !!this.productForm?.value?.is_external_product;
    }

    constructor(
        private authService: AuthService,
        private dialogService: DialogService,
        private fb: FormBuilder,
        private fileService: FileService,
        private generalService: GeneralService,
        private inventorySrv: InventoryService,
        private route: ActivatedRoute,
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
            this.refreshProductForm();
            if (this.type === ProductType.b2c) {
                promises.push(new Promise((resolve, reject) => this.getFlavoursData(resolve, reject)));
            }
            if (params.has('id')) {
                this.productID = +params.get('id');
            }
        });
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
        this.syncIsExternalProduct();
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

    refreshProductForm() {
        this.productForm = this.fb.group({
            name: [''],
            purchase_type: [''],
            description: [''],
            is_public: [false],
            vat_setting_id: [null],
            is_price_including_vat: [this.type === ProductType.b2c],
            is_external_product: [false],
            weightVariants: this.fb.array([this.creatWeightForm()]),
        });
        this.checkGrindForm();
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

        (this.productForm.get('weightVariants') as FormArray).controls.forEach((variantForm: FormGroup) => {
            variantForm.get('weight').setValidators([Validators.required]);
            variantForm.get('featured_image_id').setValidators([Validators.required]);
            variantForm.get('crate_capacity').setValidators([Validators.required]);
            Object.keys(variantForm.controls).forEach((key) => {
                variantForm.get(key).updateValueAndValidity();
            });
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

        (this.productForm.get('weightVariants') as FormArray).controls.forEach((variantForm: FormGroup) => {
            variantForm.get('weight').clearValidators();
            variantForm.get('featured_image_id').clearValidators();
            variantForm.get('crate_capacity')?.clearValidators();
            Object.keys(variantForm.controls).forEach((key) => {
                variantForm.get(key).updateValueAndValidity();
            });
        });
    }

    syncIsExternalProduct() {
        this.productForm
            .get('is_external_product')
            .valueChanges.pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((isExternal: boolean) => {
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
                    if (this.isPublished) {
                        this.setValidators();
                    }
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
                        const weightForm = this.creatWeightForm();
                        weightForm.patchValue({
                            ...weightVariant,
                            weight: convertKg(weightVariant.weight, weightVariant.weight_unit),
                            featured_image_id: weightVariant.featured_image,
                            images: weightVariant.images || [],
                        });

                        const grindFormList = weightForm.get('grind_variants') as FormArray;
                        (weightVariant.grind_variants || []).forEach((grindVariant) => {
                            const grindForm = this.creatGrindForm();
                            grindForm.patchValue({
                                ...grindVariant,
                                grind_variant_id: grindVariant.id,
                                flavour_profiles: (grindVariant.flavour_profiles || []).map((item) => {
                                    return {
                                        label: this.flavoursList.find((ix) => ix.value === item)?.label,
                                        value: item,
                                    };
                                }),
                            });
                            // Fetch batch details
                            this.onBatchChange(grindForm);
                            grindFormList.push(grindForm);
                        });

                        weightFormArr.push(weightForm);
                    });
                }
                this.isLoading = false;
            },
            (err) => {
                this.toasterService.error('Error while getting product details');
            },
        );
    }

    // Weight variant

    addWeightVariant() {
        const weightForm = this.creatWeightForm();
        const weightFormArr = this.productForm.get('weightVariants') as FormArray;
        weightFormArr.push(weightForm);
        setTimeout(() => {
            this.currentVariantIdx = weightFormArr.length - 1;
        }, 0);
    }

    removeWeightVariant(weightForm: FormGroup) {
        const weightFormArr = weightForm.parent as FormArray;
        const index = weightFormArr.controls.findIndex((item) => item.value.id === weightForm.value.id);
        setTimeout(() => {
            weightFormArr.removeAt(index);
            if (index === this.currentVariantIdx) {
                this.currentVariantIdx = index === 0 ? weightFormArr.length - 1 : 0;
            }
        }, 0);
    }

    creatWeightForm(isPublic: boolean = false): FormGroup {
        const emptyWeight: FormGroup = this.fb.group({
            id: '',
            weight: [
                0,
                Validators.compose(isPublic ? [Validators.required, quantityMinValidator('weight_unit', 0.1)] : []),
            ],
            weight_unit: 'lb',
            status: [
                this.isPublished ? ProductStatus.INSTOCK : ProductStatus.INDRAFT,
                Validators.compose(isPublic ? [Validators.required] : []),
            ],
            featured_image_id: ['', fileRequired()],
            images: this.fb.array([]),
            grind_variants: this.fb.array([]),
        });
        if (this.type === ProductType.b2b) {
            emptyWeight.addControl(
                'crate_capacity',
                new FormControl(
                    null,
                    Validators.compose(!this.isPublished ? [] : [Validators.required, Validators.min(1)]),
                ),
            );
        }
        const productImages = emptyWeight.get('images') as FormArray;
        for (let i = 0; i < 3; i++) {
            productImages.push(new FormControl(null));
        }
        return emptyWeight;
    }

    onSaveWeightVariant(weightForm: FormGroup) {
        console.log('onSaveWeightVariant', weightForm.value);
        if (!weightForm.valid) {
            weightForm.markAllAsTouched();
            this.toasterService.error(this.translator.instant('please_check_form_data'));
        }

        // First have to upload all product images
        new Promise((resolve, reject) => this.uploadImages(weightForm, resolve, reject))
            .then(() => {
                const postData = {
                    ...weightForm.value,
                    weight: convert2Kg(weightForm.value.weight, weightForm.value.weight_unit),
                    featured_image_id: weightForm.value.featured_image_id?.id,
                    images: weightForm.value.images.filter((element) => element?.id).map((element) => element.id),
                };
                if (weightForm.value.id) {
                    this.updateWeightVariant(postData, weightForm);
                } else {
                    this.createWeightVariant(postData, weightForm);
                }
            })
            .catch((err) => {
                this.toasterService.error('Error while uploading images');
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
        this.inventorySrv.createWeightVariant(this.productID, postData).subscribe((res) => {
            if (res.success) {
                this.toasterService.success('Weight variant created successfully');
                weightForm.patchValue({ id: res.result.id });
            }
        });
    }

    updateWeightVariant(postData: any, weightForm: FormGroup) {
        this.inventorySrv.updateWeightVariant(this.productID, postData.id, postData).subscribe((res) => {
            if (res.success) {
                this.toasterService.success('Weight variant updated successfully');
            }
        });
    }

    deleteWeightVariant(weightForm: FormGroup) {
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
            this.removeWeightVariant(weightForm);
        }
    }

    // Grind variant

    creatGrindForm(isPublic = false, editable = false): FormGroup {
        // editable should be true when we add new grind
        return this.fb.group({
            editable: [editable],
            grind_variant_id: '',
            rc_batch_id: '',
            rc_batch_name: { value: '', disabled: true },
            is_default_variant: [null, [Validators.required]],
            price: [0, Validators.compose(isPublic ? [Validators.required, Validators.min(1)] : [])],
            grind: [null, Validators.compose(isPublic ? [Validators.required] : [])],
            available_quantity: [0, Validators.compose(isPublic ? [Validators.required, Validators.min(1)] : [])],
            available_quantity_type: this.type === 'b2b' ? 'boxes' : 'bags',
            sku_number: ['', Validators.compose(isPublic ? [Validators.required] : [])],
            remaining_quantity: '',
            quantity_unit: '',
            roast_level_id: [{ value: '', disabled: true }, [Validators.required]],
            estate_name: [{ value: '', disabled: true }],
            origin: [{ value: '', disabled: true }],
            region: [{ value: '', disabled: true }],
            harvest_year: [{ value: '', disabled: true }],
            aroma: [null, Validators.compose([Validators.required])],
            acidity: [null, Validators.compose([Validators.required])],
            body: [null, Validators.compose([Validators.required])],
            flavour: [null, Validators.compose([Validators.required])],
            processing: [null, Validators.compose([Validators.required])],
            roaster_ref_no: [{ value: '', disabled: true }],
            flavour_profiles: [{ value: '', disabled: true }, [Validators.required]],
            roaster_notes: [{ value: '', disabled: true }],
            recipes: [{ value: '', disabled: true }],
            brewing_method: [null],
            recommendation_text: ['', Validators.compose([Validators.required])],
        });
    }

    checkGrindForm() {
        console.log('Check Grind Form');
        const externalItems: AbstractControl[] = [];
        const internalItems: AbstractControl[] = [];
        (this.productForm.get('weightVariants') as FormArray).controls.forEach((weightForm: FormGroup) => {
            (weightForm.get('grind_variants') as FormArray).controls.forEach((grindForm: FormGroup) => {
                externalItems.push(grindForm.get('roast_level_id'));
                externalItems.push(grindForm.get('estate_name'));
                externalItems.push(grindForm.get('origin'));
                externalItems.push(grindForm.get('region'));
                externalItems.push(grindForm.get('harvest_year'));
                externalItems.push(grindForm.get('roaster_ref_no'));
                externalItems.push(grindForm.get('flavour_profiles'));
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
                internalItems.push(grindForm.get('remaining_quantity'));
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

    addGrindVariant(isHide?): void {
        const grindFormArr = (this.productForm.get('weightVariants') as FormArray).controls[this.currentVariantIdx].get(
            'grind_variants',
        ) as FormArray;
        grindFormArr.controls.forEach((fg: FormGroup, index) => {
            this.onCancelGrind(fg);
        });
        grindFormArr.push(this.creatGrindForm(!isHide, true));
    }

    removeGrindVariant(grindForm: FormGroup) {
        const grindFormArr = grindForm.parent as FormArray;
        const index = grindFormArr.controls.findIndex(
            (item) => item.value.grind_variant_id === grindForm.value.grind_variant_id,
        );
        setTimeout(() => {
            grindFormArr.removeAt(index);
        }, 0);
    }

    onBatchChange(grindForm: FormGroup) {
        const batch = this.roastedBatches.find((element) => element.id === grindForm.value.rc_batch_id);
        if (batch) {
            this.inventorySrv.getRoastedBatch(batch.id).subscribe((res) => {
                if (res && res.result) {
                    grindForm.patchValue({
                        ...res.result,
                        rc_batch_name: res.result.name,
                        roaster_ref_no: res.result.batch_ref_no,
                    });
                }
            });
            this.inventorySrv.getRoastingProfileDetail(batch.roasting_profile_id).subscribe((res) => {
                if (res && res.result) {
                    grindForm.patchValue({
                        ...res.result,
                        flavour_profiles: (res.result.flavour_profiles || []).map((item) => {
                            return { label: item.name, value: item.id };
                        }),
                    });
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
        grindFormArr.controls.forEach((fg: FormGroup, index) => {
            this.onCancelGrind(fg);
        });
        grindForm.get('editable').setValue(true);
    }

    onCancelGrind(grindForm: FormGroup) {
        if (grindForm.value.grind_variant_id) {
            grindForm.get('editable').setValue(false);
        } else {
            // Have to remove grind form for the new grind item which is not saved
            this.removeGrindVariant(grindForm);
        }
    }

    duplicateGrind(grindForm: FormGroup) {
        const grindFormArr = grindForm.parent as FormArray;
        grindFormArr.controls.forEach((fg: FormGroup) => {
            this.onCancelGrind(fg);
        });
        const newForm = this.creatGrindForm();
        newForm.patchValue({ ...grindForm.getRawValue(), grind_variant_id: '' });
        grindFormArr.push(newForm);
        newForm.get('editable').setValue(true);
    }

    onSaveGrind(grindForm: FormGroup) {
        if (!grindForm.valid) {
            grindForm.markAllAsTouched();
            this.toasterService.error(this.translator.instant('please_check_form_data'));
            return;
        }

        const postData = {
            ...grindForm.value,
            flavour_profiles: grindForm.value.flavour_profiles.map((item) => item.value),
        };
        const weightForm = grindForm.parent?.parent;
        const weightId = weightForm.value.id;
        if (grindForm.value.grind_variant_id) {
            this.updateGrindVariant(weightId, grindForm.value.grind_variant_id, postData, grindForm);
        } else {
            this.createGrindVariant(weightId, postData, grindForm);
        }
    }

    createGrindVariant(wightId: number, postData: any, grindForm: FormGroup) {
        this.inventorySrv.createGrindVariant(this.productID, wightId, postData).subscribe((res) => {
            if (res.success) {
                this.toasterService.success('Grind variant created successfully');
                grindForm.patchValue({ grind_variant_id: res.result.id, editable: false });
            }
        });
    }

    updateGrindVariant(wightId: number, grindId: number, postData: any, grindForm: FormGroup) {
        this.inventorySrv.updateGrindVariant(this.productID, wightId, grindId, postData).subscribe((res) => {
            if (res.success) {
                this.toasterService.success('Grind variant updated successfully');
                grindForm.get('editable').setValue(false);
            }
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

    saveAsDraft() {
        this.productForm.controls.is_public.setValue(false);
        this.clearValidators();
        this.onSaveProduct();
    }

    publishProduct() {
        this.productForm.controls.is_public.setValue(true);
        this.setValidators();
        this.onSaveProduct();
    }

    onSaveProduct(): void {
        if (!this.productForm.valid) {
            this.productForm.markAllAsTouched();
            this.toasterService.error(this.translator.instant('please_check_form_data'));
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
        this.inventorySrv
            .createProduct({ ...postData, business_type: this.type })
            .subscribe((res: ApiResponse<any>) => {
                if (res && res.success) {
                    this.productID = res.result.id;
                    this.toasterService.success('Product created successfully');
                } else {
                    this.toasterService.error('Error while add a Product');
                }
            });
    }

    updateProductDetails(postData) {
        this.inventorySrv.updateProduct(this.productID, postData).subscribe((res) => {
            if (res && res.success) {
                this.toasterService.success('Product updated successfully');
            } else {
                this.toasterService.error('Error while update a Product');
            }
        });
    }
}
