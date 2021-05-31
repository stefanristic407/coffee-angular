import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeeExperienceComponent } from './coffee-experience.component';
import { DefaultSettingsComponent } from '@app/modules/coffee-experience/default-settings/default-settings.component';
import { CoffeeExperienceTableComponent } from './coffee-experience-table/coffee-experience-table.component';

const routes: Routes = [
    { path: 'default-settings', component: DefaultSettingsComponent },
    { path: 'coffee-details', component: DefaultSettingsComponent },
    {
        path: '',
        component: CoffeeExperienceComponent,
        children: [
            { path: '', redirectTo: 'orders' },
            { path: 'orders', component: CoffeeExperienceTableComponent },
            { path: 'mr-orders', component: CoffeeExperienceTableComponent },
            { path: 'hrc-orders', component: CoffeeExperienceTableComponent },
            { path: 'outtake-orders', component: CoffeeExperienceTableComponent },
            { path: '**', redirectTo: 'orders' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoffeeExperienceRoutingModule {}
