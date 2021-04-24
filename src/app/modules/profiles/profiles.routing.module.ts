import { NgModule } from '@angular/core';
import { MicroProfileComponent } from './micro-profile/micro-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { EstateProfileComponent } from './estate-profile/estate-profile.component';
import { PartnerProfileComponent } from './partner-profile/partner-profile.component';

const routes: Routes = [
    {
        path: 'mr/:id',
        component: MicroProfileComponent,
    },
    {
        path: 'es/:id',
        component: EstateProfileComponent,
    },
    {
        path: 'hrc/:id',
        component: PartnerProfileComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfilesRoutingModule {}
