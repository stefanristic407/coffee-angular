import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HealthCheckComponent } from './health-check/health-check.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { path: 'health-check', component: HealthCheckComponent },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'features',
                loadChildren: () => import('./features/features.module').then((m) => m.FeaturesModule),
            },
            {
                path: 'ordermanagement',
                loadChildren: () =>
                    import('./ordermanagement/ordermanagement.module').then((m) => m.OrdermanagementModule),
            },
            {
                path: 'dispute-system',
                loadChildren: () =>
                    import('./modules/dispute-system/dispute-system.module').then((m) => m.DisputeSystemModule),
            },
            {
                path: 'team-management',
                loadChildren: () =>
                    import('./modules/team-management/team-management.module').then((m) => m.TeamManagementModule),
            },
            {
                path: 'people',
                loadChildren: () => import('./modules/people/people.module').then((m) => m.PeopleModule),
            },
            {
                path: 'invite-friends',
                loadChildren: () =>
                    import('./modules/invite-friends/invite-friends.module').then((m) => m.InviteFriendsModule),
            },
            {
                path: 'sourcing',
                loadChildren: () => import('./modules/sourcing/sourcing.module').then((m) => m.SourcingModule),
            },
            {
                path: 'brand-profile',
                loadChildren: () =>
                    import('./modules/brand-profile/brand-profile.module').then((m) => m.BrandProfileModule),
            },
            { path: '', redirectTo: 'features', pathMatch: 'full' },
        ],
    },
    {
        path: 'error',
        loadChildren: () => import('./modules/error-module/error-module.module').then((m) => m.ErrorModuleModule),
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
