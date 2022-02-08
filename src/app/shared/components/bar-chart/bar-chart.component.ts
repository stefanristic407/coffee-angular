import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { ThousandSuffPipe } from '@app/shared/pipes/thousand-suff.pipe';
import { FW_B, GENERAL_FONT_FAMILY } from '@constants';

import * as echarts from 'echarts';
import ECharts = echarts.ECharts;

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
    providers: [ThousandSuffPipe],
})
export class BarChartComponent implements OnInit, OnChanges {
    @Input() results = [];
    @Input() showDataLabel = false;
    @Input() color = '#2DAEA8';
    @Input() labelShow = true;
    @Input() unitName = '';
    @ViewChild('verticalChart', { static: true }) verticalChart: ElementRef;
    category = [];
    data = [];
    barEchart: ECharts;

    verticalChartOption = {
        color: '#2DAEA8',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: true,
            },
            textStyle: {
                color: '#232334',
                fontSize: '12px',
                fontFamily: GENERAL_FONT_FAMILY,
            },
            alwaysShowContent: true,
            formatter: (params) => {
                const icon0 = `<span data-tooltip="minimum" style="border-left: 2px solid #fff;display: inline-block;height: 12px;margin-right: 5px;width: 20px;"><span style="background-color:${params[0].color};display: block;height: 4px;margin-top: 4px;width: 20px;"></span></span>`;
                const icon1 = `<span data-tooltip="implied-high" style="background-color:rgba(255,255,255,.75);border-radius: 2px;display: inline-block;height: 12px;margin-right:5px;width: 20px;"><span style="background-color:${params[0].color};border: 1px solid ${params[0].color};border-radius:50%;display:block;height:6px;margin-left:7px;margin-top:3px;width:6px;"></span></span>`;
                const convertedValue = this.thousandSuffPipe.transform(params[0].value, 0);
                return `<span style="font-weight: ${FW_B};">${params[0].name}</span><br/> ${convertedValue}`;
            },
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                color: '#747588',
                fontFamily: GENERAL_FONT_FAMILY,
            },
            axisTick: {
                show: false,
            },
            data: [],
            axisPoint: {
                type: 'line',
            },
        },
        yAxis: {
            type: 'value',
            name: '',
            nameTextStyle: {
                fontWeight: 'bold',
                align: 'right',
                fontFamily: GENERAL_FONT_FAMILY,
            },
            axisLabel: {
                color: '#747588',
                fontFamily: GENERAL_FONT_FAMILY,
                formatter: (value) => {
                    const suffixes = ['', 'K', 'M', 'B', 'T'];
                    const suffixNum = Math.floor(('' + value).length / 3);
                    let shortValue = parseFloat(
                        (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2),
                    );
                    if (shortValue % 1 !== 0) {
                        shortValue = parseFloat(shortValue.toFixed(1));
                    }
                    return shortValue + suffixes[suffixNum];
                },
            },
        },
        series: [
            {
                data: [],
                type: 'bar',
                barMaxWidth: 10,
                itemStyle: {
                    emphasis: {
                        barBorderRadius: [50, 50],
                    },
                    normal: {
                        barBorderRadius: [50, 50, 0, 0],
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    distance: 10,
                    fontFamily: GENERAL_FONT_FAMILY,
                    formatter: (label) => {},
                },
            },
        ],
    };

    horizontalData = [];

    constructor(private ref: ChangeDetectorRef, private thousandSuffPipe: ThousandSuffPipe) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        this.barEchart = echarts.init(this.verticalChart.nativeElement);
        this.data = [];
        this.category = [];
        this.results.map((item: any) => {
            this.category.push(item.name);
            this.data.push(item.value);
        });
        this.generateHorizontalData();
        this.verticalChartOption.xAxis.data = this.category;
        this.verticalChartOption.series[0].data = this.data;
        this.verticalChartOption.series[0].label.show = this.labelShow;
        this.verticalChartOption.yAxis.name = this.unitName;
        this.verticalChartOption.series[0].label.formatter = (label) => {
            const convertedValue = this.thousandSuffPipe.transform(label.value);
            if (this.unitName === 'Ton') {
                return convertedValue + ' ton';
            } else {
                return convertedValue + ' ' + this.unitName;
            }
        };
        this.barEchart.setOption(this.verticalChartOption);
        this.ref.detectChanges();
    }

    generateHorizontalData() {
        this.horizontalData = [];
        const highest = Math.max(...this.data);
        this.results.map((item: any) => {
            const tempValue = this.convertValue(item.value);
            const temp = {
                name: item.name,
                value: tempValue,
                realValue: item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                percent: (item.value / highest) * 100 + '%',
            };
            this.horizontalData.push(temp);
        });
    }

    convertValue(value) {
        const suffixes = ['', 'K', 'M', 'B', 'T'];
        const suffixNum = Math.floor(('' + value).length / 3);
        let shortValue = parseFloat((suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2));
        if (shortValue % 1 !== 0) {
            shortValue = parseFloat(shortValue.toFixed(1));
        }
        return shortValue + suffixes[suffixNum];
    }
}
