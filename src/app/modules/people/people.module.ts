import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SharedModule } from 'src/app/shared/shared.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';

import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CustomerManagementTableComponent } from './customer-management/customer-management-table/customer-management-table.component';
import { CertificatesComponent } from './customer-management/certificates/certificates.component';
import { ContactsListComponent } from './customer-management/contacts-list/contacts-list.component';
import { CustomerContactInfoComponent } from './customer-management/customer-contact-info/customer-contact-info.component';
import { CustomerDetailsComponent } from './customer-management/customer-details/customer-details.component';
import { CustomerInfoComponent } from './customer-management/customer-info/customer-info.component';
import { CustomerPortalInfoComponent } from './customer-management/customer-portal-info/customer-portal-info.component';

@NgModule({
    declarations: [
        PeopleComponent,
        CustomerManagementComponent,
        CustomerManagementTableComponent,
        CertificatesComponent,
        ContactsListComponent,
        CustomerContactInfoComponent,
        CustomerDetailsComponent,
        CustomerInfoComponent,
        CustomerPortalInfoComponent,
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
