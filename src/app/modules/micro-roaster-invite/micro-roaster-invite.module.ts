import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { MicroRoasterInviteDetailsComponent } from './micro-roaster-invite-details/micro-roaster-invite-details.component';
import { MicroRoasterInviteRoutingModule } from './micro-roaster-invite-routing.module';

@NgModule({
    declarations: [MicroRoasterInviteDetailsComponent],
    imports: [CommonModule, MicroRoasterInviteRoutingModule, SharedModule],
})
export class MicroRoasterInviteModule {}
