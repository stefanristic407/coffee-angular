import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { OrderType, OrganizationType } from '@enums';
import { OrderDetails } from '@models';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { CommonService } from '@services';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-lot-details',
    templateUrl: './lot-details.component.html',
    styleUrls: ['./lot-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LotDetailsComponent extends DestroyableComponent implements OnInit, OnDestroy {
    readonly OrderType = OrderType;
    readonly OrgType = OrganizationType;
    bulkSubscription: Subscription;
    avilablity: any;

    @Input() lot: OrderDetails;
    @Input() orgType: OrganizationType;

    get quantity(): string {
        if (this.lot && this.lot.quantity && this.lot.quantity_count) {
            return `${this.lot.quantity_count} ${this.lot.quantity_type} x ${this.lot.quantity} kg`;
        }

        return '';
    }

    constructor(
        public commonService: CommonService,
        private orderManagementService: OrderManagementService,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
        super();
    }

    ngOnInit(): void {
        this.bulkSubscription = this.orderManagementService.bulkDetails$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((data) => {
                this.avilablity = data;
                this.changeDetectorRef.detectChanges();
            });
    }
}
