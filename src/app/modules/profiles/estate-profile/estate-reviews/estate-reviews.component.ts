import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-estate-reviews',
    templateUrl: './estate-reviews.component.html',
    styleUrls: ['./estate-reviews.component.scss'],
})
export class EstateReviewsComponent implements OnInit {
    @Input() estateId;

    constructor() {}

    ngOnInit(): void {}
}
