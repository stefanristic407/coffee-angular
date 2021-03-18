import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeeExperienceComponent } from './coffee-experience.component';
import { OrdersTableComponent } from '@modules/coffee-experience/orders-table/orders-table.component';

const routes: Routes = [
    {
        path: '',
        component: CoffeeExperienceComponent,
        children: [
            {
                path: '',
                redirectTo: 'estate',
                pathMatch: 'full',
            },
            {
                path: 'estate',
                component: OrdersTableComponent,
                data: {type: 'estate'}
            },
            {
                path: 'micro-roaster',
                component: OrdersTableComponent,
                data: {type: 'micro-roaster'}
            },
            {
                path: 'horeca',
                component: OrdersTableComponent,
                data: {type: 'horeca'}
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoffeeExperienceRoutingModule {
}
