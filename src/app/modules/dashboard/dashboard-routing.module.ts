import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards';

import { RoasterDashboardComponent } from './roaster-dashboard/roaster-dashboard.component';
import { WelcomeAboardComponent } from './welcome-aboard/welcome-aboard.component';

const routes: Routes = [
    {
        path: 'roaster-dashboard',
        component: RoasterDashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'welcome-aboard',
        component: WelcomeAboardComponent,
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
