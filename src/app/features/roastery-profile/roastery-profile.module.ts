import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoasteryProfileRoutingModule } from './roastery-profile-routing.module';
import { RoasteryProfileComponent } from './roastery-profile.component';
import { AboutRoasteryComponent } from '@app/features/roastery-profile/about-roastery/about-roastery.component';
import { ContactComponent } from '@app/features/roastery-profile/contact/contact.component';
import { ProfilePhotoComponent } from '@app/features/roastery-profile/profile-photo/profile-photo.component';
import { ReviewsComponent } from '@app/features/roastery-profile/reviews/reviews.component';
import { RoasteryLicenseComponent } from '@app/features/roastery-profile/roastery-license/roastery-license.component';
import { VirtualTourComponent } from '@app/features/roastery-profile/virtual-tour/virtual-tour.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RatingModule } from 'primeng/rating';
import { SharedModule } from '@shared';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
    declarations: [
        RoasteryProfileComponent,
        AboutRoasteryComponent,
        ContactComponent,
        ProfilePhotoComponent,
        ReviewsComponent,
        RoasteryLicenseComponent,
        VirtualTourComponent,
    ],
    imports: [
        CommonModule,
        RoasteryProfileRoutingModule,
        FormsModule,
        Ng2SearchPipeModule,
        RatingModule,
        SharedModule,
        NgxChartsModule,
    ],
})
export class RoasteryProfileModule {
}
