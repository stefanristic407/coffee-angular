import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards';
import { OnboardCustomersComponent } from './onboard-customers/onboard-customers.component';
import { CofeeExpeienceDetailsComponent } from './Farm Link/cofee-expeience-details/cofee-expeience-details.component';
import { CoffeeExperienceComponent } from './Farm Link/coffee-experience/coffee-experience.component';
import { QAForumComponent } from './Farm Link/q-a-forum/q-a-forum.component';
import { FeaturesComponent } from './features.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RoasterCompleteSetupComponent } from './roaster-complete-setup/roaster-complete-setup.component';
import { RoasterOnboardComponent } from './roaster-onboard/roaster-onboard.component';
import { RoasterOnboardingComponent } from './roaster-onboarding/roaster-onboarding.component';
import { RoasterQuickSetupComponent } from './roaster-quick-setup/roaster-quick-setup.component';
import { VatManagementComponent } from './vat-management/vat-management.component';
import { BatchSelectAnOrderComponent } from './batch-select-an-order/batch-select-an-order.component';
import { SuccessfulPageComponent } from './successful-page/successful-page.component';
import { DefaultSettingComponent } from './Farm Link/coffee-experience/default-setting/default-setting.component';

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
                path: 'profile-edit',
                component: ProfileEditComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'coffee-experience',
                component: CoffeeExperienceComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'reset-password',
                component: ResetPasswordComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'coffee-details',
                component: CofeeExpeienceDetailsComponent,
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
                path: 'vat-management',
                component: VatManagementComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'q-a-forum',
                component: QAForumComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'batch-select-an-order',
                component: BatchSelectAnOrderComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'success-mail',
                component: SuccessfulPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'default-setting',
                component: DefaultSettingComponent,
                canActivate: [AuthGuard],
            },
            {
                path: '',
                redirectTo: 'roaster-dashboard',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeaturesRoutingModule {}
