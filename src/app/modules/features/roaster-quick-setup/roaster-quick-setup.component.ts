import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { AuthService, UserService, ValidateEmailService } from '@services';
import { OrganizationType } from '@enums';
import { ValidateEmail } from '@utils';

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
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
        private validateService: ValidateEmailService,
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
            { label: this.translator.instant('menu_sales_management') },
            { label: this.translator.instant('customer_management'), routerLink: '/people/customer-management' },
            {
                label: `Invite  ${
                    this.orgType === OrganizationType.MICRO_ROASTER
                        ? 'Micro-Roaster'
                        : this.translator.instant('roasted_coffee_customers')
                }`,
            },
        ];
        this.selectedNav = { label: this.translator.instant('home'), routerLink: '/' };
    }

    addNewRow(): void {
        this.inviteFormArray.push(
            new FormGroup({
                name: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required], ValidateEmail.createValidator(this.validateService)),
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
        if (this.inviteFormArray.invalid) {
            this.inviteFormArray.markAllAsTouched();
            return;
        }
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
