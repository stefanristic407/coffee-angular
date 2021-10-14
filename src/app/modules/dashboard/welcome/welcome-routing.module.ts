import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards';

import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WelcomeRoutingModule {}
