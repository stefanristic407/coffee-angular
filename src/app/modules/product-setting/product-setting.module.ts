import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSettingRoutingModule } from './product-setting-routing.module';

import { SharedModule } from '@shared';

import { ProductSettingComponent } from './product-setting.component';
import { VatDetailsComponent } from './vat-details/vat-details.component';
import { SamplePriceComponent } from './sample-price/sample-price.component';

@NgModule({
    declarations: [ProductSettingComponent, VatDetailsComponent, SamplePriceComponent],
    imports: [CommonModule, ProductSettingRoutingModule, SharedModule],
})
export class ProductSettingModule {}
