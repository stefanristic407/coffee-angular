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
    PHONE = 2,
    VERIFY = 3,
    DONE = 4,
}

@Component({
    selector: 'app-sms',
    templateUrl: './sms.component.html',
    styleUrls: ['./sms.component.scss'],
})
export class SmsComponent implements OnInit {
    readonly SetupStep = SetupStep;
    step = SetupStep.PHONE;
    backupCode: string;
    phoneForm: FormGroup;
    passwordForm: FormGroup;
    qrCodeUrl: string;
    codeForm: FormGroup;
    get hiddenPhone() {
        return this.phoneForm.value.phone.substr(-2);
    }

    constructor(
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef,
        private translator: TranslateService,
        private mfaService: MfaService,
        private toastrService: ToastrService,
        private fb: FormBuilder,
    ) {
        this.config.header = this.translator.instant('Confirm you phone');
        this.config.styleClass = `authentication-app-dialog`;
    }

    ngOnInit(): void {
        this.passwordForm = this.fb.group({ password: ['', Validators.compose([Validators.required])] });
        this.phoneForm = this.fb.group({ phone: ['', Validators.compose([Validators.required])] });
        this.codeForm = this.fb.group({ otp: ['', Validators.compose([Validators.required])] });
    }

    next() {
        this.step++;
        if (this.step === SetupStep.START) {
            this.config.header = this.translator.instant('authentication_app');
        } else if (this.step === SetupStep.PASSWORD) {
            this.config.header = this.translator.instant('enter_your_password');
        } else if (this.step === SetupStep.PHONE) {
            this.config.header = this.translator.instant('Confirm you phone');
        } else if (this.step === SetupStep.VERIFY) {
            this.config.header = this.translator.instant('otp_verification');
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

    confirmPhone() {
        if (this.phoneForm.valid) {
            this.mfaService.confirmPhone(this.phoneForm.value).subscribe((res) => {
                if (res.success) {
                    this.next();
                }
            });
        } else {
            this.phoneForm.markAllAsTouched();
        }
    }

    verifyPhone() {
        if (this.codeForm.valid) {
            this.mfaService.verifyPhone(this.codeForm.value).subscribe((res) => {
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
