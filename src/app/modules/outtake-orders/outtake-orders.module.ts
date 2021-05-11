import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OuttakeOrdersRoutingModule } from './outtake-orders-routing.module';
import { OuttakeOrdersComponent } from './outtake-orders.component';
import { SharedModule } from '@app/shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';

@NgModule({
    declarations: [OuttakeOrdersComponent, AddNewOrderComponent],
    imports: [
        CommonModule,
        OuttakeOrdersRoutingModule,
        SharedModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class OuttakeOrdersModule {}
