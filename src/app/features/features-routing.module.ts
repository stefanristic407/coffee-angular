import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeaturesComponent } from './features.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RoasterCompleteSetupComponent } from './roaster-complete-setup/roaster-complete-setup.component';
import { RoasterOnboardingComponent } from './roaster-onboarding/roaster-onboarding.component';
import { RoasterQuickSetupComponent } from './roaster-quick-setup/roaster-quick-setup.component';
import { WelcomeAboardComponent } from './welcome-aboard/welcome-aboard.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProfileEditComponent} from './profile-edit/profile-edit.component';
import { SettingsComponent } from './settings/settings.component';
import { PrivacySettingsComponent } from './privacy-settings/privacy-settings.component';
import {LoginSecurityComponent} from './login-security/login-security.component';
import {ChatNotificationComponent} from './chat-notification/chat-notification.component'
import { HelpComponent } from './help/help.component';
import { LanguageRegionComponent } from './language-region/language-region.component';
import {FDirectMessagingComponent} from './f-direct-messaging/f-direct-messaging.component';
import {SourcingComponent} from './Sourcing/sourcing/sourcing.component';
import {BrandProfileComponent} from './Farm Link/brand-profile/brand-profile.component'
import {CoffeeExperienceComponent} from './Farm Link/coffee-experience/coffee-experience.component'
import {AgreementComponent} from './Farm Link/agreement/agreement.component';
import {FileShareComponent} from './Farm Link/file-share/file-share.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import {SocialMediaPostsComponent} from './Farm Link/social-media-posts/social-media-posts.component';
import {CofeeExpeienceDetailsComponent} from './Farm Link/cofee-expeience-details/cofee-expeience-details.component'
import {BlogDetailsComponent} from './Farm Link/blog-details/blog-details.component'
const routes: Routes = [
  {
    path: '',
    component:FeaturesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'roaster-onboarding',
        component: RoasterOnboardingComponent
      },
      {
        path: 'roaster-quick-setup',
        component: RoasterQuickSetupComponent
      },
      {
        path: 'roaster-complete-setup',
        component: RoasterCompleteSetupComponent
      },
      {
        path: 'welcome-aboard',
        component: WelcomeAboardComponent
      },
      {
        path: 'myprofile',
        component: MyprofileComponent
      },
      {
        path: 'profile-edit',
        component: ProfileEditComponent
      },
      {
        path: 'account-settings',
        component: SettingsComponent
      },
      {
        path: 'privacy-settings',
        component: PrivacySettingsComponent
      },
      {
        path: 'login-security',
        component: LoginSecurityComponent
      },
      {
        path: 'preferences',
        component: ChatNotificationComponent
      },
      {
        path: 'language-region',
        component: LanguageRegionComponent
      },
      {
        path: 'help',
        component: HelpComponent
      },
      {
        path: 'f-direct-messaging',
        component: FDirectMessagingComponent
      },
      {
        path: 'sourcing',
        component: SourcingComponent
      },
      {
        path:'brand-profile',
        component: BrandProfileComponent
      },
      {
        path:'coffee-experience',
        component:CoffeeExperienceComponent
      },
      {
        path:'agreement',
        component:AgreementComponent
      },
      {
        path:'file-share',
        component:FileShareComponent
      },
      {
        path:'social-media',
        component:SocialMediaPostsComponent
      },
      {
        path:'reset-password',
        component:ResetPasswordComponent
      },{
        path:'coffee-details',
        component:CofeeExpeienceDetailsComponent
      },
      {
        path:'blog-details',
        component:BlogDetailsComponent
      },
      {
        path: '',
        redirectTo: 'welcome-aboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: PagenotfoundComponent
      }
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
