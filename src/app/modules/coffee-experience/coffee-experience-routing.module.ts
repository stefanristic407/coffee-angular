import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeeExperienceComponent } from './coffee-experience.component';
import { DefaultSettingsComponent } from '@app/modules/coffee-experience/default-settings/default-settings.component';

const routes: Routes = [
    {
        path: '',
        component: CoffeeExperienceComponent,
    },
    {
        path: 'default-settings',
        component: DefaultSettingsComponent,
    },
    {
        path: 'coffee-details',
        component: DefaultSettingsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoffeeExperienceRoutingModule {}
