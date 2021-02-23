import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ChatNotificationComponent } from './chat-notification/chat-notification.component';
import { OnboardCustomersComponent } from './onboard-customers/onboard-customers.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { HelpComponent } from './help/help.component';
import { LoginSecurityComponent } from './login-security/login-security.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { PrivacySettingsComponent } from './privacy-settings/privacy-settings.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfilePicComponent } from './profile-edit/profile-pic/profile-pic.component';
import { RoasterCompleteSetupComponent } from './roaster-complete-setup/roaster-complete-setup.component';
import { RoasterOnboardingComponent } from './roaster-onboarding/roaster-onboarding.component';
import { RoasterQuickSetupComponent } from './roaster-quick-setup/roaster-quick-setup.component';
import { SettingsComponent } from './settings/settings.component';
import { LanguageRegionComponent } from './language-region/language-region.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { DataTablesModule } from 'angular-datatables';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CoffeeExperienceComponent } from './Farm Link/coffee-experience/coffee-experience.component';
import { SocialMediaPostsComponent } from './Farm Link/social-media-posts/social-media-posts.component';
import { AgreementComponent } from './Farm Link/agreement/agreement.component';

import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CofeeExpeienceDetailsComponent } from './Farm Link/cofee-expeience-details/cofee-expeience-details.component';
import { BlogDetailsComponent } from './Farm Link/blog-details/blog-details.component';
import { ContactComponent } from './roastery-profile/contact/contact.component';
import { VirtualTourComponent } from './roastery-profile/virtual-tour/virtual-tour.component';
import { AboutRoasteryComponent } from './roastery-profile/about-roastery/about-roastery.component';
import { RoasteryProfileComponent } from './roastery-profile/roastery-profile.component';
import { ProfilePhotoComponent } from './roastery-profile/profile-photo/profile-photo.component';
import { ReviewsComponent } from './roastery-profile/reviews/reviews.component';
import { ProfileLicenseComponent } from './profile-edit/profile-license/profile-license.component';
import { NotificationComponent } from './notification/notification.component';
import { RoasteryLicenseComponent } from './roastery-profile/roastery-license/roastery-license.component';
import { RoasterOnboardComponent } from './roaster-onboard/roaster-onboard.component';

import { AddProductComponent } from './e-commerce/add-product/add-product.component';
import { ProductsTableComponent } from './e-commerce/products-table/products-table.component';
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
import { GradeMySampleComponent } from './green-grading/grade-my-sample/grade-my-sample.component';
import { GradeSampleComponent } from './green-grading/grade-sample/grade-sample.component';
import { GradeServiceComponent } from './green-grading/grade-service/grade-service.component';
import { GreenCoffeeGradingComponent } from './green-grading/green-coffee-grading/green-coffee-grading.component';
import { GreenGradingComponent } from './green-grading/green-grading/green-grading.component';
import { ServiceRequestsComponent } from './green-grading/service-requests/service-requests.component';
import { SourceGradingComponent } from './green-grading/source-grading/source-grading.component';
import { ServiceRequestedComponent } from './green-grading/service-requested/service-requested.component';
import { ProcessDetailsComponent } from './green-grading/process-details/process-details.component';
import { VatManagementComponent } from './vat-management/vat-management.component';
import { VatDetailsComponent } from './vat-management/vat-details/vat-details.component';
import { QAForumComponent } from './Farm Link/q-a-forum/q-a-forum.component';
import { AssignedComponent } from './Farm Link/q-a-forum/assigned/assigned.component';
import { ForumComponent } from './Farm Link/q-a-forum/forum/forum.component';
import { MyAnswersComponent } from './Farm Link/q-a-forum/my-answers/my-answers.component';
import { BatchSelectAnOrderComponent } from './batch-select-an-order/batch-select-an-order.component';
import { SuccessfulPageComponent } from './successful-page/successful-page.component';
import { HorecaAgreementsComponent } from './Farm Link/agreement/horeca-agreements/horeca-agreements.component';
import { MicroRoasterAgreementsComponent } from './Farm Link/agreement/micro-roaster-agreements/micro-roaster-agreements.component';
import { EstateOrdersComponent } from './Farm Link/coffee-experience/estate-orders/estate-orders.component';
import { MicroRoasterOrdersComponent } from './Farm Link/coffee-experience/micro-roaster-orders/micro-roaster-orders.component';
import { HorecaOrdersComponent } from './Farm Link/coffee-experience/horeca-orders/horeca-orders.component';
import { DefaultSettingComponent } from './Farm Link/coffee-experience/default-setting/default-setting.component';
// tslint:disable-next-line: max-line-length
import { ApiRequestsTableComponent } from './api-requests/api-requests-table/api-requests-table.component';
import { ApiKeyRequestsComponent } from './api-requests/api-requests-table/api-key-requests/api-key-requests.component';
import { GeneratedKeysComponent } from './api-requests/api-requests-table/generated-keys/generated-keys.component';
import { ApiRequestDetailsComponent } from './api-requests/api-requests-table/api-request-details/api-request-details.component';
import { GenerateKeyDetailsComponent } from './api-requests/api-requests-table/generate-key-details/generate-key-details.component';
import { ConfirmPreorderLotComponent } from './confirm-preorder-lot/confirm-preorder-lot.component';
import { OtherCuppingServiceComponent } from './green-grading/cupping-report/other-cupping-service/other-cupping-service.component';
import { OtherGenerateReportComponent } from './green-grading/cupping-report/other-generate-report/other-generate-report.component';
import { ProductListComponent } from './e-commerce/product-list/product-list.component';
import { ProductDetailsComponent } from './e-commerce/product-details/product-details.component';
import { VarientDetailsComponent } from './e-commerce/varient-details/varient-details.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RatingModule } from 'primeng/rating';
import { ListboxModule } from 'primeng/listbox';

@NgModule({
    declarations: [
        OnboardCustomersComponent,
        RoasterOnboardingComponent,
        RoasterQuickSetupComponent,
        RoasterCompleteSetupComponent,
        FeaturesComponent,
        MyprofileComponent,
        ProfileEditComponent,
        ProfilePicComponent,
        SettingsComponent,
        PrivacySettingsComponent,
        LoginSecurityComponent,
        ChatNotificationComponent,
        HelpComponent,
        LanguageRegionComponent,
        CoffeeExperienceComponent,
        SocialMediaPostsComponent,
        AgreementComponent,
        ResetPasswordComponent,
        CofeeExpeienceDetailsComponent,
        BlogDetailsComponent,
        RoasteryProfileComponent,
        ContactComponent,
        VirtualTourComponent,
        AboutRoasteryComponent,
        ProfilePhotoComponent,
        ReviewsComponent,
        ProfileLicenseComponent,
        NotificationComponent,
        RoasteryLicenseComponent,
        RoasterOnboardComponent,
        AddProductComponent,
        ProductsTableComponent,
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
        VatManagementComponent,
        VatDetailsComponent,
        QAForumComponent,
        AssignedComponent,
        ForumComponent,
        MyAnswersComponent,
        BatchSelectAnOrderComponent,
        SuccessfulPageComponent,
        HorecaAgreementsComponent,
        MicroRoasterAgreementsComponent,
        EstateOrdersComponent,
        MicroRoasterOrdersComponent,
        HorecaOrdersComponent,
        DefaultSettingComponent,
        ApiRequestsTableComponent,
        ApiKeyRequestsComponent,
        GeneratedKeysComponent,
        ApiRequestDetailsComponent,
        GenerateKeyDetailsComponent,
        ConfirmPreorderLotComponent,
        OtherCuppingServiceComponent,
        OtherGenerateReportComponent,
        ProductListComponent,
        ProductDetailsComponent,
        VarientDetailsComponent,
    ],
    imports: [
        CommonModule,
        FeaturesRoutingModule,
        DragDropModule,
        MatChipsModule,
        MatIconModule,
        DataTablesModule,
        FormsModule,
        MatBottomSheetModule,
        Ng2SearchPipeModule,
        RatingModule,
        MatProgressBarModule,
        SharedModule,
        NgxChartsModule,
        ListboxModule,
    ],
})
export class FeaturesModule {}
