import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '@services';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-sewn-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
    isLoading = true;
    reviews: any = [];
    summary: any;
    average: any;

    constructor(private reviewsService: ReviewsService, public profileService: ProfileService) {}

    ngOnInit(): void {
        this.getReviews();
    }

    getReviews(): void {
        this.isLoading = true;

        this.reviewsService.getReviews(this.profileService.orgId, this.profileService.orgType).subscribe((res: any) => {
            if (res.success) {
                this.isLoading = false;
                this.reviews = res.result ? res.result : [];
            }
        });

        this.reviewsService
            .getReviewsSummary(this.profileService.orgId, this.profileService.orgType)
            .subscribe((res: any) => {
                if (res.success) {
                    this.summary = res.result.summary;
                    this.average = res.result.average;
                }
            });
    }
}
