import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ShippingDetails, BulkDetails } from '@models';

@Component({
    selector: 'app-shipping-details',
    templateUrl: './shipping-details.component.html',
    styleUrls: ['./shipping-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingDetailsComponent {
    @Input() shippingDetails: ShippingDetails;
    @Input() bulk: BulkDetails;
}
