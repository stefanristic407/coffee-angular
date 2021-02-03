import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMembersComponent } from './add-members/add-members.component';
//import { CreateRoleComponent } from './create-role/create-role.component';
import { PeopleComponent } from './people.component';
import { PDirectMessagingComponent } from './p-direct-messaging/p-direct-messaging.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { MicroRoasterDetailsComponent } from './customer-management/micro-roaster-details/micro-roaster-details.component';
import { HorecaDetailsComponent } from './customer-management/horeca-details/horeca-details.component';
import { DiscountEditComponent } from './customer-management/discount-edit/discount-edit.component';
import { InviteNewUserComponent } from '@app/shared/components/addTeams/invite-new-user/invite-new-user.component';
import { PageNotFoundComponent } from '../error-module/page-not-found/page-not-found.component';
import { PermissionErrorComponent } from '../people/permission-error/permission-error.component';
import { AuthGuard } from '../guards/auth.guard';
import { CreateRoleComponent } from './../shared/components/addTeams/create-role/create-role.component';
import { RoleListComponent } from '@app/shared/components/addTeams/role-list/role-list.component';
import { TeamMemberTableComponent } from '@app/shared/components/addTeams/team-member-table/team-member-table.component';
import { SendRecoveryEmailComponent } from '@app/shared/components/addTeams/send-recovery-email/send-recovery-email.component';
const routes: Routes = [
    {
        path: '',
        component: PeopleComponent,
        children: [
            {
                path: 'create-role',
                component: CreateRoleComponent,
                canActivate: [AuthGuard],
            },
            { path: 'create-role/:id', component: CreateRoleComponent, canActivate: [AuthGuard] },
            {
                path: 'add-members',
                component: AddMembersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'edit-members',
                component: SendRecoveryEmailComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'user-management',
                component: TeamMemberTableComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'manage-role',
                component: RoleListComponent,
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
                path: 'team-members',
                component: TeamMemberTableComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'invite-member',
                component: InviteNewUserComponent,
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
            {
                path: '**',
                component: PageNotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PeopleRoutingModule {}
