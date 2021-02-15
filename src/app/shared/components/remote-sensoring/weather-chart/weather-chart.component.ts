import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AgroService } from 'src/services/agro.service';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
    selector: 'app-weather-chart',
    templateUrl: './weather-chart.component.html',
    styleUrls: ['./weather-chart.component.scss'],
})
export class WeatherChartComponent implements OnInit {
    @Input() polygonId: string;
    readonly WeatherConst = {
        0: 'temp',
        1: 'wind',
        2: 'rain',
        3: 'clouds',
        4: 'pressure',
        5: 'humidity',
    };
    dateKeyStrings = ['YYYY/MM/DD/HH', 'YYYY/MM/DD', 'YYYY/MM/DD', 'YYYY/MM/DD'];
    palette = ['#2DAEA8', '#0D6B67', '#AAC6E7'];

    loading = true;
    data: any[];
    legends: any[] = [];
    showLegend = false;
    weatherTypes: any[] = [
        {
            value: 0,
            label: 'Temperature',
            title: 'Temperature(°C)',
            unit: '°C',
            interval: 10,
            minimum: 0,
            maximum: 50,
        },
        {
            value: 1,
            label: 'Wind',
            title: 'Wind Speed(m/s)',
            unit: 'm/s',
            interval: 5,
            minimum: 0,
            maximum: 20,
        },
        {
            value: 2,
            label: 'Rainfall',
            title: 'Rainfall(mm)',
            unit: 'mm',
            interval: 5,
            minimum: 0,
            maximum: 20,
        },
        {
            value: 3,
            label: 'Cloudiness',
            title: 'Cloudiness(%)',
            unit: '%',
            interval: 20,
            minimum: 0,
            maximum: 100,
        },
        {
            value: 4,
            label: 'Pressure',
            title: 'Pressure(hPa)',
            unit: 'hPa',
            interval: 5,
            minimum: 995,
            maximum: 1020,
        },
        {
            value: 5,
            label: 'Humidity',
            title: 'Humidity(%)',
            unit: '%',
            interval: 20,
            minimum: 0,
            maximum: 100,
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

    public primaryXAxis = {};
    public primaryYAxis = {};
    maxDate = moment().subtract(1, 'days').toDate();
    selectedDate = moment().subtract(1, 'days').toDate();
    startDate = moment().subtract(3, 'months').toDate();
    endDate = moment().subtract(1, 'days').toDate();
    weatherData: any[] = [];

    constructor(public agroSrv: AgroService) {}

    ngOnInit(): void {
        this.changeWeatherType();
        this.changePeriod();
    }

    changeWeatherType() {
        this.primaryYAxis = this.weatherTypes[this.selWeatherType];
        if (
            this.selWeatherType === 1 ||
            this.selWeatherType === 3 ||
            this.selWeatherType === 4 ||
            this.selWeatherType === 5
        ) {
            // Wind, Cloudiness, Pressure, Humidity
            this.periods = this.periodsForAll.slice(0, 3);
            this.selPeriod = 0;
        } else if (this.selWeatherType === 2) {
            // Rain
            this.periods = this.periodsForRain;
            this.selPeriod = 0;
        } else {
            this.periods = this.periodsForAll;
        }
        this.selPeriod = 0;
        this.changePeriod();
    }

    changePeriod() {
        this.primaryXAxis = this.periods[this.selPeriod];
        this.updateChartSetting();
        this.getData();
    }

    changeDate() {
        this.getData();
    }

    updateChartSetting() {
        if (this.selWeatherType === 0 && (this.selPeriod === 1 || this.selPeriod === 2)) {
            // Legend setting of which has two lines
            this.showLegend = true;
            this.legends = [
                { label: 'Minimum', abbr: 'Min' },
                { label: 'Maximum', abbr: 'Min' },
            ];
        } else {
            // Legend setting of which has one line
            this.showLegend = false;
            this.legends = [
                {
                    label: this.weatherTypes[this.selWeatherType].label,
                    abbr: this.weatherTypes[this.selWeatherType].label,
                },
            ];
        }
    }

    getData() {
        this.loading = true;
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

        this.agroSrv.getHistoricalWeather(this.polygonId, query).subscribe(
            (res: any) => {
                this.weatherData = res;
                this.clearData();
                this.processData();
                this.loading = false;
            },
            (err: HttpErrorResponse) => {
                console.log(err);
                this.clearData();
                this.loading = false;
            },
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
                        0,
                    ) / (value.length || 1);
                const tempMin = _.min(_.pluck(value, 'tempMin'));
                const tempMax = _.max(_.pluck(value, 'tempMax'));
                const wind =
                    _.reduce(
                        value,
                        (acc, val) => {
                            return acc + (val.data?.wind?.speed || 0);
                        },
                        0,
                    ) / (value.length || 1);
                const rain =
                    _.reduce(
                        value,
                        (acc, val) => {
                            return acc + ((val.data.rain && val.data.rain['3h']) || 0);
                        },
                        0,
                    ) / (value.length || 1);
                const clouds =
                    _.reduce(
                        value,
                        (acc, val) => {
                            return acc + (val.data.clouds?.all || 0);
                        },
                        0,
                    ) / (value.length || 1);
                const pressure =
                    _.reduce(
                        value,
                        (acc, val) => {
                            return acc + (val.data.main?.pressure || 0);
                        },
                        0,
                    ) / (value.length || 1);
                const humidity =
                    _.reduce(
                        value,
                        (acc, val) => {
                            return acc + (val.data.main?.humidity || 0);
                        },
                        0,
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

            const unit = this.weatherTypes[this.selWeatherType].unit;
            const timeStr = moment.unix(element.dt).format(this.dateFormats[this.selPeriod]);
            const data1Str = this.legends[0].abbr + ' ' + y + unit;
            const data2Str = this.legends[1] ? ' ' + this.legends[1].abbr + ' ' + y1 + unit : '';

            const tooltip =
                `<div class='chart-tooltip' >` +
                `<div class='fnt-12 fnt-600 fnt-muli text-clr334'>` +
                `${timeStr}` +
                `</div><div class='fnt-14 fnt-600 fnt-muli text-clr588'>` +
                `${data1Str}` +
                `${data2Str}` +
                `</div></div>`;

            tempData1.push({
                x: moment.unix(element.dt).toDate(),
                y,
                tooltip,
            });
            tempData2.push({
                x: moment.unix(element.dt).toDate(),
                y: y1,
                tooltip,
            });
        });
        this.data = [tempData1, tempData2];
    }

    clearData() {
        this.data = null;
    }
}
