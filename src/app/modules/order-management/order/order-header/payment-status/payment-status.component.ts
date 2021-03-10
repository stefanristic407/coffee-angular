import { Component, Input, OnInit } from '@angular/core';
import { ResizeableComponent } from '@base-components';
import { GroupedRecentActivity, OrderDetails } from '@models';
import { ResizeService } from '@services';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-payment-status',
    templateUrl: './payment-status.component.html',
    styleUrls: ['./payment-status.component.scss'],
})
export class PaymentStatusComponent extends ResizeableComponent implements OnInit {
    recentActivityList: GroupedRecentActivity[] = [];
    orderDetails: OrderDetails;

    @Input() orderId: number;
    @Input() orderStatus: string;
    @Input() paymentStatus: string;

    constructor(
        private toastrService: ToastrService,
        protected resizeService: ResizeService,
        private ordersService: OrderManagementService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.ordersService.orderDetails$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((data) => {
            this.orderDetails = data;
        });
    }

    verifyPayment(): void {
        this.ordersService.updatePaymentVerify(this.orderId).subscribe((data) => {
            if (data.success) {
                this.toastrService.success('Payment has been verified!');
                this.paymentStatus = 'VERIFIED';
                this.orderDetails.statusPaid = true;
                this.orderDetails.statusPending = false;
                this.orderDetails.receiptShow = true;
                this.ordersService.updateOrderDetails(this.orderDetails);
            } else {
                this.toastrService.error('Error while verifying the payment');
            }
        });
    }

    verifyPaymentAfterDelivery(): void {
        this.ordersService.updatePaymentAfterDelivery(this.orderId).subscribe((data) => {
            if (data.success) {
                this.toastrService.success('Payment after delivering the order!');
                this.orderDetails.paymentAfterDelivery = true;
                this.ordersService.updateOrderDetails(this.orderDetails);
            } else {
                this.toastrService.error('Error while verifying the payment after delivery');
            }
        });
    }
}
