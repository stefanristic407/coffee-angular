import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, AfterViewInit {
    @Input() data = [];
    @Input() total = 0;
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
    @Input() isWeight = false;
    @Input() unit = 'kg';

    @ViewChild('chartWrap', { static: false }) chartWrap: ElementRef;

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.view = [(this.chartWrap.nativeElement as HTMLElement).offsetWidth, this.view[1]];
        });
    }

    getUnit(value) {
        // const suffixes = ['kg', 'ton', 'K ton', 'm ton', 'b ton'];
        // const suffixNum = Math.floor(('' + value).length / 3);
        // let shortValue = parseFloat((suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2));
        // if (shortValue % 1 !== 0) {
        //     shortValue = parseFloat(shortValue.toFixed(1));
        // }
        // return shortValue + suffixes[suffixNum];
        return value + this.unit;
    }

    transform(value) {
        if (value >= 1e6) {
            return (value / 1e6).toFixed(1) + 'M';
        }
        if (value >= 1e3) {
            return (value / 1e3).toFixed(1) + 'K';
        }
        return value.toString();
    }
}
