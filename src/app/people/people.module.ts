import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { EditMembersComponent } from './edit-members/edit-members.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PopoverModule} from 'ngx-bootstrap/popover';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {TreeModule} from 'primeng/tree';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatSidenavModule } from '@angular/material/sidenav';
import {BottomSheetRoles} from '../people/user-management/to-bottomsheet-roles/bottom-sheet-roles';
import {BottomSheetStatus} from '../people/user-management/to-bottomsheet-status/bottom-sheet-status';
import { SheetValues } from './user-management/sheet-values';
import { ToastrModule } from 'ngx-toastr';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';




@NgModule({
  declarations: [PeopleComponent, CreateRoleComponent, EditMembersComponent, AddMembersComponent, UserManagementComponent, ManageRoleComponent, PagenotfoundComponent,BottomSheetRoles,BottomSheetStatus],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    OverlayPanelModule,
    PopoverModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    TreeModule,
    MatBottomSheetModule,
    MatSidenavModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    ToastrModule.forRoot({timeOut: 10000, preventDuplicates : true})
  ],
  providers: [SheetValues]
})
export class PeopleModule { }
