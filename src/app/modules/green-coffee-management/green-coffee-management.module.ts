import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GreenCoffeeManagementRoutingModule } from './green-coffee-management-routing.module';
import { GreenCoffeeManagementComponent } from './green-coffee-management/green-coffee-management.component';
import { GreenCoffeeForSaleDetailsComponent } from './green-coffee-for-sale-details/green-coffee-for-sale-details.component';
import { CoffeeSaleComponent } from './coffee-sale/coffee-sale.component';
import { GreenCoffeeInventoryComponent } from './green-coffee-inventory/green-coffee-inventory.component';
import { MarkedSaleComponent } from './green-coffee-inventory/marked-sale/marked-sale.component';
import { CoffeeProcuredTabComponent } from './green-coffee-inventory/coffee-procured-tab/coffee-procured-tab.component';
import { ProcuredCoffeeComponent } from './procured-coffee/procured-coffee.component';
import { LotSaleComponent } from './lot-sale/lot-sale.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    declarations: [
        GreenCoffeeManagementComponent,
        CoffeeSaleComponent,
        GreenCoffeeForSaleDetailsComponent,
        GreenCoffeeInventoryComponent,
        MarkedSaleComponent,
        CoffeeProcuredTabComponent,
        ProcuredCoffeeComponent,
        LotSaleComponent,
    ],
    imports: [CommonModule, SharedModule, GreenCoffeeManagementRoutingModule],
})
export class GreenCoffeeManagementModule {}
