import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderHeaderComponent, OrderTimelineComponent, PaymentStatusComponent } from './order-header';
import { RecentAcitivityComponent } from './recent-acitivity/recent-acitivity.component';
import {
    AvailabilityDetailsComponent,
    BulkDetailsComponent,
    DocumentsComponent,
    GradeInfoComponent,
    LotDetailsComponent,
    OrderDetailsComponent,
    OrderPaymentStatusComponent,
} from './order-details';
import { OrderContactsComponent } from './order-contacts/order-contacts.component';
import { DeliveryAddressComponent } from './order-contacts/delivery-address/delivery-address.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { AgmCoreModule } from '@agm/core';
import { RoasterDetailsComponent } from './order-contacts/roaster-details/roaster-details.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAacYaKLrRdDZDzrQ5QAdNFMj9nQ2PgweU',
        }),
        SharedModule,
        OrderRoutingModule,
    ],
    declarations: [
        OrderComponent,
        OrderHeaderComponent,
        OrderDetailsComponent,
        GradeInfoComponent,
        BulkDetailsComponent,
        OrderTimelineComponent,
        PaymentStatusComponent,
        RecentAcitivityComponent,
        AvailabilityDetailsComponent,
        DocumentsComponent,
        LotDetailsComponent,
        OrderPaymentStatusComponent,
        OrderContactsComponent,
        DeliveryAddressComponent,
        ConfirmOrderComponent,
        RoasterDetailsComponent,
    ],
})
export class OrderModule {}
