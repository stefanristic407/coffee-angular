import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { ImageCropperModule } from 'ngx-image-cropper';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LicenseComponent } from './setup/license/license.component';
import { ProfileImageComponent } from './setup/profile-image/profile-image.component';
import { SetupComponent } from './setup/setup.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { RoasterProfileComponent } from './setup/roaster-profile/roaster-profile.component';

import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastrModule } from 'ngx-toastr';
import { ErrorModuleModule } from '../error-module/error-module.module';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    declarations: [
        LoginComponent,
        ForgotPasswordComponent,
        AuthComponent,
        PagenotfoundComponent,
        VerifyOtpComponent,
        ChangePasswordComponent,
        SetupComponent,
        UpdatePasswordComponent,
        PrivacyPolicyComponent,
        LicenseComponent,
        ProfileImageComponent,
        RoasterProfileComponent,
        SignUpComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        DialogModule,
        ImageCropperModule,
        SliderModule,
        FormsModule,
        HttpClientModule,
        NgOtpInputModule,
        ErrorModuleModule,
        ToastrModule.forRoot({ timeOut: 10000, preventDuplicates: true }),
        SharedModule,
    ],
    providers: [CookieService, UserserviceService],
})
export class AuthModule {}
