import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '@shared';

import { RoasterDashboardComponent } from './roaster-dashboard/roaster-dashboard.component';
import { DashboardNotifyComponent } from './roaster-dashboard/dashboard-notify/dashboard-notify.component';
import { DashboardEstateComponent } from './roaster-dashboard/dashboard-estate/dashboard-estate.component';
import { DashboardReviewComponent } from './roaster-dashboard/dashboard-review/dashboard-review.component';
import { DashboardVarietyComponent } from './roaster-dashboard/dashboard-variety/dashboard-variety.component';
import { DashboardProductComponent } from './roaster-dashboard/dashboard-product/dashboard-product.component';
import { DashboardFriendComponent } from './roaster-dashboard/dashboard-friend/dashboard-friend.component';
import { DashboardCoffeeComponent } from './roaster-dashboard/dashboard-coffee/dashboard-coffee.component';
import { DashboardExperienceComponent } from './roaster-dashboard/dashboard-experience/dashboard-experience.component';
import { DashboardSalesComponent } from './roaster-dashboard/dashboard-sales/dashboard-sales.component';
import { DashboardSourcingComponent } from './roaster-dashboard/dashboard-sourcing/dashboard-sourcing.component';
import { DashboardInviteComponent } from './roaster-dashboard/dashboard-invite/dashboard-invite.component';
import { DashboardBlogComponent } from './roaster-dashboard/dashboard-blog/dashboard-blog.component';
import { DashboardActivityComponent } from './roaster-dashboard/dashboard-activity/dashboard-activity.component';

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
    imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
