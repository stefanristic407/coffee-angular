import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeeExperienceRoutingModule } from './coffee-experience-routing.module';
import { CoffeeExperienceComponent } from './coffee-experience.component';
import { DefaultSettingsComponent } from './default-settings/default-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { EstateOrdersTableComponent } from './estate-orders-table/estate-orders-table.component';
import { MicroRoasterOrdersTableComponent } from './micro-roaster-orders-table/micro-roaster-orders-table.component';
import { HorecaOrdersTableComponent } from './horeca-orders-table/horeca-orders-table.component';
import { CoffeeExperienceTableComponent } from './coffee-experience-table/coffee-experience-table.component';

@NgModule({
    declarations: [
        CoffeeExperienceComponent,
        DefaultSettingsComponent,
        EstateOrdersTableComponent,
        MicroRoasterOrdersTableComponent,
        HorecaOrdersTableComponent,
        CoffeeExperienceTableComponent,
    ],
    imports: [CommonModule, CoffeeExperienceRoutingModule, ReactiveFormsModule, FormsModule, SharedModule],
})
export class CoffeeExperienceModule {}
