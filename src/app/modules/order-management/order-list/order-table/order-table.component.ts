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
            this.orgType = params.orgType;
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
