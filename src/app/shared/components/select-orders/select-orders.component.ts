import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { COUNTRY_LIST } from '@constants';
import { AuthService, GlobalsService, RoasterService } from '@services';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-select-orders',
    templateUrl: './select-orders.component.html',
    styleUrls: ['./select-orders.component.scss'],
})
export class SelectOrdersComponent implements OnInit {
    @Output() orderChange = new EventEmitter<any>();
    @Output() closeEvent = new EventEmitter<any>();
    @Input() selectedType;
    estateterm: any;
    loading = true;
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
    displayFilter = 10;
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
        private roasterService: RoasterService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public route: ActivatedRoute,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
        this.data = {};
    }

    ngOnInit(): void {
        this.estatetermStatus = '';
        this.estatetermOrigin = '';
        this.estatetermType = '';
        this.displayNumbers = '10';
        if (this.isCustomerType) {
            this.statusType = [
                { label: this.globals.languageJson?.active, value: 'active' },
                { label: this.globals.languageJson?.pending, value: 'pending' },
                { label: this.globals.languageJson?.inactive, value: 'inactive' },
            ];
        } else {
            this.statusType = [
                { label: this.globals.languageJson?.active, value: 'active' },
                { label: this.globals.languageJson?.inactive, value: 'inactive' },
            ];
        }

        this.loadFilterValues();
        this.createRoasterTable();
        if (this.selectedType !== 'orders') {
            this.getRoleList();
        }
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
                    sortable: true,
                },
                {
                    field: 'estate_name',
                    header: this.globals.languageJson?.estate_name,
                    sortable: true,
                },
                {
                    field: 'created_at',
                    header: this.globals.languageJson?.ordered_date,
                    sortable: true,
                },
                {
                    field: 'origin',
                    header: this.globals.languageJson?.origin,
                    sortable: true,
                },
                {
                    field: 'varieties',
                    header: this.globals.languageJson?.variety,
                    sortable: true,
                },
                {
                    field: 'quantity',
                    header: this.globals.languageJson?.quantity,
                    sortable: true,
                },
                {
                    field: 'cup_score',
                    header: this.globals.languageJson?.cupping_score,
                    sortable: true,
                },
            ];
        } else if (this.selectedType === 'users' || this.selectedType === 'sales-member') {
            this.tableColumns = [
                {
                    field: 'firstname',
                    header: this.globals.languageJson?.name,
                    sortable: true,
                },
                {
                    field: 'last_login_at',
                    header: this.globals.languageJson?.last_login,
                    sortable: true,
                },
                {
                    field: 'email',
                    header: this.globals.languageJson?.email,
                    sortable: true,
                    width: 30,
                },
                {
                    field: 'status',
                    header: this.globals.languageJson?.status,
                    sortable: true,
                },
                {
                    field: 'roles',
                    header: this.globals.languageJson?.all_roles,
                    sortable: true,
                },
            ];
            if (window.innerWidth < 767) {
                this.tableColumns.map((item, index, array) => {
                    if (item.field === 'last_login_at') {
                        array.splice(index, 1);
                    }
                    if (item.field === 'status') {
                        array.splice(index, 1);
                    }
                    return item;
                });
            }
        } else {
            this.tableColumns = [
                {
                    field: 'name',
                    header: this.globals.languageJson?.customer_name,
                    sortable: true,
                },
                {
                    field: 'created_at',
                    header: this.globals.languageJson?.ordered_date,
                    sortable: true,
                },
                {
                    field: 'email',
                    header: this.globals.languageJson?.email,
                    sortable: true,
                    width: 30,
                },
                {
                    field: 'status',
                    header: this.globals.languageJson?.status,
                    sortable: true,
                },
            ];
        }
    }

    filterCall() {
        this.tableValue.map((org) => {
            COUNTRY_LIST.find((item) => {
                if (org.origin.toUpperCase() === item.isoCode) {
                    this.originArray.push(item);
                }
            });
        });
        this.originArray = this.originArray.filter((v, i, a) => a.findIndex((t) => t.isoCode === v.isoCode) === i);
        this.getTableData();
    }

    loadFilterValues() {
        this.displayArray = [
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '50', value: 50 },
        ];
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

    getTableData(event?) {
        this.tableValue = [];
        let page = 1;
        if (event) {
            page = event.first / event.rows + 1;
        }
        const postData: any = {
            origin: this.originFilter ? this.originFilter : '',
            page,
            per_page: 10,
            sort_by: 'created_at',
            sort_order: 'desc',
            start_date: '',
            end_date: '',
            order_type: 'GC_ORDER',
            status: 'RECEIVED',
        };
        if (this.isCustomerType) {
            postData.name = this.searchTerm ? this.searchTerm : '';
        } else {
            postData.search_query = this.searchTerm ? this.searchTerm : '';
        }
        if (this.selectedType !== 'orders') {
            delete postData.status;
        }
        if (this.selectedType === 'users' || this.selectedType === 'sales-member' || this.isCustomerType) {
            postData.status = this.customerStatus ? this.customerStatus : '';
        }
        if (this.selectedType === 'users' || this.selectedType === 'sales-member') {
            postData.role_id = this.roles ? this.roles : '';
        }
        if (!this.isCustomerType) {
            if (this.rangeDates && this.rangeDates.length === 2) {
                postData.start_date = moment(this.rangeDates[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
                postData.end_date = moment(this.rangeDates[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
            }
        }

        let selectedType = this.selectedType;
        if (this.selectedType === 'sales-member') {
            selectedType = 'users';
        }
        this.loading = true;
        this.roasterService.getListOrderDetails(this.roasterId, selectedType, postData).subscribe((data: any) => {
            if (data.success && data.result && data.result.length > 0) {
                this.tableValue = [];
                if (this.selectedType === 'micro-roasters' || this.selectedType === 'hrc') {
                    this.tableValue = data.result.filter((item) => {
                        return (item = item.id > 0);
                    });
                    this.totalCount = this.tableValue.length;
                } else {
                    this.totalCount = data.result_info?.total_count;
                    this.tableValue = data.result;
                }
            }
            this.loading = false;
        });
    }

    getRoleList() {
        this.roasterService.getRoles().subscribe((res: any) => {
            if (res.success) {
                this.roleType = res.result.map((item) => {
                    const type = { label: item.name, value: item.id };
                    return type;
                });
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

    get isCustomerType() {
        return this.selectedType === 'micro-roasters' || this.selectedType === 'hrc';
    }
}
