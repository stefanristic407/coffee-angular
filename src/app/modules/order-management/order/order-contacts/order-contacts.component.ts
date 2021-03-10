import { Component, Input } from '@angular/core';
import { OrderDetails, OrganizationDetails } from '@models';
import { CommonService } from '@services';

@Component({
    selector: 'app-order-contacts',
    templateUrl: './order-contacts.component.html',
    styleUrls: ['./order-contacts.component.scss'],
})
export class OrderContactsComponent {
    @Input() order: OrderDetails;
    @Input() roaster: OrganizationDetails;

    constructor(public commonService: CommonService) {}
}
