import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { GlobalsService, ECommerceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, LazyLoadEvent } from 'primeng/api';
import { ConfirmComponent } from '@shared';
import { COUNTRY_LIST, LBUNIT } from '@constants';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    appLanguage: any;
    breadCrumbItems: MenuItem[];
    tableData: any[] = [];
    tableColumns: any[] = [];
    isMobileView = false;
    loading = false;

    selectedOrigin: any;
    selectedPriceRange: any;
    selectedStatus: any;
    keywords: string;
    totalCount = 0;
    mobileFields: any[] = [
        {
            field: 'status',
            header: 'Status',
        },
        {
            field: 'origin',
            header: 'Origin',
        },
        {
            field: 'estate_name',
            header: 'Estate',
        },
        {
            field: 'roast_level',
            header: 'Roast',
        },
        {
            field: 'price',
            header: 'Price',
        },
    ];

    priceRangeArray: any[] = [
        { label: '$0-$500', value: { price_min: '0', price_max: '500' } },
        { label: '$500-$1000', value: { price_min: '500', price_max: '1000' } },
    ];
    statusArray: any[] = [
        { label: 'In Stock', value: 'IN-STOCK' },
        { label: 'Sold', value: 'OUT-OF-STOCK' },
    ];

    roastLevelArray = {
        1: 'Light',
        2: 'Light Medium',
        3: 'Medium',
        4: 'Medium Dark',
        5: 'Dark',
    };

    visibilityArray: any[] = [
        {
            label: 'Public',
            value: true,
        },
        {
            label: 'Not Public',
            value: false,
        },
    ];
    visibilityStatus: boolean;

    originArray: any[];
    type: string;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    constructor(
        public dialogSrv: DialogService,
        public router: Router,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        private activatedRoute: ActivatedRoute,
        private eCommerceService: ECommerceService,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.type = params.type;
            this.selectedOrigin = null;
            this.selectedPriceRange = null;
            this.selectedStatus = null;
            this.keywords = '';
            this.breadCrumbItems = [
                { label: this.globals.languageJson?.home, routerLink: '/' },
                {
                    label: this.globals.languageJson?.ecommerce,
                },
                {
                    label:
                        this.type === 'other'
                            ? this.globals.languageJson?.other_products
                            : this.globals.languageJson[`${this.type}_product_catalog`],
                },
            ];
            this.initializeTable();
            this.loadData();
        });
    }

    initializeTable() {
        this.isMobileView = window.innerWidth <= 767;
        if (this.isMobileView) {
            this.tableColumns = [
                {
                    field: 'name',
                    header: 'product_name',
                    sortable: false,
                },
                {
                    field: 'featured_image',
                    header: 'image',
                    sortable: false,
                },
            ];
        } else {
            this.tableColumns =
                this.type === 'other'
                    ? [
                          {
                              field: 'name',
                              header: 'product_name',
                              sortable: true,
                              width: '190px',
                          },
                          {
                              field: 'business_type',
                              header: 'Product for',
                              sortable: false,
                          },
                          {
                              field: 'manufacturer_name',
                              header: 'Manufacturer name',
                              sortable: false,
                          },
                          {
                              field: 'sku_number',
                              header: 'SKU number',
                              sortable: false,
                          },
                          {
                              field: 'status',
                              header: 'Status',
                              sortable: false,
                          },
                          {
                              field: 'price',
                              header: 'Price',
                              sortable: true,
                          },
                          {
                              field: 'actions',
                              header: 'Actions',
                              sortable: false,
                          },
                      ]
                    : [
                          {
                              field: 'name',
                              header: 'product_name',
                              sortable: true,
                              width: '190px',
                          },
                          {
                              field: 'origin',
                              header: 'Origin',
                              sortable: true,
                          },
                          {
                              field: 'estate_name',
                              header: 'estate_name',
                          },
                          {
                              field: 'roast_level',
                              header: 'roast_level',
                              sortable: false,
                          },
                          {
                              field: 'weight',
                              header: 'Weight',
                              sortable: true,
                          },
                          {
                              field: 'status',
                              header: 'Status',
                              sortable: false,
                          },
                          {
                              field: 'price',
                              header: 'Price',
                              sortable: true,
                          },
                          {
                              field: 'actions',
                              header: 'Actions',
                              sortable: false,
                          },
                      ];
        }
    }

    loadData(event?: LazyLoadEvent) {
        let page = 1;
        if (event) {
            page = event.first / event.rows + 1;
        }
        setTimeout(() => (this.loading = true), 0);
        const options: any = {
            page,
            per_page: 10,
            name: this.keywords ?? '',
            status: this.selectedStatus ?? '',
            origin: this.selectedOrigin ?? '',
            price_min: this.selectedPriceRange?.price_min ?? '',
            price_max: this.selectedPriceRange?.price_max ?? '',
            is_public:
                this.visibilityStatus === undefined || this.visibilityStatus === null ? '' : this.visibilityStatus,
            sort_by: event?.sortField,
            sort_order: event?.sortOrder === 1 ? 'asc' : 'desc',
        };
        if (this.type !== 'other') {
            options.business_type = this.type;
        }

        this.eCommerceService.getSelectProductDetails(this.type, options).subscribe(
            (res: any) => {
                if (res.success) {
                    if (this.type !== 'other') {
                        this.originArray = COUNTRY_LIST.filter((item) =>
                            res.result?.find((prod) => prod.origin.toLowerCase() === item.isoCode.toLocaleLowerCase()),
                        );
                    }
                    this.tableData = res.result ?? [];
                    this.totalCount = res.result_info.total_count;
                } else {
                    this.toastrService.error('Error while getting the agreement list!');
                }
                this.loading = false;
            },
            (err) => {
                this.loading = false;
                this.toastrService.error('Error while getting the agreement list!');
            },
        );
    }

    deleteproduct(deleteId): void {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.eCommerceService.deleteProductDetails(deleteId, this.type).subscribe(
                        (res) => {
                            if (res.success) {
                                this.toastrService.success('Product deleted successfully');
                                this.loadData();
                            } else {
                                this.toastrService.error('Error while deleting the product');
                            }
                        },
                        (err) => {
                            this.toastrService.error('Error while deleting the product');
                        },
                    );
                }
            });
    }

    getMenuItemsForItem(item) {
        const items = [
            {
                label: this.globals.languageJson?.edit_product,
                command: () => {
                    this.onViewDetails(item);
                },
            },
            {
                label: this.globals.languageJson?.delete,
                command: () => {
                    this.deleteproduct(item.id);
                },
            },
        ];
        return [{ items }];
    }

    onViewDetails(item) {
        this.router.navigate([`/e-commerce/product-details/${this.type}/${item.id}`]);
    }

    getWeight(value, unit) {
        const weight = unit === 'lb' ? value / LBUNIT : unit === 'g' ? value * 1000 : value;
        return Math.round(weight * 100) / 100;
    }
}
