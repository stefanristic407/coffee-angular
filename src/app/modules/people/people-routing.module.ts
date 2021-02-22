import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMembersComponent } from './add-members/add-members.component';
import { PeopleComponent } from './people.component';
import { PDirectMessagingComponent } from './p-direct-messaging/p-direct-messaging.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { MicroRoasterDetailsComponent } from './customer-management/micro-roaster-details/micro-roaster-details.component';
import { HorecaDetailsComponent } from './customer-management/horeca-details/horeca-details.component';
import { DiscountEditComponent } from './customer-management/discount-edit/discount-edit.component';
import { PermissionErrorComponent } from '../people/permission-error/permission-error.component';
import { AuthGuard } from '@guards';

const routes: Routes = [
    {
        path: '',
        component: PeopleComponent,
        children: [
            {
                path: 'add-members',
                component: AddMembersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'p-direct-messaging',
                component: PDirectMessagingComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'customer-management',
                component: CustomerManagementComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'micro-roaster-details',
                component: MicroRoasterDetailsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'horeca-details',
                component: HorecaDetailsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'pending-details',
                component: DiscountEditComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'permission-error',
                component: PermissionErrorComponent,
                canActivate: [AuthGuard],
            },
            {
                path: '',
                redirectTo: 'create-role',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PeopleRoutingModule {}
