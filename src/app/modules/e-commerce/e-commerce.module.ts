import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ECommerceRoutingModule } from './e-commerce-routing.module';

import { OtherProductDetailsComponent } from './other-product-details/other-product-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductImageComponent } from './product-image/product-image.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
    declarations: [ProductListComponent, ProductDetailsComponent, ProductImageComponent, OtherProductDetailsComponent],
    imports: [CommonModule, FormsModule, SharedModule, ECommerceRoutingModule],
})
export class ECommerceModule {}
