import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RoasterOnboardingComponent } from './roaster-onboarding/roaster-onboarding.component';
import { RoasterQuickSetupComponent } from './roaster-quick-setup/roaster-quick-setup.component';
import { RoasterCompleteSetupComponent } from './roaster-complete-setup/roaster-complete-setup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeaturesComponent } from './features.component';
import { WelcomeAboardComponent } from './welcome-aboard/welcome-aboard.component';


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
