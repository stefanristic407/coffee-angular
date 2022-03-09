import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GENERAL_FONT_FAMILY } from '@constants';

import * as echarts from 'echarts';
import ECharts = echarts.ECharts;

@Component({
    selector: 'app-pie-area-chart',
    templateUrl: './pie-area-chart.component.html',
    styleUrls: ['./pie-area-chart.component.scss'],
})
export class PieAreaChartComponent implements OnInit, OnChanges {
    @ViewChild('pieAreaChart', { static: true }) pieAreaChart: ElementRef;
    @Input() results = [];
    barEchart: ECharts;

    chartOption = {
        color: ['#747588', '#f8f8f8'],
        tooltip: {
            trigger: 'item',
            textStyle: {
                color: '#232334',
                fontSize: '12',
                fontFamily: GENERAL_FONT_FAMILY,
            },
        },
        series: [
            {
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '80%'],
                label: {
                    position: 'inner',
                    fontSize: 14,
                    textStyle: {
                        fontSize: '18',
                        fontFamily: GENERAL_FONT_FAMILY,
                        fontWeight: 'bold',
                    },
                    formatter: '{d}%\n{b}',
                },
                labelLine: {
                    show: false,
                },
                data: [],
            },
        ],
    };

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        this.barEchart = echarts.init(this.pieAreaChart.nativeElement);
        this.chartOption.series[0].data = this.results;
        this.barEchart.setOption(this.chartOption);
    }
}
