import { Component, Input, OnInit } from '@angular/core';
import { OrganizationType } from '@enums';
import { ChatHandlerService, CommonService } from '@services';

@Component({
    selector: 'app-customer-portal-info',
    templateUrl: './customer-portal-info.component.html',
    styleUrls: ['./customer-portal-info.component.scss'],
})
export class CustomerPortalInfoComponent implements OnInit {
    @Input() data: any;
    @Input() customerID: any;
    @Input() orgType: any;

    constructor(private commonService: CommonService, private chatHandler: ChatHandlerService) {}

    ngOnInit(): void {}

    orgSimulatedLogin() {
        this.commonService.userSimulatedLogin(this.customerID);
    }

    sendMessage() {
        this.chatHandler.openChatThread({
            user_id: this.data.admin_id,
            org_type: this.orgType,
            org_id: this.data.id,
        });
    }
}
