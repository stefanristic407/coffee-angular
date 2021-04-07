import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@guards';

import { SourcingComponent } from './sourcing/sourcing.component';
import { EstateListComponent } from './estate-list/estate-list.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { CoffeeDetailsComponent } from './coffee-details/coffee-details.component';
import { AvailableConfirmOrderComponent } from './coffee-details/available-confirm-order/available-confirm-order.component';
import { EstateDetailsComponent } from './estate-details/estate-details.component';
import { LotDetailsComponent } from './lot-details/lot-details.component';
import { PrebookConfirmOrderComponent } from './lot-details/prebook-confirm-order/prebook-confirm-order.component';

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
        path: 'buy-gc',
        component: AvailableConfirmOrderComponent,
        canActivate: [AuthGuard],
        data: { orderType: 'booked' },
    },
    {
        path: 'order-gc-sample',
        component: AvailableConfirmOrderComponent,
        canActivate: [AuthGuard],
        data: { orderType: 'sample' },
    },
    {
        path: 'prebook-lot',
        component: PrebookConfirmOrderComponent,
        canActivate: [AuthGuard],
        data: { orderType: 'preBooked' },
    },
    {
        path: 'lot-details/:estateId/:lotId',
        component: LotDetailsComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SourcingRoutingModule {}
