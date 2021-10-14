import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { SharedModule } from '@shared';

import { WelcomeComponent } from './welcome.component';

@NgModule({
    declarations: [WelcomeComponent],
    imports: [CommonModule, WelcomeRoutingModule, SharedModule],
})
export class WelcomeModule {}
