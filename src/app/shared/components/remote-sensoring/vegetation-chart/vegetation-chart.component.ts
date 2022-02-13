import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AgroService } from '@services';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
    selector: 'app-vegetation-chart',
    templateUrl: './vegetation-chart.component.html',
    styleUrls: ['./vegetation-chart.component.scss'],
})
export class VegetationChartComponent implements OnInit {
    @Input() polygonId: string;
    dateKeyStrings = ['YYYY/MM/DD'];
    dateFormats = ['DD MMM'];

    loading = true;
    data: any[];
    legends: any[] = [];
    showLegend = false;
    weatherTypes: any[] = [
        {
            value: 0,
            label: 'NDVI',
            title: 'NDVI Value',
            unit: '',
            interval: 0.2,
            minimum: 0,
            maximum: 1.0,
        },
        {
            value: 1,
            label: 'EVI',
            title: 'EVI Value',
            unit: '',
            interval: 0.2,
            minimum: 0,
            maximum: 1.0,
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

    public primaryXAxis = {};
    public primaryYAxis = {};
    palette = ['#2DAEA8', '#0D6B67', '#AAC6E7'];
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
        this.getData();
    }

    changeDate() {
        this.getData();
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
        this.loading = true;
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

        this.agroSrv.getHistoricalNdvi(this.polygonId, query).subscribe(
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
                        0,
                    ) / (value.length || 1);
                const mean =
                    _.reduce(
                        value,
                        (acc, val) => {
                            return acc + (val.data?.mean || 0);
                        },
                        0,
                    ) / (value.length || 1);
                const max =
                    _.reduce(
                        value,
                        (acc, val) => {
                            return acc + (val.data?.max || 0);
                        },
                        0,
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

            const unit = this.weatherTypes[this.selWeatherType].unit;
            const timeStr = moment.unix(element.dt).format(this.dateFormats[this.selPeriod]);
            const data1Str = this.legends[0].abbr + ' ' + y + unit;
            const data2Str = this.legends[1] ? ' ' + this.legends[1].abbr + ' ' + y1 + unit : '';
            const data3Str = this.legends[2] ? ' ' + this.legends[2].abbr + ' ' + y2 + unit : '';

            const tooltip =
                `<div class='chart-tooltip' >` +
                `<div class='fnt-12 fw-m  text-clr334'>` +
                `${timeStr}` +
                `</div><div class='fnt-14 fw-m  text-clr588'>` +
                `${data1Str}` +
                `${data2Str}` +
                `${data3Str}` +
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
            tempData3.push({
                x: moment.unix(element.dt).toDate(),
                y: y2,
                tooltip,
            });
        });
        this.data = [tempData1, tempData2, tempData3];
    }

    clearData() {
        this.data = null;
    }
}
