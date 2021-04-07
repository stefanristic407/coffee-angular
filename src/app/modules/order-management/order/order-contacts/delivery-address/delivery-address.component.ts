import { AgmGeocoder } from '@agm/core';
import { Component, Input, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { Address, OrderDetails } from '@models';
import { CommonService } from '@services';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { takeUntil } from 'rxjs/operators';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-delivery-address',
    templateUrl: './delivery-address.component.html',
    styleUrls: ['./delivery-address.component.scss'],
})
export class DeliveryAddressComponent extends DestroyableComponent implements OnInit {
    readonly OrgType = OrganizationType;

    order: OrderDetails;
    latitude: number;
    longitude: number;

    @Input() orderConfirmation = false;
    @Input() orgType: OrganizationType;

    constructor(
        private geoCoder: AgmGeocoder,
        private orderService: OrderManagementService,
        public commonService: CommonService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.orderService.orderDetails$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((details) => {
            this.order = details;
            if (this.order && this.order.shipping_address) {
                const address = this.getAddressLine(this.order.shipping_address);
                this.geoCoder
                    .geocode({ address })
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((results) => {
                        this.latitude = results[0].geometry.location.lat();
                        this.longitude = results[0].geometry.location.lng();
                    });
            }
        });
    }

    private getAddressLine(address: Address): string {
        const country = this.commonService.getCountryName(address.country);
        return `${country} ${address.zipcode} ${address.state} ${address.address_line1} ${address.address_line2}`;
    }
}
