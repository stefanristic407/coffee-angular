import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MfaMethod } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { MfaService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

export enum SetupStep {
    START = 0,
    PASSWORD = 1,
    LINK = 2,
    VERIFY = 3,
    DONE = 4,
}

@Component({
    selector: 'app-authentication-app',
    templateUrl: './authentication-app.component.html',
    styleUrls: ['./authentication-app.component.scss'],
})
export class AuthenticationAppComponent implements OnInit {
    readonly SetupStep = SetupStep;
    step = SetupStep.START;
    backupCode: string;
    passwordForm: FormGroup;
    qrCodeUrl: string;
    codeForm: FormGroup;

    constructor(
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef,
        private translator: TranslateService,
        private mfaService: MfaService,
        private toastrService: ToastrService,
        private fb: FormBuilder,
    ) {
        this.config.header = this.translator.instant('authentication_app');
        this.config.styleClass = `authentication-app-dialog`;
    }

    ngOnInit(): void {
        this.passwordForm = this.fb.group({ password: ['', Validators.compose([Validators.required])] });
        this.codeForm = this.fb.group({ otp: ['', Validators.compose([Validators.required])] });
    }

    next() {
        this.step++;
        if (this.step === SetupStep.START) {
            this.config.header = this.translator.instant('authentication_app');
        } else if (this.step === SetupStep.PASSWORD) {
            this.config.header = this.translator.instant('enter_your_password');
        } else if (this.step === SetupStep.LINK) {
            this.config.header = this.translator.instant('link_the_app_to_your_account');
        } else if (this.step === SetupStep.VERIFY) {
            this.config.header = this.translator.instant('try_the_authentication_code_now');
        } else if (this.step === SetupStep.DONE) {
            this.config.header = this.translator.instant('you_are_all_set');
        }
    }

    verifyPassword() {
        if (this.passwordForm.valid) {
            this.mfaService.enableAuthApp(this.passwordForm.value).subscribe((res) => {
                if (res.success) {
                    this.qrCodeUrl = res.result.url;
                    this.next();
                } else {
                    this.toastrService.error('Password incorrect');
                }
            });
        } else {
            this.passwordForm.markAllAsTouched();
        }
    }

    verifyCode() {
        if (this.codeForm.valid) {
            this.mfaService.verifyCode(MfaMethod.APP, this.codeForm.value).subscribe((res) => {
                if (res.success) {
                    this.createBackupCodes();
                } else {
                    this.toastrService.error('Otp code incorrect');
                }
            });
        } else {
            this.codeForm.markAllAsTouched();
        }
    }

    getBackupCodes() {
        this.mfaService.getBackupCodes().subscribe((res) => {
            if (res.success) {
                if (res.result?.codes?.length) {
                    this.backupCode = res.result.codes[0];
                    this.next();
                }
            } else {
                this.toastrService.error('Error while getting backup codes');
            }
        });
    }

    createBackupCodes() {
        this.mfaService.createBackupCodes().subscribe((res) => {
            if (res.success) {
                this.getBackupCodes();
                this.toastrService.error('Backup code is generated successfully');
            } else {
                this.toastrService.error('Error while generating backup codes');
            }
        });
    }
}
