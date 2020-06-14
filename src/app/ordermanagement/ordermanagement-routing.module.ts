import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from '../people/pagenotfound/pagenotfound.component';
import { EstateOrdersComponent } from './estate-orders/estate-orders.component';
import { MyordersComponent } from './myorders/myorders.component';
import { OrderBookedComponent } from './order-booked/order-booked.component';
import { OrderPrebookComponent } from './order-prebook/order-prebook.component';
import { PrebookConfirmOrderComponent } from './order-prebook/prebook-confirm-order/prebook-confirm-order.component';
import { ConfirmOrderComponent } from './order-sample/confirm-order/confirm-order.component';
import { OrderSampleComponent } from './order-sample/order-sample.component';
import { OrdermanagementComponent } from './ordermanagement.component';
import { OrderSupportComponent } from './dispute-system/order-support/order-support.component';
import { OrderSupportFaqsComponent } from './dispute-system/order-support-faqs/order-support-faqs.component';
import { RaisedTicketComponent } from './dispute-system/raised-ticket/raised-ticket.component';
import { RaiseTicketFormComponent } from './dispute-system/raise-ticket-form/raise-ticket-form.component';
import { SelectAnOrderComponent } from './dispute-system/select-an-order/select-an-order.component';
import { ReviewRatingsComponent} from './review-ratings/review-ratings.component'
import {RatingComponent} from './rating/rating.component';

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
    path:'order-support',
    component:OrderSupportComponent
  },
  {
    path:'order-support-faqs',
    component:OrderSupportFaqsComponent
  },
  {
    path:'raised-tickets',
    component:RaisedTicketComponent
  },
  {
    path:'raise-ticket-form',
    component:RaiseTicketFormComponent
  },
  {
    path:'select-order',
    component:SelectAnOrderComponent
  },
  {
    path:'review-ratings',
    component:ReviewRatingsComponent
  },
  {
    path:'rating',
    component:RatingComponent
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
