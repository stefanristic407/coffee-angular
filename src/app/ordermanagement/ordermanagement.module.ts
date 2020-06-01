import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { EstateOrdersComponent } from "./estate-orders/estate-orders.component";
import { MyordersComponent } from "./myorders/myorders.component";
import { OrderPrebookComponent } from "./order-prebook/order-prebook.component";
import { ConfirmOrderComponent } from "./order-sample/confirm-order/confirm-order.component";
import { GradeInfoComponent } from "./order-sample/grade-info/grade-info.component";
import { OrderDetailsComponent } from "./order-sample/order-details/order-details.component";
import { OrderSampleComponent } from "./order-sample/order-sample.component";
import { OrdermanagementRoutingModule } from "./ordermanagement-routing.module";
import { OrdermanagementComponent } from "./ordermanagement.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { PrebookGradeInfoComponent } from './order-prebook/prebook-grade-info/prebook-grade-info.component';
import { PrebookDocumentsComponent } from './order-prebook/prebook-documents/prebook-documents.component';
import { PrebookOrderDetailsComponent } from './order-prebook/prebook-order-details/prebook-order-details.component';
import { OrderBookedComponent } from './order-booked/order-booked.component';
import { BookedOrderDetailsComponent } from './order-booked/booked-order-details/booked-order-details.component';
import { BookedGradeInfoComponent } from './order-booked/booked-grade-info/booked-grade-info.component';
import { BookedDocumentsComponent } from './order-booked/booked-documents/booked-documents.component';
import { PrebookConfirmOrderComponent } from './order-prebook/prebook-confirm-order/prebook-confirm-order.component';
import {RatingModule} from 'ng-starrating';
import {PopoverModule} from 'ngx-bootstrap/popover';
import { ToastrModule } from 'ngx-toastr';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';



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
    PrebookConfirmOrderComponent
  ],
  imports: [
    CommonModule,
    OrdermanagementRoutingModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    FormsModule,
    RatingModule,
    PopoverModule,
    TypeaheadModule.forRoot(),
    ToastrModule.forRoot({timeOut: 10000, preventDuplicates : true})
  ]
})
export class OrdermanagementModule {}
