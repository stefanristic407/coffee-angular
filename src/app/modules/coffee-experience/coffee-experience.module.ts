import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeeExperienceRoutingModule } from './coffee-experience-routing.module';
import { CoffeeExperienceComponent } from './coffee-experience.component';
import { DefaultSettingsComponent } from './default-settings/default-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { CoffeeExperienceTableComponent } from './coffee-experience-table/coffee-experience-table.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
    declarations: [CoffeeExperienceComponent, DefaultSettingsComponent, CoffeeExperienceTableComponent],
    imports: [
        CommonModule,
        CoffeeExperienceRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        Ng2SearchPipeModule,
    ],
})
export class CoffeeExperienceModule {}
