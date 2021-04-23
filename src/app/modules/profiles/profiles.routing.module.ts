import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicroProfileComponent } from './micro-profile/micro-profile.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'mr/:id',
        component: MicroProfileComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfilesRoutingModule {}
