import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
    @Input() data = [];
    @Input() total = '';
    @Input() description = '';

    @Input() view: any[] = [240, 240];
    @Input() gradient = true;
    @Input() showLegend = true;
    @Input() showLabels = true;
    @Input() isDoughnut = true;
    @Input() legendPosition = 'below';
    @Input() legendTitle = '';
    @Input() arcWidth = 0.24;
    @Input() tooltipDisabled = true;
    @Input() colorScheme = {
        domain: ['#2DAEA8', '#0D6B67', '#AAC6E7', '#4D5B6C', '#CECECE', '#86A1B9'],
    };

    constructor() {}

    ngOnInit(): void {}
}
