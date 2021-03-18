import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeeExperienceRoutingModule } from './coffee-experience-routing.module';
import { CoffeeExperienceComponent } from './coffee-experience.component';
import { DefaultSettingsComponent } from './default-settings/default-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { OrdersTableComponent } from './orders-table/orders-table.component';


@NgModule({
    declarations: [CoffeeExperienceComponent, DefaultSettingsComponent, OrdersTableComponent],
    imports: [
        CommonModule,
        CoffeeExperienceRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ],
})
export class CoffeeExperienceModule {
}
