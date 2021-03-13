import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards';

import { GreenGradingComponent } from './green-grading.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { GradeSampleComponent } from './grade-sample/grade-sample.component';
import { GreenCoffeeOrdersComponent } from './green-coffee-orders/green-coffee-orders.component';
import { CuppingReportComponent } from './cupping-report/cupping-report.component';
import { GenerateNewReportComponent } from './cupping-report/generate-new-report/generate-new-report.component';
import { CuppingServiceComponent } from './cupping-report/cupping-service/cupping-service.component';
import { AssignUserComponent } from './assign-user/assign-user.component';

import { PageNotFoundComponent } from '@app/modules/error-module/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'home',
                component: GreenGradingComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'generate-report',
                component: GenerateReportComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'grade-sample',
                component: GradeSampleComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'green-coffee-orders',
                component: GreenCoffeeOrdersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'cupping-reports',
                component: CuppingReportComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'generate-new-report',
                component: GenerateNewReportComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'cupping-service',
                component: CuppingServiceComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'assign-user/:order-id',
                component: AssignUserComponent,
                canActivate: [AuthGuard],
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: '**',
                component: PageNotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GreenGradingRoutingModule {}
