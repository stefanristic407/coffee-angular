import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService, ResizeService, FileService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ResizeableComponent } from '@base-components';
import { trackFileName } from '@utils';

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
    weightFields = ['weight_unit', 'weight', 'status', 'is_public', 'is_default_product', 'product_weight_variant_id'];
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
    ) {
        super(resizeService);
        this.roasterID = this.cookieService.get('roaster_id');
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
                const weightForm = this.createEmptyWeights();
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
                    if (key === 'is_public') {
                        getValue = !getValue;
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
                this.loadGrindVariants(weightForm.controls.grind_variants, ele.grind_variants);
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
    loadGrindVariants(grindForm, item): void {
        this.grindVariants = grindForm as FormArray;
        this.grindVariants.removeAt(0);
        if (item && item.length > 0) {
            item.forEach((variant) => {
                const formGrind = this.createEmptyGrindVariant();
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
    addNewGrindVariants(): void {
        this.displayDelete = true;
        this.grindVariants = (this.weightForm.get('weights') as FormArray).controls[this.currentVariantIndex].get(
            'grind_variants',
        ) as FormArray;
        this.grindVariants.push(this.createEmptyGrindVariant());
    }
    createEmptyWeights() {
        const emptyVariantID = '_' + Math.random().toString(36).substr(2, 9);
        const emptyWeight: FormGroup = this.fb.group({
            weight_name: 'weight - 0 lb',
            weight_unit: 'lb',
            product_weight_variant_id: emptyVariantID,
            featured_image_id: ['', Validators.compose([Validators.required])],
            fileDetails: null,
            isNew: true,
            product_images: [],
            weight: [0, Validators.compose([Validators.required])],
            status: [this.isPublished ? 'IN-STOCK' : 'IN-DRAFT', Validators.compose([Validators.required])],
            is_public: [false, Validators.compose([Validators.required])],
            is_default_product: [false, Validators.compose([Validators.required])],
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
    createEmptyGrindVariant() {
        return this.fb.group({
            grind_variant_id: '',
            price: [0, Validators.compose([Validators.required])],
            grind: ['', Validators.compose([Validators.required])],
            available_quantity: [0, Validators.compose([Validators.required])],
            available_quantity_type: this.type === 'b2b' ? 'boxes' : 'bags',
            sku_number: ['', Validators.compose([Validators.required])],
        });
    }

    deleteGrindVariant(idx) {
        const weight = this.weightForm.get('weights') as FormArray;
        const grindVariants = weight.controls[this.currentVariantIndex].get('grind_variants') as FormArray;
        grindVariants.removeAt(idx);
    }
    handleRoasterFile(e, index, type) {
        if (e.target.files.length > 0) {
            for (let i = 0; i <= e.target.files.length - 1; i++) {
                const fsize = e.target.files.item(i).size;
                const file = Math.round(fsize / 1024);
                // The size of the file.
                if (file >= 2048) {
                    this.toaster.error('File too big, please select a file smaller than 2mb');
                } else {
                    const imgFile: any = e.target.files;
                    const reader = new FileReader();
                    reader.readAsDataURL(imgFile[0]);
                    reader.onload = (event) => {
                        const imgURL = reader.result;
                        fileObj.image_url = imgURL;
                    };
                    this.uploadDisabled = false;
                    const fileObj = e.target.files;
                    fileObj.isNew = true;
                    fileObj.fileID = '_' + Math.random().toString(36).substr(2, 9);
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
                }
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
        }
    }
    uploadImages() {
        const weight = this.weightForm.get('weights') as FormArray;
        const getValue = weight.controls[this.currentVariantIndex].value;
        const promises: any[] = [];
        if (!getValue.featured_image_id && getValue.fileDetails) {
            promises.push(
                new Promise((resolve, reject) => {
                    this.uploadImage(getValue.fileDetails, 'featured_image', resolve, reject);
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
                        this.uploadImage(ele.fileDetails, 'product_images', resolve, reject);
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
    uploadImage(fileObj, type, resolve, reject) {
        const fileList: FileList = fileObj;
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('name', file.name);
        formData.append('file_module', 'Product');

        this.fileService.uploadFiles(formData).subscribe((uploadedFile) => {
            if (uploadedFile.success) {
                const weight = this.weightForm.get('weights') as FormArray;
                if (type === 'featured_image') {
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
}
