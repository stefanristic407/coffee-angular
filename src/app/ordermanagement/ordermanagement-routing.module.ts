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
import {DirectMessagingComponent} from './direct-messaging/direct-messaging.component';
import {FacilitatorOrdersComponent} from './facilitator-orders/facilitator-orders.component';
import { RoasterOrdersComponent} from './roaster-orders/roaster-orders.component';
import { OrderChatComponent } from './order-sample/order-chat/order-chat.component';
import {PreOrderChatComponent} from './order-prebook/pre-order-chat/pre-order-chat.component';
import {BookOrderChatComponent} from './order-booked/book-order-chat/book-order-chat.component'
import { from } from 'rxjs';
import {HorecaOrderDetailsComponent} from './e-commerce-order/horeca-order-details/horeca-order-details.component';
import {HorecaOrdersComponent} from './e-commerce-order/horeca-orders/horeca-orders.component';
import {HorecaOrderConfirmComponent} from './e-commerce-order/horeca-order-confirm/horeca-order-confirm.component';
import {DetailsOrderComponent} from './e-commerce-order/horeca-order-details/details-order/details-order.component';
import { HorecaSubscriptionConfirmComponent } from './e-commerce-order/horeca-subscription-confirm/horeca-subscription-confirm.component';
import { HorecaSubscriptionDetailsComponent } from './e-commerce-order/horeca-subscription-details/horeca-subscription-details.component';
import { DetailsSubscriptionComponent } from './e-commerce-order/horeca-subscription-details/details-subscription/details-subscription.component';
import { SubscriptionEsatateInfoComponent } from './e-commerce-order/horeca-subscription-details/subscription-esatate-info/subscription-esatate-info.component'
import { HorecaPreviousSubscriptionComponent } from './e-commerce-order/horeca-previous-subscription/horeca-previous-subscription.component';
import { MicroOrderBookedComponent } from './microroaster-orders/micro-order-booked/micro-order-booked.component';
import { MicroOrderSampleComponent } from './microroaster-orders/micro-order-sample/micro-order-sample.component';
import {SampleOrderConfirmationComponent} from './microroaster-orders/micro-order-sample/sample-order-confirmation/sample-order-confirmation.component';
import {BookedOrderConfirmationComponent} from './microroaster-orders/micro-order-booked/booked-order-confirmation/booked-order-confirmation.component';
import { PageNotFoundComponent } from '../error-module/page-not-found/page-not-found.component';

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
    path: 'roaster-orders',
    component: RoasterOrdersComponent
  },
  {
    path: 'facilitator-orders',
    component: FacilitatorOrdersComponent
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
    path:'direct-messaging',
    component:DirectMessagingComponent
  },
  {
    path:'order-chat',
    component:OrderChatComponent
  },
  {
    path:'pre-order-chat',
    component:PreOrderChatComponent
  },
  {
    path:'book-order-chat',
    component:BookOrderChatComponent
  },
  {
    path:'horeca-orders',
    component:HorecaOrdersComponent
  },{
    path:'horeca-order-details',
    component:HorecaOrderDetailsComponent
  },
  {
    path:'order-confirmation',
    component:HorecaOrderConfirmComponent
  },
  {
    path:'details-order',
    component:DetailsOrderComponent
  },
  {
	path:'subscription-confirmation',
	component:HorecaSubscriptionConfirmComponent
  },
  {
	  path:'horeca-subscription-details',
	  component:HorecaSubscriptionDetailsComponent
  },
  {
	  path:'details-subscription',
	  component:DetailsSubscriptionComponent
  },
  {
	  path:'horeca-previous-subscription',
	  component:HorecaPreviousSubscriptionComponent
  },
  {
	  path:'microroaster-booked',
	  component:MicroOrderBookedComponent
  },
  {
	  path:'microroaster-sample',
	  component:MicroOrderSampleComponent
  },
  {
    path:'sample-order-confirmation',
    component:SampleOrderConfirmationComponent
  },
  {
    path:'booked-order-confirmation',
    component:BookedOrderConfirmationComponent
  },
  {
    path: '',
    redirectTo: 'myorders',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdermanagementRoutingModule { }
