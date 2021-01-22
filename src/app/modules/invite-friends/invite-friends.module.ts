import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteFriendsRoutingModule } from './invite-friends-routing.module';
import { SharedModule } from '@shared';

import { InviteFriendsComponent } from './invite-friends.component';

@NgModule({
    declarations: [InviteFriendsComponent],
    imports: [CommonModule, InviteFriendsRoutingModule, SharedModule],
})
export class InviteFriendsModule {}
