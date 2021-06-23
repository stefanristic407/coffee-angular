import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, PurchaseService } from '@services';
import { GlobalsService } from '@services';
import * as moment from 'moment';
import { COUNTRY_LIST } from '@constants';
import { OrganizationType } from '@enums';
import { LazyLoadEvent } from 'primeng/api';
import { ApiResponse, OrderSummary } from '@models';

@Component({
    selector: 'app-select-order',
    templateUrl: './select-order.component.html',
    styleUrls: ['./select-order.component.scss'],
})
export class SelectOrderComponent implements OnInit {
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
        public globals: GlobalsService,
        public router: Router,
        public route: ActivatedRoute,
        public activeRoute: ActivatedRoute,
        private purchaseService: PurchaseService,
    ) {}

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
            {
                field: 'id',
                header: 'Order ID',
                sortable: false,
                width: 7,
            },
            {
                field: 'estate_name',
                header: 'Estate name',
                sortable: false,
                width: 14,
            },
            {
                field: 'created_at',
                header: 'Date ordered',
                width: 10,
            },
            {
                field: 'origin',
                header: 'Origin',
                sortable: false,
                width: 10,
            },
            {
                field: 'species',
                header: 'Species',
                sortable: false,
                width: 10,
            },
            {
                field: 'price',
                header: 'Price',
                sortable: false,
                width: 8,
            },
            {
                field: 'quantity',
                header: 'Quantity',
                sortable: false,
                width: 8,
            },
            {
                field: 'type',
                header: 'Type of order',
                sortable: false,
                width: 10,
            },
            {
                field: 'status',
                header: 'Status',
                sortable: false,
                width: 10,
            },
            {
                field: 'cup_score',
                header: 'Cupping Score',
                sortable: false,
                width: 10,
            },
        ];
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
        if (event.first > -1) {
            this.pageNumber = event.first / event.rows + 1;
        }
        this.getTableData();
    }

    loadFilterValues() {
        this.originArray = COUNTRY_LIST;
        this.orderTypeArray = [
            { label: 'Shipped', value: 'SHIPPED' },
            { label: 'Confirmed', value: 'CONFIRMED' },
            { label: 'Payment', value: 'PAYMENT' },
            { label: 'Harvest Ready', value: 'HARVEST READY' },
            { label: 'GRADED', value: 'RECEIVED' },
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
            postData.end_date = moment(this.rangeDates[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
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
