import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { FileModule } from '@enums';
import { AuthService, FileService, ResizeService } from '@services';
import { fileRequired, quantityMinValidator } from '@utils';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-variant-details',
    templateUrl: './variant-details.component.html',
    styleUrls: ['./variant-details.component.scss'],
})
export class VariantDetailsComponent extends ResizeableComponent implements OnInit {
    weightForm: FormGroup;
    weights: FormArray;
    grindVariants: FormArray;
    @Input() variantDetails: any;
    @Input() type: string;
    @Input() isPublished: boolean;
    @Input() isSetDefault: boolean;
    currentVariantIndex = 0;
    statusArray: any = [];
    grindArray: any = [];
    productID: any = '';
    roasterID: any = '';
    weightTypeArray: any = '';
    @Output() handleWeightCreate = new EventEmitter();
    @Output() handleWeightDelete = new EventEmitter<any>();
    @Output() handleSetDefault = new EventEmitter<any>();
    weightFields = ['weight_unit', 'weight', 'status', 'is_hide', 'is_default_product', 'product_weight_variant_id'];
    grindVariantFields = [
        'price',
        'grind',
        'available_quantity',
        'available_quantity_type',
        'sku_number',
        'grind_variant_id',
    ];
    weightVariantArray: any = [];
    displayDelete = false;
    baseCurrency: string;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private fileService: FileService,
        private route: ActivatedRoute,
        private toaster: ToastrService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
        this.roasterID = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.weightForm = this.fb.group({
            variant_name: '',
            weights: this.fb.array([this.createEmptyWeights()]),
        });
        const weight = this.weightForm.get('weights') as FormArray;
        weight.controls[this.currentVariantIndex].get('weight').valueChanges.subscribe((value) => {
            this.onWeightChange(value);
        });
        this.route.params.subscribe((params) => {
            this.statusArray = this.isPublished
                ? [
                      { label: 'In Stock', value: 'IN-STOCK' },
                      { label: 'Out of Stock', value: 'SOLD' },
                  ]
                : [
                      {
                          label: 'In Draft',
                          value: 'IN-DRAFT',
                      },
                  ];
            if (params.id) {
                this.productID = params.id;
                this.loadWeight();
            } else {
                this.updateCrate(0);
                this.createWeightVariantArray();
            }
        });
        this.weightTypeArray = [
            { label: 'lb', value: 'lb' },
            { label: 'kg', value: 'kg' },
            { label: 'g', value: 'g' },
        ];
        this.grindArray = [
            { label: 'Whole beans', value: 'whole-beans' },
            { label: 'Extra coarse', value: 'extra-coarse' },
            { label: 'Coarse', value: 'coarse' },
            { label: 'Medium coarse', value: 'medium-coarse' },
            { label: 'Medium', value: 'medium' },
            { label: 'Fine', value: 'fine' },
            { label: 'Extra fine', value: 'extra-fine' },
        ];
        this.authService.organizationSubject.subscribe((res) => {
            this.baseCurrency = res?.base_currency;
        });
    }

    onWeightChange(value, index?) {
        const weights = this.weightForm.get('weights') as FormArray;
        const weight = weights.controls[!!index ? index : this.currentVariantIndex];
        if (weight) {
            weight.patchValue({
                weight_name: `weight - ${value}${weight.value.weight_unit}`,
            });
            const getObj = {
                value,
                product_weight_variant_id: weight.value.product_weight_variant_id,
                unit: weight.value.weight_unit,
                variant_name: this.variantDetails.value.variant_name,
                modify: true,
            };
            this.handleWeightCreate.emit(getObj);
        }
        this.createWeightVariantArray();
    }

    onWeightUnitChange() {
        const weights = this.weightForm.get('weights') as FormArray;
        const weight = weights.controls[this.currentVariantIndex];
        weight.patchValue({
            weight_name: `weight - ${weight.value.weight}${weight.value.weight_unit}`,
        });
        const getObj = {
            value: weight.value.weight,
            product_weight_variant_id: weight.value.product_weight_variant_id,
            unit: weight.value.weight_unit,
            variant_name: this.variantDetails.value.variant_name,
            modify: true,
        };
        this.handleWeightCreate.emit(getObj);
        this.createWeightVariantArray();
    }

    updateCrate(idx) {
        const weight = (this.weightForm.get('weights') as FormArray).controls[idx].value;
        const getObj = {
            value: weight.weight,
            unit: weight.weight_unit,
            product_weight_variant_id: weight.product_weight_variant_id,
            variant_name: this.variantDetails.value.variant_name,
            modify: false,
        };
        this.handleWeightCreate.emit(getObj);
    }

    loadWeight() {
        if (this.variantDetails.value.weight_variants) {
            this.weights = this.weightForm.get('weights') as FormArray;
            this.weights.removeAt(0);
            this.variantDetails.value.weight_variants.forEach((ele, index) => {
                const weightForm = this.createEmptyWeights(ele.is_public);
                weightForm.get('weight').valueChanges.subscribe((value) => {
                    this.onWeightChange(value, index);
                });
                weightForm.controls.product_weight_variant_id.setValue(ele.product_weight_variant_id);
                weightForm.controls.weight_name.setValue('weight -' + ele.weight + '' + ele.weight_unit);

                this.weightFields.forEach((key) => {
                    let getValue = ele[key];
                    if (key === 'is_hide') {
                        getValue = !ele.is_public;
                    } else if (key === 'status') {
                        if (!getValue) {
                            getValue = this.isPublished ? 'IN-STOCK' : 'IN-DRAFT';
                        }
                    }
                    weightForm.controls[key].setValue(getValue);
                });

                weightForm.controls.featured_image_id.setValue(ele.featured_image);
                (ele.product_images || []).forEach((image, idx) => {
                    (weightForm.get('product_images') as FormArray).controls[idx].setValue(image);
                });
                this.loadGrindVariants(weightForm.controls.grind_variants, ele.grind_variants, ele.is_public);
                weightForm.controls.isNew.setValue(false);
                this.weights.push(weightForm);
            });
            this.createWeightVariantArray();
        } else {
            this.updateCrate(0);
        }
    }

    private loadGrindVariants(grindForm, items, isPublic): void {
        this.grindVariants = grindForm as FormArray;
        if (items?.length > 0) {
            this.grindVariants.removeAt(0);
            items.forEach((variant) => {
                const formGrind = this.createEmptyGrindVariant(isPublic);
                this.grindVariantFields.forEach((field) => {
                    formGrind.controls[field].setValue(variant[field]);
                });
                formGrind.get('available_quantity_type').setValue(this.type === 'b2b' ? 'boxes' : 'bags');
                this.grindVariants.push(formGrind);
            });
        }
    }

    addNewWeights(): void {
        this.weights = this.weightForm.get('weights') as FormArray;
        this.weights.push(this.createEmptyWeights());
        this.weights.controls[this.weights.length - 1].get('weight').valueChanges.subscribe((value) => {
            this.onWeightChange(value);
        });
        this.updateCrate(this.weights.length - 1);
        this.createWeightVariantArray();
        setTimeout(() => {
            this.currentVariantIndex = this.weights.length - 1;
        }, 0);
    }

    deleteWeightVariant(index) {
        this.weights = this.weightForm.get('weights') as FormArray;
        const weight = this.weights.controls[index];
        if (index === this.currentVariantIndex) {
            this.currentVariantIndex = index === 0 ? this.weights.length - 1 : 0;
        }
        const weightVariantArray = Object.assign([], this.weightVariantArray);
        setTimeout(() => {
            this.weights.removeAt(index);
            this.handleWeightDelete.emit({
                productWeightVariantId: weight.value.product_weight_variant_id,
                isNew: weight.value.isNew,
                weight: weight.value.weight,
                weight_unit: weight.value.weight_unit,
            });
            weightVariantArray.splice(index, 1);
            this.weightVariantArray = weightVariantArray;
        }, 200);
    }

    addNewGrindVariants(isHide): void {
        this.displayDelete = true;
        this.grindVariants = (this.weightForm.get('weights') as FormArray).controls[this.currentVariantIndex].get(
            'grind_variants',
        ) as FormArray;
        this.grindVariants.push(this.createEmptyGrindVariant(!isHide));
    }

    private createEmptyWeights(isPublic: boolean = false): FormGroup {
        const emptyVariantID = '_' + Math.random().toString(36).substr(2, 9);
        const emptyWeight: FormGroup = this.fb.group({
            weight_name: 'weight - 0 lb',
            weight_unit: 'lb',
            product_weight_variant_id: emptyVariantID,
            featured_image_id: ['', fileRequired()],
            fileDetails: null,
            isNew: true,
            product_images: this.fb.array([]),
            weight: [
                0,
                Validators.compose(isPublic ? [Validators.required, quantityMinValidator('weight_unit', 0.1)] : []),
            ],
            status: [
                this.isPublished ? 'IN-STOCK' : 'IN-DRAFT',
                Validators.compose(isPublic ? [Validators.required] : []),
            ],
            is_hide: [!isPublic],
            is_default_product: [false, Validators.compose(isPublic ? [Validators.required] : [])],
            grind_variants: this.fb.array([this.createEmptyGrindVariant()]),
        });
        const productImages = emptyWeight.get('product_images') as FormArray;
        for (let i = 0; i < 3; i++) {
            productImages.push(new FormControl(null));
        }
        return emptyWeight;
    }

    // Enable validating when publish
    setValidators() {
        (this.weightForm.get('weights') as FormArray).controls.forEach((weightForm: FormGroup) => {
            this.setWeightValidators(weightForm);
        });
    }

    // Enable validating when publish
    clearValidators() {
        (this.weightForm.get('weights') as FormArray).controls.forEach((weightForm: FormGroup) => {
            this.clearWeightValidators(weightForm);
        });
    }

    // Validate individuel weight form
    private setWeightValidators(weightForm: FormGroup) {
        if (weightForm.get('is_hide').value) {
            this.clearWeightValidators(weightForm);
        } else {
            weightForm.get('featured_image_id').setValidators(fileRequired());
            weightForm.get('weight').setValidators([Validators.required, quantityMinValidator('weight_unit', 0.1)]);
            weightForm.get('status').setValidators([Validators.required]);
            weightForm.get('is_default_product').setValidators([Validators.required]);
            weightForm.updateValueAndValidity();
            Object.keys(weightForm.controls).forEach((key) => {
                weightForm.get(key).updateValueAndValidity();
            });

            const grindVariants = weightForm.get('grind_variants') as FormArray;
            grindVariants.controls.forEach((variant: FormGroup) => {
                variant.get('price').setValidators([Validators.required, Validators.min(1)]);
                variant.get('grind').setValidators([Validators.required]);
                variant.get('available_quantity').setValidators([Validators.required, Validators.min(1)]);
                variant.get('sku_number').setValidators([Validators.required]);
                Object.keys(variant.controls).forEach((key) => {
                    variant.get(key).updateValueAndValidity();
                });
            });
        }
    }

    private clearWeightValidators(weightForm: FormGroup) {
        Object.keys(weightForm.controls).forEach((key) => {
            weightForm.get(key).clearValidators();
            weightForm.get(key).updateValueAndValidity();
        });

        const grindVariants = weightForm.get('grind_variants') as FormArray;
        grindVariants.controls.forEach((variant: FormGroup) => {
            Object.keys(variant.controls).forEach((key) => {
                variant.get(key).clearValidators();
                variant.get(key).updateValueAndValidity();
            });
        });
    }

    markAllAsTouched() {
        this.weightForm.markAllAsTouched();
    }

    private setProductImages(productArray) {
        const productEmptyArray = [];
        const startIndex = productArray ? productArray.length : 0;
        for (let i = startIndex; i < 3; i++) {
            const fileObj = { fileDetails: null };
            productEmptyArray.push(fileObj);
        }
        return productArray.concat(productEmptyArray);
    }

    createEmptyGrindVariant(isPublic?) {
        return this.fb.group({
            grind_variant_id: '',
            price: [0, Validators.compose(isPublic ? [Validators.required, Validators.min(1)] : [])],
            grind: [null, Validators.compose(isPublic ? [Validators.required] : [])],
            available_quantity: [0, Validators.compose(isPublic ? [Validators.required, Validators.min(1)] : [])],
            available_quantity_type: this.type === 'b2b' ? 'boxes' : 'bags',
            sku_number: ['', Validators.compose(isPublic ? [Validators.required] : [])],
        });
    }

    deleteGrindVariant(idx) {
        const weight = this.weightForm.get('weights') as FormArray;
        const grindVariants = weight.controls[this.currentVariantIndex].get('grind_variants') as FormArray;
        grindVariants.removeAt(idx);
    }

    uploadImages(pResolve, pReject) {
        (this.weightForm.get('weights') as FormArray).controls.forEach((currentWeightForm) => {
            const promises: any[] = [];
            const featuredControl: FormControl = currentWeightForm.get('featured_image_id') as FormControl;
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
            (currentWeightForm.get('product_images') as FormArray).controls.forEach((imageControl: FormControl) => {
                if (imageControl.value?.file) {
                    promises.push(
                        new Promise((resolve, reject) => {
                            this.uploadImage(imageControl, resolve, reject);
                        }),
                    );
                }
                if (imageControl.value?.image_id && (!imageControl.value?.image_url || imageControl.value?.file)) {
                    imageControl.setValue({ ...imageControl.value, image_id: null });
                }
            });

            Promise.all(promises)
                .then(() => pResolve())
                .catch(() => pReject());
        });
    }

    private uploadImage(formControl: AbstractControl, resolve, reject) {
        const file = formControl.value.file;
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('name', file.name);
        formData.append('file_module', FileModule.Product);

        this.fileService.uploadFiles(formData).subscribe((uploadedFile) => {
            if (uploadedFile.success) {
                formControl.setValue({ image_id: uploadedFile.result.id, image_url: uploadedFile.result.url });
                resolve();
            } else {
                this.toaster.error('Error while uploading image.');
                reject();
            }
        });
    }

    private createWeightVariantArray() {
        const weight = this.weightForm.get('weights') as FormArray;
        const weightVariantArray = weight.value.map((ele, index) => {
            const weightName = 'Weight -' + (ele.weight ? ele.weight : 0) + ' ' + ele.weight_unit;
            return { label: weightName, value: index };
        });
        weightVariantArray.push({ label: '', value: 'button' });
        this.weightVariantArray = weightVariantArray;
    }

    isInvalidWeightVariant(index: number): boolean {
        const weightVarientForm = (this.weightForm.get('weights') as FormArray).controls[index];
        return weightVarientForm.invalid && weightVarientForm.touched;
    }

    handleHideProduct() {
        const weight = (this.weightForm.get('weights') as FormArray).controls[this.currentVariantIndex] as FormGroup;
        this.setWeightValidators(weight);
    }
}
