import { Component, Input, OnInit } from '@angular/core';
import { GENERAL_FONT_FAMILY } from '@constants';
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
    @Input() isLoading;
    @Input() height = '360px';
    @Input() type = 'Line';
    @Input() data: any[];
    @Input() showMarker = true;
    @Input()
    set loading(value: any) {
        this.isLoading = value;
    }
    @Input()
    set xAxis(value: any) {
        this.primaryXAxis = { ...this.primaryXAxis, ...value };
    }
    @Input()
    set yAxis(value: any) {
        this.primaryYAxis = { ...this.primaryYAxis, ...value };
    }
    primaryXAxis = {
        valueType: 'DateTime',
        interval: 1,
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        plotOffsetLeft: 6,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        labelStyle: {
            size: '16px',
            color: '#747588',
            fontFamily: GENERAL_FONT_FAMILY,
            fontWeight: '500',
        },
    };
    primaryYAxis = {
        labelFormat: '{value}',
        lineStyle: { width: 0 },
        plotOffsetBottom: 16,
        majorGridLines: { dashArray: '7,5' },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        labelStyle: {
            size: '16px',
            color: '#747588',
            fontFamily: GENERAL_FONT_FAMILY,
            fontWeight: '500',
        },
        titleStyle: {
            size: '16px',
            color: '#232334',
            fontFamily: GENERAL_FONT_FAMILY,
            fontWeight: '500',
        },
    };
    tooltip: any = {
        enable: true,
        template: '${tooltip}',
    };
    chartArea = {
        border: {
            width: 0,
        },
    };
    border: any = { width: 2 };
    palette = ['#2DAEA8', '#0D6B67', '#AAC6E7'];
    legendSettings = { visible: false };
    marker = {
        visible: true,
        height: 10,
        width: 10,
    };

    containerId = String('chartContainer' + Math.random() * 1000).slice(0, 3);

    constructor() {}

    ngOnInit(): void {}
}
