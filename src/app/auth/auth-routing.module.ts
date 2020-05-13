import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthComponent } from './auth.component';
import { PagenotfoundComponent } from '../features/pagenotfound/pagenotfound.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SetupComponent } from './setup/setup.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'verify-otp',
        component: VerifyOtpComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'setup',
        component: SetupComponent
      },
      {
        path: 'update-password',
        component: UpdatePasswordComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: PagenotfoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
