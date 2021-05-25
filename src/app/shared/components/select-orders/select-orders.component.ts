import { Component, EventEmitter, OnInit, Output, Input, ViewChild, ViewEncapsulation } from '@angular/core';
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
    encapsulation: ViewEncapsulation.None,
})
export class SelectOrdersComponent implements OnInit {
    @Output() orderChange = new EventEmitter<any>();
    @Output() closeEvent = new EventEmitter<any>();
    @Input() selectedType;
    estateterm: any;
    loader = true;
    estatetermStatus: any;
    estatetermType: any;
    estatetermOrigin: any;
    displayNumbers: any;
    selected: Date[];
    searchTerm = '';
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
    selectedValue: any;
    customerStatus: any;
    statusType: any = [];
    roleType: { label: any; value: number }[];
    roles: any;

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
        this.statusType = [
            { label: this.globals.languageJson?.active, value: 'active' },
            { label: this.globals.languageJson?.inactive, value: 'inactive' },
        ];
        this.roleType = [
            { label: this.globals.languageJson?.active, value: 1 },
            { label: this.globals.languageJson?.inactive, value: 2 },
            { label: this.globals.languageJson?.inactive, value: 3 },
            { label: this.globals.languageJson?.inactive, value: 4 },
            { label: this.globals.languageJson?.inactive, value: 5 },
            { label: this.globals.languageJson?.inactive, value: 6 },
        ];
        this.getTableData();
        this.loadFilterValues();
        this.createRoasterTable();
        if (this.route.snapshot.queryParams.batchId && this.route.snapshot.queryParams.ordId) {
            this.batchId = decodeURIComponent(this.route.snapshot.queryParams.batchId);
            this.ordId = decodeURIComponent(this.route.snapshot.queryParams.ordId);
        }
    }

    createRoasterTable() {
        if (this.selectedType === 'orders') {
            this.tableColumns = [
                {
                    field: 'id',
                    header: this.globals.languageJson?.order_id,
                    sortable: false,
                    width: 7,
                },
                {
                    field: 'estate_name',
                    header: this.globals.languageJson?.estate_name,
                    sortable: false,
                    width: 14,
                },
                {
                    field: 'created_at',
                    header: this.globals.languageJson?.ordered_date,
                    width: 10,
                },
                {
                    field: 'origin',
                    header: this.globals.languageJson?.origin,
                    sortable: false,
                    width: 8,
                },
                {
                    field: 'varieties',
                    header: this.globals.languageJson?.variety,
                    sortable: false,
                    width: 12,
                },

                {
                    field: 'quantity',
                    header: this.globals.languageJson?.quantity,
                    sortable: false,
                    width: 8,
                },

                {
                    field: 'cup_score',
                    header: this.globals.languageJson?.cupping_score,
                    sortable: false,
                    width: 10,
                },
            ];
        } else if (this.selectedType === 'users' || this.selectedType === 'sales-member') {
            this.tableColumns = [
                {
                    field: 'firstname',
                    header: this.globals.languageJson?.name,
                    width: 14,
                },
                {
                    field: 'last_login_at',
                    header: this.globals.languageJson?.last_login,
                    width: 10,
                },
                {
                    field: 'email',
                    header: this.globals.languageJson?.email,
                    width: 12,
                },
                {
                    field: 'status',
                    header: this.globals.languageJson?.status,
                    width: 10,
                },
                {
                    field: 'roles',
                    header: this.globals.languageJson?.all_roles,
                    width: 16,
                },
            ];
        } else {
            this.tableColumns = [
                {
                    field: 'id',
                    header: this.globals.languageJson?.customer_id,
                    sortable: false,
                    width: 7,
                },
                {
                    field: 'name',
                    header: this.globals.languageJson?.customer_name,
                    width: 14,
                },
                {
                    field: 'created_at',
                    header: this.globals.languageJson?.ordered_date,
                    width: 10,
                },
                {
                    field: 'email',
                    header: this.globals.languageJson?.email,
                    width: 16,
                },
                {
                    field: 'status',
                    header: this.globals.languageJson?.status,
                    width: 12,
                },
            ];
        }
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
    }

    getTableData() {
        this.tableValue = [];
        const postData: any = {
            origin: this.originFilter ? this.originFilter : '',
            search_query: this.searchTerm ? this.searchTerm : '',
            per_page: this.displayFilter ? this.displayFilter : 1000,
            start_date: '',
            end_date: '',
            status: 'RECEIVED',
        };
        if (this.selectedType !== 'orders') {
            delete postData.status;
        }
        if (this.selectedType === 'users' || this.selectedType === 'sales-member') {
            postData.status = this.customerStatus ? this.customerStatus : '';
            postData.role_id = this.roles ? this.roles : '';
        }
        if (this.rangeDates && this.rangeDates.length === 2) {
            postData.start_date = moment(this.rangeDates[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
            postData.end_date = moment(this.rangeDates[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        let selectedType = this.selectedType;
        if (this.selectedType === 'sales-member') {
            selectedType = 'users';
        }
        this.roasterService.getListOrderDetails(this.roasterId, selectedType, postData).subscribe((data: any) => {
            if (data.success && data.result && data.result.length > 0) {
                if (this.selectedType === 'micro-roasters' || this.selectedType === 'hrc') {
                    this.tableValue = data.result.filter((item) => {
                        return (item = item.id > 0);
                    });
                    this.totalCount = this.tableValue.length;
                } else {
                    this.totalCount = data.result_info?.total_count;
                    this.tableValue = data.result;
                }
                this.loader = false;
            }
        });
    }

    onContinue() {
        if (this.selectedType === 'orders') {
            this.selectedValue = {
                orderId: this.selectedOrder.id,
                selectedType: this.selectedType,
            };
        } else if (this.selectedType === 'users') {
            this.selectedValue = {
                selectedType: this.selectedType,
                userId: this.selectedOrder.id,
                userName: this.selectedOrder.firstname + ' ' + this.selectedOrder.lastname,
            };
        } else if (this.selectedType === 'sales-member') {
            this.selectedValue = {
                selectedType: this.selectedType,
                userId: this.selectedOrder.id,
                userName: this.selectedOrder.firstname + ' ' + this.selectedOrder.lastname,
            };
        } else {
            this.selectedValue = {
                customerId: this.selectedOrder.id,
                customerName: this.selectedOrder.name,
            };
        }
        this.orderChange.emit(this.selectedValue);
        this.close();
    }

    close() {
        this.closeEvent.emit();
    }
}
