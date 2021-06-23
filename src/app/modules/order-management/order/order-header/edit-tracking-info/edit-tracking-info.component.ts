import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResizeService } from '@services';
import { OrderManagementService } from '@app/modules/order-management/order-management.service';
import { ResizeableComponent } from '@base-components';
import { takeUntil } from 'rxjs/operators';
import { OrderStatus } from '@enums';
import { OrderDetails } from '@models';

@Component({
    selector: 'app-edit-tracking-info',
    templateUrl: './edit-tracking-info.component.html',
    styleUrls: ['./edit-tracking-info.component.scss'],
})
export class EditTrackingInfoComponent extends ResizeableComponent implements OnInit {
    readonly OrderStatuses = OrderStatus;
    editable = false;
    orderDetails: OrderDetails;

    trackingUrl: string;
    shippingDate: string | Date;

    @Input() orderId: number;
    @Input() orderStatus: OrderStatus;

    get isShipped() {
        if (
            this.orderStatus &&
            (this.orderStatus === OrderStatus.Shipped || this.orderStatus === OrderStatus.Received)
        ) {
            return true;
        }

        return false;
    }

    get today(): Date {
        return new Date();
    }

    constructor(
        private toastrService: ToastrService,
        protected resizeService: ResizeService,
        private ordersService: OrderManagementService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.ordersService.orderDetails$.pipe(takeUntil(this.unsubscribeAll$)).subscribe({
            next: (order) => {
                if (order) {
                    this.orderDetails = order;
                    this.shippingDate = order.shipment_date ? new Date(order.shipment_date) : '';
                    this.trackingUrl = order.tracking_link;
                    this.orderStatus = order.status;
                }
            },
        });
    }

    update(): void {
        if (this.orderDetails?.shipment_date && !this.editable) {
            this.editable = true;
        } else {
            this.ordersService
                .updateShipmentDetails(this.orderId, this.trackingUrl, this.shippingDate.toString())
                .subscribe({
                    next: (res) => {
                        if (res.success) {
                            this.toastrService.success('Shipment details has been updated!');
                            this.editable = false;
                        } else {
                            this.toastrService.error('Error while updating shipment details');
                        }
                    },
                });
        }
    }
}
