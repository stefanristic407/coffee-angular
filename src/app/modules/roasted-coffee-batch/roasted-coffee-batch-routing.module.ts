import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateRoastingProfileComponent } from './create-roasting-profile/create-roasting-profile.component';
import { NewRoastedBatchComponent } from './new-roasted-batch/new-roasted-batch.component';
import { RoastedBatchTableComponent } from './roasted-batch-table/roasted-batch-table.component';
import { RoastedCoffeeBatchComponent } from './roasted-coffee-batch/roasted-coffee-batch.component';
import { RoastedCoffeeBatchesComponent } from './roasted-coffee-batches/roasted-coffee-batches.component';
import { RoastingProfilesComponent } from './roasting-profiles/roasting-profiles.component';
import { SelectOrderTableComponent } from './select-order-table/select-order-table.component';

const routes: Routes = [
    {
        path: '',
        component: RoastedCoffeeBatchComponent,
        children: [
            {
                path: '',
                component: RoastedCoffeeBatchesComponent,
                children: [
                    { path: 'roasted-coffee-batches', component: RoastedBatchTableComponent },
                    { path: 'test-roast-batches', component: RoastedBatchTableComponent, data: { isTestBatch: true } },
                    { path: '', redirectTo: 'roasted-coffee-batches' },
                ],
            },
            { path: 'new-roasted-batch', component: NewRoastedBatchComponent },
            { path: 'roasting-profile', component: RoastingProfilesComponent },
            { path: 'create-roasting-profile', component: CreateRoastingProfileComponent },
            { path: 'select-order-list', component: SelectOrderTableComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoastedCoffeeBatchRoutingModule {}
