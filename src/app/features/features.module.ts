import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoasterOnboardingComponent } from './roaster-onboarding/roaster-onboarding.component';
import { RoasterQuickSetupComponent } from './roaster-quick-setup/roaster-quick-setup.component';
import { RoasterCompleteSetupComponent } from './roaster-complete-setup/roaster-complete-setup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FeaturesComponent } from './features.component';
import {PopoverModule} from 'ngx-bootstrap/popover';

//PrimeNG Modules
import {ButtonModule} from 'primeng/button';
import { WelcomeAboardComponent } from './welcome-aboard/welcome-aboard.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    DashboardComponent, 
    RoasterOnboardingComponent, 
    RoasterQuickSetupComponent, 
    RoasterCompleteSetupComponent, 
    PagenotfoundComponent, FeaturesComponent, WelcomeAboardComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    //PrimeNG Modules
    ButtonModule,
    PopoverModule,
    ToastrModule.forRoot({timeOut: 10000, preventDuplicates : true})
  ]
})
export class FeaturesModule { }
