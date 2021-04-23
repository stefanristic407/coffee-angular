import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicroProfileComponent } from './micro-profile/micro-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { EstateProfileComponent } from './estate-profile/estate-profile.component';

const routes: Routes = [
    {
        path: 'mr/:id',
        component: MicroProfileComponent,
    },
    {
        path: 'mr/:id',
        component: EstateProfileComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfilesRoutingModule {}
