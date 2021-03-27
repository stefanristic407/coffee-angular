import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChatHandlerService, UserserviceService } from '@services';
import { CustomerServiceService } from '../customer-service.service';
import { OrganizationType } from '@enums';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-important-contacts',
    templateUrl: './important-contacts.component.html',
    styleUrls: ['./important-contacts.component.scss'],
})
export class ImportantContactsComponent implements OnInit, OnChanges {
    @Input() customerType: any;
    hrContacts: any;
    orgType: any;
    constructor(
        public customerService: CustomerServiceService,
        private userService: UserserviceService,
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
    ngOnChanges(): void {
        this.horecaEmployees();
    }

    ngOnInit(): void {}

    horecaEmployees() {
        if (this.customerType === 'hrc') {
            this.userService.getHorecaContacts(this.customerService.horecaId).subscribe((res: any) => {
                if (res.success) {
                    this.hrContacts = res.result;
                }
            });
        } else if (this.customerType === 'micro-roasters') {
            this.userService.getMicroroasterContacts(this.customerService.microId).subscribe((res: any) => {
                if (res.success) {
                    this.hrContacts = res.result;
                }
            });
        }
    }

    openChat(userId: number): void {
        this.chatHandler.openChatThread({
            user_id: userId,
            org_type: this.orgType,
            org_id: parseInt(this.cookieService.get('roaster_id'), 10),
        });
    }
}
