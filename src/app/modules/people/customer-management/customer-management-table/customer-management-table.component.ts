import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { CustomerServiceService } from '../customer-service.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-customer-management-table',
    templateUrl: './customer-management-table.component.html',
    styleUrls: ['./customer-management-table.component.scss'],
})
export class CustomerManagementTableComponent implements OnInit {
    estatetermOrigin: any;
    appLanguage?: any;
    folderId: any;

    @Input() searchTerm = '';
    @Input() sortedMainData: any;
    @Input() customerType: any;

    constructor(
        public router: Router,
        public globals: GlobalsService,
        public cookieService: CookieService,
        public customer: CustomerServiceService,
    ) {}

    ngOnInit(): void {
        this.sortedMainData = '';
        this.estatetermOrigin = '';
        this.language();
    }

    language() {
        this.appLanguage = this.globals.languageJson;
    }

    shareDetails(size: any) {
        if (size.status === 'PENDING') {
            this.customer.emailId = size.email;
            this.customer.pendingMrDetails();
            this.router.navigate(['/people/pending-details']);
        } else {
            this.folderId = size.id;
            const navigationExtras: NavigationExtras = {
                queryParams: {
                    folderId: encodeURIComponent(this.folderId),
                },
            };
            this.router.navigate(['/people/micro-roaster-details'], navigationExtras);
        }
    }
}
