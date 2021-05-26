import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalsService } from '@services';
import { ActivatedRoute } from '@angular/router';
import { CustomerServiceService } from '../customer-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { ImportantContactsComponent } from '../important-contacts/important-contacts.component';

@Component({
    selector: 'app-horeca-details',
    templateUrl: './horeca-details.component.html',
    styleUrls: ['./horeca-details.component.scss'],
})
export class HorecaDetailsComponent implements OnInit {
    appLanguage?: any;
    roasterId: any;
    showTable = '';
    customerType = 'hrc';
    @ViewChild(ImportantContactsComponent) importantContact;
    constructor(
        public globals: GlobalsService,
        private route: ActivatedRoute,
        public customerService: CustomerServiceService,
        public cookieService: CookieService,
        public location: Location,
    ) {
        this.route.queryParams.subscribe((params: any) => {
            this.customerService.horecaId = params.itemId;
            this.showTable = params.showTable;
            this.customerService.hrcCustomerDetails();
        });
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.appLanguage = this.globals.languageJson;
    }

    getCustomerType(value) {
        this.importantContact.horecaEmployees();
    }
}
