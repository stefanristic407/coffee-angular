import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { OrderStatus, OrderType, OrgType } from '@enums';
import { LabelValue, OrderDetails, RecentActivity } from '@models';
import { ResizeService } from '@services';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-order-timeline',
    templateUrl: './order-timeline.component.html',
    styleUrls: ['./order-timeline.component.scss'],
})
export class OrderTimelineComponent extends ResizeableComponent implements OnInit {
    readonly OrderTypes = OrderType;

    timelinePoints: LabelValue[] = [];
    activities: RecentActivity[] = [];
    order: OrderDetails;
    accordionOpened = true;

    @Input() invoiceUrl: string;
    @Input() orgType: OrgType;
    @Input() orderId: number;

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
        return this.order && this.order.orderType === OrderType.Prebook;
    }

    get isGraded(): boolean {
        return this.order && this.order.status === OrderStatus.Graded;
    }

    get showTextBlock(): boolean {
        if (!this.order || !this.order.status) {
            return false;
        }

        return (
            this.order &&
            this.order.status &&
            ((this.order.orderType === OrderType.Sample && this.order.status === OrderStatus.Received) || this.isGraded)
        );
    }

    get receivedDate(): string {
        const receivedActivity = this.activities.reverse().find((x) => x.status.toUpperCase() === OrderStatus.Received);
        if (receivedActivity) {
            return receivedActivity.created_at;
        }
    }

    constructor(
        private router: Router,
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
            }
        });
    }

    getStatusAuthor(point: LabelValue): string {
        const activity = this.getLatestActivity(point);
        return activity ? `${activity.user_first_name} ${activity.user_last_name}` : '';
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

    private getLatestActivity(point: LabelValue): RecentActivity {
        if (!this.activities) {
            return null;
        }

        return this.activities.reverse().find((x) => x.status.toUpperCase() === point.value);
    }

    private updateTimelinePoints(): void {
        if (this.order && this.order.orderType === OrderType.Prebook) {
            this.timelinePoints = [
                { label: 'Order Placed', value: OrderStatus.Placed },
                { label: 'Order Confirmed', value: OrderStatus.Confirmed },
                { label: 'Payment', value: OrderStatus.Payment },
                { label: 'Harverst Ready', value: OrderStatus.HarvestReady },
                { label: 'Confirmed', value: OrderStatus.Graded },
            ];
        } else {
            this.timelinePoints = [
                { label: 'Order Placed', value: OrderStatus.Placed },
                { label: 'Order Confirmed', value: OrderStatus.Confirmed },
                { label: 'Payment', value: OrderStatus.Payment },
                { label: 'Shipped', value: OrderStatus.Shipped },
                { label: 'Received', value: OrderStatus.Received },
                { label: 'Confirmed', value: OrderStatus.Graded },
            ];
        }
    }
}
