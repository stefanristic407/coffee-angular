import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { OrderStatus, OrderType, OrganizationType } from '@enums';
import { OrderDetails } from '@models';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { ToastrService } from 'ngx-toastr';
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

    constructor(private toastrService: ToastrService, private orderService: OrderManagementService) {}

    openLink(link: string): void {
        if (!link.startsWith('http')) {
            link = `http://${link}`;
        }

        if (link) {
            window.open(link, '_blank');
        }
    }

    uploadReceipt(event: any): void {
        this.orderService.uploadReceipt(this.order.id, event).subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.orderService.loadOrderDetails(this.order.id, OrganizationType.ESTATE);
                    this.toastrService.success('Payment receipt has been uploaded.');
                } else {
                    this.toastrService.error('Error while uploading payment receipt.');
                }
            },
        });
    }
}
