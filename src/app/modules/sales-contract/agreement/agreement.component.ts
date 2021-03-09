// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  Orders List,Search and Filters.

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-agreement',
    templateUrl: './agreement.component.html',
    styleUrls: ['./agreement.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AgreementComponent implements OnInit {
    appLanguage: any;
    searchTerm: any;
    customerType: string;
    roasterId: string;
    mainData: any;
    navItems: MenuItem[];
    selectedNav: MenuItem;

    constructor(
        public router: Router,
        public cookieService: CookieService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public globals: GlobalsService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        // Auth checking
        if (this.cookieService.get('Auth') === '') {
            this.router.navigate(['/auth/login']);
        }
        this.customerType = 'hrc';
        this.navItems = [
            { label: this.globals.languageJson?.agreements }
        ];

        this.selectedNav = { label: this.globals.languageJson?.home, routerLink: '/' };
        this.language();
    }

    language() {
        this.appLanguage = this.globals.languageJson;
    }

    // Function Name: Tab Change
    // Description: This function helps to set customer type on tab change.

    onTabChange(event) {
        if (event.index === 0) {
            this.customerType = 'hrc';
        } else if (event.index === 1) {
            this.customerType = 'micro-roasters';
        }
    }
}
