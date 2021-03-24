import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
import { ChatHandlerService } from '@services';
import { OrganizationType } from '@enums';
import { SourcingService } from '@app/modules/sourcing/sourcing.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-details-user',
    templateUrl: './details-user.component.html',
    styleUrls: ['./details-user.component.scss'],
})
export class DetailsUserComponent implements OnInit {
    constructor(
        public customerService: CustomerServiceService,
        public sourcing: SourcingService,
        private chatHandler: ChatHandlerService,
        private cookieService: CookieService,
    ) {}

    ngOnInit(): void {}

    openChat(): void {
        this.chatHandler.openChatThread({
            user_id: parseInt(this.customerService.admin_id, 10),
            org_type: OrganizationType.ESTATE,
            org_id: parseInt(this.cookieService.get('roaster_id'), 10),
        });
    }
}
