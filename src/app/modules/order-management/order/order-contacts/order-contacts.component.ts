import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { OrderDetails, OrganizationDetails } from '@models';
import { CommonService } from '@services';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-order-contacts',
    templateUrl: './order-contacts.component.html',
    styleUrls: ['./order-contacts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderContactsComponent {
    readonly OrgType = OrganizationType;

    @Input() order: OrderDetails;
    @Input() roaster: OrganizationDetails;
    @Input() orgType: OrganizationType;

    constructor(public commonService: CommonService) {}
}
