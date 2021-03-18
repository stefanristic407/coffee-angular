import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsService } from '@services';
import { EmailService, UserserviceService } from '@services';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-roaster-quick-setup',
    templateUrl: './roaster-quick-setup.component.html',
    styleUrls: ['./roaster-quick-setup.component.scss'],
})
export class RoasterQuickSetupComponent implements OnInit {
    appLanguage?: any;
    roasterId: any;
    inviteActive: any = 0;
    headerValue: string;
    sendInviteButton: any = 'Send Invites';
    companyTypeList = [
        { label: 'Hotel', value: 'Hotel' },
        { label: 'Cafe', value: 'Cafe' },
        { label: 'Restaurant', value: 'Restaurant' },
        { label: 'Bar', value: 'Bar' },
    ];
    addUser = [{ name: '', email: '', type: '' }];
    navItems: MenuItem[];
    selectedNav: MenuItem;

    constructor(
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private router: Router,
        private toastrService: ToastrService,
        public route: ActivatedRoute,
        private emailService: EmailService,
        public userService: UserserviceService,
        public globals: GlobalsService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        if (this.cookieService.get('Auth') === '') {
            this.router.navigate(['/auth/login']);
        }
        this.headerValue = decodeURIComponent(this.route.snapshot.queryParams.buttonValue);
        this.appLanguage = this.globals.languageJson;
        this.navItems = [{ label: this.globals.languageJson?.people }, { label: 'Customer onboarding' }];
        this.selectedNav = { label: this.globals.languageJson?.home, routerLink: '/' };
    }

    public addNewRow() {
        this.addUser.push({
            name: '',
            email: '',
            type: '',
        });
    }

    public deleteRow(index) {
        this.addUser.splice(index, 1);
    }

    private validateInput(data) {
        // const email_variable = data[0].email;
        let flag = true;

        if (this.headerValue === 'Micro-Roaster') {
            if (data && data.length) {
                data.forEach((ele) => {
                    if (ele.name === '' || ele.email === '') {
                        flag = false;
                    }
                });
            }
        }

        if (this.headerValue === 'HoReCa') {
            if (data && data.length) {
                data.forEach((ele) => {
                    if (ele.name === '' || ele.email === '' || ele.type === '') {
                        flag = false;
                    }
                });
            }
        }

        return flag;
    }

    sendInvite() {
        this.sendInviteButton = 'Sending';

        let flag = true;
        const input = this.addUser;
        console.log(input);
        flag = this.validateInput(input);

        if (this.headerValue === 'Micro-Roaster') {
            this.globals.userInvitesArray = [];
            if (flag) {
                this.addUser.forEach((element) => {
                    this.userService
                        .sendMicroRoasterInvite(this.roasterId, element.email, element.name)
                        .subscribe((data: any) => {
                            if (data.success) {
                                // this.inviteSent = 1;
                                // console.log(data);
                                // console.log(
                                //     'https://qa-micro-roaster.sewnstaging.com/auth/setup?token=' + data['result'].token,
                                // );
                                const body = {
                                    name: element.name,
                                    portal: this.headerValue,
                                    content_type: 'invite_with_url',
                                    senders: [element.email],
                                    url:
                                        'https://qa-micro-roaster.sewnstaging.com/auth/setup?token=' +
                                        data.result.token,
                                };
                                this.emailService.sendEmail(body).subscribe((res) => {
                                    if (res.status === '200 OK') {
                                        this.globals.userInvitesArray.push(element.email);
                                        this.sendInviteButton = 'Send Invites';
                                        this.toastrService.success('Email has been sent successfully');
                                        this.router.navigate(['/features/success-mail']);
                                    } else {
                                        this.sendInviteButton = 'Send Invites';
                                        this.toastrService.error('Error while sending email to the User');
                                    }
                                });
                            } else {
                                console.log(data);
                                this.sendInviteButton = 'Send Invites';
                                this.toastrService.error('Error while sending email to the User');
                            }
                        });
                });
            }
        } else if (this.headerValue === 'HoReCa') {
            this.globals.userInvitesArray = [];
            if (flag) {
                this.addUser.forEach((element) => {
                    this.userService
                        .sendHorecaInvite(this.roasterId, element.email, element.name, element.type)
                        .subscribe((data: any) => {
                            if (data.success) {
                                console.log(data);
                                console.log(
                                    'https://qa-client-horeca.sewnstaging.com/auth/horeca-setup?token=' +
                                        data.result.token,
                                );
                                const body = {
                                    name: element.name,
                                    portal: this.headerValue,
                                    content_type: 'invite_with_url',
                                    senders: [element.email],
                                    url:
                                        'https://qa-client-horeca.sewnstaging.com/auth/horeca-setup?token=' +
                                        data.result.token,
                                };
                                this.emailService.sendEmail(body).subscribe((res) => {
                                    if (res.status === '200 OK') {
                                        this.globals.userInvitesArray.push(element.email);
                                        this.sendInviteButton = 'Send Invites';
                                        this.toastrService.success('Email has been sent successfully');
                                        this.router.navigate(['/features/success-mail']);
                                    } else {
                                        this.sendInviteButton = 'Send Invites';
                                        this.toastrService.error('Error while sending email to the User');
                                    }
                                });
                            } else {
                                console.log(data);
                                this.sendInviteButton = 'Send Invites';
                                this.toastrService.error('Error while sending email to the User');
                            }
                        });
                });
            }
        }
    }
}
