import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';
import { OuttakeOrdersComponent } from './outtake-orders.component';

const routes: Routes = [
    {
        path: '',
        component: OuttakeOrdersComponent,
    },
    { path: 'add-order', component: AddNewOrderComponent },
    { path: 'view-order/:id', component: AddNewOrderComponent },
    { path: 'edit-order/:id', component: AddNewOrderComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OuttakeOrdersRoutingModule {}
