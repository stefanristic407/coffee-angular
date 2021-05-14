import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService, ResizeService, ECommerceService, FileService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { trackFileName, maxWordCountValidator } from '@utils';
import { ResizeableComponent } from '@base-components';

@Component({
    selector: 'app-other-product-details',
    templateUrl: './other-product-details.component.html',
    styleUrls: ['./other-product-details.component.scss'],
})
export class OtherProductDetailsComponent extends ResizeableComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    productForm: FormGroup;
    roasterId: any = '';
    vatSettings: any = [];
    productID = '';
    productName: any = '';
    visibilityOptions = [
        { label: 'Public', value: true },
        { label: 'Private', value: false },
    ];
    isPublished: boolean;
    businessTypeList: any[] = [
        { label: 'B2B', value: 'B2B' },
        { label: 'B2C', value: 'B2C' },
        { label: 'Both', value: 'Both' },
    ];
    statusList: any[] = [
        { label: 'In stoke', value: 'in-stock' },
        { label: 'Out of stock', value: 'out-of-stock' },
    ];
    lengthUnitList: any[] = [
        { label: 'mm', value: 'mm' },
        { label: 'cm', value: 'cm' },
    ];
    weightUnitList: any[] = [
        { label: 'kl', value: 'kl' },
        { label: 'kg', value: 'kg' },
    ];
    supplierList: any[] = [];
    availableTypeList: any[] = [
        { label: 'boxes', value: 'boxes' },
        { label: 'kg', value: 'kg' },
    ];

    deleteImageIDs: string[];

    constructor(
        public globals: GlobalsService,
        private fb: FormBuilder,
        private cookieService: CookieService,
        private toasterService: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private fileService: FileService,
        private eCommerceService: ECommerceService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
            is_price_including_vat: [false],
            is_public: [false],
            name: ['', Validators.compose([Validators.required])],
            vat_setting_id: ['', Validators.compose([Validators.required])],
            model_number: [''],
            supplier_id: [''],
            description: ['', Validators.compose([Validators.required, maxWordCountValidator(300)])],
            manufacturer_name: ['', Validators.compose([Validators.required])],
            price: ['', Validators.compose([Validators.required])],
            available_quantity: ['', Validators.compose([Validators.required])],
            available_quantity_type: ['', Validators.compose([Validators.required])],
            sku_number: ['', Validators.compose([Validators.required])],
            business_type: ['', Validators.compose([Validators.required])],
            information: ['', Validators.compose([Validators.required, maxWordCountValidator(300)])],
            status: ['', Validators.compose([Validators.required])],
            length: [''],
            length_unit: [''],
            width: [''],
            width_unit: [''],
            weight: [''],
            weight_unit: [''],
            height: [''],
            height_unit: [''],
            featured_image_id: ['', Validators.compose([Validators.required])],
            fileDetails: null,
            product_images: [this.setProductImages([])],
            product_use_images: [this.setProductImages([])],
        });
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.productID = params.id;
            }
        });

        this.eCommerceService.getVatSettings().subscribe((res) => {
            this.vatSettings = [];
            if (res && res.result) {
                res.result.forEach((ele) => {
                    const vatObj = { label: ele.vat_percentage + '% ' + ele.transaction_type, value: ele.id };
                    this.vatSettings.push(vatObj);
                });
            }
        });
        this.supplyBreadCrumb();
    }

    getProductDetails() {
        this.eCommerceService.getProductDetails(this.productID, 'other').subscribe(
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
                            label: this.globals.languageJson?.other_products,
                            routerLink: '/e-commerce/product-list/other',
                        },
                        { label: res.result.name },
                    ];
                    const productImages = productDetails.product_images.map((image) => {
                        return {
                            image_id: image.image_id,
                            fileDetails: { image_url: image.image_url },
                        };
                    });

                    const productUseImages = productDetails.product_use_images.map((image) => {
                        return {
                            image_id: image.image_id,
                            fileDetails: { image_url: image.image_url },
                        };
                    });

                    this.productForm.patchValue({
                        name: productDetails.name,
                        purchase_type: productDetails.purchase_type,
                        description: productDetails.description,
                        is_public: productDetails.is_public,
                        is_variants_included: productDetails.is_variants_included,
                        vat_setting_id: productDetails.vat_setting_id,
                        is_price_including_vat: productDetails.is_price_including_vat,
                        featured_image_id: productDetails.featured_image?.image_id,
                        fileDetails: { image_url: productDetails.featured_image?.image_url },
                        product_images: productImages,
                        product_use_images: productUseImages,
                    });
                    this.productName = productDetails.name;
                }
            },
            (err) => {
                this.toasterService.error('Error while getting product details');
            },
        );
    }

    supplyBreadCrumb(): void {
        this.breadCrumbItem = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            {
                label: this.globals.languageJson?.ecommerce,
            },
            {
                label: this.globals.languageJson?.other_products,
                routerLink: '/e-commerce/product-list/other',
            },
            { label: 'product' },
        ];
    }

    onCancel(): void {
        this.router.navigate([`/e-commerce/product-list/other`]);
    }

    onSave(): void {
        if (this.productForm.valid) {
            const productObj = this.productForm.value;
            if (this.productID) {
                this.updateProductDetails(productObj);
            } else {
                this.createNewProduct(productObj);
            }
        } else {
            this.productForm.markAllAsTouched();
            this.toasterService.error('Please fill all Data');
        }
    }
    createNewProduct(productObj) {
        this.eCommerceService.addProductDetails(productObj, 'other').subscribe(
            (res) => {
                if (res && res.success) {
                    this.toasterService.success('Product created successfully');
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
        this.eCommerceService.updateProductDetails(this.productID, productObj, 'other').subscribe(
            (res) => {
                if (res && res.success) {
                    this.toasterService.success('Product updated successfully');
                } else {
                    this.toasterService.error('Error while update a Product');
                }
            },
            (err) => {
                this.toasterService.error('Error while add a Product');
            },
        );
    }

    togglePublic(flag) {
        this.productForm.controls.is_public.setValue(flag);
        this.onSave();
    }

    productNameValue(event: any) {
        this.productName = event.target.value;
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

    handleImageFile(e, index, type) {
        if (e.target.files.length > 0) {
            for (let i = 0; i <= e.target.files.length - 1; i++) {
                const fsize = e.target.files.item(i).size;
                const file = Math.round(fsize / 1024);
                // The size of the file.
                if (file >= 2048) {
                    this.toasterService.error('File too big, please select a file smaller than 2mb');
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
                    if (type === 'featured_image') {
                        this.productForm.patchValue({
                            fileDetails: fileObj,
                            featured_image_id: '',
                        });
                    } else {
                        this.productForm.get(type).value[index].fileDetails = fileObj;
                    }
                }
            }
        }
    }

    deleteImage(index, type?) {
        if (type === 'featured_image') {
            if (this.productForm.value.featured_image_id) {
                this.deleteImageIDs.push(this.productForm.value.featured_image_id);
            }
            this.productForm.patchValue({
                fileDetails: null,
                featured_image_id: '',
            });
        } else {
            const productArray = this.productForm.value[type];
            if (productArray[index].fileDetails && productArray[index].image_id) {
                this.deleteImageIDs.push(productArray[index].image_id);
            }
            productArray[index].fileDetails = null;
        }
    }
    uploadImages() {
        if (!this.productForm.value.featured_image_id && this.productForm.value.fileDetails) {
            this.uploadImage(this.productForm.value.fileDetails, 'featured_image', 0, true);
        }
        const getNewImages = this.productForm.value.product_images.filter(
            (ele) => ele.fileDetails && !ele.image_id && ele.fileDetails.image_url,
        );
        const getNewUseImages = this.productForm.value.product_use_images.filter(
            (ele) => ele.fileDetails && !ele.image_id && ele.fileDetails.image_url,
        );
        const promises: any[] = [];
        for (const ele of getNewImages) {
            if (ele.fileDetails && !ele.fileDetails.image_id && ele.fileDetails.image_url) {
                promises.push(
                    new Promise((resolve, reject) => {
                        this.uploadImage(ele.fileDetails, 'product_images', resolve, reject);
                    }),
                );
            }
        }
        for (const ele of getNewUseImages) {
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
                        this.toasterService.success('Image uploaded successfully');
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

        this.fileService.uploadFiles(formData).subscribe((UploadedFile) => {
            if (UploadedFile.success) {
                if (type === 'featured_image') {
                    this.productForm.get('featured_image_id').setValue(UploadedFile.result.id);
                    this.toasterService.success('Image uploaded successfully');
                } else {
                    const productImageArray = this.productForm.get(type).value;
                    const foundObj = productImageArray.find((ele) => ele.fileDetails.fileID === fileObj.fileID);
                    if (foundObj) {
                        foundObj.image_id = UploadedFile.result.id;
                    }
                    resolve();
                }
            } else {
                this.toasterService.error('Error while uploading image.');
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

    trackFileName(name) {
        return trackFileName(name);
    }
}
