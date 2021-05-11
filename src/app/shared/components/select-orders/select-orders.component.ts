import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import * as moment from 'moment';
import { COUNTRY_LIST } from '@constants';

@Component({
    selector: 'app-select-orders',
    templateUrl: './select-orders.component.html',
    styleUrls: ['./select-orders.component.scss'],
})
export class SelectOrdersComponent implements OnInit {
    @Output() orderChange = new EventEmitter<any>();
    @Output() closeEvent = new EventEmitter<any>();
    estateterm: any;
    estatetermStatus: any;
    estatetermType: any;
    estatetermOrigin: any;
    displayNumbers: any;
    selected: Date[];
    originArray = [];
    originFilter: any;
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

    @ViewChild(DataTableDirective, { static: false })
    datatableElement: DataTableDirective;
    showDateRange: any;
    roasterId: any;
    @ViewChild('calendar')
    calendar: any;

    public data: any;
    selectedEntry: any;
    selectId: any;
    batchId: any;
    ordId: any;

    constructor(
        public router: Router,
        public cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public route: ActivatedRoute,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.data = {};
    }

    ngOnInit(): void {
        this.estatetermStatus = '';
        this.estatetermOrigin = '';
        this.estatetermType = '';
        this.displayNumbers = '10';
        this.getTableData();
        this.loadFilterValues();
        this.createRoasterTable();
        if (this.route.snapshot.queryParams.batchId && this.route.snapshot.queryParams.ordId) {
            this.batchId = decodeURIComponent(this.route.snapshot.queryParams.batchId);
            this.ordId = decodeURIComponent(this.route.snapshot.queryParams.ordId);
        }
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
                header: 'Variety',
                sortable: false,
                width: 10,
            },

            {
                field: 'quantity',
                header: 'Quantity',
                sortable: false,
                width: 8,
            },

            {
                field: 'cup_score',
                header: 'Cupping Score',
                sortable: false,
                width: 10,
            },
        ];
    }

    filterCall() {
        this.getTableData();
    }

    loadFilterValues() {
        this.originArray = COUNTRY_LIST;
        this.displayArray = [
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '50', value: 50 },
        ];
    }
    onSelect(orderData) {
        console.log(orderData);
    }
    setOrigin(origindata: any) {
        this.estatetermOrigin = origindata;
        this.datatableElement.dtInstance.then((table) => {
            table.column(4).search(origindata).draw();
        });
    }
    setDisplay(data: any) {
        this.displayNumbers = data;
        $('select').val(data).trigger('change');
    }

    openCalendar(event: any) {
        this.calendar.showOverlay(this.calendar.inputfieldViewChild.nativeElement);
        event.stopPropagation();
    }
    onSelectionChange(value: any) {
        this.selectedEntry = value;
        console.log(this.selectedEntry);
    }

    getTableData() {
        this.tableValue = [];
        const postData: any = {
            origin: this.originFilter ? this.originFilter : '',
            per_page: this.displayFilter ? this.displayFilter : 1000,
            start_date: '',
            end_date: '',
            status: 'RECEIVED',
        };
        if (this.rangeDates && this.rangeDates.length === 2) {
            postData.start_date = moment(this.rangeDates[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
            postData.end_date = moment(this.rangeDates[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        this.roasterService.getListOrderDetails(this.roasterId, postData, this.orderType).subscribe((data: any) => {
            if (data.success && data.result) {
                this.totalCount = data.result_info.total_count;
                this.tableValue = data.result;
            }
        });
    }

    onContinue() {
        this.selectId = this.selectedOrder.id;
        this.orderChange.emit({ orderId: this.selectedOrder.id, orderType: this.selectedOrder.type });
        this.close();
    }

    close() {
        this.closeEvent.emit();
    }
}
