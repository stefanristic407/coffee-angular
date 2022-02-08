import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { GENERAL_FONT_FAMILY } from '@constants';
import { GlobalsService } from '@services';
import * as Chart from 'chart.js';

@Component({
    selector: 'app-result-view',
    templateUrl: './result-view.component.html',
    styleUrls: ['./result-view.component.scss'],
})
export class ResultViewComponent implements OnInit, OnChanges {
    @Input() data;
    @Input() evaluatorsList;
    @Input() cuppingReports;
    @Input() selectedCuppingVersion: any;

    @Output() handleSelectCupping = new EventEmitter<any>();
    type = true;
    public bubbleData: Chart.ChartDataSets[] = [];

    public scoreData: Chart.ChartDataSets[] = [];
    canvas: any;
    ctx: any;

    labels: any[] = [
        {
            label: 'Fragrance/\nAroma',
            key: 'fragrance_score',
        },
        {
            label: this.globals.languageJson.flavor,
            key: 'flavour_score',
        },
        {
            label: 'Aftertaste',
            key: 'aftertaste_score',
        },
        {
            label: 'Acidity',
            key: 'acidity_score',
        },
        {
            label: 'Body',
            key: 'body_score',
        },
        {
            label: 'Balance',
            key: 'balance_score',
        },
        {
            label: 'Uniformirty',
            key: 'uniformity_score',
        },
        {
            label: 'Clean cup',
            key: 'cleancup_score',
        },
        {
            label: 'Sweetness',
            key: 'sweetness_score',
        },
        {
            label: 'Overall',
            key: 'overall_score',
        },
    ];

    chartOptions: Chart.ChartOptions;
    scoreChartOptions: Chart.ChartOptions;

    avgScore: any;

    colors = [
        {
            background: '#2eb1ab',
            border: '#d5efee',
        },
        {
            background: '#0d6b67',
            border: '#cee1e0',
        },
        {
            background: '#aac6e7',
            border: '#eef4fa',
        },
        {
            background: '#4d5b6c',
            border: '#dbdee1',
        },
        {
            background: '#86a1b9',
            border: '#e7ecf1',
        },
        {
            background: '#cecece',
            border: '#f5f5f5',
        },
    ];

    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {
        const self = this;
        this.chartOptions = {
            responsive: true,
            tooltips: {
                enabled: false,
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            callback: (value, index, values) => {
                                return self.type ? self.labels[index].label?.split(/\n/) : '';
                            },
                            stepSize: 1,
                            autoSkip: false,
                            fontColor: '#747588',
                            fontSize: 10,
                            fontFamily: GENERAL_FONT_FAMILY,
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            drawBorder: false,
                            zeroLineBorderDash: [4, 4],
                            borderDash: [4, 4],
                            color: '#d6d6d6',
                        },
                        ticks: {
                            stepSize: 2,
                            autoSkip: false,
                            padding: 12,
                            fontColor: '#747588',
                            fontSize: 14,
                            fontFamily: GENERAL_FONT_FAMILY,
                            min: 0,
                            max: self.type ? 10 : 100,
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };
        this.scoreChartOptions = {
            responsive: true,
            tooltips: {
                enabled: false,
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            callback: (value, index, values) => {
                                return self.type ? self.labels[index].label : '';
                            },
                            stepSize: 1,
                            autoSkip: false,
                            fontColor: '#747588',
                            fontSize: 10,
                            fontFamily: GENERAL_FONT_FAMILY,
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            drawBorder: false,
                            zeroLineBorderDash: [4, 4],
                            borderDash: [4, 4],
                            color: '#d6d6d6',
                        },
                        ticks: {
                            stepSize: 2,
                            autoSkip: false,
                            padding: 12,
                            fontColor: '#747588',
                            fontSize: 14,
                            fontFamily: GENERAL_FONT_FAMILY,
                        },
                    },
                ],
            },
        };
    }

    ngOnChanges(): void {
        this.getCuppingScore();
    }

    getCuppingScore() {
        const chartArray = [];
        const scoreArray = [];
        const avgScoreArray = [];
        this.data?.forEach((ele, index) => {
            avgScoreArray.push(ele.final_score);
            const scoreObj: any = {
                label: ele.evaluator_name,
                backgroundColor: this.colors[index].background,
                borderWidth: 3,
                borderColor: this.colors[index].border,
            };
            scoreObj.data = [];
            const scoreItem: any = {};
            scoreItem.name = 'Final score';
            scoreItem.x = 0;
            scoreItem.y = ele.final_score;
            scoreItem.r = 7;
            scoreObj.data.push(scoreItem);
            scoreArray.push(scoreObj);

            const obj: any = {
                label: ele.evaluator_name,
                backgroundColor: this.colors[index].background,
                borderWidth: 3,
                borderColor: this.colors[index].border,
            };
            obj.data = [];
            for (const label of this.labels) {
                const tempObj = this.formObject(label, ele[label.key]);
                obj.data.push(tempObj);
            }
            chartArray.push(obj);
        });

        this.scoreData = scoreArray;
        this.bubbleData = chartArray;
        const finalScores = avgScoreArray.reduce((acc, cur) => acc + cur, 0);
        this.avgScore = finalScores ? finalScores / avgScoreArray.length : '';
    }

    formObject(itemKey, value) {
        const item: any = {};
        item.name = itemKey.label;
        item.x = this.labels.indexOf(itemKey);
        item.y = value;
        item.r = 7;
        return item;
    }

    onSelectVersion(event) {
        this.handleSelectCupping.emit(event.value.id);
    }
}
