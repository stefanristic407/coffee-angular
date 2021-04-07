import { ChatHandlerService, GlobalsService } from '@services';
import { Component, OnInit } from '@angular/core';
import {} from '@services';
import { SourcingService } from '../../sourcing.service';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
    brandProfileEstateWeb = 'https://qa-brand-profile.sewnstaging.com/estatebrandprofile/green-coffee';

    constructor(public globals: GlobalsService, public sourcing: SourcingService, public chatSrv: ChatHandlerService) {}

    ngOnInit(): void {}

    message(userId: number) {
        this.chatSrv.openChatThread({
            user_id: userId,
            org_type: OrganizationType.ESTATE,
            org_id: +this.sourcing.estateId,
        });
    }
}
