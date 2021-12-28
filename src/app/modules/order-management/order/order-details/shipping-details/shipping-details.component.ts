import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BulkDetails, ShippingDetails } from '@models';

@Component({
    selector: 'app-shipping-details',
    templateUrl: './shipping-details.component.html',
    styleUrls: ['./shipping-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingDetailsComponent {
    @Input() isFullyServicedDelivery: boolean;
    @Input() shippingDetails: ShippingDetails;
    @Input() bulk: BulkDetails;
}
