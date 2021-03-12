import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiRequestRoutingModule } from './api-requests-routing.module';
import { ApiKeyRequestsComponent } from './api-key-requests/api-key-requests.component';
import { ApiRequestDetailsComponent } from './api-request-details/api-request-details.component';
import { ApiRequestsTableComponent } from './api-requests.component';
import { GeneratedKeysComponent } from './generated-keys/generated-keys.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@app/shared';
import { DataTablesModule } from 'angular-datatables';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    declarations: [
        ApiRequestsTableComponent,
        ApiKeyRequestsComponent,
        GeneratedKeysComponent,
        ApiRequestDetailsComponent,
    ],
    imports: [CommonModule, ApiRequestRoutingModule, PaginatorModule, MatIconModule, DataTablesModule, SharedModule],
})
export class ApiRequestModule {}
