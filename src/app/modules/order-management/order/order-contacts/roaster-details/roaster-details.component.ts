import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrgType } from '@enums';

@Component({
    selector: 'app-roaster-details',
    templateUrl: './roaster-details.component.html',
    styleUrls: ['./roaster-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoasterDetailsComponent {
    @Input() companyImageThumbnailUrl: string;
    @Input() ownerName: string;
    @Input() rating: number;
    @Input() orgType: OrgType;
    @Input() orderId: number;
}
