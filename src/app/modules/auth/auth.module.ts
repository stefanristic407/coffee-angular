import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@NgModule({
    declarations: [AuthComponent, PrivacyPolicyComponent],
    imports: [CommonModule, AuthRoutingModule, FormsModule, SharedModule],
    providers: [],
})
export class AuthModule {}
