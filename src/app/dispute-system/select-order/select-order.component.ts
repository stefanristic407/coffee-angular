import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService, RoasterserviceService } from '@services';
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
    filterCall() {}
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
    getTableData() {
        this.roasterService.getEstateOrders(this.roasterID).subscribe((data: any) => {
            if (data.success) {
                data.result.map((ele) => {
                    const findOrderType = this.statusTypeArray.find((item) => item.value === ele.type);
                    ele.type = findOrderType ? findOrderType.label : ele.type;
                    ele.status = ele.status.charAt(0).toUpperCase() + ele.status.slice(1).toLowerCase();
                    return ele;
                });
                this.tableValue = data.result;
            }
        });
    }
}
