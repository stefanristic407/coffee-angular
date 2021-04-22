import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicroProfileComponent } from './micro-profile/micro-profile.component';
import { ProfilesComponent } from './profiles.component';
import { RouterModule, Routes } from '@angular/router';
import { MicroAboutComponent } from './micro-profile/micro-about/micro-about.component';
import { MicroContactComponent } from './micro-profile/micro-contact/micro-contact.component';

const routes: Routes = [
    {
        path: '',
        component: MicroProfileComponent,
        children: [
            {
                path: 'about-micro-roastery',
                component: MicroAboutComponent,
            },
            // {
            //     path: 'virtual-tour',
            //     component: VirtualTourComponent,
            // },
            {
                path: 'contact',
                component: MicroContactComponent,
            },
            // {
            //     path: 'reviews',
            //     component: ReviewsComponent,
            // },
            { path: '', redirectTo: 'about-micro-roastery', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfilesRoutingModule {}
