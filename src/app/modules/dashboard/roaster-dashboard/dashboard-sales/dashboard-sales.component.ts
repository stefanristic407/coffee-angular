import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService, GlobalsService, UserService } from '@services';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard-sales',
    templateUrl: './dashboard-sales.component.html',
    styleUrls: ['./dashboard-sales.component.scss'],
})
export class DashboardSalesComponent implements OnInit, OnDestroy {
    baseCurrency: string;
    roasterId: number;
    sales: any;
    salesSub: Subscription;
    chartData: any[] = [];
    customerType = '';
    chartType = 'day';
    barPadding = 88;
    periods: any[] = [
        {
            value: 'lastWeek',
            label: 'last_7_days',
        },
        {
            value: 'lastMonth',
            label: 'last_30_days',
        },
        // {
        //     value: 'last3Month',
        //     label: 'last 3 Months',
        // },
        // {
        //     value: 'thisYear',
        //     label: 'This year',
        // },
        // {
        //     value: 'lastYear',
        //     label: 'last Year',
        // },
    ];
    colorScheme = {
        domain: ['#2DAEA8', '#2DAEA8', '#2DAEA8', '#2DAEA8', '#2DAEA8', '#2DAEA8'],
    };
    periodsValue = 'lastWeek';
    customerTypelist: any[] = [
        {
            value: '',
            label: 'All',
        },
        {
            value: 'ecom',
            label: 'E-commerce',
        },
        {
            value: 'mr',
            label: 'Micro-roster',
        },
    ];
    saleData = [];
    dateFrom: string;
    dateTo: string;
    showDataLabel = true;

    constructor(
        private toastrService: ToastrService,
        private userSrv: UserService,
        public authService: AuthService,
        public globals: GlobalsService,
    ) {}

    yAxisTickFormatting(value) {
        return '$ ' + value.toLocaleString();
    }

    ngOnInit(): void {
        this.roasterId = this.authService.getOrgId();
        const date = moment().format('YYYY-MM-DD');
        const lastWeekStart = moment().subtract(6, 'day').format('YYYY-MM-DD');
        const lastWeekEnd = date;
        this.dateFrom = lastWeekStart;
        this.dateTo = lastWeekEnd;
        this.getSalesChartData(this.dateFrom, this.dateTo, this.customerType, this.chartType);
        this.authService.organizationSubject.subscribe((res) => {
            this.baseCurrency = res?.base_currency;
        });
    }

    ngOnDestroy() {
        if (this.salesSub) {
            this.salesSub.unsubscribe();
        }
    }

    getSalesChartData(dateFrom, dateTo, customerType, chartType) {
        this.userSrv
            .getStats(this.roasterId, {
                sections: 'sales',
                customer_type: customerType,
                chart_type: chartType,
                date_from: dateFrom,
                date_to: dateTo,
            })
            .subscribe((res: any) => {
                if (res.success) {
                    this.sales = res.result.sales;
                    this.saleData = this.generateBlankData();
                    if (this.sales && this.sales.sales_stats) {
                        const originSaleData = this.sales.sales_stats;
                        originSaleData.map((item: any) => {
                            this.saleData.map((blankItem: any) => {
                                if (
                                    item.year === blankItem.year &&
                                    item.month === blankItem.month &&
                                    item.date === blankItem.day
                                ) {
                                    blankItem.earnings = parseFloat(item.earnings.toFixed(0));
                                    blankItem.value = parseFloat(item.earnings.toFixed(0));
                                }
                            });
                        });
                    }
                } else {
                    this.toastrService.error('Error while getting stats');
                }
            });
    }

    changeCustomerType(value) {
        this.customerType = value;
        this.getSalesChartData(this.dateFrom, this.dateTo, this.customerType, this.chartType);
    }

    changePeriod() {
        const date = moment().format('YYYY-MM-DD');
        switch (this.periodsValue) {
            case 'lastWeek':
                this.barPadding = 88;
                const lastWeekStart = moment().subtract(6, 'day').format('YYYY-MM-DD');
                const lastWeekEnd = date;
                this.dateFrom = lastWeekStart;
                this.dateTo = lastWeekEnd;
                this.getSalesChartData(this.dateFrom, this.dateTo, this.customerType, this.chartType);
                this.showDataLabel = true;

                break;
            case 'lastMonth':
                this.barPadding = 9;
                const startOfLastMonth = moment().subtract(30, 'day').format('YYYY-MM-DD');
                const endOfLastMonth = date;
                this.dateFrom = startOfLastMonth;
                this.dateTo = endOfLastMonth;
                this.getSalesChartData(this.dateFrom, this.dateTo, this.customerType, this.chartType);
                this.showDataLabel = false;
                break;

            case 'last3Month':
                this.barPadding = 9;
                const startOfLast3Month = moment().subtract(30, 'day').format('YYYY-MM-DD');
                const dateFrom = moment().subtract(3, 'months').endOf('month').format('YYYY-MM-DD');
                console.log('last3month', dateFrom);
                // const endOfLast3Month = date;
                // this.dateFrom = startOfLastMonth;
                // this.dateTo = endOfLastMonth;
                // this.getSalesChartData(this.dateFrom, this.dateTo, this.customerType, this.chartType);
                // this.showDataLabel = false;
                break;

            case 'thisYear':
                this.barPadding = 5;
                const currentDate = new Date();
                const thisYear = currentDate.getFullYear();
                const startOfThisYear = thisYear + '-01-01';
                this.dateFrom = startOfThisYear;
                this.dateTo = moment().format('YYYY-MM-DD');
                console.log('lastyear: ', this.dateFrom, this.dateTo);
                this.getSalesChartData(this.dateFrom, this.dateTo, this.customerType, this.chartType);
                this.showDataLabel = true;

                break;

            case 'lastYear':
                this.barPadding = 5;
                const currentYear = new Date();
                const lastYear = currentYear.getFullYear() - 1;
                const startOfLastYear = lastYear + '-01-01';
                const endOfLastYear = lastYear + '-12-31';
                this.dateFrom = startOfLastYear;
                this.dateTo = endOfLastYear;
                this.getSalesChartData(this.dateFrom, this.dateTo, this.customerType, this.chartType);
                this.showDataLabel = true;

                break;
            default:
                break;
        }
    }

    generateBlankData() {
        const startDate = moment(this.dateFrom);
        const endDate = moment(this.dateTo);

        let day = startDate;
        const blankData = [];
        let name = '';
        while (day <= endDate) {
            switch (this.periodsValue) {
                case 'lastWeek':
                    name = day.toDate().toLocaleString('default', { weekday: 'short' });
                    break;
                case 'lastMonth':
                    name = day.format('Do MMM');
                    break;
                case 'lastYear':
                    name = day.toDate().getMonth().toString() + 1;
                    break;
                case 'thisYear':
                    name = day.toDate().getMonth().toString() + 1;
                    break;
                default:
                    break;
            }
            const item = {
                date: day.toDate(),
                day: day.toDate().getDate(),
                earnings: 0,
                month: day.toDate().getMonth() + 1,
                year: day.toDate().getFullYear(),
                name,
                value: 0,
            };
            blankData.push(item);
            day = day.clone().add(1, 'd');
        }

        return blankData;
    }

    makeChartData() {}
}
