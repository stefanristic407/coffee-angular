import { Component, Input, OnInit } from '@angular/core';
import { ResizeableComponent } from '@base-components';
import { OrderStatus, OrderType, OrganizationType } from '@enums';
import { LabelValue, OrderDetails, RecentActivity } from '@models';
import { ResizeService } from '@services';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-order-timeline',
    templateUrl: './order-timeline.component.html',
    styleUrls: ['./order-timeline.component.scss'],
})
export class OrderTimelineComponent extends ResizeableComponent implements OnInit {
    readonly OrgTypes = OrganizationType;
    readonly OrderStatus = OrderStatus;

    readonly isReviewed$ = this.orderService.isReviewed$;

    timelinePoints: LabelValue[] = [];
    activities: RecentActivity[] = [];
    order: OrderDetails;
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
            (this.order.status === OrderStatus.Delivered || this.order.status === OrderStatus.Received)
        );
    }

    get showMrTextBlock(): boolean {
        return (
            this.orgType === OrganizationType.MICRO_ROASTER &&
            this.order &&
            this.order.status &&
            this.order.order_type !== OrderType.Prebook &&
            (this.order.status === OrderStatus.Delivered || this.order.status === OrderStatus.Received)
        );
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
        return point.value !== OrderStatus.HarvestReady && activity ? activity.created_at : '';
    }

    openInvoice(): void {
        if (this.invoiceUrl) {
            window.open(this.invoiceUrl, '_blank');
        }
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
                { label: 'Payment', value: OrderStatus.Payment },
                { label: 'Harverst Ready', value: OrderStatus.HarvestReady },
                { label: 'Graded', value: OrderStatus.Graded },
            ];
        } else {
            this.timelinePoints = [
                { label: 'Order Placed', value: OrderStatus.Placed },
                { label: 'Order Confirmed', value: OrderStatus.Confirmed },
                { label: 'Payment', value: OrderStatus.Payment },
                { label: 'Shipped', value: OrderStatus.Shipped },
                {
                    label: this.orgType === OrganizationType.ESTATE ? 'Received' : 'Received by Micro-roaster',
                    value: OrderStatus.Received,
                },
            ];

            if (this.orgType === OrganizationType.ESTATE) {
                this.timelinePoints.push({ label: 'Confirm', value: OrderStatus.Graded });
            }
        }
    }
}
