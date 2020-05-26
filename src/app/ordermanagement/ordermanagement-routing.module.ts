import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdermanagementComponent } from './ordermanagement.component';
import { MyordersComponent } from './myorders/myorders.component';
import { PagenotfoundComponent } from '../people/pagenotfound/pagenotfound.component';
import { EstateOrdersComponent } from './estate-orders/estate-orders.component';
import {OrderSampleComponent} from './order-sample/order-sample.component'
import {ConfirmOrderComponent} from './order-sample/confirm-order/confirm-order.component'
import { OrderPrebookComponent } from './order-prebook/order-prebook.component';
import {OrderBookedComponent} from './order-booked/order-booked.component';
import {PrebookConfirmOrderComponent} from './order-prebook/prebook-confirm-order/prebook-confirm-order.component';

const routes: Routes = [
  {
   path: '', 
   component: OrdermanagementComponent,
children: [
  {
    path: 'myorders',
    component: MyordersComponent
  },
  {
    path: 'estate-orders',
    component: EstateOrdersComponent
  },

    {
      path:'order-sample',
    component: OrderSampleComponent
  },
  {
    path:'confirm-order',
    component:ConfirmOrderComponent
  },
  {
    path:'order-prebook',
    component:OrderPrebookComponent
  },
  {
    path:'order-booked',
    component:OrderBookedComponent
  },
  {
    path:'prebook-confirmorder',
    component:PrebookConfirmOrderComponent
  },
  {
    path: '',
    redirectTo: 'myorders',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdermanagementRoutingModule { }
