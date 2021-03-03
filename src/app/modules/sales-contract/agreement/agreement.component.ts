// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  Orders List,Search and Filters.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-agreement',
    templateUrl: './agreement.component.html',
    styleUrls: ['./agreement.component.scss'],
})
export class AgreementComponent implements OnInit {
    appLanguage: any;
    searchTerm: any;
    customerType: string;
    roasterId: string;
    mainData: any;

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
        this.language();
    }

    language() {
        this.appLanguage = this.globals.languageJson;
    }

    // Function Name: Navbar Change
    // Description: This function helps to send customer type roaster-agreement on navbar change.

    onNavChange(value: string): void {
        this.customerType = value;
    }
}
