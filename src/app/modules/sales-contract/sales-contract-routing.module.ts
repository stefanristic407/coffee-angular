import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { AgreementComponent } from './agreement/agreement.component';

const routes: Routes = [
    {
        path: '',
        component: AgreementComponent,
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
