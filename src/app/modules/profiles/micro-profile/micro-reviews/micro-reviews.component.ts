import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService, ReviewsService, UserserviceService } from '@services';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-micro-reviews',
    templateUrl: './micro-reviews.component.html',
    styleUrls: ['./micro-reviews.component.scss'],
})
export class MicroReviewsComponent implements OnInit {
    totalstar = 5;
    newvalue: any = 2;
    reviewvalue: any = 4;
    termStatus: any;
    showRelavant = true;
    reviews: any = [];
    isLoading?: boolean;
    summary: any;
    average: any;
    @Input() microRoasterId;

    constructor(
        public globals: GlobalsService,
        private ratingService: ReviewsService,
        private cookieService: CookieService,
        public userSrv: UserserviceService,
    ) {
        this.termStatus = 'Most relevant';
    }

    ngOnInit(): void {
        this.getReviews();
    }

    getReviews(): void {
        this.isLoading = true;

        this.ratingService.getReviews(this.microRoasterId, OrganizationType.MICRO_ROASTER, {}).subscribe((res: any) => {
            if (res.success) {
                this.isLoading = false;
                this.reviews = res.result ? res.result : [];
            }
        });

        this.userSrv.getReviewsSummary(this.microRoasterId, OrganizationType.MICRO_ROASTER).subscribe((res: any) => {
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
