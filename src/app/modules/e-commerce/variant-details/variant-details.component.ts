import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService, ResizeService, FileService, AuthService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ResizeableComponent } from '@base-components';
import { fileRequired, quantityMinValidator, trackFileName } from '@utils';
import { FileModule } from '@enums';

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
    uploadDisabled = true;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private toaster: ToastrService,
        public globals: GlobalsService,
        private cookieService: CookieService,
        private fileService: FileService,
        protected resizeService: ResizeService,
        private authService: AuthService,
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
            { label: 'Extra Coarse', value: 'extra-coarse' },
            { label: 'Coarse', value: 'coarse' },
            { label: 'Medium Coarse', value: 'medium-coarse' },
            { label: 'Medium', value: 'medium' },
            { label: 'Fine', value: 'fine' },
            { label: 'Extra Fine', value: 'extra-fine' },
        ];
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
    loadGrindVariants(grindForm, item, isPublic): void {
        this.grindVariants = grindForm as FormArray;
        this.grindVariants.removeAt(0);
        if (item && item.length > 0) {
            item.forEach((variant) => {
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
    createEmptyWeights(isPublic?) {
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
            is_hide: [true],
            is_default_product: [false, Validators.compose(isPublic ? [Validators.required] : [])],
            grind_variants: this.fb.array([this.createEmptyGrindVariant()]),
        });
        const productImages = emptyWeight.get('product_images') as FormArray;
        for (let i = 0; i < 3; i++) {
            productImages.push(new FormControl(null));
        }
        return emptyWeight;
    }

    setProductImages(productArray) {
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
            price: [0, Validators.compose(isPublic ? [Validators.required] : [])],
            grind: ['', Validators.compose(isPublic ? [Validators.required] : [])],
            available_quantity: [0, Validators.compose(isPublic ? [Validators.required] : [])],
            available_quantity_type: this.type === 'b2b' ? 'boxes' : 'bags',
            sku_number: ['', Validators.compose(isPublic ? [Validators.required] : [])],
        });
    }

    deleteGrindVariant(idx) {
        const weight = this.weightForm.get('weights') as FormArray;
        const grindVariants = weight.controls[this.currentVariantIndex].get('grind_variants') as FormArray;
        grindVariants.removeAt(idx);
    }

    uploadImages() {
        const currentWeightForm = (this.weightForm.get('weights') as FormArray).controls[this.currentVariantIndex];
        const featuredControl = currentWeightForm.get('featured_image_id');
        if (featuredControl.invalid) {
            featuredControl.markAsTouched();
            return;
        }
        const promises: any[] = [];
        if (featuredControl.value?.file) {
            promises.push(
                new Promise((resolve, reject) => {
                    this.uploadImage(featuredControl, resolve, reject);
                }),
            );
        }
        if (featuredControl.value?.image_id && (!featuredControl.value?.image_url || featuredControl.value?.file)) {
            promises.push(
                new Promise((resolve, reject) => {
                    this.deleteFile(featuredControl.value.image_id, resolve, reject);
                }),
            );
        }
        (currentWeightForm.get('product_images') as FormArray).controls.forEach((imageControl) => {
            if (imageControl.value?.file) {
                promises.push(
                    new Promise((resolve, reject) => {
                        this.uploadImage(imageControl, resolve, reject);
                    }),
                );
            }
            if (imageControl.value?.image_id && (!imageControl.value?.image_url || imageControl.value?.file)) {
                promises.push(
                    new Promise((resolve, reject) => {
                        this.deleteFile(imageControl.value.image_id, resolve, reject);
                    }),
                );
            }
        });

        Promise.all(promises)
            .then(() => {
                Promise.all(promises)
                    .then(() => {
                        if (promises.length) {
                            this.toaster.success('Image uploaded successfully');
                            this.uploadDisabled = true;
                        }
                    })
                    .catch(() => {});
            })
            .catch(() => {});
    }

    uploadImage(formControl: AbstractControl, resolve, reject) {
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

    deleteFile(fileId: number, resolve, reject) {
        this.fileService.deleteFile(fileId).subscribe((res) => {
            if (res.success) {
                resolve();
            } else {
                reject();
            }
        });
    }

    createWeightVariantArray() {
        const weight = this.weightForm.get('weights') as FormArray;
        const weightVariantArray = weight.value.map((ele, index) => {
            const weightName = 'Weight -' + (ele.weight ? ele.weight : 0) + ' ' + ele.weight_unit;
            return { label: weightName, value: index };
        });
        weightVariantArray.push({ label: '', value: 'button' });
        this.weightVariantArray = weightVariantArray;
    }

    trackFileName(name) {
        return trackFileName(name);
    }

    handleHideProduct() {
        const weights = this.weightForm.get('weights') as FormArray;
        const weight = weights.controls[this.currentVariantIndex] as FormGroup;
        if (weight.get('is_hide').value) {
            Object.keys(weight.controls).forEach((key) => {
                weight.get(key).clearValidators();
            });
            const grindVariants = weight.get('grind_variants') as FormArray;
            grindVariants.controls.forEach((variant: FormGroup) => {
                Object.keys(variant.controls).forEach((key) => {
                    variant.get(key).clearValidators();
                });
                variant.updateValueAndValidity();
            });
            weight.updateValueAndValidity();
        } else {
            weight.get('featured_image_id').setValidators(Validators.compose([Validators.required]));
            weight.get('weight').setValidators(Validators.compose([Validators.required]));
            weight.get('status').setValidators(Validators.compose([Validators.required]));
            weight.updateValueAndValidity();
            const grindVariants = weight.get('grind_variants') as FormArray;
            grindVariants.controls.forEach((variant: FormGroup) => {
                variant.get('price').setValidators(Validators.compose([Validators.required]));
                variant.get('grind').setValidators(Validators.compose([Validators.required]));
                variant.get('available_quantity').setValidators(Validators.compose([Validators.required]));
                variant.get('sku_number').setValidators(Validators.compose([Validators.required]));
                variant.updateValueAndValidity();
            });
        }
        console.log(weight);
    }
}
