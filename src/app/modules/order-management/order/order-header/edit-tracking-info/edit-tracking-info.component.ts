import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResizeService } from '@services';
import { OrderManagementService } from '@app/modules/order-management/order-management.service';
import { ResizeableComponent } from '@base-components';
import { takeUntil } from 'rxjs/operators';
import { OrderStatus } from '@enums';
import { OrderDetails } from '@models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { urlValidator } from '@utils';

@Component({
    selector: 'app-edit-tracking-info',
    templateUrl: './edit-tracking-info.component.html',
    styleUrls: ['./edit-tracking-info.component.scss'],
})
export class EditTrackingInfoComponent extends ResizeableComponent implements OnInit {
    readonly OrderStatuses = OrderStatus;
    editable = false;
    orderDetails: OrderDetails;
    infoForm: FormGroup;

    @Input() orderId: number;
    @Input() orderStatus: OrderStatus;

    get today(): Date {
        return new Date();
    }

    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        protected resizeService: ResizeService,
        private ordersService: OrderManagementService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.infoForm = this.fb.group({
            trackingUrl: [null, [Validators.required, urlValidator()]],
            shippingDate: [null, Validators.required],
        });
        this.ordersService.orderDetails$.pipe(takeUntil(this.unsubscribeAll$)).subscribe({
            next: (order) => {
                if (order) {
                    this.orderDetails = order;
                    this.infoForm.get('trackingUrl').setValue(order.tracking_link);
                    if (order.shipment_date && moment(order.shipment_date).isValid()) {
                        this.infoForm.get('shippingDate').setValue(new Date(order.shipment_date));
                    }
                    this.changeFormState();
                    this.orderStatus = order.status;
                }
            },
        });
    }

    changeFormState() {
        if (!!this.orderDetails?.shipment_date) {
            this.infoForm.get('shippingDate').disable();
        }
        if (!this.editable && !!this.orderDetails?.shipment_date) {
            this.infoForm.get('trackingUrl').disable();
        } else {
            this.infoForm.get('trackingUrl').enable();
        }
    }

    update(): void {
        if (this.orderDetails?.shipment_date && !this.editable) {
            this.editable = true;
            this.changeFormState();
        } else {
            if (this.infoForm.invalid) {
                this.infoForm.markAllAsTouched();
                return;
            }
            this.ordersService
                .updateShipmentDetails(
                    this.orderId,
                    this.infoForm.value.trackingUrl,
                    this.infoForm.value.shippingDate?.toString() || this.orderDetails.shipment_date,
                )
                .subscribe({
                    next: (res) => {
                        if (res.success) {
                            this.toastrService.success('Shipment details has been updated!');
                            this.editable = false;
                        } else {
                            this.toastrService.error('Error while updating shipment details');
                        }
                        this.changeFormState();
                    },
                });
        }
    }
}
