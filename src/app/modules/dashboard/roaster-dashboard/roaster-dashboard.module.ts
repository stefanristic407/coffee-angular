import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoasterDashboardRoutingModule } from './roaster-dashboard-routing.module';
import { SharedModule } from '@shared';

import { RoasterDashboardComponent } from './roaster-dashboard.component';
import { DashboardNotifyComponent } from './dashboard-notify/dashboard-notify.component';
import { DashboardEstateComponent } from './dashboard-estate/dashboard-estate.component';
import { DashboardReviewComponent } from './dashboard-review/dashboard-review.component';
import { DashboardVarietyComponent } from './dashboard-variety/dashboard-variety.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { DashboardFriendComponent } from './dashboard-friend/dashboard-friend.component';
import { DashboardCoffeeComponent } from './dashboard-coffee/dashboard-coffee.component';
import { DashboardExperienceComponent } from './dashboard-experience/dashboard-experience.component';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales.component';
import { DashboardSourcingComponent } from './dashboard-sourcing/dashboard-sourcing.component';
import { DashboardInviteComponent } from './dashboard-invite/dashboard-invite.component';
import { DashboardBlogComponent } from './dashboard-blog/dashboard-blog.component';
import { DashboardActivityComponent } from './dashboard-activity/dashboard-activity.component';

@NgModule({
    declarations: [
        RoasterDashboardComponent,
        DashboardNotifyComponent,
        DashboardEstateComponent,
        DashboardReviewComponent,
        DashboardVarietyComponent,
        DashboardProductComponent,
        DashboardFriendComponent,
        DashboardCoffeeComponent,
        DashboardExperienceComponent,
        DashboardSalesComponent,
        DashboardSourcingComponent,
        DashboardInviteComponent,
        DashboardBlogComponent,
        DashboardActivityComponent,
    ],
    imports: [CommonModule, RoasterDashboardRoutingModule, SharedModule],
})
export class RoasterDashboardModule {}
