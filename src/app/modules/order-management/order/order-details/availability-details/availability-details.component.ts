import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BulkDetails } from '@models';

@Component({
    selector: 'app-availability-details',
    templateUrl: './availability-details.component.html',
    styleUrls: ['./availability-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailabilityDetailsComponent {
    @Input() bulk: BulkDetails;
    @Input() estateId: number;
    @Input() harvestId: number;
}
