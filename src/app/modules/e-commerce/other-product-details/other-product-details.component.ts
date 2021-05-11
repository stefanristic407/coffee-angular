import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService, RoasterserviceService, UserserviceService, ECommerceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-other-product-details',
    templateUrl: './other-product-details.component.html',
    styleUrls: ['./other-product-details.component.scss'],
})
export class OtherProductDetailsComponent implements OnInit {
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

    constructor(
        public globals: GlobalsService,
        private fb: FormBuilder,
        private cookieService: CookieService,
        private toasterService: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private roasterService: RoasterserviceService,
        private userService: UserserviceService,
        private eCommerceService: ECommerceService,
    ) {
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
            description: ['', Validators.compose([Validators.required])],
            manufacturer_name: ['', Validators.compose([Validators.required])],
            price: ['', Validators.compose([Validators.required])],
            available_quantity: ['', Validators.compose([Validators.required])],
            available_quantity_type: ['', Validators.compose([Validators.required])],
            sku_number: ['', Validators.compose([Validators.required])],
            business_type: ['', Validators.compose([Validators.required])],
            information: ['', Validators.compose([Validators.required])],
            status: ['', Validators.compose([Validators.required])],
            length: [''],
            length_unit: [''],
            width: [''],
            width_unit: [''],
            weight: [''],
            weight_unit: [''],
            height: [''],
            height_unit: [''],
            product_images: ['', Validators.compose([Validators.required])],
            product_use_images: [''],
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
                    this.productForm.patchValue({
                        name: productDetails.name,
                        purchase_type: productDetails.purchase_type,
                        description: productDetails.description,
                        is_public: productDetails.is_public,
                        is_variants_included: productDetails.is_variants_included,
                        vat_setting_id: productDetails.vat_setting_id,
                        is_price_including_vat: productDetails.is_price_including_vat,
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
}
