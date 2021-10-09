import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ResizeableComponent } from '@base-components';
import { COUNTRY_LIST } from '@constants';
import { AuthService, ResizeService, RoasterService } from '@services';
import * as moment from 'moment';

@Component({
    selector: 'app-select-order-table',
    templateUrl: './select-order-table.component.html',
    styleUrls: ['./select-order-table.component.scss'],
})
export class SelectOrderTableComponent extends ResizeableComponent implements OnInit {
    estateterm: any;
    estatetermStatus: any;
    estatetermType: any;
    estatetermOrigin: any;
    displayNumbers: any;
    selected: Date[];
    originArray = [];
    originFilter = null;
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

    showDateRange: any;
    roasterId: any;
    @ViewChild('calendar')
    calendar: any;

    // Static Estate Orders Data List
    public data: any;
    selectedEntry: any;
    selectId: any;
    @Input() ordId: any;
    @Input() batchId: any;
    @Output() orderSelectEvent = new EventEmitter<string>();
    isLoadingTableData = false;

    constructor(
        private authService: AuthService,
        private roasterService: RoasterService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
        this.roasterId = this.authService.getOrgId();
        this.data = {};
    }

    ngOnInit(): void {
        this.estatetermStatus = '';
        this.estatetermOrigin = '';
        this.estatetermType = '';
        this.displayNumbers = '10';
        this.loadFilterValues();
        this.createRoasterTable();
        this.getTableData();
    }

    createRoasterTable() {
        this.tableColumns = [
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
            {
                field: 'created_at',
                header: 'date_ordered',
                width: 10,
            },
            {
                field: 'origin',
                header: 'origin',
                width: 10,
            },
            {
                field: 'varieties',
                header: 'variety',
                width: 10,
            },

            {
                field: 'quantity',
                header: 'quantity',
                width: 8,
            },

            {
                field: 'cup_score',
                header: 'cupping_score',
                width: 10,
            },
        ];
    }

    loadFilterValues() {
        this.originArray = COUNTRY_LIST;
        this.displayArray = [
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '50', value: 50 },
        ];
    }

    getTableData() {
        this.tableValue = [];
        const postData: any = {};
        postData.origin = this.originFilter;
        postData.per_page = this.displayFilter || 1000;
        postData.start_date = '';
        postData.end_date = '';
        postData.status = 'RECEIVED';
        postData.sort_by = 'created_at';
        postData.sort_order = 'desc';
        if (this.rangeDates && this.rangeDates.length === 2) {
            postData.start_date = moment(this.rangeDates[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
            postData.end_date = moment(this.rangeDates[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        this.isLoadingTableData = true;
        this.roasterService.getEstateOrders(this.roasterId, postData, this.orderType).subscribe((data: any) => {
            this.isLoadingTableData = false;
            if (data.success && data.result) {
                this.totalCount = data.result_info.total_count;
                this.tableValue = data.result;
            }
        });
    }

    onContinue() {
        this.orderSelectEvent.emit(this.selectedOrder.id);
    }

    backRoastedBatch() {
        this.orderSelectEvent.emit('');
    }
}
