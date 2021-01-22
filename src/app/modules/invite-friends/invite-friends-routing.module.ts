import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteFriendsComponent } from './invite-friends.component';
import { InviteSucessComponent } from './invite-sucess/invite-sucess.component';

const routes: Routes = [
    {
        path: '',
        component: InviteFriendsComponent,
    },
    {
        path: 'sucess',
        component: InviteSucessComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InviteFriendsRoutingModule {}
