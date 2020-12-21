import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "../error-module/page-not-found/page-not-found.component";
import { AuthGuard } from "../guards/auth.guard";
import { ChatNotificationComponent } from "./chat-notification/chat-notification.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AddProductComponent } from "./e-commerce/add-product/add-product.component";
import { CreateRoastingProfileComponent } from "./e-commerce/create-roasting-profile/create-roasting-profile.component";
import { NewRoastedBatchComponent } from "./e-commerce/new-roasted-batch/new-roasted-batch.component";
import { ProductsTableComponent } from "./e-commerce/products-table/products-table.component";
import { RoastedCoffeeBatchesComponent } from "./e-commerce/roasted-coffee-batches/roasted-coffee-batches.component";
import { RoastingProfilesComponent } from "./e-commerce/roasting-profiles/roasting-profiles.component";
import { SelectOrderTableComponent } from "./e-commerce/select-order-table/select-order-table.component";
import { FDirectMessagingComponent } from "./f-direct-messaging/f-direct-messaging.component";
import { AgreementComponent } from "./Farm Link/agreement/agreement.component";
import { BlogDetailsComponent } from "./Farm Link/blog-details/blog-details.component";
import { AboutUsComponent } from "./Farm Link/brand-profile/about-us/about-us.component";
import { BrandProfileComponent } from "./Farm Link/brand-profile/brand-profile.component";
import { HomePageComponent } from "./Farm Link/brand-profile/home-page/home-page.component";
import { LearnComponent } from "./Farm Link/brand-profile/learn/learn.component";
import { SustainabilityComponent } from "./Farm Link/brand-profile/sustainability/sustainability.component";
import { VisitUsComponent } from "./Farm Link/brand-profile/visit-us/visit-us.component";
import { CofeeExpeienceDetailsComponent } from "./Farm Link/cofee-expeience-details/cofee-expeience-details.component";
import { CoffeeExperienceComponent } from "./Farm Link/coffee-experience/coffee-experience.component";
import { FileShareDetailsComponent } from "./Farm Link/file-share/file-share-details/file-share-details.component";
import { FileShareComponent } from "./Farm Link/file-share/file-share.component";
import { MyfilesComponent } from "./Farm Link/file-share/myfiles/myfiles.component";
import { SharewithmeComponent } from "./Farm Link/file-share/sharewithme/sharewithme.component";
import { QAForumComponent } from "./Farm Link/q-a-forum/q-a-forum.component";
import { SocialMediaPostsComponent } from "./Farm Link/social-media-posts/social-media-posts.component";
import { FeaturesComponent } from "./features.component";
import { CuppingReportComponent } from "./green-grading/cupping-report/cupping-report.component";
import { CuppingServiceComponent } from "./green-grading/cupping-report/cupping-service/cupping-service.component";
import { GenerateNewReportComponent } from "./green-grading/cupping-report/generate-new-report/generate-new-report.component";
import { CuppingResultsComponent } from "./green-grading/cupping-results/cupping-results.component";
import { GenerateReportComponent } from "./green-grading/generate-report/generate-report.component";
import { GradeSampleComponent } from "./green-grading/grade-sample/grade-sample.component";
import { GradeServiceComponent } from "./green-grading/grade-service/grade-service.component";
import { GreenCoffeeGradingComponent } from "./green-grading/green-coffee-grading/green-coffee-grading.component";
import { GreenGradingComponent } from "./green-grading/green-grading/green-grading.component";
import { ProcessDetailsComponent } from "./green-grading/process-details/process-details.component";
import { ServiceRequestedComponent } from "./green-grading/service-requested/service-requested.component";
import { ServiceRequestsComponent } from "./green-grading/service-requests/service-requests.component";
import { SourceGradingComponent } from "./green-grading/source-grading/source-grading.component";
import { CoffeeSaleComponent } from "./green-inventory/coffee-sale/coffee-sale.component";
import { GreenCoffeeInventoryComponent } from "./green-inventory/green-coffee-inventory/green-coffee-inventory.component";
import { LotSaleComponent } from "./green-inventory/lot-sale/lot-sale.component";
import { ProcuredCoffeeComponent } from "./green-inventory/procured-coffee/procured-coffee.component";
import { HelpComponent } from "./help/help.component";
import { InviteFriendsComponent } from "./invite-friends/invite-friends.component";
import { InviteSucessComponent } from "./invite-friends/invite-sucess/invite-sucess.component";
import { LanguageRegionComponent } from "./language-region/language-region.component";
import { LoginSecurityComponent } from "./login-security/login-security.component";
import { MyprofileComponent } from "./myprofile/myprofile.component";
import { NotificationComponent } from "./notification/notification.component";
import { PrivacySettingsComponent } from "./privacy-settings/privacy-settings.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { RoasterCompleteSetupComponent } from "./roaster-complete-setup/roaster-complete-setup.component";
import { RoasterDashboardComponent } from "./roaster-dashboard/roaster-dashboard.component";
import { RoasterOnboardComponent } from "./roaster-onboard/roaster-onboard.component";
import { RoasterOnboardingComponent } from "./roaster-onboarding/roaster-onboarding.component";
import { RoasterQuickSetupComponent } from "./roaster-quick-setup/roaster-quick-setup.component";
import { RoasteryLicenseComponent } from "./roastery-profile/roastery-license/roastery-license.component";
import { RoasteryProfileComponent } from "./roastery-profile/roastery-profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { AvailableCoffeeListComponent } from "./Sourcing/available-coffee-list/available-coffee-list.component";
import { AvailableConfirmOrderComponent } from "./Sourcing/available-coffee-list/available-confirm-order/available-confirm-order.component";
import { OrderPlacedComponent } from "./Sourcing/available-coffee-list/order-placed/order-placed.component";
import { EstateDetailsListComponent } from "./Sourcing/estate-details-list/estate-details-list.component";
import { SourcingOrderChatComponent } from "./Sourcing/estate-details-list/sourcing-order-chat/sourcing-order-chat.component";
import { SourcingComponent } from "./Sourcing/sourcing/sourcing.component";
import { VatManagementComponent } from "./vat-management/vat-management.component";
import { WelcomeAboardComponent } from "./welcome-aboard/welcome-aboard.component";
import { BatchSelectAnOrderComponent} from "./batch-select-an-order/batch-select-an-order.component";
import { SuccessfulPageComponent } from './successful-page/successful-page.component';
import { DefaultSettingComponent} from './Farm Link/coffee-experience/default-setting/default-setting.component';
import { GreenCoffeeForSaleDetailsComponent} from './green-inventory/green-coffee-for-sale-details/green-coffee-for-sale-details.component'
import { from } from 'rxjs';
import {ApiRequestsTableComponent} from './api-requests/api-requests-table/api-requests-table.component';

const routes: Routes = [
  {
    path: "",
    component: FeaturesComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roaster-onboarding",
        component: RoasterOnboardingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roaster-quick-setup",
        component: RoasterQuickSetupComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roaster-complete-setup",
        component: RoasterCompleteSetupComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "welcome-aboard",
        component: WelcomeAboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "myprofile",
        component: MyprofileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profile-edit",
        component: ProfileEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "account-settings",
        component: SettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "privacy-settings",
        component: PrivacySettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "login-security",
        component: LoginSecurityComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "preferences",
        component: ChatNotificationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "language-region",
        component: LanguageRegionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "help",
        component: HelpComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "f-direct-messaging",
        component: FDirectMessagingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "sourcing",
        component: SourcingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "brand-profile",
        component: BrandProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "coffee-experience",
        component: CoffeeExperienceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "agreement",
        component: AgreementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "file-share",
        component: FileShareComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "social-media",
        component: SocialMediaPostsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "reset-password",
        component: ResetPasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "coffee-details",
        component: CofeeExpeienceDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "blog-details",
        component: BlogDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roastery-profile",
        component: RoasteryProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "estate-details/:id",
        component: EstateDetailsListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "sourcing-chat",
        component: SourcingOrderChatComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "my-files",
        component: MyfilesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "share",
        component: SharewithmeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "file-share-details",
        component: FileShareDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "file-share-details/:folderId",
        component: FileShareDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "available-coffee-list/:estateId/:harvestId",
        component: AvailableCoffeeListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "available-confirm-order",
        component: AvailableConfirmOrderComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "order-placed",
        component: OrderPlacedComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "notification",
        component: NotificationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "license",
        component: RoasteryLicenseComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roaster-onboard",
        component: RoasterOnboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roaster-dashboard",
        component: RoasterDashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roasted-coffee-batch",
        component: RoastedCoffeeBatchesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "new-roasted-batch",
        component: NewRoastedBatchComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "add-product",
        component: AddProductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "product/:id",
        component: AddProductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "create-roasting-profile",
        component: CreateRoastingProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "products-list",
        component: ProductsTableComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "select-order-list",
        component: SelectOrderTableComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roasting-profile",
        component: RoastingProfilesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "green-coffee-inventory",
        component: GreenCoffeeInventoryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "procured-coffee",
        component: ProcuredCoffeeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "green-coffee-for-sale-details",
        component: GreenCoffeeForSaleDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "coffee-sale",
        component: CoffeeSaleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "lot-sale",
        component: LotSaleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "cupping-reports",
        component: CuppingReportComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "cupping-service",
        component: CuppingServiceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "generate-new-report",
        component: GenerateNewReportComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "cupping-results",
        component: CuppingResultsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "generate-report",
        component: GenerateReportComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "grade-sample",
        component: GradeSampleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "grade-service",
        component: GradeServiceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "service-request",
        component: ServiceRequestsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "green-coffee-grading",
        component: GreenCoffeeGradingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "green-grading",
        component: GreenGradingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "source-grading",
        component: SourceGradingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "service-requested",
        component: ServiceRequestedComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "process-details",
        component: ProcessDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "invite-friends",
        component: InviteFriendsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "invite-sucess",
        component: InviteSucessComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "vat-management",
        component: VatManagementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "q-a-forum",
        component: QAForumComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "visit-us",
        component: VisitUsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "home-page",
        component: HomePageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "about-us",
        component: AboutUsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "sustainability",
        component: SustainabilityComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "learn",
        component: LearnComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "batch-select-an-order",
        component: BatchSelectAnOrderComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "success-mail",
        component: SuccessfulPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "default-setting",
        component: DefaultSettingComponent,
        canActivate: [AuthGuard],
      },
      {
        path:"api-requests-list",
        component:ApiRequestsTableComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "",
        redirectTo: "welcome-aboard",
        pathMatch: "full",
      },
      {
        path: "**",
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
