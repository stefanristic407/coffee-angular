import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { GateComponent, HealthCheckComponent, LayoutComponent } from '@components';

export const routes: Routes = [
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
                loadChildren: () => import('./modules/features/features.module').then((m) => m.FeaturesModule),
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
                    import('./modules/api-requests/api-requests.module').then((m) => m.ApiRequestModule),
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
                path: 'product-setting',
                loadChildren: () =>
                    import('./modules/product-setting/product-setting.module').then((m) => m.ProductSettingModule),
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
                path: 'account-settings',
                loadChildren: () =>
                    import('./modules/account-settings/account-settings.module').then((m) => m.AccountSettingsModule),
            },
            {
                path: 'social-media',
                loadChildren: () =>
                    import('./modules/social-media/social-media.module').then((m) => m.SocialMediaModule),
            },
            {
                path: 'green-grading',
                loadChildren: () =>
                    import('./modules/green-grading/green-grading.module').then((m) => m.GreenGradingModule),
            },
            {
                path: 'my-profile',
                loadChildren: () => import('./modules/my-profile/my-profile.module').then((m) => m.MyProfileModule),
            },
            {
                path: 'user-profile',
                loadChildren: () => import('./modules/my-profile/my-profile.module').then((m) => m.MyProfileModule),
            },
            {
                path: 'profile',
                loadChildren: () => import('./modules/profile/profile.module').then((m) => m.ProfileModule),
            },
            {
                path: 'coffee-experience',
                loadChildren: () =>
                    import('./modules/coffee-experience/coffee-experience.module').then(
                        (m) => m.CoffeeExperienceModule,
                    ),
            },
            {
                path: 'coffee-lab',
                loadChildren: () => import('./modules/coffee-lab/coffee-lab.module').then((m) => m.CoffeeLabModule),
            },
            {
                path: 'e-commerce',
                loadChildren: () => import('./modules/e-commerce/e-commerce.module').then((m) => m.ECommerceModule),
            },
            {
                path: 'outtake-orders',
                loadChildren: () =>
                    import('./modules/outtake-orders/outtake-orders.module').then((m) => m.OuttakeOrdersModule),
            },
            {
                path: 'order-transaction',
                loadChildren: () =>
                    import('./modules/order-transaction/order-transaction.module').then(
                        (m) => m.OrderTransactionModule,
                    ),
            },
            {
                path: 'mr-public-invite',
                loadChildren: () =>
                    import('./modules/public-invite/public-invite.module').then((m) => m.PublicInviteModule),
            },
        ],
    },
    { path: 'gate', component: GateComponent },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    },
    { path: 'health-check', component: HealthCheckComponent },
    {
        path: 'error',
        loadChildren: () => import('./modules/error-module/error-module.module').then((m) => m.ErrorModuleModule),
    },
    { path: '**', redirectTo: 'dashboard' },
];

const config: ExtraOptions = {
    useHash: false,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
