import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoastedCoffeeBatchRoutingModule } from './roasted-coffee-batch-routing.module';
import { RoastedCoffeeBatchComponent } from './roasted-coffee-batch/roasted-coffee-batch.component';
import { CreateRoastingProfileComponent } from './roasted-coffee-batch/create-roasting-profile/create-roasting-profile.component';
import { SelectOrderTableComponent } from './roasted-coffee-batch/select-order-table/select-order-table.component';
import { RoastingProfilesComponent } from './roasted-coffee-batch/roasting-profiles/roasting-profiles.component';
import { RoastedCoffeeBatchesComponent } from './roasted-coffee-batch/roasted-coffee-batches/roasted-coffee-batches.component';
import { NewRoastedBatchComponent } from './roasted-coffee-batch/new-roasted-batch/new-roasted-batch.component';
import { SharedModule } from './../../shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    declarations: [
        RoastedCoffeeBatchComponent,
        CreateRoastingProfileComponent,
        SelectOrderTableComponent,
        RoastingProfilesComponent,
        RoastedCoffeeBatchesComponent,
        NewRoastedBatchComponent,
    ],
    imports: [CommonModule, SharedModule, RoastedCoffeeBatchRoutingModule, MatChipsModule],
})
export class RoastedCoffeeBatchModule {}
