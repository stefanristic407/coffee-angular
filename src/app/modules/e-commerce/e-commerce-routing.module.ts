import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards';

import { OtherProductDetailsComponent } from './other-product-details/other-product-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

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
                path: 'product-details/other/add',
                component: OtherProductDetailsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'product-details/other/:id',
                component: OtherProductDetailsComponent,
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
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ECommerceRoutingModule {}
