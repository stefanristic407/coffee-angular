import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoasteryProfileComponent } from './roastery-profile.component';
import { AboutRoasteryComponent } from '@app/features/roastery-profile/about-roastery/about-roastery.component';
import { VirtualTourComponent } from '@app/features/roastery-profile/virtual-tour/virtual-tour.component';
import { ContactComponent } from '@app/features/roastery-profile/contact/contact.component';
import { ReviewsComponent } from '@app/features/roastery-profile/reviews/reviews.component';

const routes: Routes = [
    {
        path: '',
        component: RoasteryProfileComponent,
        children: [
            {
                path: 'about_roastery',
                component: AboutRoasteryComponent,
            },
            {
                path: 'virtual_tour',
                component: VirtualTourComponent,
            },
            {
                path: 'contact',
                component: ContactComponent,
            },
            {
                path: 'reviews',
                component: ReviewsComponent,
            },
            { path: '', redirectTo: 'about_roastery', pathMatch: 'full' },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoasteryProfileRoutingModule {
}
