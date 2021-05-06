import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: ':orgType',
        children: [
            {
                path: '',
                pathMatch: 'full',
                loadChildren: () => import('./order-list/order-list.module').then((m) => m.OrderListModule),
            },
            {
                path: ':id',
                loadChildren: () => import('./order/order.module').then((m) => m.OrderModule),
            },
        ],
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'es',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrderManagementRoutingModule {}
