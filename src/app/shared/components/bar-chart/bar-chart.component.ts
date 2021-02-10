import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
    @Input() width = 560;
    @Input() height = 400;
    @Input() results = [];
    @Input() xAxisLabel = '';
    @Input() legendTitle = '';
    @Input() yAxisLabel = '';
    @Input() legend = false;
    @Input() showXAxisLabel = false;
    @Input() showYAxisLabel = true;
    // @Input() yAxisTickFormatting = () => {
    //     return '';
    // }

    @Input() xAxis = true;
    @Input() yAxis = true;
    @Input() gradient = false;

    @Input() barPadding = 10;
    @Input() arcWidth = 0.24;
    @Input() tooltipDisabled = true;
    @Input() noBarWhenZero = true;
    @Input() showDataLabel = true;
    @Input() scheme = {
        domain: ['#2DAEA8', '#0D6B67', '#AAC6E7', '#4D5B6C', '#CECECE', '#86A1B9'],
    };
    public yAxisTickFormattingFn = this.yAxisTickFormatting.bind(this);
    constructor() {}

    ngOnInit(): void {}

    yAxisTickFormatting(value) {
        return '$ ' + value.toLocaleString();
    }
}
