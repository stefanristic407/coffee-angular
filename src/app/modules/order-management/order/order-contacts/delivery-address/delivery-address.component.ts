import { AgmGeocoder } from '@agm/core';
import { Component, Input, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { Address, OrderDetails } from '@models';
import { OrdersService, CommonService } from '@services';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-delivery-address',
    templateUrl: './delivery-address.component.html',
    styleUrls: ['./delivery-address.component.scss'],
})
export class DeliveryAddressComponent extends DestroyableComponent implements OnInit {
    order: OrderDetails;
    latitude: number;
    longitude: number;

    @Input() orderConfirmation = false;

    constructor(
        private geoCoder: AgmGeocoder,
        private orderService: OrdersService,
        public commonService: CommonService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.orderService.orderDetails$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((details) => {
            this.order = details;
            if (this.order && this.order.shippingAddress) {
                const address = this.getAddressLine(this.order.shippingAddress);
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
        return `${country} ${address.zipcode} ${address.state} ${address.addressLine1} ${address.addressLine2}`;
    }
}
