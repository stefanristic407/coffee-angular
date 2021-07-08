import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService, GlobalsService, RoasterserviceService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-roaster-quick-setup',
    templateUrl: './roaster-quick-setup.component.html',
    styleUrls: ['./roaster-quick-setup.component.scss'],
})
export class RoasterQuickSetupComponent implements OnInit {
    readonly OrgType = OrganizationType;
    inviteStatus: '' | 'SENDING' | 'SUCCESS' = '';
    roasterId: any;
    orgType: OrganizationType;
    companyTypeList = [
        { label: 'Hotel', value: 'Hotel' },
        { label: 'Cafe', value: 'Cafe' },
        { label: 'Restaurant', value: 'Restaurant' },
        { label: 'Bar', value: 'Bar' },
    ];
    inviteFormArray = new FormArray([]);
    navItems: MenuItem[];
    selectedNav: MenuItem;
    userInvitesArray: string[] = [];

    constructor(
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private toastrService: ToastrService,
        public route: ActivatedRoute,
        private router: Router,
        public userService: UserService,
        public globals: GlobalsService,
        private fb: FormBuilder,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.has('orgType')) {
            this.orgType = decodeURIComponent(this.route.snapshot.paramMap.get('orgType')) as OrganizationType;
        } else {
            this.router.navigateByUrl('/');
        }
        this.addNewRow();
        this.navItems = [
            { label: this.globals.languageJson?.menu_sales_management },
            { label: this.globals.languageJson?.customer_management, routerLink: '/people/customer-management' },
            {
                label: `Invite  ${
                    this.orgType === OrganizationType.MICRO_ROASTER
                        ? 'Micro-Roaster'
                        : this.globals.languageJson?.roasted_coffee_customers
                }`,
            },
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
        this.inviteStatus = 'SENDING';
        const promises: any[] = [];
        this.inviteFormArray.controls.forEach((element) => {
            if (!this.userInvitesArray.some((item) => item === element.value.email)) {
                promises.push(
                    new Promise((resolve, reject) => {
                        if (this.orgType === OrganizationType.MICRO_ROASTER) {
                            return this.userService
                                .sendMicroRoasterInvite(this.roasterId, element.value.email, element.value.name)
                                .subscribe((res: any) => {
                                    if (res.success) {
                                        this.userInvitesArray.push(element.value.email);
                                        resolve(res);
                                    } else {
                                        reject();
                                    }
                                });
                        } else if (this.orgType === OrganizationType.HORECA) {
                            return this.userService
                                .sendHorecaInvite(
                                    this.roasterId,
                                    element.value.email,
                                    element.value.name,
                                    element.value.type,
                                )
                                .subscribe((res: any) => {
                                    if (res.success) {
                                        this.userInvitesArray.push(element.value.email);
                                        resolve(res);
                                    } else {
                                        reject();
                                    }
                                });
                        }
                    }),
                );
            }
        });
        Promise.all(promises)
            .then((res: any) => {
                this.inviteStatus = 'SUCCESS';
                this.toastrService.success('Invitation has been sent successfully');
            })
            .catch(() => {
                this.inviteStatus = '';
            });
    }
}
