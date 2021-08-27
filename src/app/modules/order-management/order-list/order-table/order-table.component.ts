import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { OrderType, OrganizationType } from '@enums';
import { CommonService, ResizeService } from '@services';
import { DataTableComponent } from '@base-components';
import { OrderSummary } from '@models';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { OrderManagementService } from '../../order-management.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table/table';

@Component({
    selector: 'app-order-table',
    templateUrl: './order-table.component.html',
    styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent extends DataTableComponent<OrderSummary> implements OnInit, AfterViewInit {
    readonly OrgTypes = OrganizationType;
    readonly OrderType = OrderType;

    orgType: OrganizationType;
    isMobileView = false;

    @ViewChild('ordersTable') ordersTable: Table;
    @HostListener('window:resize', ['$event'])
    Resize(event?) {
        this.updateResize();
    }

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderManagementService,
        protected resizeService: ResizeService,
        public commonService: CommonService,
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
            this.orgType = params.orgType;
            if (this.ordersTable) {
                // To load data when navigating between MR and ES orders
                this.ordersTable.reset();
            }

            super.subscribeTo(this.orderService.getOrders(this.orgType));
        });
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
