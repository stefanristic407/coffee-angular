import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderDetails } from '@models';
import { CommonService } from '@services';
import { trimCharRight } from '@utils';
import { OrderType } from '@enums';

@Component({
    selector: 'app-lot-details',
    templateUrl: './lot-details.component.html',
    styleUrls: ['./lot-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LotDetailsComponent {
    readonly OrderType = OrderType;

    @Input() lot: OrderDetails;

    get quantity(): string {
        if (this.lot && this.lot.quantity && this.lot.quantity_count) {
            return `${this.lot.quantity_count} ${this.lot.quantity_type} x ${this.lot.quantity} kg`;
        }

        return '';
    }

    constructor(public commonService: CommonService) {}
}
