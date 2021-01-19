import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { HealthCheckComponent } from './health-check/health-check.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { path: 'health-check', component: HealthCheckComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'features',
                loadChildren: () => import('./features/features.module').then((m) => m.FeaturesModule),
            },
            { path: '', redirectTo: 'features', pathMatch: 'full' },
        ],
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
        path: 'error',
        loadChildren: () => import('./error-module/error-module.module').then((m) => m.ErrorModuleModule),
    },
    { path: 'people', loadChildren: () => import('./people/people.module').then((m) => m.PeopleModule) },
    {
        path: 'ordermanagement',
        loadChildren: () => import('./ordermanagement/ordermanagement.module').then((m) => m.OrdermanagementModule),
    },
    { path: '**', redirectTo: 'auth' },
];

const config: ExtraOptions = {
    useHash: false,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
