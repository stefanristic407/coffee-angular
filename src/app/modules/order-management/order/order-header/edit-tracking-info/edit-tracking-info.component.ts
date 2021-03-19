import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResizeService } from '@services';
import { OrderManagementService } from '@app/modules/order-management/order-management.service';
import { ResizeableComponent } from '@base-components';
import { OrderDetails } from '@models';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-edit-tracking-info',
    templateUrl: './edit-tracking-info.component.html',
    styleUrls: ['./edit-tracking-info.component.scss'],
})
export class EditTrackingInfoComponent extends ResizeableComponent implements OnInit {
    trackingUrl: string;
    shippingDate: string | Date;

    @Input() orderId: number;

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
                    this.shippingDate = order.shipmentDate ? new Date(order.shipmentDate) : '';
                    this.trackingUrl = order.trackingLink;
                }
            },
        });
    }

    update(): void {
        this.ordersService
            .updateShipmentDetails(this.orderId, this.trackingUrl, this.shippingDate.toString())
            .subscribe({
                next: (res) => {
                    if (res.success) {
                        this.toastrService.success('Shipment details has been updated!');
                    } else {
                        this.toastrService.error('Error while updating shipment details');
                    }
                },
            });
    }
}
