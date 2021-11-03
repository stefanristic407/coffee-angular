import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicroRoasterInviteComponent } from './micro-roaster-invite.component';

const routes: Routes = [
    {
        path: '',
        component: MicroRoasterInviteComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MicroRoasterInviteRoutingModule {}
