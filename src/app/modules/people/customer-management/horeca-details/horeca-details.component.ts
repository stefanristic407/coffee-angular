import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { ActivatedRoute } from '@angular/router';
import { CustomerServiceService } from '../customer-service.service';
import { UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-horeca-details',
    templateUrl: './horeca-details.component.html',
    styleUrls: ['./horeca-details.component.scss'],
})
export class HorecaDetailsComponent implements OnInit {
    appLanguage?: any;
    roasterId: any;
    hrContacts: any;

    constructor(
        public globals: GlobalsService,
        private route: ActivatedRoute,
        public customerService: CustomerServiceService,
        private userService: UserserviceService,
        public cookieService: CookieService,
        private toastrService: ToastrService,
    ) {
        this.route.queryParams.subscribe((params: any) => {
            this.customerService.horecaId = params.itemId;
            this.customerService.hrcCustomerDetails();
            // this.horecaEmployees();
        });
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        $('.btn-toggle').click(() => {
            $(this).find('.btn').toggleClass('active');
            $(this).find('.btn').toggleClass('active_default');
            $(this).find('.btn').toggleClass('disable_default');
        });
        this.appLanguage = this.globals.languageJson;
    }
}
