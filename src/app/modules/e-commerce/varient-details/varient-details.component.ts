import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService, ResizeService, FileService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ResizeableComponent } from '@base-components';

@Component({
    selector: 'app-varient-details',
    templateUrl: './varient-details.component.html',
    styleUrls: ['./varient-details.component.scss'],
})
export class VarientDetailsComponent extends ResizeableComponent implements OnInit {
    weightForm: FormGroup;
    weights: FormArray;
    grindVariants: FormArray;
    @Input() varientDetails: any;
    currentVarientIndex = 0;
    statusArray: any = [];
    grindArray: any = [];
    productID: any = '';
    deleteImageIDs: any = [];
    roasterID: any = '';
    weightTypeArray: any = '';
    quantityTypeArray: any = '';
    @Output() handleWeightCreate = new EventEmitter();
    @Output() handleWeightDelete = new EventEmitter<any>();
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
        weight.controls[this.currentVarientIndex].get('product_images').setValue(this.setProductImages([]));
        weight.controls[this.currentVarientIndex].get('weight').valueChanges.subscribe((value) => {
            this.onWeightChange(value);
        });
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.productID = params.id;
                this.loadWeight();
            } else {
                this.updateCrate(0);
                this.createWeightVariantArray();
            }
        });
        this.statusArray = [
            { label: 'In Stock', value: 'in-stock' },
            { label: 'Out of Stock', value: 'out-of-stock' },
        ];
        this.weightTypeArray = [
            { label: 'lb', value: 'lb' },
            { label: 'kg', value: 'kg' },
        ];
        this.quantityTypeArray = [
            { label: 'boxes', value: 'boxes' },
            { label: 'kg', value: 'kg' },
        ];
        this.grindArray = [
            { label: 'Extra Coarse', value: 'extra-coarse' },
            { label: 'Coarse', value: 'coarse' },
            { label: 'Medium Coarse', value: 'medium-coarse' },
            { label: 'Medium', value: 'medium' },
            { label: 'Fine', value: 'fine' },
            { label: 'Extra Fine', value: 'extra-fine' },
        ];
    }

    onChangeCurrentWeight(event) {
        this.currentVarientIndex = event.value ?? event.index ?? event;
        this.grindVariants = (this.weightForm.get('weights') as FormArray).controls[this.currentVarientIndex].get(
            'grind_variants',
        ) as FormArray;
    }
    onWeightChange(value, index?) {
        const weights = this.weightForm.get('weights') as FormArray;
        const weight = weights.controls[!!index ? index : this.currentVarientIndex];
        if (weight) {
            weight.patchValue({
                weight_name: `weight - ${value}${weight.value.weight_unit}`,
            });
            const getObj = {
                value,
                product_weight_variant_id: weight.value.product_weight_variant_id,
                unit: weight.value.weight_unit,
                variant_name: this.varientDetails.value.varient_name,
                modify: true,
            };
            this.handleWeightCreate.emit(getObj);
        }
        this.createWeightVariantArray();
    }
    onWeightUnitChange() {
        const weights = this.weightForm.get('weights') as FormArray;
        const weight = weights.controls[this.currentVarientIndex];
        weight.patchValue({
            weight_name: `weight - ${weight.value.weight}${weight.value.weight_unit}`,
        });
        const getObj = {
            value: weight.value.weight,
            product_weight_variant_id: weight.value.product_weight_variant_id,
            unit: weight.value.weight_unit,
            variant_name: this.varientDetails.value.varient_name,
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
            variant_name: this.varientDetails.value.varient_name,
            modify: false,
        };
        this.handleWeightCreate.emit(getObj);
    }
    loadWeight() {
        if (this.varientDetails.value.weight_variants) {
            this.weights = this.weightForm.get('weights') as FormArray;
            this.weights.removeAt(0);
            this.varientDetails.value.weight_variants.forEach((ele, index) => {
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
                const formGrind = this.createEmptyGrindVarient();
                this.grindVariantFields.forEach((field) => {
                    formGrind.controls[field].setValue(variant[field]);
                });
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
            this.currentVarientIndex = this.weights.length - 1;
        }, 300);
    }
    deleteWeightVarient(index) {
        const weight = this.weights.controls[this.currentVarientIndex];
        this.weights.removeAt(index);
        this.handleWeightDelete.emit(weight.value.product_weight_variant_id);
        this.weightVariantArray.splice(index, 1);
        this.currentVarientIndex = 0;
    }
    addNewGrindVarients(): void {
        this.displayDelete = true;
        this.grindVariants = (this.weightForm.get('weights') as FormArray).controls[this.currentVarientIndex].get(
            'grind_variants',
        ) as FormArray;
        this.grindVariants.push(this.createEmptyGrindVarient());
    }
    createEmptyWeights() {
        const emptyVarientID = '_' + Math.random().toString(36).substr(2, 9);
        const emptyWeight: FormGroup = this.fb.group({
            weight_name: 'weight - 0 lb',
            weight_unit: 'lb',
            product_weight_variant_id: emptyVarientID,
            featured_image_id: '',
            fileDetails: null,
            isNew: true,
            product_images: [],
            weight: [0, Validators.compose([Validators.required])],
            status: ['in-stock', Validators.compose([Validators.required])],
            is_public: [false, Validators.compose([Validators.required])],
            is_default_product: [false, Validators.compose([Validators.required])],
            grind_variants: this.fb.array([this.createEmptyGrindVarient()]),
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
    createEmptyGrindVarient() {
        return this.fb.group({
            grind_variant_id: '',
            price: [0, Validators.compose([Validators.required])],
            grind: ['', Validators.compose([Validators.required])],
            available_quantity: [0, Validators.compose([Validators.required])],
            available_quantity_type: 'crate',
            sku_number: ['', Validators.compose([Validators.required])],
        });
    }

    deleteGrindVariant(idx) {
        const weight = this.weightForm.get('weights') as FormArray;
        const grindVariants = weight.controls[this.currentVarientIndex].get('grind_variants') as FormArray;
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
                    const fileObj = e.target.files;
                    fileObj.isNew = true;
                    fileObj.fileID = '_' + Math.random().toString(36).substr(2, 9);
                    const weight = this.weightForm.get('weights') as FormArray;
                    if (type === 'featured_image') {
                        weight.controls[this.currentVarientIndex].patchValue({
                            fileDetails: fileObj,
                            featured_image_id: '',
                        });
                    } else {
                        weight.controls[this.currentVarientIndex].patchValue({
                            fileDetails: fileObj,
                        });
                    }
                }
            }
        }
    }
    deleteImage(index, type?) {
        const weight = this.weightForm.get('weights') as FormArray;
        if (type === 'feature_image') {
            const getValue = weight.controls[this.currentVarientIndex].value;
            if (getValue && getValue.featured_image_id) {
                this.deleteImageIDs.push(getValue.featured_image_id);
            }
            weight.controls[this.currentVarientIndex].patchValue({
                fileDetails: null,
                featured_image_id: '',
            });
        } else {
            const productArray = weight.controls[this.currentVarientIndex].get('product_images').value;
            if (productArray[index].fileDetails && productArray[index].fileDetails.image_id) {
                this.deleteImageIDs.push(productArray[index]);
            }
            productArray[index].fileDetails = null;
        }
    }
    uploadImages() {
        const weight = this.weightForm.get('weights') as FormArray;
        const getValue = weight.controls[this.currentVarientIndex].value;
        if (!getValue.featured_image_id && getValue.fileDetails) {
            this.uploadImage(getValue.fileDetails, 'featured_image', 0, true);
        }
        const productImageArray = weight.controls[this.currentVarientIndex].get('product_images').value;
        const getNewImage = productImageArray.filter(
            (ele) => ele.fileDetails && !ele.image_id && ele.fileDetails.image_url,
        );
        console.log(productImageArray, getNewImage);
        getNewImage.forEach((ele, index) => {
            if (ele.fileDetails && !ele.fileDetails.image_id && ele.fileDetails.image_url) {
                let showToaster = false;
                if (index === getNewImage.length - 1) {
                    showToaster = true;
                }
                this.uploadImage(ele.fileDetails, 'product_images', showToaster);
            }
        });
    }
    async uploadImage(fileObj, type, index, showToaster?) {
        const fileList: FileList = fileObj;
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('name', file.name);
        formData.append('file_module', 'Product');

        const UploadedFile = await this.fileService.uploadFiles(formData).toPromise();
        if (UploadedFile.success) {
            const weight = this.weightForm.get('weights') as FormArray;
            if (type === 'featured_image') {
                weight.controls[this.currentVarientIndex].get('featured_image_id').setValue(UploadedFile.result.id);
                this.toaster.success('Image uploaded successfully');
            } else {
                const productImageArray = weight.controls[this.currentVarientIndex].get('product_images').value;
                const foundObj = productImageArray.find((ele) => ele.fileDetails.fileID === fileObj.fileID);
                if (foundObj) {
                    foundObj.image_id = UploadedFile.result.id;
                }
                if (showToaster) {
                    this.toaster.success('Image uploaded successfully');
                }
            }
        } else {
            this.toaster.error('Error while uploading image.');
        }
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
        if (name) {
            const strArr = name.split('/');
            const lastItem = strArr[strArr.length - 1];
            return lastItem.split('?')[0];
        }
        return '';
    }
}
