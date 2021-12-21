import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicInviteDetailsComponent } from './public-invite-details/public-invite-details.component';
import { PublicInviteComponent } from './public-invite.component';

const routes: Routes = [
    {
        path: '',
        component: PublicInviteComponent,
    },
    { path: ':id', component: PublicInviteDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PublicInviteRoutingModule {}
