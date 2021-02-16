import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SharedModule } from 'src/app/shared/shared.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AddMembersComponent } from './add-members/add-members.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';

import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { MicroRoasterComponent } from './customer-management/micro-roaster/micro-roaster.component';
import { HoReCaComponent } from './customer-management/ho-re-ca/ho-re-ca.component';
import { MicroRoasterDetailsComponent } from './customer-management/micro-roaster-details/micro-roaster-details.component';
import { HorecaDetailsComponent } from './customer-management/horeca-details/horeca-details.component';
import { HorecaTableComponent } from './customer-management/horeca-details/horeca-table/horeca-table.component';
import { DiscountEditComponent } from './customer-management/discount-edit/discount-edit.component';
import { PermissionErrorComponent } from './permission-error/permission-error.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AddTeamsModule } from './../add-teams/add-teams.module';

@NgModule({
    declarations: [
        PeopleComponent,
        AddMembersComponent,
        PagenotfoundComponent,
        CustomerManagementComponent,
        MicroRoasterComponent,
        HoReCaComponent,
        MicroRoasterDetailsComponent,
        HorecaDetailsComponent,
        HorecaTableComponent,
        DiscountEditComponent,
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
        AddTeamsModule,
    ],
    providers: [],
})
export class PeopleModule {}
