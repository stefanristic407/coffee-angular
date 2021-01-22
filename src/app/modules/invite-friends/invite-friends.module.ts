import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteFriendsRoutingModule } from './invite-friends-routing.module';
import { SharedModule } from '@shared';

import { InviteFriendsComponent } from './invite-friends.component';
import { InviteSucessComponent } from './invite-sucess/invite-sucess.component';

@NgModule({
    declarations: [InviteFriendsComponent, InviteSucessComponent],
    imports: [CommonModule, InviteFriendsRoutingModule, SharedModule],
})
export class InviteFriendsModule {}
