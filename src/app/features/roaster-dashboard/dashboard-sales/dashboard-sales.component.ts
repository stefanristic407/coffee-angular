import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Browser } from '@syncfusion/ej2-base';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { WelcomeService } from '../welcome.service';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard-sales',
    templateUrl: './dashboard-sales.component.html',
    styleUrls: ['./dashboard-sales.component.scss'],
})
export class DashboardSalesComponent implements OnInit, OnDestroy {
    roasterId: string;
    sales: any;
    salesSub: Subscription;
    chartData: any[] = [];
    customerType = '';
    chartType = 'day';
    barPadding = 88;
    periods: any[] = [
        {
            value: 'lastWeek',
            label: 'last 7 days',
        },
        {
            value: 'lastMonth',
            label: 'last 30 days',
        },
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
    selPeriod = 0;
    saleData = [];
    dateFrom: string;
    dateTo: string;
    showDataLabel = true;
    constructor(
        private cookieService: CookieService,
        public globals: GlobalsService,
        private roasterSrv: RoasterserviceService,
        private toastrService: ToastrService,
        private userSrv: UserserviceService,
        private welcomeSrv: WelcomeService,
    ) {}

    yAxisTickFormatting(value) {
        return '$ ' + value.toLocaleString();
    }

    ngOnInit(): void {
        this.roasterId = this.cookieService.get('roaster_id');
        const date = moment().format('YYYY-MM-DD');
        const lastWeekStart = moment().subtract(6, 'day').format('YYYY-MM-DD');
        const lastWeekEnd = date;
        this.dateFrom = lastWeekStart;
        this.dateTo = lastWeekEnd;
        this.getSalesChartData(this.dateFrom, this.dateTo, this.customerType, this.chartType);
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
                console.log('sales: ', res);
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
                                    blankItem.earnings = item.earnings;
                                    blankItem.value = item.earnings;
                                }
                            });
                        });
                        console.log('sales data: ', this.saleData);
                    }
                } else {
                    this.toastrService.error('Error while getting stats');
                }
            });
    }

    changeCustomerType(value) {
        console.log('changed customer type: ', value);
        this.customerType = value;
        this.getSalesChartData(this.dateFrom, this.dateTo, this.customerType, this.chartType);
    }

    changePeriod(value: string) {
        console.log('changed period: ', value);
        this.periodsValue = value;
        const date = moment().format('YYYY-MM-DD');
        switch (value) {
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
                    name = day.toDate().getDate().toString();
                    break;
                case 'lastYear':
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
                // value: 100000 * Math.random(),
                value: 0,
            };
            blankData.push(item);
            day = day.clone().add(1, 'd');
        }

        console.log('blankData', blankData);
        return blankData;
    }

    makeChartData() {}
}
