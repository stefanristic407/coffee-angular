import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GreenCoffeeManagementRoutingModule } from './green-coffee-management-routing.module';
import { GreenCoffeeManagementComponent } from './green-coffee-management/green-coffee-management.component';


@NgModule({
  declarations: [GreenCoffeeManagementComponent],
  imports: [
    CommonModule,
    GreenCoffeeManagementRoutingModule
  ]
})
export class GreenCoffeeManagementModule { }
