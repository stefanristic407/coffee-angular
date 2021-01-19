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
  periods: any[] = [
    {
      value: 0,
      label: 'last 7 days',
    },
    {
      value: 1,
      label: 'last 30 days',
    },
  ];
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

  chartArea = { border: { width: 0 } };
  public primaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'd',
    intervalType: 'Days',
    interval: 1,
    minimum: new Date(),
    maximum: new Date(),
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
  };

  public primaryYAxis = {
    visible: !Browser.isDevice,
    minimum: 0,
    maximum: 30,
    labelFormat: '{value}',
    rangePadding: 'None',
    lineStyle: { width: 0 },
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    titleStyle: {
      size: '16px',
      color: '#232334',
      fontFamily: 'Muli',
      fontWeight: '500',
    },
  };
  marker = {
    dataLabel: {
      visible: true,
      template: '<div>$ ${point.y}</div>',
      font: { size: '12px', fontFamily: 'Muli', fontWeight: '600', color: '#232334' },
    },
  };

  constructor(
    private cookieService: CookieService,
    public globals: GlobalsService,
    private roasterSrv: RoasterserviceService,
    private toastrService: ToastrService,
    private userSrv: UserserviceService,
    private welcomeSrv: WelcomeService
  ) { }

  ngOnInit(): void {
    this.roasterId = this.cookieService.get('roaster_id');
    this.getStats();
  }

  ngOnDestroy() {
    if (this.salesSub) {
      this.salesSub.unsubscribe();
    }
  }

  getStats() {
    const dateFrom = moment().startOf('day').subtract(1, 'months').format('YYYY-MM-DD');
    this.userSrv
      .getStats(this.roasterId, {
        sections: 'sales',
        customer_type: this.customerType,
        chart_type: this.chartType,
        date_from: dateFrom,
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.sales = res.result.sales;
          this.makeChartData();
        } else {
          this.toastrService.error('Error while getting stats');
        }
      });
  }

  changeCustomerType(value) {
    this.customerType = value;
    this.getStats();
  }

  changePeriod(value: number = null) {
    if (value != null) {
      this.selPeriod = value;
    }
    const minimum =
      this.selPeriod === 0
        ? moment().startOf('day').subtract(7, 'days').toDate()
        : moment().startOf('day').subtract(1, 'months').toDate();
    this.primaryXAxis = {
      ...this.primaryXAxis,
      minimum,
      maximum: moment().startOf('day').subtract(24, 'hours').toDate(),
    };
  }

  makeChartData() {
    this.changePeriod();
    const tempData = [];
    _.chain(this.sales.sales_stats)
      .map((item) => {
        const key = moment(new Date(`${item.month}-${item.date}-${item.year}`)).format('YYYY/MM/DD');
        return {
          key,
          data: item,
        };
      })
      .groupBy('key')
      .map((value, key) => {
        const earnings = _.reduce(
          value,
          (acc, val) => {
            return acc + (val.data?.earnings || 0);
          },
          0
        );
        return {
          key,
          earnings,
        };
      })
      .value()
      .forEach((element) => {
        tempData.push({
          x: new Date(element.key),
          y: +element.earnings.toFixed(0),
        });
      });

    const maxValue = _.max(_.pluck(tempData, 'y')) * 1.2;
    this.primaryYAxis = {
      ...this.primaryYAxis,
      maximum: maxValue,
    };
    this.chartData = tempData;
  }
}
