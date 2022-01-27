import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStatus } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { RoasterService, UserService, ValidateEmailService } from '@services';
import { emailValidator } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-send-recovery-email',
    templateUrl: './send-recovery-email.component.html',
    styleUrls: ['./send-recovery-email.component.scss'],
})
export class SendRecoveryEmailComponent implements OnInit {
    readonly UserStatus = UserStatus;
    statusOptions = [
        { label: 'Active', value: UserStatus.ACTIVE },
        { label: 'Disable', value: UserStatus.INACTIVE },
    ];
    roleList: any = [];
    breadCrumbItem: MenuItem[] = [];
    isEdit = false;
    userDetails: any;
    userStatus: UserStatus = UserStatus.INACTIVE;
    userRoles: any[] = [];
    userID: number;
    userForm: FormGroup;
    submitted = false;

    get roles() {
        return this.userForm.get('roles') as FormArray;
    }

    constructor(
        private fb: FormBuilder,
        private roasterService: RoasterService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
        private validateService: ValidateEmailService,
        public location: Location,
    ) {}

    ngOnInit(): void {
        this.supplyBreadCrumb();
        this.listRoles();
        this.userForm = this.fb.group({
            firstname: new FormControl(
                { value: '', disabled: !this.isEdit || this.userStatus !== UserStatus.ACTIVE },
                Validators.compose([Validators.required]),
            ),
            lastname: new FormControl(
                { value: '', disabled: !this.isEdit || this.userStatus !== UserStatus.ACTIVE },
                Validators.compose([Validators.required]),
            ),
            email: new FormControl(
                { value: '', disabled: !this.isEdit || this.userStatus !== UserStatus.ACTIVE },
                Validators.compose([Validators.required]),
                emailValidator(this.validateService),
            ),
            roles: this.fb.array([]),
        });
        this.userDetails = { last_activated: '', status: '' };
        if (this.route.snapshot.queryParams.userID) {
            this.userID = +decodeURIComponent(this.route.snapshot.queryParams.userID);
        } else {
            this.toastrService.error('Error in getting the user Id');
            this.router.navigate(['/team-management/team-members']);
        }
        this.getUserData();
    }

    getUserData(): void {
        this.userService.getOrgUserData(this.userID).subscribe((res: any) => {
            if (res.success) {
                delete res.result.roles;
                this.userForm.patchValue(res.result);
                this.userDetails.last_activated = res.result.created_at ? res.result.created_at : '';
                this.userDetails.status = res.result.status;
                this.userStatus = res.result.status;
                this.listAssignedRoles();
            }
        });
    }

    listAssignedRoles(): void {
        this.roasterService.getUserBasedRoles(this.userID).subscribe((res) => {
            if (res.success) {
                this.userRoles = res.result;
                while (this.roles.length !== 0) {
                    this.roles.removeAt(0);
                }
                this.userRoles.forEach((element) => {
                    this.roles.push(
                        this.fb.control(
                            { value: element.id, disabled: !this.isEdit || this.userStatus !== UserStatus.ACTIVE },
                            Validators.compose([Validators.required]),
                        ),
                    );
                });
            } else {
                this.toastrService.error('Error while getting the roles of the user.');
            }
        });
    }

    listRoles(): void {
        this.roasterService.getRoles().subscribe((res) => {
            if (res.success) {
                this.roleList = res.result;
            }
        });
    }

    supplyBreadCrumb(): void {
        this.breadCrumbItem = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('team_management'), routerLink: '/team-management/manage-role' },
            { label: this.translator.instant('user_management') },
        ];
    }

    addRole(): void {
        this.roles.push(
            this.fb.control(
                { value: null, disabled: !this.isEdit || this.userStatus !== UserStatus.ACTIVE },
                Validators.compose([Validators.required]),
            ),
        );
        this.updateForm();
    }

    removeRole(idx): void {
        this.roles.removeAt(idx);
    }

    roleOptions(curIdx = null): number[] {
        const localArray = [];
        this.roleList.forEach((element) => {
            const idx = this.roles.value.findIndex((item, index) => item === element.id && curIdx !== index);
            if (idx < 0) {
                localArray.push(element);
            }
        });
        return localArray;
    }

    onEditCancel() {
        this.isEdit = false;
        this.getUserData();
    }

    onSave(): void {
        if (this.userDetails.status !== this.userStatus) {
            if (this.userStatus === UserStatus.ACTIVE) {
                this.enableUser();
            } else {
                this.disableUser();
            }
        } else {
            if (this.userStatus === UserStatus.ACTIVE) {
                this.updateUserDetails();
            }
        }
    }

    updateForm(): void {
        this.userForm.controls.firstname.enable();
        this.userForm.controls.lastname.enable();
        this.userForm.controls.email.enable();
        this.roles.controls.forEach((element) => element.enable());
        if (!this.isEdit || this.userStatus !== UserStatus.ACTIVE) {
            this.userForm.controls.firstname.disable();
            this.userForm.controls.lastname.disable();
            this.userForm.controls.email.disable();
            this.roles.controls.forEach((element) => element.disable());
        }
    }

    updateUserDetails() {
        if (!this.userForm.valid) {
            this.toastrService.error(this.translator.instant('please_check_form_data'));
            this.userForm.markAllAsTouched();
            return;
        }

        const promises = [];
        // add roles
        this.roles.value.forEach((element) => {
            const idx = this.userRoles.findIndex((item) => item.id === element);
            if (element && idx === -1) {
                promises.push(
                    new Promise((resolve, reject) =>
                        this.roasterService.assignUserBasedUserRoles(element, this.userID).subscribe((res: any) => {
                            if (res.success) {
                                resolve(res.result);
                            } else {
                                reject();
                            }
                        }),
                    ),
                );
            }
        });
        // remove roles
        this.userRoles.forEach((element) => {
            const idx = this.roles.value.findIndex((item) => item === element.id);
            if (idx === -1) {
                promises.push(
                    new Promise((resolve, reject) => {
                        this.roasterService.deleteUserRole(element.id, this.userID).subscribe((res: any) => {
                            if (res.success) {
                                resolve(res.result);
                            }
                        });
                    }),
                );
            }
        });

        promises.push(
            new Promise((resolve, reject) => {
                this.userService.updateOrgUserData(this.userID, this.userForm.value).subscribe((res: any) => {
                    if (res.success) {
                        resolve(res.result);
                    }
                });
            }),
        );

        this.submitted = true;
        Promise.all(promises)
            .then(() => {
                this.isEdit = false;
                this.submitted = false;
                this.listAssignedRoles();
                this.updateForm();
                this.toastrService.success(this.translator.instant('user_details_updated_successfully'));
            })
            .catch(() => {
                this.submitted = false;
                this.toastrService.error('Error while updating user details');
            });
    }

    enableUser() {
        this.roasterService.enableAdminUser(this.userID).subscribe((response: any) => {
            if (response.success) {
                this.toastrService.success('User has been enabled');
                this.userDetails.status = UserStatus.ACTIVE;
                this.updateUserDetails();
            } else {
                this.toastrService.error('Error while enabling the user');
            }
        });
    }

    disableUser() {
        this.roasterService.disableAdminUsers(this.userID).subscribe((value: any) => {
            if (value.success) {
                this.toastrService.success('User has been disabled');
                this.userDetails.status = UserStatus.INACTIVE;
                this.isEdit = false;
                this.updateForm();
            } else {
                this.toastrService.error('Error while disabling the user');
            }
        });
    }

    sendMail() {
        this.roasterService.sendRecoveryEmail(this.userID).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('Email has been sent successfully');
            } else {
                this.toastrService.error('Error while sending email to the User');
            }
        });
    }
}
