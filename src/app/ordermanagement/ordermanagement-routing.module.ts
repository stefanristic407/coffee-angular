import { SewnOrderChatComponent } from './../sewn-order-chat/sewn-order-chat.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PagenotfoundComponent } from '../people/pagenotfound/pagenotfound.component';
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
import { ReviewRatingsComponent } from './review-ratings/review-ratings.component';
import { RatingComponent } from './rating/rating.component';
import { FacilitatorOrdersComponent } from './facilitator-orders/facilitator-orders.component';
import { RoasterOrdersComponent } from './roaster-orders/roaster-orders.component';
import { OrderChatComponent } from './order-sample/order-chat/order-chat.component';
import { PreOrderChatComponent } from './order-prebook/pre-order-chat/pre-order-chat.component';
import { BookOrderChatComponent } from './order-booked/book-order-chat/book-order-chat.component';
import { from } from 'rxjs';
import { HorecaOrderDetailsComponent } from './e-commerce-order/horeca-order-details/horeca-order-details.component';
import { HorecaOrdersComponent } from './e-commerce-order/horeca-orders/horeca-orders.component';
import { HorecaOrderConfirmComponent } from './e-commerce-order/horeca-order-confirm/horeca-order-confirm.component';
import { DetailsOrderComponent } from './e-commerce-order/horeca-order-details/details-order/details-order.component';
import { HorecaSubscriptionConfirmComponent } from './e-commerce-order/horeca-subscription-confirm/horeca-subscription-confirm.component';
import { HorecaSubscriptionDetailsComponent } from './e-commerce-order/horeca-subscription-details/horeca-subscription-details.component';
import { DetailsSubscriptionComponent } from './e-commerce-order/horeca-subscription-details/details-subscription/details-subscription.component';
import { SubscriptionEsatateInfoComponent } from './e-commerce-order/horeca-subscription-details/subscription-esatate-info/subscription-esatate-info.component';
import { HorecaPreviousSubscriptionComponent } from './e-commerce-order/horeca-previous-subscription/horeca-previous-subscription.component';
import { MicroOrderBookedComponent } from './microroaster-orders/micro-order-booked/micro-order-booked.component';
import { MicroOrderSampleComponent } from './microroaster-orders/micro-order-sample/micro-order-sample.component';
import { SampleOrderConfirmationComponent } from './microroaster-orders/micro-order-sample/sample-order-confirmation/sample-order-confirmation.component';
import { BookedOrderConfirmationComponent } from './microroaster-orders/micro-order-booked/booked-order-confirmation/booked-order-confirmation.component';
import { PageNotFoundComponent } from '../error-module/page-not-found/page-not-found.component';
import { MrOrdersComponent } from './microroaster-orders/mr-orders/mr-orders.component';
import { MrRequestDetailsComponent } from './microroaster-orders/mr-request-details/mr-request-details.component';
import { AuthGuard } from '../guards/auth.guard';
import { AssignUserComponent } from './assign-user/assign-user.component';

const routes: Routes = [
    {
        path: '',
        component: OrdermanagementComponent,
        children: [
            {
                path: 'myorders',
                component: MyordersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'estate-orders',
                component: EstateOrdersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'microroaster-orders',
                component: MrOrdersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'facilitator-orders',
                component: FacilitatorOrdersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'order-sample',
                component: OrderSampleComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'confirm-order',
                component: ConfirmOrderComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'order-prebook',
                component: OrderPrebookComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'order-booked',
                component: OrderBookedComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'prebook-confirmorder',
                component: PrebookConfirmOrderComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'order-support',
                component: OrderSupportComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'order-support-faqs',
                component: OrderSupportFaqsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'raised-tickets',
                component: RaisedTicketComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'raise-ticket-form',
                component: RaiseTicketFormComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'select-order',
                component: SelectAnOrderComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'review-ratings',
                component: ReviewRatingsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'rating',
                component: RatingComponent,
                canActivate: [AuthGuard],
            },

            {
                path: 'order-chat/:orderId/:type',
                component: SewnOrderChatComponent,
                canActivate: [AuthGuard],
            },

            /**
             * These entries are kept for debugging purposes will be remove it later
             */
            // {
            //     path: 'dep-order-chat',
            //     component: OrderChatComponent,
            //     canActivate: [AuthGuard],
            // },
            // {
            //     path: 'dep-pre-order-chat',
            //     component: PreOrderChatComponent,
            //     canActivate: [AuthGuard],
            // },
            // {
            //     path: 'dep-book-order-chat',
            //     component: BookOrderChatComponent,
            //     canActivate: [AuthGuard],
            // },

            {
                path: 'horeca-orders',
                component: HorecaOrdersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'horeca-order-details',
                component: HorecaOrderDetailsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'order-confirmation',
                component: HorecaOrderConfirmComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'details-order',
                component: DetailsOrderComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'subscription-confirmation',
                component: HorecaSubscriptionConfirmComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'horeca-subscription-details',
                component: HorecaSubscriptionDetailsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'details-subscription',
                component: DetailsSubscriptionComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'horeca-previous-subscription',
                component: HorecaPreviousSubscriptionComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'mr-booked',
                component: MicroOrderBookedComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'mr-sample',
                component: MicroOrderSampleComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'sample-order-confirmation',
                component: SampleOrderConfirmationComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'booked-order-confirmation',
                component: BookedOrderConfirmationComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'mr-orders',
                component: MrOrdersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'mr-request-details/:id',
                component: MrRequestDetailsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'assign-user',
                component: AssignUserComponent,
                canActivate: [AuthGuard],
            },
            {
                path: '',
                redirectTo: 'myorders',
                pathMatch: 'full',
            },
            {
                path: '**',
                component: PageNotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrdermanagementRoutingModule {}
