import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BulkDetails } from '@models';

@Component({
    selector: 'app-bulk-details',
    templateUrl: './bulk-details.component.html',
    styleUrls: ['./bulk-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkDetailsComponent {
    @Input() bulk: BulkDetails;
}
