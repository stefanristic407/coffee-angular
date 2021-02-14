import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AgroService } from 'src/services/agro.service';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
    selector: 'app-soil-chart',
    templateUrl: './soil-chart.component.html',
    styleUrls: ['./soil-chart.component.scss'],
})
export class SoilChartComponent implements OnInit {
    @Input() polygonId: string;
    dateKeyStrings = ['YYYY/MM/DD', 'YYYY/MM/DD', 'YYYY/MM/DD'];

    loading = true;
    chartData1: any[] = [];
    chartData2: any[] = [];
    legends: any[] = [];
    showLegend = false;
    weatherTypes: any[] = [
        {
            value: 0,
            label: 'Soil temperature',
            title: 'Soil temperature(°C)',
            unit: '°C',
            interval: 10,
            minimum: 0,
            maximum: 50,
        },
        {
            value: 1,
            label: 'Soil moisture',
            title: 'Soil moisture(m3/m3)',
            unit: 'm3/m3',
            interval: 0.05,
            minimum: 0,
            maximum: 0.35,
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
    dateFormats = ['DD MMM, LT', 'DD MMM', 'DD MMM', 'DD MMM'];

    public primaryXAxis = {
        valueType: 'DateTime',
        interval: 1,
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        plotOffsetBottom: 16,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        labelStyle: {
            size: '16px',
            color: '#747588',
            fontFamily: 'Muli',
            fontWeight: '500',
        },
    };

    public primaryYAxis = {
        labelFormat: '{value}',
        rangePadding: 'None',
        lineStyle: { width: 0 },
        majorGridLines: { dashArray: '7,5' },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        labelStyle: {
            size: '16px',
            color: '#747588',
            fontFamily: 'Muli',
            fontWeight: '500',
        },
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
        template: '${tooltip}',
    };
    legendSettings = { visible: false };
    selectedDate = new Date();
    startDate = moment().subtract(3, 'months').toDate();
    endDate = new Date();
    weatherData: any[] = [];

    constructor(public agroSrv: AgroService) {}

    ngOnInit(): void {
        this.changeWeatherType();
        this.changePeriod();
    }

    changeWeatherType() {
        this.primaryYAxis = {
            ...this.primaryYAxis,
            ...this.weatherTypes[this.selWeatherType],
        };
        this.selPeriod = 0;
        this.changePeriod();
    }

    changePeriod() {
        this.primaryXAxis = {
            ...this.primaryXAxis,
            ...this.periods[this.selPeriod],
        };
        this.updateChartSetting();
        this.getHistoricalSoil();
    }

    changeDate() {
        this.getHistoricalSoil();
    }

    updateChartSetting() {
        if (this.selWeatherType === 0 && (this.selPeriod === 0 || this.selPeriod === 1)) {
            // Legend setting of which has two lines
            this.showLegend = true;
            this.legends = [
                { label: 'T10 - Temperature at 10 centimetres depth', abbr: 'T10' },
                { label: 'T0 - Surface Temperature', abbr: 'T0' },
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

    getHistoricalSoil() {
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

        this.agroSrv.getHistoricalSoil(this.polygonId, query).subscribe(
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
                const t0 =
                    _.reduce(
                        value,
                        (acc, val) => {
                            return acc + (val.data?.t0 || 0);
                        },
                        0,
                    ) / (value.length || 1);

                const t10 =
                    _.reduce(
                        value,
                        (acc, val) => {
                            return acc + (val.data?.t10 || 0);
                        },
                        0,
                    ) / (value.length || 1);

                const moisture =
                    _.reduce(
                        value,
                        (acc, val) => {
                            return acc + (val.data?.moisture || 0);
                        },
                        0,
                    ) / (value.length || 1);
                return {
                    key,
                    dt,
                    t0,
                    t10,
                    moisture,
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
                    y = (element.t10 - 273.15).toFixed(1);
                    y1 = (element.t0 - 273.15).toFixed(1);
                    break;
                }
                default: {
                    y = element.moisture.toFixed(3);
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
        this.chartData1 = tempData1;
        this.chartData2 = tempData2;
    }

    clearData() {
        this.chartData1 = [];
        this.chartData2 = [];
    }
}
