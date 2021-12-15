import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { SharedModule } from '@shared';
import { CreateRoastingProfileComponent } from './create-roasting-profile/create-roasting-profile.component';
import { NewRoastedBatchComponent } from './new-roasted-batch/new-roasted-batch.component';
import { RoastedBatchTableComponent } from './roasted-batch-table/roasted-batch-table.component';
import { RoastedCoffeeBatchRoutingModule } from './roasted-coffee-batch-routing.module';
import { RoastedCoffeeBatchComponent } from './roasted-coffee-batch/roasted-coffee-batch.component';
import { RoastedCoffeeBatchesComponent } from './roasted-coffee-batches/roasted-coffee-batches.component';
import { RoastingProfileDialogComponent } from './roasting-profile-dialog/roasting-profile-dialog.component';
import { RoastingProfilesComponent } from './roasting-profiles/roasting-profiles.component';
import { SelectOrderTableComponent } from './select-order-table/select-order-table.component';

@NgModule({
    declarations: [
        CreateRoastingProfileComponent,
        NewRoastedBatchComponent,
        RoastedBatchTableComponent,
        RoastedCoffeeBatchComponent,
        RoastedCoffeeBatchesComponent,
        RoastingProfileDialogComponent,
        RoastingProfilesComponent,
        SelectOrderTableComponent,
    ],
    imports: [CommonModule, SharedModule, RoastedCoffeeBatchRoutingModule, MatChipsModule],
})
export class RoastedCoffeeBatchModule {}
