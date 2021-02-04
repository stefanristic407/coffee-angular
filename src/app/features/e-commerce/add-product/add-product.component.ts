import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeStamp } from 'console';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
    isPublicOptions: any[] = [
        { label: 'Public', value: true },
        { label: 'Private', value: false },
    ];
    isPublic: any;
    appLanguage?: any;
    statusChange: string;
    productId: any;

    grindVariant = [
        {
            price: '',
            grind: '',
            stock: '',
            skunumber: '',
        },
    ];
    roasterId: any;
    vatSettings: any = [];
    roastedBatches: any;
    coffeeBatch: any = '';
    currentVarientIndex = 0;
    coffeeBatchDetails: any = {};
    rc_batch_id = '';
    product = {
        name: '',
        purchase_type: '',
        discount_eligibility: false,
        discount_amount: 0,
        bought_platform: 'Yes',
        discount_type: '',
        is_price_including_vat: true,
        discount_applicable_to: '',
        is_public: true,
        vat_setting_id: null,
        brewing_method: '',
        roaster_recommendation: '',
        is_featured: true,
        crates: [
            {
                weight: 0,
                crate_unit: 'lb',
                crate_capacity: 0,
            },
        ],
        is_variants_included: false,
    };
    varients = [
        {
            status: 'in-stock',
            is_default_product: true,
            weight: 0,
            weight_unit: 'lb',
            is_public: true,
            featured_image_id: null,
            variant_id: null,
            rc_batch_id: 1,
            grind_variants: [
                {
                    price: 0,
                    grind: '',
                    available_quantity: 0,
                    available_quantity_type: 'crate',
                    sku_number: '',
                },
            ],
            product_images: [],
            files: [],
        },
    ];
    deleteFileIDs: any = [];
    newProduct = true;
    constructor(
        public globals: GlobalsService,
        public services: RoasterserviceService,
        private cookieService: CookieService,
        private route: ActivatedRoute,
        private router: Router,
        private toaster: ToastrService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.appLanguage = this.globals.languageJson;
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.productId = params.id;
                this.newProduct = false;
                this.getProductDetails(this.productId);
            } else {
                this.varients[0]['files'] = this.setProductImages(this.varients[0]['files'], 'files');
            }
        });
        this.services.getVatSettings(this.roasterId).subscribe((res) => {
            this.vatSettings = res.result ? res.result : [];
        });
        this.services.getRoastedBatches(this.roasterId).subscribe((res) => {
            this.roastedBatches = res.result ? res.result : [];
        });
    }
    getProductDetails(id) {
        this.services.getProductDetails(this.roasterId, id).subscribe((res) => {
            console.error(res.result);
            this.product = res.result;
            this.varients = this.setVarient(res.result.variants);
            this.isPublic = this.isPublicOptions.find((element) => element.value === this.product.is_public);
        });
    }
    setVarient(data) {
        const result = [];
        const keys = Object.keys(data);
        keys.forEach((ele, index) => {
            data[ele][index].files = this.setProductImages(data[ele][index].product_images, 'files');
            data[ele][index].product_images = this.setProductImages(data[ele][index].product_images);
            this.rc_batch_id = data[ele][0].rc_batch_id;
            this.getCoffeeBatchDetails(this.rc_batch_id);
            result.push(data[ele][0]);
        });
        return result;
    }
    setProductImages(images, type?) {
        const result = [];
        if (images && images.length) {
            images.forEach((ele) => {
                if (type == 'files') {
                    result.push(ele);
                } else {
                    result.push(ele.image_id);
                }
            });
        }
        if (type == 'files') {
            const productEmptyArray = [];
            const startIndex = result ? result.length : 0;
            for (let i = startIndex; i < 3; i++) {
                const fileObj = { isEmpty: true };
                productEmptyArray.push(fileObj);
            }
            return result.concat(productEmptyArray);
        } else {
            return result;
        }
    }
    async getCoffeeBatchDetails(id) {
        this.coffeeBatchDetails = await this.services.getCoffeeBatchDetails(this.roasterId, id).toPromise();
    }

    public addNewVariant(index) {
        this.varients[index].grind_variants.push({
            price: 0,
            grind: '',
            available_quantity: 0,
            available_quantity_type: 'crate',
            sku_number: '',
        });
    }
    addWeightVarient() {
        this.varients.push({
            status: 'IN-STOCK',
            is_default_product: true,
            weight: 0,
            weight_unit: 'lb',
            is_public: true,
            featured_image_id: null,
            variant_id: null,
            rc_batch_id: 1,
            grind_variants: [
                {
                    price: 0,
                    grind: '',
                    available_quantity: 0,
                    available_quantity_type: 'crate',
                    sku_number: '',
                },
            ],
            product_images: [],
            files: [],
        });
    }

    public deleteRow(gIndex, index) {
        this.varients[gIndex].grind_variants.splice(index, 1);
    }

    public saveProduct() {
        if (!this.validateProduct()) {
            this.toaster.error('Please fill the required fields');
            return false;
        }
        this.product.is_public = this.isPublic.value;
        this.product.vat_setting_id = parseInt(this.product.vat_setting_id);
        this.services.addProductDetails(this.roasterId, this.product).subscribe((res) => {
            if (res.success) {
                this.productId = res.result.id;
                this.varients.forEach((ele, index) => {
                    ele.rc_batch_id = parseInt(this.rc_batch_id);
                    ele.variant_id = 1;
                    delete ele.files;
                    this.services.addProductWeightVarients(this.roasterId, this.productId, ele).subscribe((res) => {
                        this.toaster.success('Product Created Successfully');
                        this.router.navigate(['/features/products-list']);
                    });
                });
            } else {
                console.log('error');
            }
        });
    }
    updateProduct() {
        delete this.product['variants'];
        delete this.product['roaster_id'];
        delete this.product['id'];
        this.product.crates.forEach((ele) => {
            delete ele['id'];
        });
        this.product.is_public = this.isPublic.value;
        if (!this.validateProduct()) {
            this.toaster.error('Please fill the required fields');
            return false;
        }
        this.services.updateProductDetails(this.roasterId, this.productId, this.product).subscribe((res) => {
            this.toaster.success('Product Details updated Successfully');
        });
        this.varients.forEach((ele) => {
            ele.rc_batch_id = parseInt(this.rc_batch_id);
            ele.variant_id = 1;
            if (ele['product_weight_variant_id']) {
                this.services
                    .updateProductWeightVarients(this.roasterId, this.productId, ele, ele['product_weight_variant_id'])
                    .subscribe((res) => {
                        console.log(res);
                    });
            } else {
                this.services.addProductWeightVarients(this.roasterId, this.productId, ele).subscribe((res) => {
                    console.log(res);
                });
            }
        });
    }
    validateProduct() {
        let prodcutFlag = true;
        let variantFlag = true;
        if (
            !this.product.name.trim() ||
            !this.product.purchase_type ||
            !this.product.roaster_recommendation.trim() ||
            !this.product.vat_setting_id ||
            !this.product.brewing_method
        ) {
            prodcutFlag = false;
        }
        this.varients.forEach((ele) => {
            if (!ele.weight || !ele.status) {
                variantFlag = false;
            }
            ele.grind_variants.forEach((el) => {
                if (!el.price || !el.available_quantity || !el.sku_number || !el.grind) {
                    variantFlag = false;
                }
            });
        });
        return prodcutFlag && variantFlag;
    }
    handleRoasterFile(e, index, type?) {
        if (e.target.files.length > 0) {
            for (let i = 0; i <= e.target.files.length - 1; i++) {
                const fsize = e.target.files.item(i).size;
                const file = Math.round(fsize / 1024);
                // The size of the file.
                if (file >= 2048) {
                    this.toaster.error('File too big, please select a file smaller than 2mb');
                } else {
                    const file = e.target.files;
                    const reader = new FileReader();
                    reader.readAsDataURL(file[0]);
                    reader.onload = (_event) => {
                        const imgURL = reader.result;
                        fileObj['imgURL'] = imgURL;
                    };
                    const fileObj = e.target.files;
                    fileObj['isNew'] = true;
                    fileObj['fileID'] = '_' + Math.random().toString(36).substr(2, 9);
                    if (type == 'featured_image') {
                        this.varients[this.currentVarientIndex]['featured_image'] = fileObj;
                    } else {
                        this.varients[this.currentVarientIndex].files[index] = fileObj;
                    }
                }
            }
        }
    }
    iterateFiles() {
        const currentVarient = this.varients[this.currentVarientIndex];
        if (currentVarient['featured_image'] && currentVarient['featured_image']['isNew']) {
            this.uploadImage(currentVarient['featured_image'], 'featured_image');
        }
        this.varients[this.currentVarientIndex].files.forEach((ele) => {
            if (ele['imgURL'] && ele['isNew']) {
                this.uploadImage(ele);
            }
        });
        // if(!this.newProduct){
        //     const selectedVariant = this.varients[this.currentVarientIndex];
        //     selectedVariant.rc_batch_id = parseInt(this.rc_batch_id);
        //     selectedVariant.variant_id = 1;
        //     if (selectedVariant['product_weight_variant_id']) {
        //         this.services
        //             .updateProductWeightVarients(this.roasterId, this.productId, selectedVariant, selectedVariant['product_weight_variant_id'])
        //             .subscribe((res) => {
        //                 if(this.deleteFileIDs && this.deleteFileIDs.length > 0){
        //                     this.deleteFileIDs.forEach(item =>{
        //                         this.deleteFileFromServer(item);
        //                     });
        //                 }
        //             }, err =>{
        //                 this.toaster.success("Error while updating the images.")
        //             });
        //     }
        // }
    }
    async deleteFileFromServer(fileID) {
        const deleteFile = await this.services.deleteProductImage(this.roasterId, fileID).toPromise();
        return deleteFile;
    }

    async uploadImage(fileObj, type?) {
        const fileList: FileList = fileObj;
        const file: File = fileList[0];
        const UploadedFile = await this.services.uploadProductImage(this.roasterId, file).toPromise();
        if (UploadedFile.success) {
            if (type == 'featured_image') {
                this.varients[this.currentVarientIndex]['featured_image_id'] = UploadedFile.result.id;
            } else {
                if (!this.varients[this.currentVarientIndex].files) {
                    this.varients[this.currentVarientIndex].files = [];
                }
                this.varients[this.currentVarientIndex].product_images.push(UploadedFile.result.id);
                let foundObj = this.varients[this.currentVarientIndex].files.find(
                    (ele) => ele['fileID'] == fileObj['fileID'],
                );
                if (foundObj) {
                    foundObj = UploadedFile.result;
                }
            }

            //this.varients[this.currentVarientIndex].files.push(UploadedFile.result);
        }
    }
    triggerInputEdit(inputID) {
        const fileID = '#' + inputID;
        $(fileID).trigger('click');
    }
    deleteImage(file, index, type?) {
        if (type == 'feature_image') {
            if (file && file['image_id']) {
                this.deleteFileIDs.push(file['image_id']);
            }
            this.varients[this.currentVarientIndex]['featured_image'] = null;
            this.varients[this.currentVarientIndex]['featured_image_id'] = '';
        } else {
            this.varients[this.currentVarientIndex].files[index] = { isEmpty: true };
            if (file['image_id']) {
                this.varients[this.currentVarientIndex].product_images.splice(index, 1);
                this.deleteFileIDs.push(file['image_id']);
            }
        }
    }
}
