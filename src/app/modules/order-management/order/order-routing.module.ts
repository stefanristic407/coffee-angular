import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { ShippingAddressEditorComponent } from './shipping-address-editor/shipping-address-editor.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: OrderComponent,
    },
    {
        path: 'request',
        component: RequestComponent,
    },
    {
        path: 'edit',
        component: ShippingAddressEditorComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrderRoutingModule {}
