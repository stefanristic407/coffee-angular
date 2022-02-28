import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { OrderStatus, OrderType, OrganizationType, PaymentStatus } from '@enums';
import { OrderDetails, OrganizationDetails, OrganizationProfile } from '@models';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent extends DestroyableComponent implements OnInit {
    readonly OrderType = OrderType;
    readonly OrderStatus = OrderStatus;
    readonly PaymentStatus = PaymentStatus;

    readonly lotDetails$ = this.ordersService.lotDetails$.pipe(takeUntil(this.unsubscribeAll$));

    roaster$: Observable<OrganizationProfile | OrganizationDetails>;
    orderId = 0;
    organizationType = OrganizationType.ESTATE;
    orderDetails: OrderDetails;
    loading = true;

    get needConfirmation(): boolean {
        return (
            this.organizationType === OrganizationType.MICRO_ROASTER &&
            this.orderDetails &&
            this.orderDetails.status === OrderStatus.Placed
        );
    }

    get isPrebook(): boolean {
        return this.orderDetails && this.orderDetails.order_type === OrderType.Prebook;
    }

    get isEstateOrder(): boolean {
        return this.organizationType === OrganizationType.ESTATE;
    }

    constructor(private router: Router, private route: ActivatedRoute, private ordersService: OrderManagementService) {
        super();
    }

    ngOnInit(): void {
        this.ordersService.clearData();
        this.route.params.pipe(takeUntil(this.unsubscribeAll$)).subscribe((params) => {
            this.orderId = +params.id;
            this.organizationType = params.orgType;

            if (
                this.organizationType !== OrganizationType.ESTATE &&
                this.organizationType !== OrganizationType.MICRO_ROASTER
            ) {
                this.router.navigateByUrl('/orders/es');
            }

            this.roaster$ = this.ordersService
                .getOrgProfile(this.organizationType)
                .pipe(takeUntil(this.unsubscribeAll$));
            this.loading = true;
            new Promise((resolve, reject) =>
                this.ordersService.loadOrderDetails(this.orderId, this.organizationType, false, resolve, reject),
            )
                .then(() => {
                    this.loading = false;
                })
                .catch(() => {
                    this.router.navigate([`/orders/${this.organizationType}`]);
                });
            this.ordersService.orderDetails$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((data) => {
                this.orderDetails = data;
            });
        });
    }
}
