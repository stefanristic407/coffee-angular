import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { PopoverModule } from "ngx-bootstrap/popover";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { ImageCropperModule } from "ngx-image-cropper";
import { ToastrModule } from "ngx-toastr";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import {NgxChartsModule} from '@swimlane/ngx-charts';
//PrimeNG Modules
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { InputSwitchModule } from "primeng/inputswitch";
import { SliderModule } from "primeng/slider";
import { ChatNotificationComponent } from "./chat-notification/chat-notification.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FeaturesRoutingModule } from "./features-routing.module";
import { FeaturesComponent } from "./features.component";
import { HelpComponent } from "./help/help.component";
import { LoginSecurityComponent } from "./login-security/login-security.component";
import { MyprofileComponent } from "./myprofile/myprofile.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { PrivacySettingsComponent } from "./privacy-settings/privacy-settings.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { ProfilePicComponent } from "./profile-edit/profile-pic/profile-pic.component";
import { RoasterCompleteSetupComponent } from "./roaster-complete-setup/roaster-complete-setup.component";
import { RoasterOnboardingComponent } from "./roaster-onboarding/roaster-onboarding.component";
import { RoasterQuickSetupComponent } from "./roaster-quick-setup/roaster-quick-setup.component";
import { SettingsComponent } from "./settings/settings.component";
import { WelcomeAboardComponent } from "./welcome-aboard/welcome-aboard.component";
import { LanguageRegionComponent } from './language-region/language-region.component';
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { DataTablesModule } from "angular-datatables";
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {MatVideoModule} from 'mat-video';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import  { OrdermanagementModule } from '../ordermanagement/ordermanagement.module';
import { BrandProfileComponent } from './Farm Link/brand-profile/brand-profile.component';
import { CoffeeExperienceComponent } from './Farm Link/coffee-experience/coffee-experience.component';
import { SocialMediaPostsComponent } from './Farm Link/social-media-posts/social-media-posts.component';
import { FileShareComponent } from './Farm Link/file-share/file-share.component';
import { AgreementComponent } from './Farm Link/agreement/agreement.component';
import { SourcingComponent } from './Sourcing/sourcing/sourcing.component';

import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CofeeExpeienceDetailsComponent } from './Farm Link/cofee-expeience-details/cofee-expeience-details.component';
import { BlogDetailsComponent } from './Farm Link/blog-details/blog-details.component';
import { ContactComponent } from './roastery-profile/contact/contact.component';
import { VirtualTourComponent } from './roastery-profile/virtual-tour/virtual-tour.component';
import { AboutRoasteryComponent } from './roastery-profile/about-roastery/about-roastery.component'
import { RoasteryProfileComponent } from './roastery-profile/roastery-profile.component';
import { EstateDetailsListComponent } from './Sourcing/estate-details-list/estate-details-list.component';
import { AvailableCoffeeListComponent } from './Sourcing/available-coffee-list/available-coffee-list.component';
import { OverviewComponent } from './Sourcing/estate-details-list/overview/overview.component';
import { LandLotsComponent } from './Sourcing/estate-details-list/land-lots/land-lots.component';
import { OverviewRatingsComponent } from './Sourcing/estate-details-list/overview-ratings/overview-ratings.component';
import { RatingModule } from 'ng-starrating';
import { SourcingOrderChatComponent } from './Sourcing/estate-details-list/sourcing-order-chat/sourcing-order-chat.component';
import { ProfilePhotoComponent } from './roastery-profile/profile-photo/profile-photo.component';
import { ReviewsComponent } from './roastery-profile/reviews/reviews.component';
import { FileShareDetailsComponent } from './Farm Link/file-share/file-share-details/file-share-details.component';
import { MyfilesComponent } from './Farm Link/file-share/myfiles/myfiles.component';
import { SharewithmeComponent } from './Farm Link/file-share/sharewithme/sharewithme.component';
import { DocumentFileComponent } from './Farm Link/file-share/file-share-details/document-file/document-file.component';
import { VideoFileComponent } from './Farm Link/file-share/file-share-details/video-file/video-file.component';
import { DocumentTableComponent } from './Farm Link/file-share/file-share-details/document-table/document-table.component';
import { VideoTableComponent } from './Farm Link/file-share/file-share-details/video-table/video-table.component';
import { ProfileLicenseComponent } from './profile-edit/profile-license/profile-license.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { AvailableConfirmOrderComponent } from './Sourcing/available-coffee-list/available-confirm-order/available-confirm-order.component';
import { OrderPlacedComponent } from './Sourcing/available-coffee-list/order-placed/order-placed.component';
import { NotificationComponent } from './notification/notification.component';
import { RoasteryLicenseComponent } from './roastery-profile/roastery-license/roastery-license.component';
import {TooltipModule} from 'primeng/tooltip';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { RoasterOnboardComponent } from './roaster-onboard/roaster-onboard.component';
import { RoasterDashboardComponent } from './roaster-dashboard/roaster-dashboard.component';
import { CoustomerWantsChartComponent } from './roaster-dashboard/coustomer-wants-chart/coustomer-wants-chart.component';
import { ECommerceStatComponent } from './roaster-dashboard/e-commerce-stat/e-commerce-stat.component';
import { GreenCoffeeTableComponent } from './roaster-dashboard/green-coffee-table/green-coffee-table.component';
import { MicroRoasterStatComponent } from './roaster-dashboard/micro-roaster-stat/micro-roaster-stat.component';
import { SalesOrdersAllStatComponent } from './roaster-dashboard/sales-orders-all-stat/sales-orders-all-stat.component';
import { SourcedGreenCoffeeChartComponent } from './roaster-dashboard/sourced-green-coffee-chart/sourced-green-coffee-chart.component';
import { TotalCoffeeAvailableChartComponent } from './roaster-dashboard/total-coffee-available-chart/total-coffee-available-chart.component';
import { ErrorModuleModule } from '../error-module/error-module.module';
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
import { ServiceReportsComponent } from './green-grading/cupping-report/service-reports/service-reports.component';
import { OtherReportsComponent } from './green-grading/cupping-report/other-reports/other-reports.component';
import { CuppingResultsComponent } from './green-grading/cupping-results/cupping-results.component';
import { GenerateReportComponent } from './green-grading/generate-report/generate-report.component';
import { GenerateCoffeeGradingComponent } from './green-grading/generate-report/generate-coffee-grading/generate-coffee-grading.component';
import { GenerateCuppingReportComponent } from './green-grading/generate-report/generate-cupping-report/generate-cupping-report.component';
import { GenerateCuppingResultsComponent } from './green-grading/generate-report/generate-cupping-results/generate-cupping-results.component';
import { GenerateGreenCoffeeComponent } from './green-grading/generate-report/generate-green-coffee/generate-green-coffee.component';
import { GenerateMySampleComponent } from './green-grading/generate-report/generate-my-sample/generate-my-sample.component';
import {GradeMySampleComponent} from './green-grading/grade-my-sample/grade-my-sample.component';
import { GradeSampleComponent } from './green-grading/grade-sample/grade-sample.component';
import { GradeServiceComponent } from './green-grading/grade-service/grade-service.component';
import {GreenCoffeeGradingComponent} from './green-grading/green-coffee-grading/green-coffee-grading.component';
import {GreenGradingComponent} from './green-grading/green-grading/green-grading.component';
import { ServiceRequestsComponent } from './green-grading/service-requests/service-requests.component';
import {SourceGradingComponent} from './green-grading/source-grading/source-grading.component';
import { ServiceRequestedComponent} from './green-grading/service-requested/service-requested.component';
import { ProcessDetailsComponent } from './green-grading/process-details/process-details.component';
import { MarkedSaleComponent } from './green-inventory/green-coffee-inventory/marked-sale/marked-sale.component';
import { CoffeeProcuredTabComponent } from './green-inventory/green-coffee-inventory/coffee-procured-tab/coffee-procured-tab.component';
import { InviteFriendsComponent } from './invite-friends/invite-friends.component';
import { InviteSucessComponent } from './invite-friends/invite-sucess/invite-sucess.component';
import { VatManagementComponent } from './vat-management/vat-management.component';
import { VatMicroRoasterComponent } from './vat-management/vat-micro-roaster/vat-micro-roaster.component';
import { VatB2bComponent } from './vat-management/vat-b2b/vat-b2b.component';
import { QAForumComponent } from './Farm Link/q-a-forum/q-a-forum.component';
import { AssignedComponent } from './Farm Link/q-a-forum/assigned/assigned.component';
import { ForumComponent } from './Farm Link/q-a-forum/forum/forum.component';
import { MyAnswersComponent } from './Farm Link/q-a-forum/my-answers/my-answers.component';
import {AgmCoreModule} from '@agm/core';
import { AboutUsComponent } from './Farm Link/brand-profile/about-us/about-us.component';
import { SustainabilityComponent } from './Farm Link/brand-profile/sustainability/sustainability.component';
import { VisitUsComponent } from './Farm Link/brand-profile/visit-us/visit-us.component';
import { HomePageComponent } from './Farm Link/brand-profile/home-page/home-page.component';
import { LearnComponent } from './Farm Link/brand-profile/learn/learn.component';
import { BatchSelectAnOrderComponent } from './batch-select-an-order/batch-select-an-order.component';
import { SuccessfulPageComponent } from './successful-page/successful-page.component';



@NgModule({
  declarations: [
    DashboardComponent,
    RoasterOnboardingComponent,
    RoasterQuickSetupComponent,
    RoasterCompleteSetupComponent,
    PagenotfoundComponent,
    FeaturesComponent,
    WelcomeAboardComponent,
    MyprofileComponent,
    ProfileEditComponent,
    ProfilePicComponent,
    SettingsComponent,
    PrivacySettingsComponent,
    LoginSecurityComponent,
    ChatNotificationComponent,
    HelpComponent,
    LanguageRegionComponent,
    BrandProfileComponent,
    CoffeeExperienceComponent,
    SocialMediaPostsComponent,
    FileShareComponent,
    AgreementComponent,
    SourcingComponent,
    ResetPasswordComponent,
    CofeeExpeienceDetailsComponent,
    BlogDetailsComponent,
    RoasteryProfileComponent,
    ContactComponent,
    VirtualTourComponent,
    AboutRoasteryComponent,
    EstateDetailsListComponent,
    AvailableCoffeeListComponent,
    OverviewComponent,
    LandLotsComponent,
    OverviewRatingsComponent,
    SourcingOrderChatComponent,
    ProfilePhotoComponent,
    ReviewsComponent,
    FileShareDetailsComponent,
    MyfilesComponent,
    SharewithmeComponent,
    DocumentFileComponent,
    VideoFileComponent,
    DocumentTableComponent,
    VideoTableComponent,
    ProfileLicenseComponent,
    AvailableConfirmOrderComponent,
    OrderPlacedComponent,
    NotificationComponent,
    RoasteryLicenseComponent,
    RoasterOnboardComponent,
    RoasterDashboardComponent,
    CoustomerWantsChartComponent,
    ECommerceStatComponent,
    GreenCoffeeTableComponent,
    MicroRoasterStatComponent,
    SalesOrdersAllStatComponent,
    SourcedGreenCoffeeChartComponent,
    TotalCoffeeAvailableChartComponent,
    RoastedCoffeeBatchesComponent,
    NewRoastedBatchComponent,
    AddProductComponent,
    CreateRoastingProfileComponent,
    ProductsTableComponent,
    RoastingProfilesComponent,
    SelectOrderTableComponent,
    GreenCoffeeInventoryComponent,
    ProcuredCoffeeComponent,
    CoffeeSaleComponent,
    LotSaleComponent,
    CuppingReportComponent,
    CuppingServiceComponent,
    GenerateNewReportComponent,
    ServiceReportsComponent,
    OtherReportsComponent,
    CuppingResultsComponent,
    GenerateReportComponent,
    GenerateCoffeeGradingComponent,
    GenerateCuppingReportComponent,
    GenerateCuppingResultsComponent,
    GenerateGreenCoffeeComponent,
    GenerateMySampleComponent,
    GradeMySampleComponent,
    GradeSampleComponent,
    GradeServiceComponent,
    GreenCoffeeGradingComponent,
    GreenGradingComponent,
    ServiceRequestsComponent,
    SourceGradingComponent,
    ServiceRequestedComponent,
    ProcessDetailsComponent,
    MarkedSaleComponent,
    CoffeeProcuredTabComponent,
    InviteFriendsComponent,
    InviteSucessComponent,
    VatManagementComponent,
    VatMicroRoasterComponent,
    VatB2bComponent,
    QAForumComponent,
    AssignedComponent,
    ForumComponent,
    MyAnswersComponent,
    AboutUsComponent,
    SustainabilityComponent,
    VisitUsComponent,
    HomePageComponent,
    LearnComponent,
    BatchSelectAnOrderComponent,
    SuccessfulPageComponent,
  
 
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    //PrimeNG Modules
    ImageCropperModule,
    AutoCompleteModule,
    TooltipModule,
    DragDropModule,
    OrdermanagementModule,
    MatChipsModule,
    MatIconModule,
    SliderModule,
    ModalModule,
    DialogModule,
    ButtonModule,
    PopoverModule,
    SliderModule,
    DataTablesModule,
    FormsModule,
    InputSwitchModule,
    CalendarModule,
    MatBottomSheetModule,
    Ng2SearchPipeModule,
    RatingModule,
    NgxChartsModule,
    GalleryModule,
    LightboxModule,
    MatVideoModule,
    ErrorModuleModule,
    TypeaheadModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot({ timeOut: 10000, preventDuplicates: true }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAacYaKLrRdDZDzrQ5QAdNFMj9nQ2PgweU'
      // libraries: ['places']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, "./assets/multi-lang/", ".json");
        },
        deps: [HttpClient]
      }
    }),
  ]
})
export class FeaturesModule {}
