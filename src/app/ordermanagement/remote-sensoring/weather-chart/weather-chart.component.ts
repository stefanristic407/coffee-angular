import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss'],
})
export class WeatherChartComponent implements OnInit {
  appLanguage?: any;
  weatherTypes: any[] = [
    { value: 0, label: 'Temperature' },
    { value: 1, label: 'Wind' },
    { value: 2, label: 'Rainfall' },
    { value: 3, label: 'Cloudiness' },
    { value: 4, label: 'Pressure' },
    { value: 5, label: 'Humidity' },
  ];
  weatherType = 0;
  periods: any[] = [
    { value: 0, label: 'Hourly forecast' },
    { value: 1, label: 'Last 2 weeks' },
  ];
  period = 0;

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
    labelFormat: '{value}°C',
    rangePadding: 'None',
    minimum: 0,
    maximum: 30,
    interval: 5,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    title: 'Temperature(°C)',
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
  selectedDate = new Date();

  constructor(public globals: GlobalsService) {}

  ngOnInit(): void {
    this.makeData();
  }

  changeWeatherType($event) {
    console.log($event);
    this.makeData();
  }

  changePeriod($event) {
    console.log($event);
    this.makeData();
  }

  makeData() {
    this.data = [];
    for (let i = 0; i < 24; i++) {
      this.data.push({
        x: moment(this.selectedDate).startOf('day').add(i, 'hours').toDate(),
        y: Math.random() * 30,
      });
    }
  }
}
