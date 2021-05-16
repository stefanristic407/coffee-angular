import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsService } from '@services';
import { UserserviceService } from '@services';
import { MenuItem } from 'primeng/api';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-roaster-quick-setup',
    templateUrl: './roaster-quick-setup.component.html',
    styleUrls: ['./roaster-quick-setup.component.scss'],
})
export class RoasterQuickSetupComponent implements OnInit {
    appLanguage?: any;
    roasterId: any;
    headerValue: string;
    sendInviteButton: any = 'Send Invites';
    companyTypeList = [
        { label: 'Hotel', value: 'Hotel' },
        { label: 'Cafe', value: 'Cafe' },
        { label: 'Restaurant', value: 'Restaurant' },
        { label: 'Bar', value: 'Bar' },
    ];
    inviteFormArray = new FormArray([]);
    navItems: MenuItem[];
    selectedNav: MenuItem;

    constructor(
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private router: Router,
        private toastrService: ToastrService,
        public route: ActivatedRoute,
        public userService: UserserviceService,
        public globals: GlobalsService,
        private fb: FormBuilder,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        if (this.cookieService.get('Auth') === '') {
            this.router.navigate(['/auth/login']);
        }
        this.inviteFormArray.push(
            new FormGroup({
                name: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required, Validators.email]),
                type: new FormControl(''),
            }),
        );
        this.headerValue = decodeURIComponent(this.route.snapshot.queryParams.buttonValue);
        this.appLanguage = this.globals.languageJson;
        this.navItems = [
            { label: 'Customer onboarding', routerLink: '/people/customer-management' },
            { label: `Invite  ${this.headerValue}` },
        ];
        this.selectedNav = { label: this.globals.languageJson?.home, routerLink: '/' };
    }

    addNewRow(): void {
        this.inviteFormArray.push(
            new FormGroup({
                name: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required, Validators.email]),
                type: new FormControl(),
            }),
        );
    }

    removeRow(index: number): void {
        this.inviteFormArray.controls.splice(index, 1);
        this.inviteFormArray.value.splice(index, 1);
        this.inviteFormArray.updateValueAndValidity();
    }

    sendInvite() {
        this.sendInviteButton = 'Sending';
        if (this.headerValue === 'Micro-Roaster') {
            this.globals.userInvitesArray = [];
            if (this.inviteFormArray.length > 0) {
                this.inviteFormArray.controls.forEach((item: any) => {
                    this.userService
                        .sendMicroRoasterInvite(this.roasterId, item.value.email, item.value.name)
                        .subscribe((data: any) => {
                            if (data.success) {
                                this.globals.userInvitesArray.push(item.value.email);
                                this.sendInviteButton = 'Send Invites';
                                this.toastrService.success('Email has been sent successfully');
                                this.router.navigate(['/features/success-mail']);
                            } else {
                                this.sendInviteButton = 'Send Invites';
                                this.toastrService.error('Error while sending email to the User');
                            }
                        });
                });
            }
        } else if (this.headerValue === 'HoReCa') {
            this.globals.userInvitesArray = [];
            if (this.inviteFormArray.length > 0) {
                this.inviteFormArray.controls.forEach((item: any) => {
                    this.userService
                        .sendHorecaInvite(this.roasterId, item.value.email, item.value.name, item.value.type)
                        .subscribe((data: any) => {
                            if (data.success) {
                                this.globals.userInvitesArray.push(item.value.email);
                                this.sendInviteButton = 'Send Invites';
                                this.toastrService.success('Email has been sent successfully');
                                this.router.navigate(['/features/success-mail']);
                            } else {
                                this.sendInviteButton = 'Send Invites';
                                this.toastrService.error('Error while sending email to the User');
                            }
                        });
                });
            }
        }
    }
}
