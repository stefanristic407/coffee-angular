import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';

import { ReviewRatingRoutingModule } from './review-rating-routing.module';

import { ReviewRatingsComponent } from './review-ratings/review-ratings.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
    declarations: [ReviewRatingsComponent, RatingComponent],
    imports: [CommonModule, ReviewRatingRoutingModule, FormsModule, SharedModule],
})
export class ReviewRatingModule {}
