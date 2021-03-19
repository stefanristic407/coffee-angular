import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from '../customer-service.service';
import { UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-micro-roaster-details',
    templateUrl: './micro-roaster-details.component.html',
    styleUrls: ['./micro-roaster-details.component.scss'],
})
export class MicroRoasterDetailsComponent implements OnInit {
    appLanguage?: any;
    roasterId: string;
    listData: any;
    mrContacts: any;

    constructor(
        public globals: GlobalsService,
        private route: ActivatedRoute,
        public customer: CustomerServiceService,
        private userService: UserserviceService,
        private toastrService: ToastrService,
        public cookieService: CookieService,
        private router: Router,
    ) {
        this.route.queryParams.subscribe((params: any) => {
            this.customer.microId = params.folderId;
            this.customer.mrCustomerDetails();
            this.getCerificatesList();
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

    getCerificatesList() {
        this.userService.getMicroroasterCertificates(this.customer.microId).subscribe((res: any) => {
            if (res.success) {
                this.listData = res.result;
                console.log(this.listData);
            }
        });
    }
    viewCertificate(data: any) {
        const a = document.createElement('a');
        a.href = data.public_url;
        a.download = data.name;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
