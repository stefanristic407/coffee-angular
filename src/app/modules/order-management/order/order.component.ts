import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { OrderStatus, OrderType, OrgType } from '@enums';
import { OrderDetails } from '@models';
import { OrderManagementService } from '@services';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent extends DestroyableComponent implements OnInit {
    readonly OrderType = OrderType;
    readonly OrderStatus = OrderStatus;

    roaster$ = this.ordersService.estateDetails$;

    orderId: number;
    organizationType: OrgType;
    orderDetails: OrderDetails;

    get needConfirmation(): boolean {
        return (
            this.organizationType === OrgType.MICRO_ROASTER &&
            this.orderDetails &&
            this.orderDetails.status === OrderStatus.Placed
        );
    }

    constructor(private route: ActivatedRoute, private ordersService: OrderManagementService) {
        super();
    }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.unsubscribeAll$)).subscribe((params) => {
            this.orderId = +params.id;
            this.organizationType = params.organizationType;
            this.ordersService.loadOrderDetails(this.orderId, this.organizationType);
            this.ordersService.orderDetails$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((data) => {
                this.orderDetails = data;
            });
        });
    }
}
