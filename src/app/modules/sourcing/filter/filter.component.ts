import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SourcingService } from '../sourcing.service';
import { GlobalsService, ResizeService } from '@services';
import { ResizeableComponent } from '@base-components';
import { AVAILABILITY_LISTING_STATUS_ITEMS } from '@constants';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent extends ResizeableComponent implements OnInit {
    queryParams: any;
    limitFlavour = true;
    listingStatusItems = AVAILABILITY_LISTING_STATUS_ITEMS;

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
        this.queryParams = {
            altitude_start: null,
            altitude_end: null,
            flavours: null,
            listing_status: null,
            certificates: null,
        };
        this.sourcingSrv.queryParams.next({ ...this.sourcingSrv.queryParams.getValue(), ...this.queryParams });
        this.close();
    }

    close() {
        this.ref.close();
    }
}
