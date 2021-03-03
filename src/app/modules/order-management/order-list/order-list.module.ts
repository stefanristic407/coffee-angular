import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './order-list.component';

@NgModule({
    imports: [CommonModule, FormsModule, SharedModule, OrderListRoutingModule],
    declarations: [OrderListComponent],
})
export class OrderListModule {}
