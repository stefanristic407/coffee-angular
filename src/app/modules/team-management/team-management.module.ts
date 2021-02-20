import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoleComponent } from './create-role/create-role.component';
import { ManagePermissionComponent } from './manage-permission/manage-permission.component';
import { RoleListComponent } from './role-list/role-list.component';
import { TeamMemberTableComponent } from './team-member-table/team-member-table.component';
import { InviteNewUserComponent } from './invite-new-user/invite-new-user.component';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { SendRecoveryEmailComponent } from './send-recovery-email/send-recovery-email.component';
import { SharedModule } from './../../shared/shared.module';
import { TeamManagementComponent } from './team-management/team-management.component';
import { TeamManagementRoutingModule } from './team-management-routing';

@NgModule({
    declarations: [
        CreateRoleComponent,
        ManagePermissionComponent,
        RoleListComponent,
        TeamMemberTableComponent,
        InviteNewUserComponent,
        EditUserDetailsComponent,
        SendRecoveryEmailComponent,
        TeamManagementComponent,
    ],
    imports: [CommonModule, SharedModule, TeamManagementRoutingModule],
})
export class TeamManagementModule {}
