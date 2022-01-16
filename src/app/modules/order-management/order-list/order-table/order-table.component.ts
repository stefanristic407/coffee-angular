import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableComponent } from '@base-components';
import { OrderType, OrganizationType } from '@enums';
import { OrderSummary } from '@models';
import { ResizeService } from '@services';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { Table } from 'primeng/table/table';
import { takeUntil } from 'rxjs/operators';
import { OrderManagementService } from '../../order-management.service';

@Component({
    selector: 'app-order-table',
    templateUrl: './order-table.component.html',
    styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent extends DataTableComponent<OrderSummary> implements OnInit, AfterViewInit {
    readonly OrgTypes = OrganizationType;
    readonly OrderType = OrderType;
    tableColumns: any = [];

    orgType: OrganizationType;
    isMobileView = false;

    @ViewChild('ordersTable') ordersTable: Table;
    @HostListener('window:resize', ['$event'])
    Resize(event?) {
        this.updateResize();
    }

    constructor(
        private orderService: OrderManagementService,
        private route: ActivatedRoute,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    updateResize() {
        this.isMobileView = window.innerWidth <= 640;
    }

    ngAfterViewInit() {
        this.updateResize();
    }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.unsubscribeAll$)).subscribe((params) => {
            this.orgType = params.orgType as OrganizationType;
            this.initTable();
            super.subscribeTo(this.orderService.getOrders(this.orgType));
        });
    }

    initTable() {
        this.tableColumns = [
            {
                field: 'id',
                header: 'id',
                sortable: true,
                width: 6,
            },
            this.orgType === OrganizationType.ESTATE
                ? {
                      field: 'estate_name',
                      header: 'estate_name',
                      sortable: true,
                      width: 12,
                  }
                : {
                      field: 'micro_roaster_name',
                      header: 'micro-roaster',
                      sortable: true,
                      width: 12,
                  },
            this.orgType === OrganizationType.ESTATE
                ? {
                      field: 'availability_name',
                      header: 'availability_name',
                      sortable: true,
                      width: 14,
                  }
                : {
                      field: 'product_name',
                      header: 'product_name',
                      sortable: true,
                      width: 14,
                  },
            {
                field: 'date_received',
                header: 'date_ordered',
                sortable: true,
                width: 11,
            },
            {
                field: 'origin',
                header: 'origin',
                sortable: true,
                width: 9,
            },
            this.orgType === OrganizationType.ESTATE
                ? {
                      field: 'price',
                      header: 'price',
                      sortable: true,
                      width: 10,
                  }
                : {
                      field: 'varieties',
                      header: 'variety',
                      sortable: true,
                      width: 10,
                  },
            {
                field: 'order_reference',
                header: 'roaster_reference_no',
                width: 12,
            },
            !this.resizeService.isMobile()
                ? {
                      field: 'type',
                      header: 'type',
                      width: 9,
                  }
                : null,
            {
                field: 'status',
                header: 'status',
                width: 9,
            },
            !this.resizeService.isMobile()
                ? {
                      field: 'actions',
                      header: 'action',
                      width: 8,
                  }
                : null,
        ].filter(Boolean);
    }

    loadOrders(event?: LazyLoadEvent): void {
        const options = super.getLoadingOptions(event);
        this.orderService.loadOrders(this.orgType, options);
    }

    getPrice(order: OrderSummary): number {
        if (order.shipping_price) {
            return order.price + order.shipping_price;
        }
        return order.price;
    }
}
