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
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';

import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { MicroRoasterDetailsComponent } from './customer-management/micro-roaster-details/micro-roaster-details.component';
import { HorecaDetailsComponent } from './customer-management/horeca-details/horeca-details.component';
import { HorecaTableComponent } from './customer-management/horeca-details/horeca-table/horeca-table.component';
import { DiscountEditComponent } from './customer-management/discount-edit/discount-edit.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CustomerManagementTableComponent } from './customer-management/customer-management-table/customer-management-table.component';
import { DetailsUserComponent } from './customer-management/details-user/details-user.component';
import { DetailsDiscountComponent } from './customer-management/details-discount/details-discount.component';
import { DetailsCustomerStatusComponent } from './customer-management/details-customer-status/details-customer-status.component';
import { ImportantContactsComponent } from './customer-management/important-contacts/important-contacts.component';

@NgModule({
    declarations: [
        PeopleComponent,
        AddMembersComponent,
        CustomerManagementComponent,
        MicroRoasterDetailsComponent,
        HorecaDetailsComponent,
        HorecaTableComponent,
        DiscountEditComponent,
        CustomerManagementTableComponent,
        DetailsUserComponent,
        DetailsDiscountComponent,
        DetailsCustomerStatusComponent,
        ImportantContactsComponent,
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
    providers: [],
})
export class PeopleModule {}
