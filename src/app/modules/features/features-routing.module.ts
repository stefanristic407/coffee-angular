import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards';
import { OnboardCustomersComponent } from './onboard-customers/onboard-customers.component';
import { FeaturesComponent } from './features.component';
import { NotificationComponent } from './notification/notification.component';
import { RoasterCompleteSetupComponent } from './roaster-complete-setup/roaster-complete-setup.component';
import { RoasterOnboardComponent } from './roaster-onboard/roaster-onboard.component';
import { RoasterOnboardingComponent } from './roaster-onboarding/roaster-onboarding.component';
import { RoasterQuickSetupComponent } from './roaster-quick-setup/roaster-quick-setup.component';
import { SuccessfulPageComponent } from './successful-page/successful-page.component';

const routes: Routes = [
    {
        path: '',
        component: FeaturesComponent,
        children: [
            {
                path: 'onboard-customers',
                component: OnboardCustomersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'roaster-onboarding',
                component: RoasterOnboardingComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'roaster-quick-setup',
                component: RoasterQuickSetupComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'roaster-complete-setup',
                component: RoasterCompleteSetupComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'notification',
                component: NotificationComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'roaster-onboard',
                component: RoasterOnboardComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'success-mail',
                component: SuccessfulPageComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeaturesRoutingModule {}
