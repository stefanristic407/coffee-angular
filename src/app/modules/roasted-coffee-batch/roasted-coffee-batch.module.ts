import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoastedCoffeeBatchRoutingModule } from './roasted-coffee-batch-routing.module';
import { RoastedCoffeeBatchComponent } from './roasted-coffee-batch/roasted-coffee-batch.component';
import { SharedModule } from './../../shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { SelectOrderTableComponent } from './select-order-table/select-order-table.component';
import { CreateRoastingProfileComponent } from './create-roasting-profile/create-roasting-profile.component';
import { RoastingProfilesComponent } from './roasting-profiles/roasting-profiles.component';
import { RoastedCoffeeBatchesComponent } from './roasted-coffee-batches/roasted-coffee-batches.component';
import { NewRoastedBatchComponent } from './new-roasted-batch/new-roasted-batch.component';

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
