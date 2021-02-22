import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router, NavigationExtras } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalsService } from 'src/services/globals.service';
import * as moment from 'moment';

@Component({
    selector: 'app-select-order-table',
    templateUrl: './select-order-table.component.html',
    styleUrls: ['./select-order-table.component.scss'],
})
export class SelectOrderTableComponent implements OnInit {
    estateterm: any;
    estatetermStatus: any;
    estatetermType: any;
    estatetermOrigin: any;
    displayNumbers: any;
    selected: Date[];
    showOrigin: boolean = true;
    showType: boolean = true;
    showStatus: boolean = true;
    showDisplay: boolean = true;
    odd: boolean = false;

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
    //dtInstance:DataTables.Api;

    // Static Estate Orders Data List
    public data: any;
    public mainData: any[];
    title = 'angulardatatables';
    dtOptions: DataTables.Settings = {
        language: { search: '' },
    };
    appLanguage?: any;
    selectedEntry: any;
    selectId: any;

    constructor(
        public router: Router,
        public cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.data = {};
    }

    ngOnInit(): void {
        //Auth checking
        if (this.cookieService.get('Auth') == '') {
            this.router.navigate(['/auth/login']);
        }
        this.appLanguage = this.globals.languageJson;

        this.estatetermStatus = '';
        this.estatetermOrigin = '';
        this.estatetermType = '';
        this.displayNumbers = '10';
        this.getTableData(); //calling estate table data onload

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
        this.originArray = this.globals.countryList;
        this.displayArray = [
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '50', value: 50 },
        ];
    }
    onSelect(orderData) {
        console.log(orderData);
    }

    //  Function Name : Check box function.
    //  Description   : This function helps to Check all the rows of the Users list.
    checkAllEstate(ev) {
        this.data.forEach((x) => (x.state = ev.target.checked));
    }

    //  Function Name : Single Check box function.
    //  Description   : This function helps to Check that single row isChecked.
    isAllCheckedEstate() {
        return this.data.every((_) => _.state);
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

    toggleOrigin() {
        this.showOrigin = !this.showOrigin;
        if (this.showOrigin == false) {
            document.getElementById('origin_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('origin_id').style.border = '1px solid #d6d6d6';
        }
    }

    toggleDisplay() {
        this.showDisplay = !this.showDisplay;
        if (this.showDisplay == false) {
            document.getElementById('display_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('display_id').style.border = '1px solid #d6d6d6';
        }
    }
    onSelectionChange(value: any) {
        this.selectedEntry = value;
        console.log(this.selectedEntry);
    }
    continue() {
        this.globals.selected_order_id = this.selectedEntry.id;
        console.log(this.globals.selected_order_id);
        this.router.navigate(['/features/new-roasted-batch']);
    }

    // select order table data

    getTableData() {
        this.tableValue = [];
        const postData: any = {};
        postData.origin = this.originFilter ? this.originFilter : '';
        postData.per_page = this.displayFilter ? this.displayFilter : 1000;
        postData.start_date = '';
        postData.end_date = '';
        if (this.rangeDates && this.rangeDates.length === 2) {
            postData.start_date = moment(this.rangeDates[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
            postData.end_date = moment(this.rangeDates[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        this.roasterService.getEstateOrders(this.roasterId, postData, this.orderType).subscribe((data: any) => {
            if (data.success && data.result) {
                this.totalCount = data.result_info.total_count;
                this.tableValue = data.result;
                console.log(this.tableValue);
            }
        });
    }
    onContinue() {
        this.selectId = this.selectedOrder.id;
        const navigationExtras: NavigationExtras = {
            queryParams: {
                ordId: this.selectId ? this.selectId : '',
            },
        };
        this.router.navigate(['/features/new-roasted-batch'], navigationExtras);
    }
}
