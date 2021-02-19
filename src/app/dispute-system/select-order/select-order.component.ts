import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { GlobalsService, RoasterserviceService } from '@services';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-select-order',
    templateUrl: './select-order.component.html',
    styleUrls: ['./select-order.component.scss'],
})
export class SelectOrderComponent implements OnInit {
    currentIndex = 0;
    originArray = [];
    orderTypeArray = [];
    statusTypeArray = [];
    originFilter: any;
    typeFilter: any;
    statusFilter: any;
    rangeDates: any;
    displayArray = [];
    displayFilter: any;
    tableValue = [];
    tableColumns = [];
    selectedOrder: any;
    roasterID: any;
    totalCount = 0;
    orderType: any;
    orderID: any;
    constructor(
        public globals: GlobalsService,
        public router: Router,
        public cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        public route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.roasterID = this.cookieService.get('roaster_id');
        this.loadFilterValues();
        this.createRoasterTable();
        //this.displayFilter = 10;
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
            this.orderType = 'mr';
        } else {
            this.orderType = 'ro';
        }
        this.getTableData();
    }
    filterCall() {
        this.getTableData();
    }
    loadFilterValues() {
        this.originArray = this.globals.countryList;
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
    onSelect(ticket) {
        console.log(ticket);
    }
    getTableData() {
        console.log(this.rangeDates);
        this.tableValue = [];
        const postData: any = {};
        postData.origin = this.originFilter ? this.originFilter : '';
        postData.order_type = this.statusFilter ? this.statusFilter : '';
        postData.status = this.typeFilter ? this.typeFilter : '';
        postData.per_page = this.displayFilter ? this.displayFilter : 1000;
        postData.start_date = '';
        postData.end_date = '';
        if (this.rangeDates && this.rangeDates.length === 2) {
            postData.start_date = moment(this.rangeDates[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
            postData.end_date = moment(this.rangeDates[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        this.roasterService.getRoasterOrders(this.roasterID, postData, this.orderType).subscribe((data: any) => {
            if (data.success && data.result) {
                data.result.map((ele) => {
                    if (this.orderType === 'mr') {
                        ele.price = ele.total_price;
                    }
                    const findOrderType = this.statusTypeArray.find((item) => item.value === ele.type);
                    ele.type = findOrderType ? findOrderType.label : ele.type;
                    ele.status = ele.status.charAt(0).toUpperCase() + ele.status.slice(1).toLowerCase();
                    return ele;
                });
                this.totalCount = data.result_info.total_count;
                this.tableValue = data.result;
            }
        });
    }
    onContinue() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                orderType: this.orderType ? this.orderType : undefined,
            },
        };
        this.router.navigate(['/dispute-system/raise-ticket', this.selectedOrder.id], navigationExtras);
    }
}
