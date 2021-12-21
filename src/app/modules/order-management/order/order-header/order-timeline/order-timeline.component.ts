import { Component, Input, OnInit } from '@angular/core';
import { ResizeableComponent } from '@base-components';
import { OrderStatus, OrderType, OrganizationType } from '@enums';
import { LabelValue, OrderDetails, RecentActivity, ShippingDetails } from '@models';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { TranslateService } from '@ngx-translate/core';
import { ResizeService } from '@services';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-order-timeline',
    templateUrl: './order-timeline.component.html',
    styleUrls: ['./order-timeline.component.scss'],
})
export class OrderTimelineComponent extends ResizeableComponent implements OnInit {
    readonly OrgType = OrganizationType;
    readonly OrderStatus = OrderStatus;

    readonly isReviewed$ = this.orderService.isReviewed$;

    timelinePoints: LabelValue[] = [];
    activities: RecentActivity[] = [];
    order: OrderDetails;
    shippingDetails: ShippingDetails;
    accordionOpened = true;
    receivedDate: string;

    @Input() invoiceUrl: string;
    @Input() orgType: OrganizationType;
    @Input() orderId: string;
    @Input() orderPaid = false;

    get statusLabel(): string {
        if (!this.order) {
            return '';
        }

        const timelinePoint = this.timelinePoints.find((x) => x.value === this.order.status);
        return timelinePoint ? timelinePoint.label : this.translator.instant('order_placed');
    }

    get currentPointIndex(): number {
        if (!this.order) {
            return 0;
        }

        const index = this.timelinePoints.findIndex((x) => x.value === this.order.status);
        if (index < 0) {
            return 0;
        }

        return index;
    }

    get isPrebook(): boolean {
        return this.order && this.order.order_type === OrderType.Prebook;
    }

    get isGraded(): boolean {
        return this.order && this.order.status === OrderStatus.Graded;
    }

    get showTextBlock(): boolean {
        return (
            this.orgType === OrganizationType.ESTATE &&
            this.order &&
            this.order.status &&
            this.order.order_type !== OrderType.Prebook &&
            this.order.status !== OrderStatus.Rejected &&
            (this.isPastPickupDate ||
                this.order.status === OrderStatus.Delivered ||
                this.order.status === OrderStatus.Received)
        );
    }

    get showMrTextBlock(): boolean {
        return (
            this.orgType === OrganizationType.MICRO_ROASTER &&
            this.order &&
            this.order.status &&
            this.order.order_type !== OrderType.Prebook &&
            this.order.status !== OrderStatus.Rejected &&
            (this.order.status === OrderStatus.Delivered || this.order.status === OrderStatus.Received)
        );
    }

    get isPastPickupDate(): boolean {
        const today = moment().startOf('day');
        // estimated_pickup_date is for the estate order and shipment_date is for the micro-roaster order
        let pickupDateStr = '';
        if (this.orgType === OrganizationType.ESTATE) {
            if (this.order.order_type === OrderType.Sample) {
                pickupDateStr = this.order.arrival_date;
            } else {
                if (this.order.is_fully_serviced_delivery) {
                    pickupDateStr = this.order?.estimated_pickup_date;
                } else {
                    pickupDateStr = this.shippingDetails?.estimated_arrival_date;
                }
            }
        } else {
            pickupDateStr = this.order?.shipment_date;
        }
        const pickupDate = pickupDateStr ? moment(pickupDateStr).startOf('day') : moment().startOf('day').add(1, 'day');

        return pickupDate <= today;
    }

    constructor(
        private orderService: OrderManagementService,
        private toastrService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.orderService.orderDetails$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((data) => {
            this.order = data;
            this.updateTimelinePoints();
        });
        this.orderService.shippingDetails$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((data) => {
            this.shippingDetails = data;
            this.updateTimelinePoints();
        });

        this.orderService.recentActivities$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((data) => {
            if (data) {
                this.activities = data;
                const receivedActivity = this.activities
                    .reverse()
                    .find((x) => x.status.toUpperCase() === OrderStatus.Received);
                if (receivedActivity) {
                    this.receivedDate = receivedActivity.created_at;
                }
            }
        });
    }

    getStatusAuthor(point: LabelValue): any {
        const activity = this.getLatestActivity(point);
        const userData = {
            id: activity ? activity.user_id : '',
            orgType: activity ? activity.organization_type : '',
            name: activity ? `${activity.user_first_name} ${activity.user_last_name}` : '',
        };
        return userData;
    }

    getStatusDate(point: LabelValue): string {
        const activity = this.getLatestActivity(point);

        if (!activity && this.order) {
            if (point.value === OrderStatus.Shipped) {
                if (this.orgType === OrganizationType.ESTATE) {
                    // Shipped date is needed for only sample and booked order
                    if (this.order.order_type === OrderType.Sample) {
                        return this.order.shipped_date;
                    } else {
                        if (this.order.is_fully_serviced_delivery) {
                            return this.order.estimated_departure_date;
                        } else {
                            return this.shippingDetails?.estimated_departure_date;
                        }
                    }
                } else {
                    return this.order.shipment_date;
                }
            }

            if (point.value === OrderStatus.Received) {
                if (this.orgType === OrganizationType.ESTATE) {
                    if (this.order.order_type === OrderType.Sample) {
                        return this.order.arrival_date;
                    } else {
                        if (this.order.is_fully_serviced_delivery) {
                            return this.order.estimated_pickup_date;
                        } else {
                            return this.shippingDetails?.estimated_arrival_date;
                        }
                    }
                }
            }
        }

        return point.value !== OrderStatus.HarvestReady && activity ? activity.created_at : '';
    }

    confirmOrder(): void {
        this.orderService.markAsReceived(+this.orderId).subscribe({
            next: (response) => {
                if (response.success) {
                    this.toastrService.success('Order has been marked as received.');
                    this.orderService.loadOrderDetails(+this.orderId, this.orgType);
                } else {
                    this.toastrService.error('Error while confirming order shipment.');
                }
            },
        });
    }

    viewLotStatusClicked() {
        const el = document.querySelector('app-remote-sensoring');
        if (el) {
            el.scrollIntoView();
        }
    }

    private getLatestActivity(point: LabelValue): RecentActivity {
        if (!this.activities) {
            return null;
        }

        return this.activities.reverse().find((x) => x.status.toUpperCase() === point.value);
    }

    private updateTimelinePoints(): void {
        if (this.order && this.order.order_type === OrderType.Prebook) {
            this.timelinePoints = [
                { label: this.translator.instant('order_placed'), value: OrderStatus.Placed },
                { label: this.translator.instant('order_confirmed'), value: OrderStatus.Confirmed },
                { label: this.translator.instant('harverst_ready'), value: OrderStatus.HarvestReady },
                { label: this.translator.instant('graded'), value: OrderStatus.Graded },
            ];
        } else {
            this.timelinePoints = [
                { label: this.translator.instant('order_placed'), value: OrderStatus.Placed },
                { label: this.translator.instant('order_confirmed'), value: OrderStatus.Confirmed },
                { label: this.translator.instant('shipped'), value: OrderStatus.Shipped },
                {
                    label:
                        this.orgType === OrganizationType.ESTATE
                            ? this.translator.instant('delivered')
                            : this.translator.instant('received_by_mr'),
                    value: OrderStatus.Received,
                },
            ];

            if (this.orgType === OrganizationType.ESTATE) {
                this.timelinePoints.push({ label: this.translator.instant('received'), value: OrderStatus.Graded });
            }
        }
    }
}
