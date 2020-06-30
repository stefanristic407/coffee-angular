import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { PopoverModule } from "ngx-bootstrap/popover";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { ImageCropperModule } from "ngx-image-cropper";
import { ToastrModule } from "ngx-toastr";
import { Ng2SearchPipeModule } from "ng2-search-filter";

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
import {EstateTableComponent} from './Sourcing/estate-table/estate-table.component'
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
    EstateTableComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    //PrimeNG Modules
    ImageCropperModule,
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
    TypeaheadModule.forRoot(),
    ToastrModule.forRoot({ timeOut: 10000, preventDuplicates: true })
  ]
})
export class FeaturesModule {}
