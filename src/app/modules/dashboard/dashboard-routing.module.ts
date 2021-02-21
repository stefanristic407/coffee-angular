import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards';

import { RoasterDashboardComponent } from './roaster-dashboard/roaster-dashboard.component';

const routes: Routes = [
    {
        path: 'roaster-dashboard',
        component: RoasterDashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '',
        redirectTo: 'roaster-dashboard',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
