import { Component, Input, OnInit } from '@angular/core';
import { OrderStatus, OrderType } from '@core/enums';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-order-header',
    templateUrl: './order-header.component.html',
    styleUrls: ['./order-header.component.scss'],
})
export class OrderHeaderComponent implements OnInit {
    readonly OrderTypes = OrderType;
    readonly OrderStatus = OrderStatus;

    breadcrumbs: MenuItem[] = [];

    @Input() orderId: number;
    @Input() orderType: OrderType;
    @Input() createdAt: Date;
    @Input() statusPaid = true;
    @Input() invoiceUrl = '';
    @Input() orderStatus = '';

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

    ngOnInit(): void {
        this.breadcrumbs = [
            { label: 'Home', routerLink: '/features/welcome-aboard' },
            { label: 'Order Management', routerLink: '/orders' },
            { label: `Order ${this.orderId}` },
        ];
    }

    openInvoice(): void {
        if (this.invoiceUrl) {
            window.open(this.invoiceUrl, '_blank');
        }
    }
}
