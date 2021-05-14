import { Component, Input, OnInit } from '@angular/core';
import { OrganizationType } from '@enums';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
    readonly OrgType = OrganizationType;
    @Input() reviews: any[];
    @Input() average: any;
    @Input() orgType: OrganizationType;
    limit = 5;
    termStatus = 'Most relevant';
    termItems: any[];

    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {
        this.termItems = [
            { label: this.globals.languageJson?.most_relevant, value: 'Most relevant' },
            { label: this.globals.languageJson?.recent_reviews, value: 'Recent reviews' },
            { label: this.globals.languageJson?.based_on_rating, value: 'Based on rating' },
        ];
    }

    seeMore() {
        this.limit += 5;
    }

    filterCall() {
        console.log('Term:', this.termStatus);
    }
}
