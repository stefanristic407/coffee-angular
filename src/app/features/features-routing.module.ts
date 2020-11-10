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
import { RoasteryProfileComponent } from './roastery-profile/roastery-profile.component';
import {EstateDetailsListComponent} from './Sourcing/estate-details-list/estate-details-list.component';
import {SourcingOrderChatComponent} from './Sourcing/estate-details-list/sourcing-order-chat/sourcing-order-chat.component';
import {MyfilesComponent} from './Farm Link/file-share/myfiles/myfiles.component';
import {SharewithmeComponent} from './Farm Link/file-share/sharewithme/sharewithme.component';
import {FileShareDetailsComponent} from './Farm Link/file-share/file-share-details/file-share-details.component';
import {AvailableCoffeeListComponent} from './Sourcing/available-coffee-list/available-coffee-list.component';
import { AvailableConfirmOrderComponent } from './Sourcing/available-coffee-list/available-confirm-order/available-confirm-order.component';
import { OrderPlacedComponent } from './Sourcing/available-coffee-list/order-placed/order-placed.component';
import { NotificationComponent } from './notification/notification.component';
import { RoasteryLicenseComponent } from './roastery-profile/roastery-license/roastery-license.component';
import { RoasterOnboardComponent } from './roaster-onboard/roaster-onboard.component';
import { RoasterDashboardComponent} from './roaster-dashboard/roaster-dashboard.component';
import { PageNotFoundComponent } from '../error-module/page-not-found/page-not-found.component'
import { from } from 'rxjs';
import { RoastedCoffeeBatchesComponent } from './e-commerce/roasted-coffee-batches/roasted-coffee-batches.component';
import { NewRoastedBatchComponent } from './e-commerce/new-roasted-batch/new-roasted-batch.component';
import { AddProductComponent } from './e-commerce/add-product/add-product.component';
import { CreateRoastingProfileComponent } from './e-commerce/create-roasting-profile/create-roasting-profile.component';
import { ProductsTableComponent } from './e-commerce/products-table/products-table.component';
import { RoastingProfilesComponent } from './e-commerce/roasting-profiles/roasting-profiles.component';

import { SelectOrderTableComponent } from './e-commerce/select-order-table/select-order-table.component';
import { GreenCoffeeInventoryComponent } from './green-inventory/green-coffee-inventory/green-coffee-inventory.component';
import { ProcuredCoffeeComponent } from './green-inventory/procured-coffee/procured-coffee.component';
import { CoffeeSaleComponent } from './green-inventory/coffee-sale/coffee-sale.component';
import { LotSaleComponent } from './green-inventory/lot-sale/lot-sale.component';


import { CuppingReportComponent } from './green-grading/cupping-report/cupping-report.component';
import { CuppingServiceComponent } from './green-grading/cupping-report/cupping-service/cupping-service.component';
import { GenerateNewReportComponent } from './green-grading/cupping-report/generate-new-report/generate-new-report.component';

import { CuppingResultsComponent } from './green-grading/cupping-results/cupping-results.component';
import { GenerateReportComponent } from './green-grading/generate-report/generate-report.component';

import { GradeSampleComponent } from './green-grading/grade-sample/grade-sample.component';
import { GradeServiceComponent } from './green-grading/grade-service/grade-service.component';
import {GreenCoffeeGradingComponent} from './green-grading/green-coffee-grading/green-coffee-grading.component';
import {GreenGradingComponent} from './green-grading/green-grading/green-grading.component';
import { ServiceRequestsComponent } from './green-grading/service-requests/service-requests.component';
import {SourceGradingComponent} from './green-grading/source-grading/source-grading.component';
import { ServiceRequestedComponent} from './green-grading/service-requested/service-requested.component';
import { ProcessDetailsComponent } from './green-grading/process-details/process-details.component';
import { InviteFriendsComponent} from './invite-friends/invite-friends.component';
import { InviteSucessComponent} from './invite-friends/invite-sucess/invite-sucess.component';
import { VatManagementComponent} from './vat-management/vat-management.component';
import { QAForumComponent } from './Farm Link/q-a-forum/q-a-forum.component';


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
        path:'roastery-profile',
        component:RoasteryProfileComponent
      },
      {
        path:'estate-details',
        component:EstateDetailsListComponent
      },
      {
        path:'sourcing-chat',
        component:SourcingOrderChatComponent
      },
      {
        path:'my-files',
        component:MyfilesComponent
      },
      {
        path:'share',
        component:SharewithmeComponent
      },
      {
        path:'file-share-details',
        component:FileShareDetailsComponent
      },
      {
        path:'file-share-details/:folderId',
        component:FileShareDetailsComponent
      },
      {
        path:'available-coffee-list',
        component:AvailableCoffeeListComponent
      },
      {
        path:'available-confirm-order',
        component:AvailableConfirmOrderComponent
      },
      {
        path :'order-placed',
        component:OrderPlacedComponent
      },
      {
        path :'notification',
        component: NotificationComponent
      },
      {
        path :'license',
        component: RoasteryLicenseComponent
      },
      {
        path :'roaster-onboard',
        component: RoasterOnboardComponent
      },
      {
        path :'roaster-dashboard',
        component: RoasterDashboardComponent
      },
      {
        path:'roasted-coffee-batch',
        component:RoastedCoffeeBatchesComponent
      },
      {
        path:'new-roasted-batch',
        component:NewRoastedBatchComponent
      },
      {
        path:'add-product',
        component:AddProductComponent
      },
      {
        path:'create-roasting-profile',
        component:CreateRoastingProfileComponent
      },
      {
        path:'products-list',
        component:ProductsTableComponent
      },
      {
        path:'select-order-list',
        component:SelectOrderTableComponent
	  },
	  {
		  path:'roasting-profile',
		  component:RoastingProfilesComponent
    },
    {
		  path:'green-coffee-inventory',
		  component:GreenCoffeeInventoryComponent
	  },	  {
		  path:'procured-coffee',
		  component:ProcuredCoffeeComponent
	  },{
		  path:'coffee-sale',
		  component:CoffeeSaleComponent
    },
    {
		  path:'lot-sale',
		  component:LotSaleComponent
    },
    {
      path:'cupping-reports',
      component: CuppingReportComponent
    },
    {
      path:'cupping-service',
      component:CuppingServiceComponent	  
      },
      {
        path:'generate-new-report',
        component:GenerateNewReportComponent
        },
        {
          path:'cupping-results',
          component:CuppingResultsComponent
        },
        {
          path:'generate-report',
          component: GenerateReportComponent
        },
        {
          path:'grade-sample',
          component: GradeSampleComponent
        },
        {
          path:'grade-service',
          component: GradeServiceComponent
        },
        {
          path:'service-request',
          component: ServiceRequestsComponent
        },
        {
          path:'green-coffee-grading',
          component: GreenCoffeeGradingComponent
        },
        {
          path:'green-grading',
          component: GreenGradingComponent
        },
        {
          path:'source-grading',
          component: SourceGradingComponent
      },
      {
        path:'service-requested',
        component:ServiceRequestedComponent
        },
        {
          path:'process-details',
          component: ProcessDetailsComponent
        },
        {
          path:'invite-friends',
          component: InviteFriendsComponent
        },
        {
          path:'invite-sucess',
          component: InviteSucessComponent
        },
        {
          path:'vat-management',
          component: VatManagementComponent
        },
        {
          path:'q-a-forum',
          component: QAForumComponent
        },
      {
        path: '',
        redirectTo: 'welcome-aboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
