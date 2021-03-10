import { Component, Input, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { OrderStatus, OrderType, OrgType } from '@enums';
import { OrderDetails, OrganizationDetails } from '@models';
import { GlobalsService, OrderManagementService } from '@services';
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

    roaster: OrganizationDetails;
    showDetails = true;
    selectedTab = 0;

    @Input() orderId: number;
    @Input() orgType: OrgType;
    @Input() order: OrderDetails;
    @Input() needConfirmation = false;

    constructor(private orderService: OrderManagementService, public globals: GlobalsService) {
        super();
    }

    ngOnInit(): void {
        this.orderService.estateDetails$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res) => (this.roaster = res));
    }
}
