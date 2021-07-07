import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalsService, UserService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-login-security',
    templateUrl: './login-security.component.html',
    styleUrls: ['./login-security.component.scss'],
})
export class LoginSecurityComponent implements OnInit {
    changePasswordMode = false;
    isUpdatingPassword = false;
    sessions$: any[] = [];
    sessions: any[] = [];
    isLoading?: boolean;
    sessionPageNumber = 0;
    form: FormGroup;
    isSent?: boolean;
    breadcrumbItems: MenuItem[];
    modalRef: BsModalRef;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        public location: Location,
        private confirmationService: ConfirmationService,
        private toastr: ToastrService,
        private router: Router,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        private modalService: BsModalService,
    ) {
        this.form = this.formBuilder.group({
            currentPassword: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50),
                    Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*\\W).*$'),
                ],
            ],
            newPassword: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50),
                    Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*\\W).*$'),
                ],
            ],
            confirmPassword: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50),
                    Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*\\W).*$'),
                ],
            ],
        });
    }

    ngOnInit(): void {
        this.getSessions();
        this.breadcrumbItems = [
            { label: this.globals.languageJson?.home, routerLink: '/dashboard' },
            { label: this.globals.languageJson?.account_settings, routerLink: '../../account-settings' },
            { label: this.globals.languageJson?.login_security },
        ];
    }

    getSessions(): void {
        this.isLoading = true;
        this.userService.getUserSessions().subscribe((res) => {
            this.isLoading = false;
            console.log('get sessions >>>>>>>>', res);
            if (res.success) {
                this.sessions$ = res.result.reverse();
                this.sessions = this.sessions$.slice(0, 5);
            } else {
                this.toastr.error('Failed to get data');
            }
        });
    }

    userLogout(): void {
        this.userService.logOut().subscribe((res: any) => {
            if (res.success) {
                this.cookieService.deleteAll();
                localStorage.clear();
                this.router.navigate(['/login']);
                this.toastrService.success('Logout successfully !');
            } else {
                this.toastrService.error('Error while Logout!');
            }
        });
    }

    openDeactivateAccountModal(template: TemplateRef<any>): void {
        this.modalRef = this.modalService.show(template);
    }

    handleDeactivateAccount(): void {
        this.userService.deactivateAccount().subscribe((res) => {
            if (res.success) {
                this.toastrService.success('Account has been deactivated successfully.');
                this.userLogout();
            }
        });
    }

    handleViewMoreSessions(): void {
        this.sessionPageNumber += 1;
        this.sessions = this.sessions$.slice(0, (this.sessionPageNumber + 1) * 5);
    }

    getErrorMessage(field: string): string {
        if (this.form.controls[field].errors?.required) {
            return 'Required field';
        } else if (this.form.controls[field].errors?.minlength) {
            return 'You should input at least 8 characters';
        } else if (this.form.controls[field].errors?.maxlength) {
            return 'You can input maximum 50 characters';
        } else if (this.form.controls[field].errors?.pattern) {
            return 'Password is weak';
        } else if (this.form.controls[field].errors?.noMatch) {
            return "Password doesn't match";
        } else {
            return 'Unknown error';
        }
    }

    handleSubmitPasswords(): void {
        this.isSent = true;
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            console.log('currentPassword validation >>>>>>>>', this.form.controls.currentPassword.invalid);
            return;
        }
        if (this.form.controls.newPassword.value !== this.form.controls.confirmPassword.value) {
            this.form.controls.confirmPassword.setErrors({ noMatch: true });
            return;
        }
        const data = {
            current_password: this.form.controls.currentPassword.value,
            new_password: this.form.controls.newPassword.value,
            confirm_password: this.form.controls.confirmPassword.value,
        };
        this.isUpdatingPassword = true;
        this.userService.updatePassword(data).subscribe((res: any) => {
            this.isUpdatingPassword = false;
            console.log('change password result >>>>>>>>', res);
            if (res.success) {
                this.toastr.success('Successfully changed password');
                this.changePasswordMode = false;
            } else {
                this.toastr.error('Failed to change password');
            }
        });
    }
}
