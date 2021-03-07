import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { OrderStatus, OrderType } from '@enums';
import { OrderDetails } from '@models';
import { OrdersService } from '@services';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent extends DestroyableComponent implements OnInit {
    readonly OrderType = OrderType;
    readonly OrderStatus = OrderStatus;

    roaster$ = this.ordersService.roasterDetails$;

    orderId: number;
    organizationType: string;
    orderDetails: OrderDetails;

    constructor(private route: ActivatedRoute, private ordersService: OrdersService) {
        super();
    }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.unsubscribeAll$)).subscribe((params) => {
            this.orderId = +params.id;
            this.organizationType = params.organizationType;
            this.ordersService.loadOrderDetails(this.orderId);
            this.ordersService.orderDetails$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((data) => {
                this.orderDetails = data;
            });
        });
    }
}
