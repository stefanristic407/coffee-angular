import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileCreationRoutingModule } from './profile-creation-routing.module';
import { SharedModule } from '@shared';

import { AgmCoreModule } from '@agm/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RatingModule } from 'primeng/rating';

import { ProfileCreationComponent } from './profile-creation.component';
import { AboutRoasteryComponent } from './about-roastery/about-roastery.component';
import { ContactComponent } from './contact/contact.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { VirtualTourComponent } from './virtual-tour/virtual-tour.component';
import { SetupLicenseComponent } from './setup-license/setup-license.component';

@NgModule({
    declarations: [
        ProfileCreationComponent,
        AboutRoasteryComponent,
        ContactComponent,
        ReviewsComponent,
        VirtualTourComponent,
        SetupLicenseComponent,
    ],
    imports: [
        CommonModule,
        ProfileCreationRoutingModule,
        FormsModule,
        Ng2SearchPipeModule,
        RatingModule,
        SharedModule,
        NgxChartsModule,
        AgmCoreModule,
    ],
})
export class ProfileCreationModule {}
