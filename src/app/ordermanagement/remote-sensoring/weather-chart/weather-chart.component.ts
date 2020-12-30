import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { AgroService } from 'src/services/agro.service';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss'],
})
export class WeatherChartComponent implements OnInit {
  appLanguage?: any;
  weatherTypes: any[] = [
    {
      value: 0,
      label: 'Temperature',
      title: 'Temperature(°C)',
      minimum: 0,
      maximum: 30,
      interval: 5,
    },
    {
      value: 1,
      label: 'Wind',
      title: 'Wind Speed(m/s)',
      minimum: 0,
      maximum: 10,
      interval: 2,
    },
    {
      value: 2,
      label: 'Rainfall',
      title: 'Rainfall(mm)',
      minimum: 0,
      maximum: 75,
      interval: 15,
    },
    {
      value: 3,
      label: 'Cloudiness',
      title: 'Cloudiness(%)',
      minimum: 0,
      maximum: 100,
      interval: 20,
    },
    {
      value: 4,
      label: 'Pressure',
      title: 'Pressure(hPa)',
      minimum: 1000,
      maximum: 1050,
      interval: 10,
    },
    {
      value: 5,
      label: 'Humidity',
      title: 'Humidity(%)',
      minimum: 0,
      maximum: 100,
      interval: 20,
    },
  ];
  selWeatherType = 0;
  periods: any[] = [
    { value: 0, label: 'Hourly forecast', labelFormat: 'h', intervalType: 'Hours' },
    { value: 1, label: 'Last 2 weeks', labelFormat: 'd', intervalType: 'Days' },
    { value: 2, label: 'Last 1 month', labelFormat: 'd', intervalType: 'Days' },
    { value: 3, label: 'Historical', labelFormat: 'y', intervalType: 'Years' },
  ];
  selPeriod = 0;

  public data: any[] = [];

  public primaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'h',
    intervalType: 'Hours',
    interval: 1,
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
  };

  public primaryYAxis = {
    labelFormat: '{value}',
    rangePadding: 'None',
    minimum: 0,
    maximum: 30,
    interval: 5,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    title: this.weatherTypes[this.selWeatherType].title,
    titleStyle: {
      size: '20px',
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
  public width = '100%';
  public marker = {
    visible: true,
    height: 10,
    width: 10,
  };
  public tooltip = {
    enable: true,
  };
  legendSettings = { visible: false };
  selectedDate = new Date('2020-12-26');
  weatherData: any[];

  constructor(public globals: GlobalsService, public agroSrv: AgroService) {}

  ngOnInit(): void {
    this.getHistoricalWeather();
  }

  changeWeatherType(value) {
    this.selWeatherType = value;
    this.primaryYAxis = {
      ...this.primaryYAxis,
      ...this.weatherTypes[this.selWeatherType],
    };
    this.makeData();
  }

  changePeriod(value) {
    this.selPeriod = value;
    this.primaryXAxis = {
      ...this.primaryXAxis,
      ...this.periods[this.selPeriod],
    };
    this.getHistoricalWeather();
  }

  getHistoricalWeather() {
    let query;
    switch (this.selPeriod) {
      case 0: {
        query = {
          start: moment(this.selectedDate).startOf('day').unix(),
          end: moment(this.selectedDate).endOf('day').unix(),
        };
        break;
      }
      case 1: {
        query = {
          start: moment().startOf('day').subtract(2, 'weeks').unix(),
          end: moment().startOf('day').subtract(1, 'hours').unix(),
        };
        break;
      }
      case 2: {
        query = {
          start: moment().startOf('day').subtract(1, 'months').unix(),
          end: moment().startOf('day').subtract(1, 'hours').unix(),
        };
        break;
      }
      case 2: {
        query = {
          start: moment().startOf('day').subtract(1, 'months').unix(),
          end: moment().startOf('day').subtract(1, 'hours').unix(),
        };
        break;
      }
    }
    this.agroSrv.getHistoricalWeather(query).subscribe(
      (res: any) => {
        console.log('Weather:', res);
        this.weatherData = res;
        this.makeData();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  makeData() {
    this.data = [];
    this.weatherData.forEach((element, index) => {
      let y;
      switch (this.selWeatherType) {
        case 0: {
          y = element.main.temp - 273.15;
          break;
        }
        case 1: {
          y = element.wind.speed;
          break;
        }
        case 2: {
          y = (element.rain && element.rain['3h']) || 0;
          break;
        }
        case 3: {
          y = element.clouds.all;
          break;
        }
        case 4: {
          y = element.main.pressure;
          break;
        }
        case 5: {
          y = element.main.humidity;
          break;
        }
      }
      this.data.push({
        x: moment.unix(element.dt).toDate(),
        y,
      });
    });
  }
}
