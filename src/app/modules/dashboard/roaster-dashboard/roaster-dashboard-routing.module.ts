import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards';

import { RoasterDashboardComponent } from './roaster-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: RoasterDashboardComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoasterDashboardRoutingModule {}
