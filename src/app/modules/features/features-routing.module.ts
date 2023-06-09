import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards';
import { OnboardCustomersComponent } from './onboard-customers/onboard-customers.component';
import { FeaturesComponent } from './features.component';
import { RoasterQuickSetupComponent } from './roaster-quick-setup/roaster-quick-setup.component';

const routes: Routes = [
    {
        path: '',
        component: FeaturesComponent,
        children: [
            {
                path: 'onboard-customers',
                component: OnboardCustomersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'roaster-quick-setup/:orgType',
                component: RoasterQuickSetupComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeaturesRoutingModule {}
