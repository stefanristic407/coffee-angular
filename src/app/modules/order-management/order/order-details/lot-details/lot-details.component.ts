import { Subscription } from 'rxjs';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { OrderDetails } from '@models';
import { CommonService } from '@services';
import { OrderType, OrganizationType } from '@enums';
import { CURRENCY_LIST } from '@constants';

@Component({
    selector: 'app-lot-details',
    templateUrl: './lot-details.component.html',
    styleUrls: ['./lot-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LotDetailsComponent implements OnInit, OnDestroy {
    readonly OrderType = OrderType;
    public readonly CURRENCY_LIST = CURRENCY_LIST;
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
    ) {}
    ngOnInit(): void {
        this.bulkSubscription = this.orderManagementService.bulkDetails$.subscribe((data) => {
            console.log('avilablity', data);
            this.avilablity = data;
            this.changeDetectorRef.detectChanges();
        });
    }
    ngOnDestroy(): void {
        if (this.bulkSubscription && this.bulkSubscription.unsubscribe) {
            this.bulkSubscription.unsubscribe();
        }
    }
}
