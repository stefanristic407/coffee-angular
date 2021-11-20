import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { PublicInviteDetailsComponent } from './public-invite-details/public-invite-details.component';
import { PublicInviteRoutingModule } from './public-invite-routing.module';

@NgModule({
    declarations: [PublicInviteDetailsComponent],
    imports: [CommonModule, PublicInviteRoutingModule, SharedModule],
})
export class PublicInviteModule {}
