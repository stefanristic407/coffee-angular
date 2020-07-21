import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { RatingModule } from 'ng-starrating';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ToastrModule } from 'ngx-toastr';
import { EstateOrdersComponent } from "./estate-orders/estate-orders.component";
import { MyordersComponent } from "./myorders/myorders.component";
import { BookedDocumentsComponent } from './order-booked/booked-documents/booked-documents.component';
import { BookedGradeInfoComponent } from './order-booked/booked-grade-info/booked-grade-info.component';
import { BookedOrderDetailsComponent } from './order-booked/booked-order-details/booked-order-details.component';
import { OrderBookedComponent } from './order-booked/order-booked.component';
import { OrderPrebookComponent } from "./order-prebook/order-prebook.component";
import { PrebookConfirmOrderComponent } from './order-prebook/prebook-confirm-order/prebook-confirm-order.component';
import { PrebookDocumentsComponent } from './order-prebook/prebook-documents/prebook-documents.component';
import { PrebookGradeInfoComponent } from './order-prebook/prebook-grade-info/prebook-grade-info.component';
import { PrebookOrderDetailsComponent } from './order-prebook/prebook-order-details/prebook-order-details.component';
import { ConfirmOrderComponent } from "./order-sample/confirm-order/confirm-order.component";
import { GradeInfoComponent } from "./order-sample/grade-info/grade-info.component";
import { OrderDetailsComponent } from "./order-sample/order-details/order-details.component";
import { OrderSampleComponent } from "./order-sample/order-sample.component";
import { OrdermanagementRoutingModule } from "./ordermanagement-routing.module";
import { OrdermanagementComponent } from "./ordermanagement.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { OrderSupportComponent } from './dispute-system/order-support/order-support.component';
import { OrderSupportFaqsComponent } from './dispute-system/order-support-faqs/order-support-faqs.component';
import { RaiseTicketFormComponent } from './dispute-system/raise-ticket-form/raise-ticket-form.component';
import { RaisedTicketComponent } from './dispute-system/raised-ticket/raised-ticket.component';
import { SelectAnOrderComponent } from './dispute-system/select-an-order/select-an-order.component';
import {CalendarModule} from 'primeng/calendar';
import { ReviewRatingsComponent } from './review-ratings/review-ratings.component';
import { RatingComponent } from './rating/rating.component';
import { MicroRoasterComponent } from './dispute-system/micro-roaster/micro-roaster.component';
import { HorecaComponent } from './dispute-system/horeca/horeca.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { EstateComponent } from './dispute-system/estate/estate.component';
import { DirectMessagingComponent } from './direct-messaging/direct-messaging.component';
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { FacilitatorOrdersComponent } from './facilitator-orders/facilitator-orders.component';
import { RoasterOrdersComponent } from './roaster-orders/roaster-orders.component';
import { OrderChatComponent } from './order-sample/order-chat/order-chat.component';
import { PreOrderChatComponent } from './order-prebook/pre-order-chat/pre-order-chat.component';
import { BookOrderChatComponent } from './order-booked/book-order-chat/book-order-chat.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { OrdersComponent } from './myorders/orders/orders.component';
import { RequestsComponent } from './myorders/requests/requests.component';




@NgModule({
  declarations: [
    OrdermanagementComponent,
    MyordersComponent,
    PagenotfoundComponent,
    OrderSampleComponent,
    OrderDetailsComponent,
    EstateOrdersComponent,
    GradeInfoComponent,
    OrderPrebookComponent,
    ConfirmOrderComponent,
    PrebookGradeInfoComponent,
    PrebookDocumentsComponent,
    PrebookOrderDetailsComponent,
    OrderBookedComponent,
    BookedOrderDetailsComponent,
    BookedGradeInfoComponent,
    BookedDocumentsComponent,
    PrebookConfirmOrderComponent,
    OrderSupportComponent,
    OrderSupportFaqsComponent,
    RaiseTicketFormComponent,
    RaisedTicketComponent,
    SelectAnOrderComponent,
    ReviewRatingsComponent,
    RatingComponent,
    MicroRoasterComponent,
    HorecaComponent,
    EstateComponent,
    DirectMessagingComponent,
    FacilitatorOrdersComponent,
    RoasterOrdersComponent,
    OrderChatComponent,
    PreOrderChatComponent,
    BookOrderChatComponent,
    OrdersComponent,
    RequestsComponent
  ],
  imports: [
    CommonModule,
    OrdermanagementRoutingModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    FormsModule,
    RatingModule,
    PopoverModule,
    CalendarModule,
    ModalModule,
    MatBottomSheetModule,
    NgxChartsModule,
    TypeaheadModule.forRoot(),
    ToastrModule.forRoot({timeOut: 10000, preventDuplicates : true})
  ],
  exports : [DirectMessagingComponent]
})
export class OrdermanagementModule {}
