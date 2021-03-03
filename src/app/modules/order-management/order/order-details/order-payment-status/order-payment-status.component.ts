import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { OrderDetails } from '@core/models';

@Component({
    selector: 'app-order-payment-status',
    templateUrl: './order-payment-status.component.html',
    styleUrls: ['./order-payment-status.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPaymentStatusComponent {
    @Input() order: OrderDetails;

    openReceipt(): void {
        if (this.order && this.order.receiptUrl) {
            window.open(this.order.receiptUrl, '_blank');
        }
    }
}
