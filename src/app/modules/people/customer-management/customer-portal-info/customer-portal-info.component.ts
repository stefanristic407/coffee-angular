import { Component, Input, OnInit } from '@angular/core';
import { OrganizationType, UserStatus } from '@enums';
import { ChatHandlerService } from '@services';
import { CustomerServiceService } from '../customer-service.service';

@Component({
    selector: 'app-customer-portal-info',
    templateUrl: './customer-portal-info.component.html',
    styleUrls: ['./customer-portal-info.component.scss'],
})
export class CustomerPortalInfoComponent implements OnInit {
    readonly UserStatus = UserStatus;
    @Input() data: any;
    @Input() customerID: number;
    @Input() orgType: OrganizationType;

    constructor(private customerService: CustomerServiceService, private chatHandler: ChatHandlerService) {}

    ngOnInit(): void {}

    orgSimulatedLogin() {
        this.customerService.customerSimulatedLogin(this.orgType, this.customerID);
    }

    sendMessage() {
        this.chatHandler.openChatThread({
            user_id: this.data.admin_id,
            org_type: this.orgType,
            org_id: this.data.id,
        });
    }
}
