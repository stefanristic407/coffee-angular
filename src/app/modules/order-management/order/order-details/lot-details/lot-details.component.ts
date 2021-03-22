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
        if (this.lot && this.lot.quantity) {
            return `${this.lot.quantity} ${this.lot.quantity_type}`;
        }

        return '';
    }

    get quantityType(): string {
        if (this.lot && this.lot.quantity_type) {
            return trimCharRight(this.lot.quantity_type, 's'); // TODO
        }

        return 'KG';
    }

    constructor(public commonService: CommonService) {}
}
