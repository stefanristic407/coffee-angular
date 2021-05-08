import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { PageNotFoundComponent } from '@app/modules/error-module/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'product-list/:type',
                component: ProductListComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'product-details/:type/add',
                component: ProductDetailsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'product-details/:type/:id',
                component: ProductDetailsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: '',
                redirectTo: 'product-list/b2b',
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
export class ECommerceRoutingModule {}
