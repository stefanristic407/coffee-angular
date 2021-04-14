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
import { CreateReferenceNumberComponent } from './create-reference-number/create-reference-number.component';
import { RoasterNotesComponent } from './roaster-notes/roaster-notes.component';
import { AddNoteComponent } from './roaster-notes/add-note/add-note.component';
import { NoteComponent } from './roaster-notes/note/note.component';
import { EditTrackingInfoComponent } from './order-header/edit-tracking-info/edit-tracking-info.component';
import { ShippingAddressEditorComponent } from './shipping-address-editor/shipping-address-editor.component';
import { ShippingDetailsComponent } from './order-details/shipping-details/shipping-details.component';

@NgModule({
    imports: [CommonModule, FormsModule, AgmCoreModule, SharedModule, OrderRoutingModule],
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
        CreateReferenceNumberComponent,
        RoasterNotesComponent,
        AddNoteComponent,
        NoteComponent,
        EditTrackingInfoComponent,
        ShippingAddressEditorComponent,
        ShippingDetailsComponent,
    ],
})
export class OrderModule {}
