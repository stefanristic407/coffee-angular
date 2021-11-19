import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicroRoasterInviteDetailsComponent } from './micro-roaster-invite-details/micro-roaster-invite-details.component';
import { MicroRoasterInviteComponent } from './micro-roaster-invite.component';

const routes: Routes = [
    {
        path: '',
        component: MicroRoasterInviteComponent,
    },
    { path: ':id', component: MicroRoasterInviteDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MicroRoasterInviteRoutingModule {}
