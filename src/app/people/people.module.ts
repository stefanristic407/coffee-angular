import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SharedModule } from 'src/app/shared/shared.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { BottomSheetRoles } from '../people/user-management/to-bottomsheet-roles/bottom-sheet-roles';
import { BottomSheetStatus } from '../people/user-management/to-bottomsheet-status/bottom-sheet-status';
import { AddMembersComponent } from './add-members/add-members.component';
import { EditMembersComponent } from './edit-members/edit-members.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { SheetValues } from './user-management/sheet-values';
import { UserManagementComponent } from './user-management/user-management.component';

import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { MicroRoasterComponent } from './customer-management/micro-roaster/micro-roaster.component';
import { HoReCaComponent } from './customer-management/ho-re-ca/ho-re-ca.component';
import { MicroRoasterDetailsComponent } from './customer-management/micro-roaster-details/micro-roaster-details.component';
import { HorecaDetailsComponent } from './customer-management/horeca-details/horeca-details.component';
import { HorecaTableComponent } from './customer-management/horeca-details/horeca-table/horeca-table.component';
import { DiscountEditComponent } from './customer-management/discount-edit/discount-edit.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { InviteMemberComponent } from './invite-member/invite-member.component';
import { PermissionErrorComponent } from './permission-error/permission-error.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
    declarations: [
        PeopleComponent,
        EditMembersComponent,
        AddMembersComponent,
        UserManagementComponent,
        ManageRoleComponent,
        PagenotfoundComponent,
        BottomSheetRoles,
        BottomSheetStatus,
        CustomerManagementComponent,
        MicroRoasterComponent,
        HoReCaComponent,
        MicroRoasterDetailsComponent,
        HorecaDetailsComponent,
        HorecaTableComponent,
        DiscountEditComponent,
        TeamMembersComponent,
        InviteMemberComponent,
        PermissionErrorComponent,
    ],
    imports: [
        CommonModule,
        PeopleRoutingModule,
        OverlayPanelModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule,
        DialogModule,
        MatBottomSheetModule,
        MatSidenavModule,
        AutoCompleteModule,
        SharedModule,
    ],
    providers: [SheetValues],
})
export class PeopleModule {}
