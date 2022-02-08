import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AgroService } from '@services';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
    selector: 'app-uv-chart',
    templateUrl: './uv-chart.component.html',
    styleUrls: ['./uv-chart.component.scss'],
})
export class UvChartComponent implements OnInit {
    @Input() polygonId: string;
    dateKeyStrings = ['YYYY/MM/DD', 'YYYY/MM/DD', 'YYYY/MM/DD'];
    dateFormats = ['DD MMM', 'DD MMM', 'DD MMM'];

    loading = true;
    data: any[];
    legends: any[] = [];
    showLegend = false;
    weatherTypes: any[] = [
        {
            value: 0,
            label: 'UVI',
            title: 'UV Index',
            unit: '',
            interval: 5,
            minimum: 0,
            maximum: 20,
        },
    ];
    selWeatherType = 0;
    periods: any[] = [
        {
            value: 0,
            label: 'Last 2 weeks',
            labelFormat: 'd',
            intervalType: 'Days',
            period: 'twoWeeks',
        },
        {
            value: 1,
            label: 'Last 1 month',
            labelFormat: 'd',
            intervalType: 'Days',
            period: 'month',
        },
        {
            value: 2,
            label: 'Historical',
            labelFormat: 'd MMM',
            intervalType: 'Months',
            period: 'range',
        },
    ];
    selPeriod = 0;

    public primaryXAxis = {};
    public primaryYAxis = {};
    palette = ['#2DAEA8', '#0D6B67'];
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
        this.selPeriod = 0;
        this.changePeriod();
    }

    changePeriod() {
        this.primaryXAxis = this.periods[this.selPeriod];
        this.updateChartSetting();
        this.getHistoricalUv();
    }

    changeDate() {
        this.getHistoricalUv();
    }

    updateChartSetting() {
        this.showLegend = false;
        this.legends = [
            {
                label: this.weatherTypes[this.selWeatherType].label,
                abbr: this.weatherTypes[this.selWeatherType].label,
            },
        ];
    }

    getHistoricalUv() {
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

        this.agroSrv.getHistoricalUv(this.polygonId, query).subscribe(
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
                };
            })
            .groupBy('key')
            .map((value, key) => {
                const dt = value[0].data.dt;
                const uvi =
                    _.reduce(
                        value,
                        (acc, val) => {
                            return acc + (val.data?.uvi || 0);
                        },
                        0,
                    ) / (value.length || 1);

                return {
                    key,
                    dt,
                    uvi,
                };
            })
            .value();
        this.makeData();
    }

    makeData() {
        const tempData1 = [];
        this.weatherData.forEach((element, index) => {
            const y = element.uvi.toFixed(2);

            const unit = this.weatherTypes[this.selWeatherType].unit;
            const timeStr = moment.unix(element.dt).format(this.dateFormats[this.selPeriod]);
            const data1Str = this.legends[0].abbr + ' ' + y + unit;

            const tooltip =
                `<div class='chart-tooltip' >` +
                `<div class='fnt-12 fnt-600  text-clr334'>` +
                `${timeStr}` +
                `</div><div class='fnt-14 fnt-600  text-clr588'>` +
                `${data1Str}` +
                `</div></div>`;

            tempData1.push({
                x: moment.unix(element.dt).toDate(),
                y,
                tooltip,
            });
        });
        this.data = [tempData1];
    }

    clearData() {
        this.data = null;
    }
}
