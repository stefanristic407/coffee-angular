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
        path: 'chat-notification',
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
        path: '',
        redirectTo: 'dashboard',
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
