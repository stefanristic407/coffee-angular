import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutRoasteryComponent } from './about-roastery/about-roastery.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileCreationComponent } from './profile-creation.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SetupLicenseComponent } from './setup-license/setup-license.component';
import { VirtualTourComponent } from './virtual-tour/virtual-tour.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileCreationComponent,
        children: [
            {
                path: 'about',
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
            { path: '', redirectTo: 'about', pathMatch: 'full' },
        ],
    },
    {
        path: 'certificate',
        component: SetupLicenseComponent,
    },
    {
        path: 'certificate/:id',
        component: SetupLicenseComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileCreationRoutingModule {}
