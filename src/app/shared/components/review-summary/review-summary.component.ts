import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-review-summary',
    templateUrl: './review-summary.component.html',
    styleUrls: ['./review-summary.component.scss'],
})
export class ReviewSummaryComponent implements OnInit {
    reviewColors = ['#ff1e5a', '#ffa001', '#649a2b'];
    reviewSummary: any;
    reviewStars: any[];
    @Input()
    set summary(value) {
        if (value) {
            this.reviewSummary = value;
            this.reviewStars = [];
            for (let idx = 5; idx > 0; idx--) {
                const percent = (this.reviewSummary[idx + '_star'] * 100) / this.reviewSummary.total_review;
                this.reviewStars.push({
                    label: idx + '.0',
                    value: this.reviewSummary[idx + '_star'],
                    percent,
                    color: this.reviewColors[idx > 2 ? 2 : idx - 1],
                });
            }
        }
    }
    constructor() {}

    ngOnInit(): void {}
}
