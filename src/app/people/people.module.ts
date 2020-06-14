import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ModalModule } from "ngx-bootstrap/modal";
import { PopoverModule } from "ngx-bootstrap/popover";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { ToastrModule } from "ngx-toastr";
import { DialogModule } from "primeng/dialog";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from "primeng/tree";
import { BottomSheetRoles } from "../people/user-management/to-bottomsheet-roles/bottom-sheet-roles";
import { BottomSheetStatus } from "../people/user-management/to-bottomsheet-status/bottom-sheet-status";
import { AddMembersComponent } from "./add-members/add-members.component";
import { CreateRoleComponent } from "./create-role/create-role.component";
import { EditMembersComponent } from "./edit-members/edit-members.component";
import { ManageRoleComponent } from "./manage-role/manage-role.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { PeopleRoutingModule } from "./people-routing.module";
import { PeopleComponent } from "./people.component";
import { SheetValues } from "./user-management/sheet-values";
import { UserManagementComponent } from "./user-management/user-management.component";
@NgModule({
  declarations: [
    PeopleComponent,
    CreateRoleComponent,
    EditMembersComponent,
    AddMembersComponent,
    UserManagementComponent,
    ManageRoleComponent,
    PagenotfoundComponent,
    BottomSheetRoles,
    BottomSheetStatus
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    OverlayPanelModule,
    PopoverModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    TreeModule,
    DialogModule,
    TooltipModule,
    MatBottomSheetModule,
    MatSidenavModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    ToastrModule.forRoot({ timeOut: 10000, preventDuplicates: true })
  ],
  providers: [SheetValues]
})
export class PeopleModule {}
