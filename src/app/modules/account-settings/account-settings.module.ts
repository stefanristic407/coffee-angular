import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { AccountSettingsComponent } from './account-settings.component';
import { PrivacySettingsComponent } from './privacy-settings/privacy-settings.component';
import { LoginSecurityComponent } from './login-security/login-security.component';
import { ChatAndNotificationsComponent } from './chat-and-notifications/chat-and-notifications.component';
import { LanguageRegionComponent } from './language-region/language-region.component';
import { HelpComponent } from './help/help.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        AccountSettingsComponent,
        PrivacySettingsComponent,
        LoginSecurityComponent,
        ChatAndNotificationsComponent,
        LanguageRegionComponent,
        HelpComponent,
    ],
    imports: [
        CommonModule,
        AccountSettingsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        InputSwitchModule,
        ButtonModule,
        InputTextModule,
        MessagesModule,
        ConfirmDialogModule,
        DropdownModule,
        MenuModule,
        BreadcrumbModule,
        MatMenuModule,
    ],
    providers: [ConfirmationService],
})
export class AccountSettingsModule {}
