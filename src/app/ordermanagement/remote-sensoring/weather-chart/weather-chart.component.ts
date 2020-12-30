import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { AgroService } from 'src/services/agro.service';
import * as moment from 'moment';
import * as _ from 'underscore';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss'],
})
export class WeatherChartComponent implements OnInit {
  readonly WeatherConst = {
    0: 'temp',
    1: 'wind',
    2: 'rain',
    3: 'clouds',
    4: 'pressure',
    5: 'humidity',
  };
  dateKeyStrings = ['YYYY/MM/DD/HH', 'YYYY/MM/DD', 'YYYY/MM/DD', 'YYYY/MM/DD'];

  appLanguage?: any;
  chartData1: any[] = [];
  chartData2: any[] = [];
  legends: any[] = [];
  showLegend = false;
  weatherTypes: any[] = [
    {
      value: 0,
      label: 'Temperature',
      title: 'Temperature(°C)',
      unit: '°C',
      minimum: 0,
      maximum: 30,
      interval: 5,
    },
    {
      value: 1,
      label: 'Wind',
      title: 'Wind Speed(m/s)',
      unit: 'm/s',
      minimum: 0,
      maximum: 10,
      interval: 2,
    },
    {
      value: 2,
      label: 'Rainfall',
      title: 'Rainfall(mm)',
      unit: 'mm',
      minimum: 0,
      maximum: 75,
      interval: 15,
    },
    {
      value: 3,
      label: 'Cloudiness',
      title: 'Cloudiness(%)',
      unit: '%',
      minimum: 0,
      maximum: 100,
      interval: 20,
    },
    {
      value: 4,
      label: 'Pressure',
      title: 'Pressure(hPa)',
      unit: 'hPa',
      minimum: 1000,
      maximum: 1050,
      interval: 10,
    },
    {
      value: 5,
      label: 'Humidity',
      title: 'Humidity(%)',
      unit: '%',
      minimum: 0,
      maximum: 100,
      interval: 20,
    },
  ];
  selWeatherType = 0;
  periods: any[];
  periodsForAll: any[] = [
    {
      value: 0,
      label: 'Hourly forecast',
      labelFormat: 'h',
      intervalType: 'Hours',
      period: 'daily',
    },
    {
      value: 1,
      label: 'Last 2 weeks',
      labelFormat: 'd',
      intervalType: 'Days',
      period: 'twoWeeks',
    },
    {
      value: 2,
      label: 'Last 1 month',
      labelFormat: 'd',
      intervalType: 'Days',
      period: 'month',
    },
    {
      value: 3,
      label: 'Historical',
      labelFormat: 'd MMM',
      intervalType: 'Months',
      period: 'range',
    },
  ];
  periodsForRain: any[] = [
    {
      value: 0,
      label: 'Daily rain volume',
      labelFormat: 'h',
      intervalType: 'Hours',
      period: 'daily',
    },
    {
      value: 1,
      label: 'Accumulated rainfall',
      labelFormat: 'y',
      intervalType: 'Years',
      period: 'range',
    },
  ];
  selPeriod = 0;
  dateFormats = ['DD MMM, LT', 'DD MMM', 'DD MMM', 'DD MMM'];

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
  palette = ['#2DAEA8', '#0D6B67'];
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
    if (value === 2) {
      this.periods = this.periodsForRain;
      this.selPeriod = 0;
    } else {
      this.periods = this.periodsForAll;
    }
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
    this.getHistoricalWeather();
  }

  changeDate(value) {
    if (moment(value).isValid()) {
      this.selectedDate = new Date(value);
      this.getHistoricalWeather();
    }
  }

  changeStartDate(value) {
    if (moment(value).isValid()) {
      this.startDate = new Date(value);
      this.getHistoricalWeather();
    }
  }

  changeEndDate(value) {
    if (moment(value).isValid()) {
      this.endDate = new Date(value);
      this.getHistoricalWeather();
    }
  }

  updateChartSetting() {
    if (
      this.selWeatherType === 0 &&
      (this.selPeriod === 1 || this.selPeriod === 2)
    ) {
      // Legend setting of which has two lines
      this.showLegend = true;
      this.legends = [{ label: 'Minimum' }, { label: 'Maximum' }];
    } else {
      // Legend setting of which has one line
      this.showLegend = false;
      this.legends = [{ label: this.weatherTypes[this.selWeatherType].label }];
    }
  }

  getHistoricalWeather() {
    let query;
    switch (this.periods[this.selPeriod].period) {
      case 'daily': {
        query = {
          start: moment(this.selectedDate).startOf('day').unix(),
          end: moment(this.selectedDate).endOf('day').unix(),
        };
        break;
      }
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

    this.agroSrv.getHistoricalWeather(query).subscribe(
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
          data: item,
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
        };
      })
      .groupBy('key')
      .map((value, key) => {
        const dt = value[0].data.dt;
        const temp =
          _.reduce(
            value,
            (acc, val) => {
              return acc + (val.data?.main?.temp || 0);
            },
            0
          ) / (value.length || 1);
        const tempMin = _.min(_.pluck(value, 'tempMin'));
        const tempMax = _.max(_.pluck(value, 'tempMax'));
        const wind =
          _.reduce(
            value,
            (acc, val) => {
              return acc + (val.data?.wind?.speed || 0);
            },
            0
          ) / (value.length || 1);
        const rain =
          _.reduce(
            value,
            (acc, val) => {
              return acc + ((val.data.rain && val.data.rain['3h']) || 0);
            },
            0
          ) / (value.length || 1);
        const clouds =
          _.reduce(
            value,
            (acc, val) => {
              return acc + (val.data.clouds?.all || 0);
            },
            0
          ) / (value.length || 1);
        const pressure =
          _.reduce(
            value,
            (acc, val) => {
              return acc + (val.data.main?.pressure || 0);
            },
            0
          ) / (value.length || 1);
        const humidity =
          _.reduce(
            value,
            (acc, val) => {
              return acc + (val.data.main?.humidity || 0);
            },
            0
          ) / (value.length || 1);
        return {
          key,
          dt,
          temp,
          tempMin,
          tempMax,
          wind,
          rain,
          clouds,
          pressure,
          humidity,
        };
      })
      .value();
    this.makeData();
  }

  makeData() {
    const tempData1 = [];
    const tempData2 = [];
    this.weatherData.forEach((element, index) => {
      let y = null;
      let y1 = null;
      switch (this.selWeatherType) {
        case 0: {
          if (this.selPeriod === 0 || this.selPeriod === 3) {
            y = (element.temp - 273.15).toFixed(1);
          } else {
            y = (element.tempMin - 273.15).toFixed(1);
            y1 = (element.tempMax - 273.15).toFixed(1);
          }
          break;
        }
        default: {
          y = element[this.WeatherConst[this.selWeatherType]].toFixed(1);
        }
      }
      const label = `${moment
        .unix(element.dt)
        .format(this.dateFormats[this.selPeriod])}
        <br /><strong>
        ${
          this.legends[0].label +
          ' ' +
          y +
          this.weatherTypes[this.selWeatherType].unit
        }
        ${
          this.legends[1]
            ? ' ' +
              this.legends[1].label +
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
    });
    this.chartData1 = tempData1;
    this.chartData2 = tempData2;
  }
}
