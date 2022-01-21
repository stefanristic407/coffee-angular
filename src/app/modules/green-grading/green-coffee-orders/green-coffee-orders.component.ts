import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { OrderType } from '@enums';
import { LabelValue } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { GreenGradingService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { GenerateReportService } from '../generate-report/generate-report.service';

@Component({
    selector: 'app-green-coffee-orders',
    templateUrl: './green-coffee-orders.component.html',
    styleUrls: ['./green-coffee-orders.component.scss'],
})
export class GreenCoffeeOrdersComponent implements OnInit {
    breadCrumbItems: MenuItem[];
    selectedOrderType: any;
    displayRowCounts = 10;
    term = '';

    tableData: any[] = [];
    tableColumns: any[] = [];
    selectedRows: any[] = [];
    isMobileView = false;
    totalCount = 0;

    loading = false;

    readonly displayOptions: LabelValue[] = [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '25', value: 25 },
        { label: '50', value: 50 },
    ];

    readonly orderTypeItems = [
        { label: 'Sample', value: OrderType.Sample },
        { label: 'Booked', value: OrderType.Booked },
    ];
    selectedCuppingReportId: any;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    constructor(
        public generateReportService: GenerateReportService,
        private greenGradingService: GreenGradingService,
        private toastrService: ToastrService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private translateService: TranslateService,
    ) {}

    ngOnInit(): void {
        this.activeRoute.queryParams.subscribe((params) => {
            this.selectedCuppingReportId = params.cuppingReportId;
        });
        this.breadCrumbItems = [
            { label: this.translateService.instant('home'), routerLink: '/' },
            { label: this.translateService.instant('menu_sourcing') },
            { label: this.translateService.instant('quality_control'), routerLink: '/green-grading' },
            { label: this.translateService.instant('green_coffee_orders') },
        ];
        this.loadData();
        this.initializeTable();
    }

    initializeTable() {
        if (window.innerWidth <= 767) {
            this.isMobileView = true;
            this.tableColumns = [
                {
                    field: 'order_id',
                    header: 'order_id',
                },
                {
                    field: 'estate_name',
                    header: 'estate_name',
                },
                {
                    field: 'origin',
                    header: 'origin',
                },
                {
                    field: 'varieties',
                    header: 'variety',
                    isCut: true,
                },
            ];
        } else {
            this.isMobileView = false;
            this.tableColumns = [
                {
                    field: 'order_id',
                    header: 'order_id',
                    width: '90px',
                },
                {
                    field: 'estate_name',
                    header: 'estate_name',
                    width: '132px',
                },
                {
                    field: 'order_date',
                    header: 'date_ordered',
                    sortable: true,
                    width: '140px',
                },
                {
                    field: 'origin',
                    header: 'origin',
                },

                {
                    field: 'varieties',
                    header: 'variety',
                },
                {
                    field: 'cupping_version',
                    header: 'cupping_version',
                    width: '128px',
                },
                {
                    field: 'cupping_status',
                    header: 'status',
                },
                {
                    field: 'order_type',
                    header: 'type_of_order',
                },

                {
                    field: 'type',
                    header: 'type',
                },
            ];
        }
    }

    loadData(event?: LazyLoadEvent): void {
        let page = 1;
        if (event) {
            page = event.first / event.rows + 1;
        }
        setTimeout(() => (this.loading = true), 0); // To prevent expression has been checked error
        const options = {
            page,
            per_page: this.displayRowCounts,
            query: this.term,
            order_type: this.selectedOrderType,
            sort_by: event?.sortField ?? 'order_date',
            sort_order: event?.sortField ? (event?.sortOrder === 1 ? 'asc' : 'desc') : 'desc',
        };
        this.greenGradingService.getCuppingInviteList(options).subscribe((res: any) => {
            if (res.success === true) {
                this.tableData = res.result;
                this.generateReportService.totalRequestList = res.success ? res.result : [];
                this.totalCount = res.result_info.total_count;
            }
            this.loading = false;
            if (this.selectedCuppingReportId) {
                this.generateReportService.serviceRequestsList = this.generateReportService.totalRequestList.find(
                    (item) => item.cupping_report_id === +this.selectedCuppingReportId,
                );
            }
            this.selectedRows = this.generateReportService.serviceRequestsList ?? [];
        });
    }

    generateReportLink() {
        if (this.selectedRows) {
            this.generateReportService.serviceRequestsList = this.selectedRows;
            const navigationExtras: NavigationExtras = {
                queryParams: {
                    from: 'ServiceRequest',
                },
            };

            this.router.navigate(['/green-grading/generate-report'], navigationExtras);
        }
    }

    selectRows(checkValue) {
        if (checkValue) {
            const temp = [];
            this.selectedRows = this.tableData.filter((value) => {
                const requestItem = temp.find((item) => item.order_id === value.order_id);
                if (requestItem || !value.cupping_report_id) {
                    return false;
                } else {
                    temp.push(value);
                    return true;
                }
            });
        } else {
            this.selectedRows = [];
        }
    }

    selectRow(rowData, checkValue) {
        if (!rowData.cupping_report_id) {
            this.toastrService.error('Please assign user.');
        }
        if (checkValue) {
            const requestItems = this.selectedRows.filter((item) => item.order_id === rowData.order_id);
            if (requestItems.length > 1) {
                this.selectedRows = this.selectedRows.filter(
                    (item) => item.cupping_report_id !== rowData.cupping_report_id,
                );
                this.toastrService.error('This has been already selected.');
            }
        } else {
            this.selectedRows = this.selectedRows.filter(
                (item) => item.cupping_report_id !== rowData.cupping_report_id,
            );
        }
    }
}
