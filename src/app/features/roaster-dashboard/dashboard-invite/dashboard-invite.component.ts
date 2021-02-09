import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Browser } from '@syncfusion/ej2-base';
import { GlobalsService } from 'src/services/globals.service';
import { WelcomeService } from '../welcome.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-dashboard-invite',
  templateUrl: './dashboard-invite.component.html',
  styleUrls: ['./dashboard-invite.component.scss'],
})
export class DashboardInviteComponent implements OnInit, OnDestroy {
  chartData: any[] = [];
  chartArea = { border: { width: 0 } };
  primaryXAxis = {
    valueType: 'Category',
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    labelStyle: {
      size: '14px',
      color: '#747588',
      fontFamily: 'Muli',
      fontWeight: '600',
    },
  };
  primaryYAxis = {
    visible: !Browser.isDevice,
    labelFormat: '{value}',
    minimum: 0,
    maximum: 100,
    rangePadding: 'None',
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    labelStyle: {
      size: '14px',
      color: '#747588',
      fontFamily: 'Muli',
      fontWeight: '600',
    },
  };
  tooltip = { enable: true };
  marker = {
    dataLabel: {
      visible: true,
      template: '<div>${point.y} ton</div>',
      font: { size: '12px', fontFamily: 'Muli', fontWeight: '600', color: '#232334' },
    },
    columnWidth: 0.5,
  };
  cornerRadius = {
    topLeft: 10,
    topRight: 10,
  };

  sourcing: any;
  sourcingSub: Subscription;

  constructor(public globals: GlobalsService, private welcomeSrv: WelcomeService) {}

  ngOnInit(): void {
    this.sourcingSub = this.welcomeSrv.sourcing$.subscribe((res: any) => {
      this.sourcing = res;
      if (this.sourcing) {
        this.makeChartData();
      }
    });
  }

  ngOnDestroy() {
    this.sourcingSub.unsubscribe();
  }

  makeChartData() {
    const tempData = [];
    this.sourcing.sourcing_stats.forEach((element) => {
      tempData.push({
        x: element.origin,
        y: +(element.available_quantity / 1000).toFixed(0),
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
