import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderDetails } from '@core/models';
import { CommonService } from '@core/services';
import { trimCharRight } from '@core/utils';

@Component({
    selector: 'app-lot-details',
    templateUrl: './lot-details.component.html',
    styleUrls: ['./lot-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LotDetailsComponent {
    @Input() lot: OrderDetails;

    get quantity(): string {
        if (this.lot && this.lot.quantity) {
            return `${this.lot.quantity} ${this.lot.quantityType}`;
        }

        return '';
    }

    get quantityType(): string {
        if (this.lot && this.lot.quantityType) {
            return trimCharRight(this.lot.quantityType, 's'); // TODO
        }

        return 'KG';
    }

    constructor(public commonService: CommonService) {}
}
