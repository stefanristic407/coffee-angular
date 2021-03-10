import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewRatingsComponent } from './review-ratings/review-ratings.component';
import { RatingComponent } from './rating/rating.component';

const routes: Routes = [
    {
        path: 'review/:orgType/:orderId',
        component: ReviewRatingsComponent,
    },
    {
        path: 'rating/:orgType/:orderId',
        component: RatingComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReviewRatingRoutingModule {}
