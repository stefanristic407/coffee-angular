import { Component, Input, OnInit } from '@angular/core';
import { OrderStatus, OrderType, OrgType } from '@enums';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-order-header',
    templateUrl: './order-header.component.html',
    styleUrls: ['./order-header.component.scss'],
})
export class OrderHeaderComponent implements OnInit {
    readonly OrderTypes = OrderType;
    readonly OrderStatus = OrderStatus;
    readonly OrgTypes = OrgType;

    breadcrumbs: MenuItem[] = [];

    @Input() orderId: number;
    @Input() organizationType: OrgType;
    @Input() orderType: OrderType;
    @Input() createdAt: Date;
    @Input() statusPaid = true;
    @Input() invoiceUrl = '';
    @Input() orderStatus: OrderStatus;

    get typeClass(): string {
        switch (this.orderType) {
            case OrderType.Sample:
                return 'order--sample';
            case OrderType.Booked:
                return 'order--booked';
            case OrderType.Prebook:
                return 'order--prebook';
        }
    }

    get typeName(): string {
        switch (this.orderType) {
            case OrderType.Sample:
                return 'Sample';
            case OrderType.Booked:
                return 'Booked';
            case OrderType.Prebook:
                return 'Pre-Booked';
        }
    }

    get isConfirmationMode(): boolean {
        return this.organizationType === OrgType.MICRO_ROASTER && this.orderStatus === OrderStatus.Placed;
    }

    ngOnInit(): void {
        this.breadcrumbs = [
            { label: 'Home', routerLink: '/features/welcome-aboard' },
            { label: 'Order Management', routerLink: `/orders/${this.organizationType}` },
            { label: `Order ${this.orderId}` },
        ];
    }

    openInvoice(): void {
        if (this.invoiceUrl) {
            window.open(this.invoiceUrl, '_blank');
        }
    }
}
