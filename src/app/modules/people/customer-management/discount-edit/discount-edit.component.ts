import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { CustomerServiceService } from '../customer-service.service';
import { EmailService, UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-discount-edit',
    templateUrl: './discount-edit.component.html',
    styleUrls: ['./discount-edit.component.scss'],
})
export class DiscountEditComponent implements OnInit {
    appLanguage?: any;
    roasterId: string;

    constructor(
        public globals: GlobalsService,
        public customerService: CustomerServiceService,
        public userService: UserserviceService,
        private emailService: EmailService,
        public cookieService: CookieService,
        private toastrService: ToastrService,
        public route: ActivatedRoute,
        private router: Router,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.appLanguage = this.globals.languageJson;
    }

    resendInvite() {
        if (this.customerService.headerValue === 'Micro-Roaster') {
            this.userService
                .sendMicroRoasterInvite(
                    this.roasterId,
                    this.customerService.pendingEmail,
                    this.customerService.pendingCompany,
                )
                .subscribe((data: any) => {
                    if (data.success) {
                        const body = {
                            name: this.customerService.pendingCompany,
                            portal: this.customerService.headerValue,
                            content_type: 'invite_with_url',
                            senders: [this.customerService.pendingEmail],
                            url: 'https://qa-micro-roaster.sewnstaging.com/auth/setup?token=' + data.result.token,
                        };
                        this.emailService.sendEmail(body).subscribe((res) => {
                            if (res.status === '200 OK') {
                                this.toastrService.success('Email has been sent successfully');
                                this.router.navigate(['/people/customer-management']);
                            } else {
                                this.toastrService.error('Error while sending email to the User');
                            }
                        });
                    } else {
                        this.toastrService.error('Error while sending email to the User');
                    }
                });
        } else if (this.customerService.headerValue === 'HoReCa') {
            this.userService
                .sendHorecaInvite(
                    this.roasterId,
                    this.customerService.pendingEmail,
                    this.customerService.pendingCompany,
                    this.customerService.pendingType,
                )
                .subscribe((data: any) => {
                    if (data.success) {
                        const body = {
                            name: this.customerService.pendingCompany,
                            portal: this.customerService.headerValue,
                            content_type: 'invite_with_url',
                            senders: [this.customerService.pendingEmail],
                            url:
                                'https://qa-client-horeca.sewnstaging.com/auth/horeca-setup?token=' + data.result.token,
                        };
                        this.emailService.sendEmail(body).subscribe((res) => {
                            if (res.status === '200 OK') {
                                this.toastrService.success('Email has been sent successfully');
                                this.router.navigate(['/people/customer-management']);
                            } else {
                                this.toastrService.error('Error while sending email to the User');
                            }
                        });
                    } else {
                        this.toastrService.error('Error while sending email to the User');
                    }
                });
        }
    }
}
