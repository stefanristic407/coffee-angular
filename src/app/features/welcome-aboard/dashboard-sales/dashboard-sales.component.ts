import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
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
  orders: any[] = [];
  chartData: any[] = [];

  public primaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'd',
    intervalType: 'Days',
    interval: 1,
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
  };

  public primaryYAxis = {
    unit: '°C',
    minimum: 0,
    maximum: 30,
    interval: 5,
    labelFormat: '{value}',
    rangePadding: 'None',
    lineStyle: { width: 0 },
    majorGridLines: { width: 0 },
    titleStyle: {
      size: '16px',
      color: '#232334',
      fontFamily: 'Muli',
      fontWeight: '500',
    },
  };

  constructor(
    private cookieService: CookieService,
    public globals: GlobalsService,
    private roasterSrv: RoasterserviceService,
    private toastrService: ToastrService,
    private welcomeSrv: WelcomeService
  ) {}

  ngOnInit(): void {
    this.roasterId = this.cookieService.get('roaster_id');
    // this.getEstateOrdersData();
    this.salesSub = this.welcomeSrv.sales$.subscribe((res: any) => {
      this.sales = res;
      console.log('sales:', this.sales);
    });
  }

  ngOnDestroy() {
    this.salesSub.unsubscribe();
  }

  getEstateOrdersData() {
    this.roasterSrv.getEstateOrders(this.roasterId).subscribe((res: any) => {
      if (res.success) {
        this.orders = res.result;
        this.makeChartData();
        console.log('Orders:', this.orders);
      } else {
        this.toastrService.error(this.globals.languageJson.error_message);
      }
    });
  }

  makeChartData() {
    const tempData = [];
    _.chain(this.orders)
      .map((item) => {
        const key = moment.unix(item.dt).format('YYYY/MM/DD');
        return {
          key,
          data: item,
        };
      })
      .groupBy('key')
      .map((value, key) => {
        const created_at = value[0].data.created_at;
        const quantity = _.reduce(
          value,
          (acc, val) => {
            return acc + (val.data?.quantity || 0);
          },
          0
        );
        return {
          key,
          created_at,
          quantity,
        };
      })
      .value()
      .forEach((element) => {
        tempData.push({
          x: new Date(element.created_at),
          y: element.quantity,
        });
      });
    this.chartData = tempData;
    console.log(this.chartData);
  }
}
