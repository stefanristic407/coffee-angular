import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HealthCheckComponent } from '@components';
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
                path: '',
                loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
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
            {
                path: 'green-coffee-management',
                loadChildren: () =>
                    import('./modules/green-coffee-management/green-coffee-management.module').then(
                        (m) => m.GreenCoffeeManagementModule,
                    ),
            },
            {
                path: 'roasted-coffee-batch',
                loadChildren: () =>
                    import('./modules/roasted-coffee-batch/roasted-coffee-batch.module').then(
                        (m) => m.RoastedCoffeeBatchModule,
                    ),
            },
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
