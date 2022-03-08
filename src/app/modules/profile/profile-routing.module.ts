import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { VirtualTourComponent } from './virtual-tour/virtual-tour.component';

const routes: Routes = [
    {
        path: ':orgType/:orgId',
        component: ProfileComponent,
        children: [
            {
                path: 'about',
                component: AboutComponent,
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
