import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { COUNTRY_LIST } from '@constants';
import { OrganizationType } from '@enums';
import { ApiResponse, OrderSummary } from '@models';
import { GlobalsService, PurchaseService, ResizeService } from '@services';
import * as moment from 'moment';
import { LazyLoadEvent } from 'primeng/api';

@Component({
    selector: 'app-select-order',
    templateUrl: './select-order.component.html',
    styleUrls: ['./select-order.component.scss'],
})
export class SelectOrderComponent extends ResizeableComponent implements OnInit {
    orgType: OrganizationType = OrganizationType.ESTATE;
    orderId: number;
    loading = true;
    currentIndex = 0;
    originArray = [];
    orderTypeArray = [];
    statusTypeArray = [];
    originFilter: any;
    typeFilter: any;
    statusFilter: any;
    rangeDates: any;
    displayArray = [];
    displayFilter = 10;
    tableValue = [];
    tableColumns = [];
    selectedOrder: any;
    pageNumber = 1;
    totalRecords;

    constructor(
        private purchaseService: PurchaseService,
        protected resizeService: ResizeService,
        public activeRoute: ActivatedRoute,
        public globals: GlobalsService,
        public route: ActivatedRoute,
        public router: Router,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.loadFilterValues();
        this.createRoasterTable();
        this.route.queryParamMap.subscribe((params) => {
            if (params.has('id')) {
                this.orderId = +params.get('id');
            }
            if (params.has('orgType')) {
                this.orgType = params.get('orgType') as OrganizationType;
            }
        });
    }
    createRoasterTable() {
        this.tableColumns = [
            this.resizeService.isMobile()
                ? null
                : {
                      field: 'checkbox',
                      header: '',
                      width: 5,
                  },
            {
                field: 'id',
                header: 'order_id',
                width: 7,
            },
            {
                field: 'estate_name',
                header: 'estate_name',
                width: 14,
            },
            this.resizeService.isMobile()
                ? null
                : {
                      field: 'created_at',
                      header: 'date_ordered',
                      width: 10,
                  },
            {
                field: 'origin',
                header: 'origin',
                width: 8,
            },
            {
                field: 'species',
                header: 'species',
                width: 8,
            },
            this.resizeService.isMobile()
                ? null
                : {
                      field: 'price',
                      header: 'price',
                      width: 10,
                  },
            this.resizeService.isMobile()
                ? null
                : {
                      field: 'quantity',
                      header: 'quantity',
                      width: 8,
                  },
            this.resizeService.isMobile()
                ? null
                : {
                      field: 'type',
                      header: 'type_of_order',
                      width: 10,
                  },
            {
                field: 'status',
                header: 'status',
                width: 8,
            },
            this.resizeService.isMobile()
                ? null
                : {
                      field: 'cup_score',
                      header: 'cupping_score',
                      width: 12,
                  },
        ].filter(Boolean);
    }

    onTabChange(event) {
        if (event.index === 1) {
            this.orgType = OrganizationType.MICRO_ROASTER;
        } else {
            this.orgType = OrganizationType.ESTATE;
        }
        this.getTableData();
    }

    filterCall(event?: LazyLoadEvent) {
        if (event?.first > -1) {
            this.pageNumber = event.first / event.rows + 1;
        }
        this.getTableData();
    }

    loadFilterValues() {
        this.originArray = COUNTRY_LIST;
        this.orderTypeArray = [
            { label: 'Shipped', value: 'SHIPPED' },
            { label: 'Confirmed', value: 'CONFIRMED' },
            { label: 'Harvest ready', value: 'HARVEST READY' },
            { label: 'Received', value: 'RECEIVED' },
        ];
        this.statusTypeArray = [
            { label: 'Sample', value: 'GC_ORDER_SAMPLE' },
            { label: 'Booked', value: 'GC_ORDER' },
            { label: 'Pre-Booked', value: 'PREBOOK_LOT' },
        ];
        this.displayArray = [
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '50', value: 50 },
        ];
    }

    getTableData() {
        this.tableValue = [];
        const postData: any = {
            sort_by: 'created_at',
            sort_order: 'desc',
            page: this.pageNumber,
            per_page: this.displayFilter,
        };
        postData.origin = this.originFilter ? this.originFilter : '';
        postData.order_type = this.statusFilter ? this.statusFilter : '';
        postData.status = this.typeFilter ? this.typeFilter : '';
        postData.start_date = '';
        postData.end_date = '';
        if (this.rangeDates && this.rangeDates.length === 2) {
            postData.start_date = moment(this.rangeDates[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
            postData.end_date = moment(this.rangeDates[1], 'DD/MM/YYYY').add(1, 'day').format('YYYY-MM-DD');
        }
        this.loading = true;
        this.purchaseService.getOrders(this.orgType, postData).subscribe((data: ApiResponse<OrderSummary[]>) => {
            if (data.success && data.result) {
                this.totalRecords = data.result_info.total_count;
                this.tableValue = data.result;
                if (!this.selectedOrder && this.orderId) {
                    this.selectedOrder = this.tableValue.find((element: OrderSummary) => element.id === this.orderId);
                }
            }
            this.loading = false;
        });
    }

    onContinue() {
        this.router.navigate(['/dispute-system/raise-ticket', this.orgType, this.selectedOrder.id]);
    }
}
