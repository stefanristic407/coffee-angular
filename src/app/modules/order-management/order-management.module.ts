import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { RatingModule } from 'ng-starrating';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SharedModule } from '@app/shared/shared.module';
import { ErrorModuleModule } from '../error-module/error-module.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        OrderManagementRoutingModule,
        DataTablesModule,
        Ng2SearchPipeModule,
        FormsModule,
        RatingModule,
        ModalModule,
        MatBottomSheetModule,
        NgxChartsModule,
        ErrorModuleModule,
        MatTooltipModule,
        AutocompleteLibModule,
        TypeaheadModule.forRoot(),
        SharedModule,
    ],
})
export class OrderManagementModule {}
