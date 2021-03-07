import { Component, Input, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { OrderStatus, OrderType } from '@enums';
import { OrderDetails, RoasterDetails } from '@models';
import { GlobalsService, OrdersService } from '@services';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent extends DestroyableComponent implements OnInit {
    readonly OrderType = OrderType;
    readonly OrderStatus = OrderStatus;
    readonly bulk$ = this.orderService.bulkDetails$;

    roaster: RoasterDetails;
    showDetails = true;

    @Input() orderId: number;
    @Input() order: OrderDetails;

    constructor(private orderService: OrdersService, public globals: GlobalsService) {
        super();
    }

    ngOnInit(): void {
        this.orderService.roasterDetails$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((res) => (this.roaster = res));
    }
}
