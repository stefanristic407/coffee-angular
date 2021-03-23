import { Component, Input, OnInit } from '@angular/core';
import { DestroyableComponent, ResizeableComponent } from '@base-components';
import { OrderStatus, OrderType, OrganizationType } from '@enums';
import { OrderDetails, OrganizationDetails } from '@models';
import { GlobalsService, ResizeService } from '@services';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent extends ResizeableComponent implements OnInit {
    readonly OrderType = OrderType;
    readonly OrderStatus = OrderStatus;
    readonly bulk$ = this.orderService.bulkDetails$;

    roaster: OrganizationDetails;
    showDetails = true;
    selectedTab = 0;
    isMobile = true;

    @Input() orderId: number;
    @Input() orgType: OrganizationType;
    @Input() order: OrderDetails;
    @Input() needConfirmation = false;

    constructor(
        private resizeSrv: ResizeService,
        private orderService: OrderManagementService,
        public globals: GlobalsService,
    ) {
        super(resizeSrv);
    }

    ngOnInit(): void {
        this.orderService.estateDetails$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe({ next: (res) => (this.roaster = res) });
        this.isMobile$.pipe(takeUntil(this.unsubscribeAll$)).subscribe({ next: (res) => (this.isMobile = res) });
    }
}
