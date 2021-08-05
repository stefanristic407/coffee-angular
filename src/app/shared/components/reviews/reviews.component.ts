import { Component, Input, OnInit } from '@angular/core';
import { OrganizationType } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'underscore';

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
    termStatus: 'created_at' | 'total_rating' = 'created_at';
    termItems: any[];

    constructor(public translateService: TranslateService) {}

    ngOnInit(): void {
        this.termItems = [
            { label: this.translateService.instant('recent_reviews'), value: 'created_at' },
            { label: this.translateService.instant('based_on_rating'), value: 'total_rating' },
        ];
    }

    seeMore() {
        this.limit += 5;
    }

    filterCall() {
        this.reviews = _.sortBy(this.reviews, this.termStatus).reverse();
    }
}
