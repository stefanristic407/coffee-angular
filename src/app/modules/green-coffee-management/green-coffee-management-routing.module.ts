import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GreenCoffeeManagementComponent } from './green-coffee-management/green-coffee-management.component';
import { AuthGuard } from '@app/guards/auth.guard';
import { GreenCoffeeInventoryComponent } from './green-coffee-inventory/green-coffee-inventory.component';
import { ProcuredCoffeeComponent } from './procured-coffee/procured-coffee.component';
import { GreenCoffeeForSaleDetailsComponent } from './green-coffee-for-sale-details/green-coffee-for-sale-details.component';
import { CoffeeSaleComponent } from './coffee-sale/coffee-sale.component';
import { LotSaleComponent } from './lot-sale/lot-sale.component';

const routes: Routes = [
    {
        path: '',
        component: GreenCoffeeManagementComponent,
        children: [
            {
                path: 'green-coffee-inventory',
                component: GreenCoffeeInventoryComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'procured-coffee/:orderId',
                component: ProcuredCoffeeComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'green-coffee-for-sale-details/:orderId',
                component: GreenCoffeeForSaleDetailsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'coffee-sale',
                component: CoffeeSaleComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'lot-sale',
                component: LotSaleComponent,
                canActivate: [AuthGuard],
            },
            {
                path: '',
                redirectTo: 'green-coffee-inventory',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GreenCoffeeManagementRoutingModule {}
