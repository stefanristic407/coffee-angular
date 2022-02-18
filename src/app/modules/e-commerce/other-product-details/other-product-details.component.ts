import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { OTHER_PRODUCT_STATUS_ITEMS } from '@constants';
import { FileModule } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, ECommerceService, FileService, ResizeService } from '@services';
import { fileRequired, maxWordCountValidator } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';

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
        { label: 'B2B', value: 'b2b' },
        { label: 'B2C', value: 'b2c' },
        { label: 'Both', value: 'both' },
    ];
    statusList = OTHER_PRODUCT_STATUS_ITEMS;
    lengthUnitList: any[] = [
        { label: 'mm', value: 'mm' },
        { label: 'cm', value: 'cm' },
    ];
    weightUnitList: any[] = [
        { label: 'kl', value: 'kl' },
        { label: 'kg', value: 'kg' },
    ];
    supplierList: any[] = [{ label: 'Supplier', value: 987899 }];
    availableTypeList: any[] = [{ label: 'units', value: 'units' }];

    productFields: string[] = [
        'available_quantity',
        'available_quantity_type',
        'business_type',
        'description',
        'height',
        'height_unit',
        'information',
        'is_price_including_vat',
        'is_public',
        'length',
        'length_unit',
        'manufacturer_name',
        'model_number',
        'name',
        'price',
        'sku_number',
        'status',
        'supplier_id',
        'vat_setting_id',
        'weight',
        'weight_unit',
        'width',
        'width_unit',
    ];
    baseCurrency: string;

    constructor(
        private authService: AuthService,
        private eCommerceService: ECommerceService,
        private fb: FormBuilder,
        private fileService: FileService,
        private route: ActivatedRoute,
        private router: Router,
        private toasterService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
        this.roasterId = this.authService.getOrgId();
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
            available_quantity_type: ['units', Validators.compose([Validators.required])],
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
            featured_image_id: [null, [fileRequired()]],
            product_images: this.fb.array([]),
            product_use_images: this.fb.array([]),
        });
        const productImages = this.productForm.get('product_images') as FormArray;
        const productUserImages = this.productForm.get('product_use_images') as FormArray;
        for (let i = 0; i < 3; i++) {
            productImages.push(new FormControl(null));
            productUserImages.push(new FormControl(null));
        }
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.productID = params.id;
                this.getProductDetails();
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
        this.authService.organizationSubject.subscribe((res) => {
            this.baseCurrency = res?.base_currency;
        });
    }

    getProductDetails() {
        this.eCommerceService.getProductDetails(this.productID, 'other').subscribe((res) => {
            if (res && res.result) {
                const productDetails = res.result;
                this.isPublished = res.result.is_published;
                this.breadCrumbItem = [
                    { label: this.translator.instant('home'), routerLink: '/' },
                    {
                        label: this.translator.instant('ecommerce'),
                    },
                    {
                        label: this.translator.instant('other_products'),
                        routerLink: '/e-commerce/product-list/other',
                    },
                    { label: res.result.name },
                ];
                const productImages = productDetails.product_images?.map((image) => {
                    return {
                        id: image.image_id,
                        url: image.image_url,
                    };
                });

                const productUseImages = productDetails.product_use_images?.map((image) => {
                    return {
                        id: image.image_id,
                        url: image.image_url,
                    };
                });

                for (const key of this.productFields) {
                    this.productForm.get(key).setValue(productDetails[key]);
                }

                this.productForm.patchValue({
                    featured_image_id: {
                        id: productDetails.featured_image?.image_id,
                        url: productDetails.featured_image?.image_url,
                    },
                    product_images: productImages ?? [],
                    product_use_images: productUseImages ?? [],
                });
                this.productName = productDetails.name;
            }
        });
    }

    supplyBreadCrumb(): void {
        this.breadCrumbItem = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('ecommerce') },
            { label: this.translator.instant('other_products'), routerLink: '/e-commerce/product-list/other' },
            { label: 'Add product' },
        ];
    }

    onCancel(): void {
        this.router.navigate([`/e-commerce/product-list/other`]);
    }

    onSave() {
        if (this.productForm.valid) {
            new Promise((resolve, reject) => this.uploadImages(resolve, reject))
                .then(() => {
                    const productObj = {
                        ...this.productForm.value,
                        featured_image_id: this.productForm.value.featured_image_id?.id,
                        product_images: this.productForm.value.product_images.filter((ix) => ix?.id).map((ix) => ix.id),
                        product_use_images: this.productForm.value.product_use_images
                            .filter((ix) => ix?.id)
                            .map((ix) => ix.id),
                    };

                    for (const key of Object.keys(productObj)) {
                        if (productObj[key] === '' || productObj[key] === null) {
                            delete productObj[key];
                        }
                    }
                    if (this.productID) {
                        this.updateProductDetails(productObj);
                    } else {
                        this.createNewProduct(productObj);
                    }
                })
                .catch(() => {
                    this.toasterService.error('Error while uploading images');
                });
        } else {
            this.toasterService.error(this.translator.instant('please_check_form_data'));
            this.productForm.markAllAsTouched();
        }
    }

    createNewProduct(productObj) {
        this.eCommerceService.addProductDetails(productObj, 'other').subscribe(
            (res) => {
                if (res && res.success) {
                    this.toasterService.success('Product created successfully');
                    this.router.navigate(['/e-commerce/product-list/other']);
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
                    this.router.navigate(['/e-commerce/product-list/other']);
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

    uploadImages(pResolve, pReject) {
        const promises: any[] = [];
        const featuredControl: FormControl = this.productForm.get('featured_image_id') as FormControl;
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
        const images = (this.productForm.get('product_images') as FormArray).controls.concat(
            (this.productForm.get('product_use_images') as FormArray).controls,
        );
        images.forEach((imageControl: FormControl) => {
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
            .catch((err) => pReject());
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
}
