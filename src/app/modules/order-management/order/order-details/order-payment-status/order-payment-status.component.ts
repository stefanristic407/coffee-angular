import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { OrderDetails } from '@models';
import { OrderType } from '@enums';

@Component({
    selector: 'app-order-payment-status',
    templateUrl: './order-payment-status.component.html',
    styleUrls: ['./order-payment-status.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPaymentStatusComponent {
    readonly OrderTypes = OrderType;

    @Input() order: OrderDetails;

    openReceipt(): void {
        if (this.order && this.order.receiptUrl) {
            window.open(this.order.receiptUrl, '_blank');
        }
    }
}
