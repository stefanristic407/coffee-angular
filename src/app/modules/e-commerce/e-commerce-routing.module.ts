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
                path: 'product-list',
                component: ProductListComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'product-details/add',
                component: ProductDetailsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'product-details/:id',
                component: ProductDetailsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: '',
                redirectTo: 'product-list',
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
