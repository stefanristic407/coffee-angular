import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '@base-components';
import { AvailabilityRequest } from '@models';
import { ResizeService } from '@services';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { OrderManagementService } from '../../order-management.service';

@Component({
    selector: 'app-request-table',
    templateUrl: './request-table.component.html',
    styleUrls: ['./request-table.component.scss'],
})
export class RequestTableComponent extends DataTableComponent<AvailabilityRequest> implements OnInit {
    tableColumns: any = [];

    constructor(private orderService: OrderManagementService, protected resizeService: ResizeService) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.initTable();
        super.subscribeTo(this.orderService.requestList$);
    }

    initTable() {
        if (this.resizeService.isMobile()) {
            this.tableColumns.push({
                field: 'id',
                header: 'id',
            });
        }
        this.tableColumns = this.tableColumns.concat([
            {
                field: 'micro_roaster_name',
                header: 'requested_by',
                sortable: true,
                width: 17,
            },
            {
                field: 'created_at',
                header: 'date_requested',
                sortable: true,
                width: 17,
            },
            {
                field: 'origin',
                header: 'origin',
                sortable: true,
                width: 13,
            },
            {
                field: 'estate_name',
                header: 'estate',
                sortable: true,
                width: 17,
            },
            {
                field: 'varieties',
                header: 'variety',
                sortable: true,
                width: 24,
            },
        ]);
        if (!this.resizeService.isMobile()) {
            this.tableColumns.push({
                field: 'actions',
                header: 'action',
                width: 12,
            });
        }
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
