import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCreationComponent } from './profile-creation.component';
import { AboutRoasteryComponent } from './about-roastery/about-roastery.component';
import { ContactComponent } from './contact/contact.component';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { VirtualTourComponent } from './virtual-tour/virtual-tour.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RatingModule } from 'primeng/rating';
import { SharedModule } from '@shared';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProfileCreationRoutingModule } from './profile-creation-routing.module';
import { SetupLicenseComponent } from './setup-license/setup-license.component';

@NgModule({
    declarations: [
        ProfileCreationComponent,
        AboutRoasteryComponent,
        ContactComponent,
        ProfilePhotoComponent,
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
    ],
})
export class ProfileCreationModule {}
