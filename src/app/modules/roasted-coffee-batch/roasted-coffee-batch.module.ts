import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoastedCoffeeBatchRoutingModule } from './roasted-coffee-batch-routing.module';
import { RoastedCoffeeBatchComponent } from './roasted-coffee-batch.component';


@NgModule({
  declarations: [RoastedCoffeeBatchComponent],
  imports: [
    CommonModule,
    RoastedCoffeeBatchRoutingModule
  ]
})
export class RoastedCoffeeBatchModule { }
