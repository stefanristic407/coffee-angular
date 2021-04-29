import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ECommerceRoutingModule } from './e-commerce-routing.module';

import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ECommerceRoutingModule
  ]
})
export class ECommerceModule { }
