import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards';
import { AgreementComponent } from './agreement/agreement.component';
import { RoasterAgreementFormComponent } from './agreement/roaster-agreement-form/roaster-agreement-form.component';

const routes: Routes = [
    {
        path: '',
        component: AgreementComponent,
        canActivate: [AuthGuard],
    },
    {
        path: ':customerType',
        component: RoasterAgreementFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: ':customerType/:itemId',
        component: RoasterAgreementFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SalesContractRoutingModule { }
