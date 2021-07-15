import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService, ResizeService, FileService, AuthService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ResizeableComponent } from '@base-components';
import { quantityMinValidator, trackFileName } from '@utils';

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
    deleteImageIDs: any = [];
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
        weight.controls[this.currentVariantIndex].get('product_images').setValue(this.setProductImages([]));
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
                if (ele.featured_image) {
                    weightForm.controls.featured_image_id.setValue(ele.featured_image.image_id);
                    weightForm.controls.fileDetails.setValue({ image_url: ele.featured_image.image_url });
                }
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

                const productImages = [];
                ele.product_images = ele.product_images ? ele.product_images : [];
                ele.product_images.forEach((image) => {
                    productImages.push({
                        image_id: image.image_id,
                        fileDetails: { image_url: image.image_url },
                    });
                });
                this.loadGrindVariants(weightForm.controls.grind_variants, ele.grind_variants, ele.is_public);
                const productImageArray = this.setProductImages(productImages);
                weightForm.controls.product_images.setValue(productImageArray);
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
        this.weights.controls[this.weights.length - 1].get('product_images').setValue(this.setProductImages([]));
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
            featured_image_id: ['', Validators.compose([Validators.required])],
            fileDetails: null,
            isNew: true,
            product_images: [],
            weight: [
                null,
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

    handleRoasterFile(e, index, type) {
        if (!e.target.files.length) {
            return;
        }
        for (let i = 0; i <= e.target.files.length - 1; i++) {
            const file = e.target.files[i];
            const fsize = e.target.files.item(i).size;
            if (Math.round(fsize / 1024) >= 1024 * 10) {
                this.toaster.error('File too big, please select a file smaller than 10mb');
            } else {
                const imgFile: any = e.target.files;
                // let fileObj: any;
                const reader = new FileReader();
                reader.readAsDataURL(imgFile[0]);
                reader.onload = (event) => {
                    const img = new Image();
                    img.src = window.URL.createObjectURL(file);
                    img.onload = () => {
                        if (img.naturalWidth >= 5000 || img.naturalHeight >= 5000) {
                            this.toaster.error(`Image should be 5000 x 5000 size`);
                        } else {
                            // this.upload(file);
                            const fileObj = {
                                file,
                                image_url: reader.result,
                                isNew: true,
                                fileID: '_' + Math.random().toString(36).substr(2, 9),
                            };
                            console.log('e.target.files:', e.target.files);
                            console.log('fileObj:', fileObj);
                            const weight = this.weightForm.get('weights') as FormArray;
                            if (type === 'featured_image') {
                                weight.controls[this.currentVariantIndex].patchValue({
                                    fileDetails: fileObj,
                                    featured_image_id: '',
                                });
                            } else {
                                weight.controls[this.currentVariantIndex].get('product_images').value[
                                    index
                                ].fileDetails = fileObj;
                            }
                            this.uploadDisabled = false;
                        }
                        window.URL.revokeObjectURL(img.src);
                    };
                };
            }
        }
    }

    deleteImage(index, type?) {
        const weight = this.weightForm.get('weights') as FormArray;
        this.uploadDisabled = false;
        if (type === 'featured_image') {
            const getValue = weight.controls[this.currentVariantIndex].value;
            if (getValue && getValue.featured_image_id) {
                this.deleteImageIDs.push(getValue.featured_image_id);
            }
            weight.controls[this.currentVariantIndex].patchValue({
                fileDetails: null,
                featured_image_id: '',
            });
        } else {
            const productArray = weight.controls[this.currentVariantIndex].get('product_images').value;
            if (productArray[index].fileDetails && productArray[index].image_id) {
                this.deleteImageIDs.push(productArray[index].image_id);
            }
            productArray[index].fileDetails = null;
            productArray[index].image_id = '';
        }
    }

    uploadImages() {
        const weight = this.weightForm.get('weights') as FormArray;
        const getValue = weight.controls[this.currentVariantIndex].value;
        const promises: any[] = [];
        if (!getValue.featured_image_id && getValue.fileDetails) {
            promises.push(
                new Promise((resolve, reject) => {
                    this.uploadImage(getValue.fileDetails, true, resolve, reject);
                }),
            );
        }
        const productImageArray = weight.controls[this.currentVariantIndex].get('product_images').value;
        const getNewImages = productImageArray.filter(
            (ele) => ele.fileDetails && !ele.image_id && ele.fileDetails.image_url,
        );
        for (const ele of getNewImages) {
            if (ele.fileDetails && !ele.fileDetails.image_id && ele.fileDetails.image_url) {
                promises.push(
                    new Promise((resolve, reject) => {
                        this.uploadImage(ele.fileDetails, false, resolve, reject);
                    }),
                );
            }
        }
        for (const fileId of this.deleteImageIDs) {
            promises.push(
                new Promise((resolve, reject) => {
                    this.deleteFile(fileId, resolve, reject);
                }),
            );
        }
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

    uploadImage(fileObj: any, isFeatured: boolean, resolve, reject) {
        const file: File = fileObj.file;
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('name', file.name);
        formData.append('file_module', 'Product');

        this.fileService.uploadFiles(formData).subscribe((uploadedFile) => {
            if (uploadedFile.success) {
                const weight = this.weightForm.get('weights') as FormArray;
                if (isFeatured) {
                    weight.controls[this.currentVariantIndex].get('featured_image_id').setValue(uploadedFile.result.id);
                } else {
                    const productImageArray = weight.controls[this.currentVariantIndex].get('product_images').value;
                    const foundObj = productImageArray.find((ele) => ele.fileDetails.fileID === fileObj.fileID);
                    if (foundObj) {
                        foundObj.image_id = uploadedFile.result.id;
                    }
                }
                resolve();
            } else {
                this.toaster.error('Error while uploading image.');
                reject();
            }
        });
    }

    deleteFile(fileId, resolve, reject) {
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
