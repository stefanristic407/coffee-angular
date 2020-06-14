import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { PopoverModule } from "ngx-bootstrap/popover";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { ImageCropperModule } from "ngx-image-cropper";
import { ToastrModule } from "ngx-toastr";
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
    LanguageRegionComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    //PrimeNG Modules
    ImageCropperModule,
    SliderModule,
    ModalModule,
    DialogModule,
    ButtonModule,
    PopoverModule,
    FormsModule,
    InputSwitchModule,
    CalendarModule,
    TypeaheadModule.forRoot(),
    ToastrModule.forRoot({ timeOut: 10000, preventDuplicates: true })
  ]
})
export class FeaturesModule {}
