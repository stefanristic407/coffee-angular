import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SourcingService } from '../sourcing.service';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
    queryParams: any;
    limitFlavour = true;
    maxFlavour = 20;
    listingStatusItems = [
        { label: 'At Estate', value: 'ESTATE' },
        { label: 'At mill', value: 'MILL' },
        { label: 'Warehouse', value: 'WAREHOUSE' },
    ];

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        public globals: GlobalsService,
        public sourcingSrv: SourcingService,
    ) {}

    ngOnInit(): void {
        this.queryParams = { ...this.sourcingSrv.queryParams.getValue() };
        if (this.globals.device === 'mobile') {
            this.maxFlavour = 8;
        }
    }

    filterCall() {
        this.sourcingSrv.queryParams.next({ ...this.queryParams });
        this.close();
    }

    close() {
        this.ref.close();
    }
}
