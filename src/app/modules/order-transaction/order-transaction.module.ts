import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderTransactionRoutingModule } from './order-transaction-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';


@NgModule({
  declarations: [TransactionListComponent],
  imports: [
    CommonModule,
    OrderTransactionRoutingModule
  ]
})
export class OrderTransactionModule { }
