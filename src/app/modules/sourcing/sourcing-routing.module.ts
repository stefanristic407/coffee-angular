import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';

import { SourcingComponent } from './sourcing/sourcing.component';
import { EstateListComponent } from './estate-list/estate-list.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { CoffeeDetailsComponent } from './coffee-details/coffee-details.component';
import { AvailableConfirmOrderComponent } from './coffee-details/available-confirm-order/available-confirm-order.component';
import { OrderPlacedComponent } from './coffee-details/order-placed/order-placed.component';
import { EstateDetailsComponent } from './estate-details/estate-details.component';
import { SourcingOrderChatComponent } from './estate-details/sourcing-order-chat/sourcing-order-chat.component';

const routes: Routes = [
    {
        path: '',
        component: SourcingComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'estate-list', component: EstateListComponent },
            { path: 'coffee-list', component: CoffeeListComponent },
            { path: '', redirectTo: 'estate-list', pathMatch: 'full' },
        ],
    },
    {
        path: 'estate-details/:id',
        component: EstateDetailsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'coffee-details/:estateId/:harvestId',
        component: CoffeeDetailsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'available-confirm-order',
        component: AvailableConfirmOrderComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'order-placed',
        component: OrderPlacedComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'sourcing-chat',
        component: SourcingOrderChatComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SourcingRoutingModule {}
