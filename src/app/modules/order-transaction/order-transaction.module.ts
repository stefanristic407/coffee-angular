import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { SharedModule } from '@shared';

import { OrderTransactionRoutingModule } from './order-transaction-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import localeSwedish from '@angular/common/locales/sv';
registerLocaleData(localeSwedish);

@NgModule({
    declarations: [TransactionListComponent],
    imports: [CommonModule, SharedModule, OrderTransactionRoutingModule],
})
export class OrderTransactionModule {}
