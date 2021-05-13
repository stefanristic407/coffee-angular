import { Component, OnInit, Input } from '@angular/core';
import { OrganizationType } from '@enums';
import { GlobalsService, ReviewsService, UserserviceService } from '@services';

@Component({
    selector: 'app-estate-reviews',
    templateUrl: './estate-reviews.component.html',
    styleUrls: ['./estate-reviews.component.scss'],
})
export class EstateReviewsComponent implements OnInit {
    readonly OrgType = OrganizationType;
    @Input() estateId;

    termStatus: any;
    showRelavant = true;
    reviews: any = [];
    isLoading?: boolean;
    summary: any;
    average: any;

    constructor(
        public globals: GlobalsService,
        private ratingService: ReviewsService,
        public userSrv: UserserviceService,
    ) {
        this.termStatus = 'Most relevant';
    }

    ngOnInit(): void {
        this.getReviews();
    }

    getReviews(): void {
        this.isLoading = true;

        this.ratingService.getReviews(this.estateId, OrganizationType.ESTATE, {}).subscribe((res: any) => {
            if (res.success) {
                this.isLoading = false;
                this.reviews = res.result ? res.result : [];
            }
        });

        this.userSrv.getReviewsSummary(this.estateId, OrganizationType.ESTATE).subscribe((res: any) => {
            if (res.success) {
                this.summary = res.result.summary;
                this.average = res.result.average;
            }
        });
    }

    setStatus(term: any) {
        this.termStatus = term;
    }
    toggleRelavant() {
        this.showRelavant = !this.showRelavant;
    }
}
