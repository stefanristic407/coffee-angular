import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HealthCheckComponent } from '@components';
import { LayoutComponent } from './layout/layout.component';
import { GateComponent } from '@components';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'tes',
                loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
            {
                path: 'features',
                loadChildren: () => import('./features/features.module').then((m) => m.FeaturesModule),
            },
            {
                path: 'orders',
                loadChildren: () =>
                    import('./modules/order-management/order-management.module').then((m) => m.OrderManagementModule),
            },
            {
                path: 'review-rating',
                loadChildren: () =>
                    import('./modules/review-rating/review-rating.module').then((m) => m.ReviewRatingModule),
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
                path: 'file-share',
                loadChildren: () => import('./modules/file-share/file-share.module').then((m) => m.FileShareModule),
            },
            {
                path: 'api-requests-list',
                loadChildren: () =>
                    import('./modules/api-requests/api-requests-table/api-request.module').then(
                        (m) => m.ApiRequestModule,
                    ),
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
            {
                path: 'sales-contract',
                loadChildren: () =>
                    import('./modules/sales-contract/sales-contract.module').then((m) => m.SalesContractModule),
            },
            {
                path: 'roastery-profile',
                loadChildren: () =>
                    import('./modules/profile-creation/profile-creation.module').then((m) => m.ProfileCreationModule),
            },
            {
                path: 'social-media',
                loadChildren: () =>
                    import('./modules/social-media/social-media.module').then((m) => m.SocialMediaModule),
            },
            {
                path: '',
                redirectTo: 'social-media',
                pathMatch: 'full',
            },
        ],
    },
    { path: 'gate', component: GateComponent },
    { path: 'health-check', component: HealthCheckComponent },
    {
        path: 'error',
        loadChildren: () => import('./modules/error-module/error-module.module').then((m) => m.ErrorModuleModule),
    },
    { path: '**', redirectTo: 'roaster-dashboard' },
];

const config: ExtraOptions = {
    useHash: false,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
