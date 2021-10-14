import { Component, Input, OnInit } from '@angular/core';
import { OrderStatus, OrderType, OrganizationType } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-order-header',
    templateUrl: './order-header.component.html',
    styleUrls: ['./order-header.component.scss'],
})
export class OrderHeaderComponent implements OnInit {
    readonly OrderTypes = OrderType;
    readonly OrderStatus = OrderStatus;
    readonly OrgTypes = OrganizationType;

    breadcrumbs: MenuItem[] = [];

    @Input() orderId: number;
    @Input() organizationType: OrganizationType;
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
        return this.organizationType === OrganizationType.MICRO_ROASTER && this.orderStatus === OrderStatus.Placed;
    }

    get isInProgress(): boolean {
        return this.orderStatus !== OrderStatus.Shipped && this.orderStatus !== OrderStatus.Received;
    }

    constructor(private translator: TranslateService) {}

    ngOnInit(): void {
        this.breadcrumbs = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('order_management'), routerLink: `/orders/${this.organizationType}` },
            { label: `${this.translator.instant('order')} ${this.orderId}` },
        ];
    }
}
