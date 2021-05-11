import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ECommerceRoutingModule } from './e-commerce-routing.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { VariantDetailsComponent } from './variant-details/variant-details.component';
import { OtherProductDetailsComponent } from './other-product-details/other-product-details.component';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailsComponent,
        VariantDetailsComponent,
        OtherProductDetailsComponent,
    ],
    imports: [CommonModule, FormsModule, SharedModule, ECommerceRoutingModule],
})
export class ECommerceModule {}
