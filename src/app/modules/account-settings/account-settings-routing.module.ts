import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSettingsComponent } from './account-settings.component';
import { PrivacySettingsComponent } from './privacy-settings/privacy-settings.component';
import { LoginSecurityComponent } from './login-security/login-security.component';
import { ChatAndNotificationsComponent } from './chat-and-notifications/chat-and-notifications.component';
import { LanguageRegionComponent } from './language-region/language-region.component';
import { HelpComponent } from './help/help.component';
import { MfaComponent } from './login-security/mfa/mfa.component';

const routes: Routes = [
    { path: '', component: AccountSettingsComponent },
    { path: 'privacy-settings', component: PrivacySettingsComponent },
    { path: 'login-security', component: LoginSecurityComponent },
    { path: 'login-security/mfa', component: MfaComponent },
    {
        path: 'chat-and-notifications',
        component: ChatAndNotificationsComponent,
    },
    { path: 'language-region', component: LanguageRegionComponent },
    { path: 'help', component: HelpComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountSettingsRoutingModule {}
