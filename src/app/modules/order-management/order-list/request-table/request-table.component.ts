import { Component, OnInit } from '@angular/core';
import { AvailabilityRequest } from '@models';
import { OrderManagementService } from '../../order-management.service';
import { ResizeService, CommonService } from '@services';
import { DataTableComponent } from '@base-components';
import { LazyLoadEvent } from 'primeng/api/public_api';

@Component({
    selector: 'app-request-table',
    templateUrl: './request-table.component.html',
    styleUrls: ['./request-table.component.scss'],
})
export class RequestTableComponent extends DataTableComponent<AvailabilityRequest> implements OnInit {
    constructor(
        private orderService: OrderManagementService,
        protected resizeService: ResizeService,
        public commonService: CommonService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        super.subscribeTo(this.orderService.requestList$);
    }

    loadRequests(event?: LazyLoadEvent): void {
        const options = super.getLoadingOptions(event);
        this.orderService.loadRequests(options);
    }

    getStatus(data: any) {
        if (data) {
            const particularData = data.replace(/_/g, ' ').toLowerCase();
            return particularData.charAt(0).toUpperCase() + particularData.slice(1);
        }
    }
}
