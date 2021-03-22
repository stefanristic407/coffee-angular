import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './order-list.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { RequestTableComponent } from './request-table/request-table.component';

@NgModule({
    imports: [CommonModule, FormsModule, SharedModule, OrderListRoutingModule],
    declarations: [OrderListComponent, OrderTableComponent, RequestTableComponent],
})
export class OrderListModule {}
