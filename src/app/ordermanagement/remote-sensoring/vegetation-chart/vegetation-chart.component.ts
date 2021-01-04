import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { AgroService } from 'src/services/agro.service';
import * as moment from 'moment';
import * as _ from 'underscore';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-vegetation-chart',
  templateUrl: './vegetation-chart.component.html',
  styleUrls: ['./vegetation-chart.component.scss'],
})
export class VegetationChartComponent implements OnInit {
  dateKeyStrings = ['YYYY/MM/DD'];
  dateFormats = ['DD MMM'];

  appLanguage?: any;
  chartData1: any[] = [];
  chartData2: any[] = [];
  chartData3: any[] = [];
  legends: any[] = [];
  showLegend = false;
  weatherTypes: any[] = [
    {
      value: 0,
      label: 'NDVI',
      title: 'NDVI Value',
      unit: '',
      minimum: -1,
      maximum: 1,
      interval: 0.4,
    },
    {
      value: 1,
      label: 'EVI',
      title: 'EVI Value',
      unit: '',
      minimum: -1,
      maximum: 1,
      interval: 0.4,
    },
  ];
  selWeatherType = 0;
  periods: any[] = [
    {
      value: 0,
      label: 'Historical',
      labelFormat: 'd MMM',
      intervalType: 'Months',
      period: 'range',
    },
  ];
  selPeriod = 0;

  public primaryXAxis = {
    valueType: 'DateTime',
    interval: 1,
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
  };

  public primaryYAxis = {
    labelFormat: '{value}',
    rangePadding: 'None',
    lineStyle: { width: 0 },
    majorGridLines: { dashArray: '7,5' },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    titleStyle: {
      size: '16px',
      color: '#232334',
      fontFamily: 'Muli',
      fontWeight: '500',
    },
  };
  public chartArea = {
    border: {
      width: 0,
    },
  };
  palette = ['#2DAEA8', '#0D6B67', '#AAC6E7'];
  public marker = {
    visible: true,
    height: 10,
    width: 10,
  };
  public tooltip: any = {
    enable: true,
    fill: '#fff',
    border: {
      width: 0,
    },
    textStyle: {
      color: '#747588',
    },
    format: '${point.tooltip}',
  };
  legendSettings = { visible: false };
  selectedDate = new Date();
  startDate = moment().subtract(3, 'months').toDate();
  endDate = new Date();
  weatherData: any[] = [];

  constructor(public globals: GlobalsService, public agroSrv: AgroService) {}

  ngOnInit(): void {
    this.changeWeatherType(0);
    this.changePeriod(0);
  }

  changeWeatherType(value) {
    this.selWeatherType = value;
    this.primaryYAxis = {
      ...this.primaryYAxis,
      ...this.weatherTypes[this.selWeatherType],
    };
    this.updateChartSetting();
    this.makeData();
  }

  changePeriod(value) {
    this.selPeriod = value;
    this.primaryXAxis = {
      ...this.primaryXAxis,
      ...this.periods[this.selPeriod],
    };
    this.updateChartSetting();
    this.getData();
  }

  changeDate(value) {
    if (moment(value).isValid()) {
      this.selectedDate = new Date(value);
      this.getData();
    }
  }

  changeStartDate(value) {
    if (moment(value).isValid()) {
      this.startDate = new Date(value);
      this.getData();
    }
  }

  changeEndDate(value) {
    if (moment(value).isValid()) {
      this.endDate = new Date(value);
      this.getData();
    }
  }

  updateChartSetting() {
    this.showLegend = true;
    this.legends = [
      { label: 'Max', abbr: 'Max' },
      { label: 'Mean', abbr: 'Mean' },
      { label: 'Max', abbr: 'Max' },
    ];
  }

  getData() {
    let query;
    switch (this.periods[this.selPeriod].period) {
      case 'twoWeeks': {
        query = {
          start: moment().startOf('day').subtract(2, 'weeks').unix(),
          end: moment().startOf('day').subtract(1, 'hours').unix(),
        };
        break;
      }
      case 'month': {
        query = {
          start: moment().startOf('day').subtract(1, 'months').unix(),
          end: moment().startOf('day').subtract(1, 'hours').unix(),
        };
        break;
      }
      default: {
        query = {
          start: moment(this.startDate).startOf('day').unix(),
          end: moment(this.endDate).endOf('day').subtract(1, 'hours').unix(),
        };
      }
    }

    this.agroSrv.getHistoricalNdvi(query).subscribe(
      (res: any) => {
        this.weatherData = res;
        this.processData();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  processData() {
    const self = this;
    this.weatherData = _.chain(this.weatherData)
      .map((item) => {
        let key;
        key = moment.unix(item.dt).format(self.dateKeyStrings[self.selPeriod]);
        return {
          key,
          dt: item.dt,
          data: item.data,
        };
      })
      .groupBy('key')
      .map((value, key) => {
        const dt = value[0].dt;
        const min =
          _.reduce(
            value,
            (acc, val) => {
              return acc + (val.data?.min || 0);
            },
            0
          ) / (value.length || 1);
        const mean =
          _.reduce(
            value,
            (acc, val) => {
              return acc + (val.data?.mean || 0);
            },
            0
          ) / (value.length || 1);
        const max =
          _.reduce(
            value,
            (acc, val) => {
              return acc + (val.data?.max || 0);
            },
            0
          ) / (value.length || 1);

        return {
          key,
          dt,
          min,
          mean,
          max,
        };
      })
      .value();
    this.makeData();
  }

  makeData() {
    const tempData1 = [];
    const tempData2 = [];
    const tempData3 = [];
    this.weatherData.forEach((element, index) => {
      let y = null;
      let y1 = null;
      let y2 = null;
      y = element.min.toFixed(3);
      y1 = element.mean.toFixed(3);
      y2 = element.max.toFixed(3);
      const label = `${moment
        .unix(element.dt)
        .format(this.dateFormats[this.selPeriod])}
        <br /><strong>
        ${
          this.legends[0].abbr +
          ' ' +
          y +
          this.weatherTypes[this.selWeatherType].unit
        }
        ${
          this.legends[1]
            ? ' ' +
              this.legends[1].abbr +
              ' ' +
              y1 +
              this.weatherTypes[this.selWeatherType].unit
            : ''
        }${
          this.legends[2]
            ? ' ' +
              this.legends[2].abbr +
              ' ' +
              y1 +
              this.weatherTypes[this.selWeatherType].unit
            : ''
        }</strong>`;

      tempData1.push({
        x: moment.unix(element.dt).toDate(),
        y,
        label,
      });
      tempData2.push({
        x: moment.unix(element.dt).toDate(),
        y: y1,
        label,
      });
      tempData3.push({
        x: moment.unix(element.dt).toDate(),
        y: y2,
        label,
      });
    });
    this.chartData1 = tempData1;
    this.chartData2 = tempData2;
    this.chartData3 = tempData3;
  }
}
