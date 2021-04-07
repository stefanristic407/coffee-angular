import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SourcingService } from '../sourcing.service';
import { GlobalsService, ResizeService } from '@services';
import { ResizeableComponent } from '@base-components';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent extends ResizeableComponent implements OnInit {
    queryParams: any;
    limitFlavour = true;
    listingStatusItems = [
        { label: 'At Estate', value: 'ESTATE' },
        { label: 'At mill', value: 'MILL' },
        { label: 'Warehouse', value: 'WAREHOUSE' },
    ];

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        public globals: GlobalsService,
        protected resizeService: ResizeService,
        public sourcingSrv: SourcingService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.queryParams = { ...this.sourcingSrv.queryParams.getValue() };
    }

    filterCall() {
        this.sourcingSrv.queryParams.next({ ...this.queryParams });
        this.close();
    }

    clear() {
        this.sourcingSrv.queryParams.next({ ...this.sourcingSrv.queryParams.getValue(), ...this.queryParams });
        this.close();
    }

    close() {
        this.ref.close();
    }
}
