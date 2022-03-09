import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { ProfileCreationRoutingModule } from './profile-creation-routing.module';

import { AgmCoreModule } from '@agm/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AboutRoasteryComponent } from './about-roastery/about-roastery.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileCreationComponent } from './profile-creation.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { VirtualTourComponent } from './virtual-tour/virtual-tour.component';

@NgModule({
    declarations: [
        ProfileCreationComponent,
        AboutRoasteryComponent,
        ContactComponent,
        ReviewsComponent,
        VirtualTourComponent,
    ],
    imports: [CommonModule, ProfileCreationRoutingModule, FormsModule, SharedModule, NgxChartsModule, AgmCoreModule],
})
export class ProfileCreationModule {}
