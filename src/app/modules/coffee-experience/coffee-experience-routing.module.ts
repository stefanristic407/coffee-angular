import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeeExperienceComponent } from './coffee-experience.component';
import { EstateOrdersTableComponent } from '@modules/coffee-experience/estate-orders-table/estate-orders-table.component';
import { MicroRoasterOrdersTableComponent } from '@modules/coffee-experience/micro-roaster-orders-table/micro-roaster-orders-table.component';
import { HorecaOrdersTableComponent } from '@modules/coffee-experience/horeca-orders-table/horeca-orders-table.component';

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
                component: EstateOrdersTableComponent,
            },
            {
                path: 'micro-roaster',
                component: MicroRoasterOrdersTableComponent,
            },
            {
                path: 'horeca',
                component: HorecaOrdersTableComponent,
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
