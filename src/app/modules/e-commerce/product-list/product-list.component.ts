import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { COUNTRY_LIST, LBUNIT, PRODUCT_STATUS_ITEMS } from '@constants';
import { ProductType } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { ECommerceService, OriginService, ResizeService } from '@services';
import { ConfirmComponent } from '@shared';
import { getCountry } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { DropdownItem } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import * as _ from 'underscore';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent extends ResizeableComponent implements OnInit {
    readonly PRODUCT_STATUS_ITEMS = PRODUCT_STATUS_ITEMS;
    breadCrumbItems: MenuItem[];
    tableData: any[] = [];
    tableColumns: any[] = [];
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

    roastLevelArray = {
        1: 'Light',
        2: 'Light Medium',
        3: 'Medium',
        4: 'Medium Dark',
        5: 'Dark',
    };

    visibilityArray: any[] = [
        {
            label: this.translator.instant('public'),
            value: true,
        },
        {
            label: this.translator.instant('not_public'),
            value: false,
        },
    ];
    visibilityStatus: boolean;

    origins: DropdownItem[] = [];
    type: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private dialogSrv: DialogService,
        private eCommerceService: ECommerceService,
        private originService: OriginService,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.type = params.type;
            this.selectedOrigin = null;
            this.selectedPriceRange = null;
            this.selectedStatus = null;
            this.keywords = '';
            this.visibilityStatus = null;
            this.breadCrumbItems = [
                { label: this.translator.instant('home'), routerLink: '/' },
                {
                    label: this.translator.instant('ecommerce'),
                },
                {
                    label:
                        this.type === 'other'
                            ? this.translator.instant('other_products')
                            : this.translator.instant(`${this.type}_product_catalog`),
                },
            ];
            this.initializeTable();
            this.loadData();
        });
        this.getOrigins();
    }

    initializeTable() {
        if (this.resizeService.isMobile()) {
            this.tableColumns = [
                {
                    field: 'name',
                    header: 'product_name',
                },
                {
                    field: 'featured_image',
                    header: 'image',
                },
            ];
        } else {
            if (this.type === ProductType.other) {
                this.tableColumns = [
                    {
                        field: 'name',
                        header: 'product_name',
                        sortable: true,
                        width: '25%',
                    },
                    {
                        field: 'business_type',
                        header: 'Product for',
                        width: '11%',
                    },
                    {
                        field: 'manufacturer_name',
                        header: 'Manufacturer name',
                        width: '15%',
                    },
                    {
                        field: 'sku_number',
                        header: 'SKU number',
                        width: '15%',
                    },
                    {
                        field: 'status',
                        header: 'Status',
                        width: '11%',
                    },
                    {
                        field: 'price',
                        header: 'Price',
                        sortable: true,
                        width: '11%',
                    },
                    {
                        field: 'actions',
                        header: 'Actions',
                        width: '12%',
                    },
                ];
            } else {
                this.tableColumns = [
                    {
                        field: 'name',
                        header: 'product_name',
                        sortable: true,
                        width: '25%',
                    },
                    {
                        field: 'origin',
                        header: 'Origin',
                        sortable: true,
                        width: '8%',
                    },
                    {
                        field: 'estate_name',
                        header: 'estate_name',
                        width: '13%',
                    },
                    {
                        field: 'roast_level',
                        header: 'roast_level',
                        width: '12%',
                    },
                    {
                        field: 'weight',
                        header: 'Weight',
                        sortable: true,
                        width: '10%',
                    },
                    {
                        field: 'status',
                        header: 'Status',
                        width: '10%',
                    },
                    {
                        field: 'price',
                        header: 'Price',
                        sortable: true,
                        width: '10%',
                    },
                    {
                        field: 'actions',
                        header: 'Actions',
                        width: '12%',
                    },
                ];
            }
        }
    }

    getOrigins() {
        this.originService.getOrigins({ visibility: true }).subscribe((res) => {
            if (res.success) {
                this.origins = _.chain(res.result.origins)
                    .map((item) => {
                        return { value: item, label: getCountry(item)?.name || item };
                    })
                    .value();
            }
        });
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
            sort_by: event?.sortField || 'created_at',
            sort_order: event?.sortField ? (event?.sortOrder === 1 ? 'asc' : 'desc') : 'desc',
        };
        if (this.type !== 'other') {
            options.business_type = this.type;
        }

        this.eCommerceService.getSelectProductDetails(this.type, options).subscribe(
            (res: any) => {
                if (res.success) {
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
        return [
            {
                label: this.translator.instant('edit_product'),
                command: () => {
                    this.onViewDetails(item);
                },
            },
            {
                label: this.translator.instant('delete'),
                command: () => {
                    this.deleteproduct(item.id);
                },
            },
        ];
    }

    onViewDetails(item) {
        this.router.navigate([`/e-commerce/product-details/${this.type}/${item.id}`]);
    }

    getWeight(value, unit) {
        const weight = unit === 'lb' ? value / LBUNIT : unit === 'g' ? value * 1000 : value;
        return Math.round(weight * 100) / 100;
    }
}
