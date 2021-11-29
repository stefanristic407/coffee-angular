import { Component, Input, OnInit } from '@angular/core';
import { ResizeableComponent } from '@base-components';
import { OrderStatus, OrderType, OrganizationType } from '@enums';
import { LabelValue, OrderDetails, RecentActivity, ShippingDetails } from '@models';
import { OrderManagementService } from '@modules/order-management/order-management.service';
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
        return timelinePoint ? timelinePoint.label : 'Order Placed';
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
        const pickupDateStr =
            this.order?.estimated_pickup_date ||
            this.order?.shipment_date ||
            this.shippingDetails?.estimated_arrival_date;
        const pickupDate = pickupDateStr ? moment(pickupDateStr).startOf('day') : moment().startOf('day').add(1, 'day');

        return pickupDate <= today;
    }

    constructor(
        private toastrService: ToastrService,
        private orderService: OrderManagementService,
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
                return (
                    this.order.estimated_departure_date ||
                    this.order.shipped_date ||
                    this.order.shipment_date ||
                    this.shippingDetails?.estimated_departure_date
                );
            }

            if (point.value === OrderStatus.Received) {
                return (
                    this.order.estimated_pickup_date ||
                    this.order.arrival_date ||
                    this.shippingDetails?.estimated_arrival_date
                );
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
                { label: 'Order Placed', value: OrderStatus.Placed },
                { label: 'Order Confirmed', value: OrderStatus.Confirmed },
                { label: 'Harverst Ready', value: OrderStatus.HarvestReady },
                { label: 'Graded', value: OrderStatus.Graded },
            ];
        } else {
            this.timelinePoints = [
                { label: 'Order Placed', value: OrderStatus.Placed },
                { label: 'Order Confirmed', value: OrderStatus.Confirmed },
                { label: 'Shipped', value: OrderStatus.Shipped },
                {
                    label: this.orgType === OrganizationType.ESTATE ? 'Delivered' : 'Received by Micro-roaster',
                    value: OrderStatus.Received,
                },
            ];

            if (this.orgType === OrganizationType.ESTATE) {
                this.timelinePoints.push({ label: 'Received', value: OrderStatus.Graded });
            }
        }
    }
}
