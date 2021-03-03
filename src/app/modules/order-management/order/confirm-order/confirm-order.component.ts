import { Component, Input } from '@angular/core';
import { DestroyableComponent } from '@core/base-components';
import { OrdersService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-confirm-order',
    templateUrl: './confirm-order.component.html',
    styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent extends DestroyableComponent {
    readonly availability$ = this.orderService.bulkDetails$.pipe(takeUntil(this.unsubscribeAll$));

    rejectMode = false;

    @Input() orderId = 0;

    constructor(private toastrService: ToastrService, private orderService: OrdersService) {
        super();
    }

    accept(): void {
        this.orderService.confirmOrder(this.orderId).subscribe((response) => {
            if (response.success) {
                this.toastrService.success('Order confirmed');
                this.orderService.loadOrderDetails(this.orderId);
            } else {
                this.toastrService.error('error while accepting order');
            }
        });
    }

    reject(): void {
        this.orderService.rejectOrder(this.orderId).subscribe((response) => {
            if (response.success) {
                this.toastrService.success('Order rejected');
                this.rejectMode = true;
            } else {
                this.toastrService.error('error while rejecting order');
            }
        });
    }

    submitReason(): void {
        // TODO: Get API endpoint for submitting rejection reason.
    }
}
