import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { CustomerServiceService } from '../customer-service.service';
import { NavigationExtras, Router } from '@angular/router';
import { OrganizationType, UserStatus } from '@enums';

@Component({
    selector: 'app-customer-management-table',
    templateUrl: './customer-management-table.component.html',
    styleUrls: ['./customer-management-table.component.scss'],
})
export class CustomerManagementTableComponent implements OnInit {
    readonly OrgType = OrganizationType;
    readonly UserStatus = UserStatus;
    estatetermOrigin: any;
    appLanguage?: any;
    folderId: any;

    @Input() searchTerm = '';
    @Input() sortedMainData: any;
    @Input() customerType: OrganizationType;
    @Input() isPartners: boolean;
    itemId: any;

    constructor(
        public router: Router,
        public globals: GlobalsService,
        public cookieService: CookieService,
        public customer: CustomerServiceService,
    ) {}

    ngOnInit(): void {
        this.estatetermOrigin = '';
        this.language();
    }

    language() {
        this.appLanguage = this.globals.languageJson;
    }

    shareDetails(size: any) {
        if (size.status === 'PENDING') {
            this.customer.emailId = size.email;
            if (this.customerType === OrganizationType.MICRO_ROASTER) {
                this.customer.pendingMrDetails();
            } else {
                this.customer.pendingHorecaDetails();
            }
            this.router.navigate(['/people/pending-details']);
        } else {
            const navigationExtras: NavigationExtras = {
                queryParams: {
                    type: this.customerType,
                },
            };
            this.router.navigate([`/people/customer-details/${size.id}`], navigationExtras);
        }
    }

    stimulatedLogin(org) {
        if (org.status === UserStatus.ACTIVE) {
            this.customer.customerSimulatedLogin(this.customerType, org.id);
        }
    }
}
