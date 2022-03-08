import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { ProfileRoutingModule } from './profile-routing.module';

import { AgmCoreModule } from '@agm/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { VirtualTourComponent } from './virtual-tour/virtual-tour.component';

@NgModule({
    declarations: [ProfileComponent, AboutComponent, ContactComponent, ReviewsComponent, VirtualTourComponent],
    imports: [CommonModule, ProfileRoutingModule, FormsModule, SharedModule, NgxChartsModule, AgmCoreModule],
})
export class ProfileModule {}
