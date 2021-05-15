import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
import { ChatHandlerService, CommonService } from '@services';
import { OrganizationType } from '@enums';
import { SourcingService } from '@app/modules/sourcing/sourcing.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-details-user',
    templateUrl: './details-user.component.html',
    styleUrls: ['./details-user.component.scss'],
})
export class DetailsUserComponent implements OnInit {
    readonly OrgType = OrganizationType;
    orgType: any;

    constructor(
        public customerService: CustomerServiceService,
        public sourcing: SourcingService,
        private chatHandler: ChatHandlerService,
        private cookieService: CookieService,
        private activatedRoute: ActivatedRoute,
    ) {
        if (this.activatedRoute.snapshot.routeConfig.path === 'micro-roaster-details') {
            this.orgType = OrganizationType.MICRO_ROASTER;
        } else if (this.activatedRoute.snapshot.routeConfig.path === 'horeca-details') {
            this.orgType = OrganizationType.HORECA;
        }
    }

    ngOnInit(): void {}

    openChat(): void {
        this.chatHandler.openChatThread({
            user_id: parseInt(this.customerService.admin_id, 10),
            org_type: this.orgType,
            org_id: Number(this.cookieService.get('roaster_id')),
        });
    }

    simulatedLogin() {
        this.customerService.customerSimulatedLogin(
            this.orgType,
            this.orgType === OrganizationType.HORECA ? this.customerService.horecaId : this.customerService.microId,
        );
    }
}
