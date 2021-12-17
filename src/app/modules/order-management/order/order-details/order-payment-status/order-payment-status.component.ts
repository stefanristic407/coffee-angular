import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { OrderStatus, OrderType } from '@enums';
import { OrderDetails } from '@models';
import { PaymentStatus } from 'src/core/enums/payment';

@Component({
    selector: 'app-order-payment-status',
    templateUrl: './order-payment-status.component.html',
    styleUrls: ['./order-payment-status.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPaymentStatusComponent {
    readonly OrderTypes = OrderType;
    readonly OrderStatus = OrderStatus;
    readonly PaymentStatus = PaymentStatus;

    @Input() order: OrderDetails;
    @Input() trackingUrl: string;

    constructor() {}

    openLink(link: string): void {
        if (!link.startsWith('http')) {
            link = `http://${link}`;
        }

        if (link) {
            window.open(link, '_blank');
        }
    }
}
