import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards';
import { CreateRoleComponent } from './create-role/create-role.component';
import { InviteNewUserComponent } from './invite-new-user/invite-new-user.component';
import { RoleListComponent } from './role-list/role-list.component';
import { SendRecoveryEmailComponent } from './send-recovery-email/send-recovery-email.component';
import { TeamManagementComponent } from './team-management/team-management.component';
import { TeamMemberTableComponent } from './team-member-table/team-member-table.component';
const routes: Routes = [
    {
        path: '',
        component: TeamManagementComponent,
        children: [
            {
                path: 'create-role',
                component: CreateRoleComponent,
                canActivate: [AuthGuard],
            },
            { path: 'create-role/:id', component: CreateRoleComponent, canActivate: [AuthGuard] },
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
                path: '',
                redirectTo: 'role-list',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeamManagementRoutingModule {}
