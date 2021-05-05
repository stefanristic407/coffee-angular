import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';
import { OuttakeOrdersComponent } from './outtake-orders.component';

const routes: Routes = [
    {
        path: '',
        component: OuttakeOrdersComponent,
    },
    { path: 'add-order', component: AddNewOrderComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OuttakeOrdersRoutingModule {}
