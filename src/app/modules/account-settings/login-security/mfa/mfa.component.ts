import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from '@app/shared';
import { TranslateService } from '@ngx-translate/core';
import { MfaService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthenticationAppComponent } from '../authentication-app/authentication-app.component';
import { BackupCodesComponent } from '../backup-codes/backup-codes.component';
import { SmsComponent } from '../sms/sms.component';

@Component({
    selector: 'app-mfa',
    templateUrl: './mfa.component.html',
    styleUrls: ['./mfa.component.scss'],
})
export class MfaComponent implements OnInit {
    mfaSms = false;
    mfaAuthApp = false;
    mfaBackupCodes = false;

    constructor(
        private dialogService: DialogService,
        private mfaService: MfaService,
        private toastrService: ToastrService,
        private translator: TranslateService,
    ) {}

    ngOnInit(): void {
        this.getMfaStatus();
    }

    getMfaStatus() {
        this.mfaService.getMfaStatus().subscribe((res) => {
            if (res.success) {
                this.mfaSms = res.result.mfa_sms;
                this.mfaAuthApp = res.result.mfa_auth_app;
                this.mfaBackupCodes = res.result.mfa_backup_codes;
            } else {
                this.toastrService.error('Error while getting MFA status');
            }
        });
    }

    changeSms() {
        if (!this.mfaSms) {
            this.dialogService.open(SmsComponent, {}).onClose.subscribe((res) => {
                this.getMfaStatus();
            });
        } else {
            this.dialogService
                .open(ConfirmComponent, {
                    data: {
                        title: this.translator.instant('Are you sure?'),
                        desp: this.translator.instant('Are you sure you want to disable the MFA text message?'),
                    },
                })
                .onClose.subscribe((action: any) => {
                    if (action === 'yes') {
                        this.mfaService.disableSms().subscribe((res) => {
                            if (res.success) {
                                this.toastrService.success('MFA text message is disabled');
                            } else {
                                this.toastrService.error('Error while disabling MFA text message');
                            }
                            this.getMfaStatus();
                        });
                    } else {
                        this.getMfaStatus();
                    }
                });
        }
    }

    changeAuthenticationApp() {
        if (!this.mfaAuthApp) {
            this.dialogService.open(AuthenticationAppComponent, {}).onClose.subscribe((res) => {
                this.getMfaStatus();
            });
        } else {
            this.dialogService
                .open(ConfirmComponent, {
                    data: {
                        title: this.translator.instant('Are you sure?'),
                        desp: this.translator.instant('Are you sure you want to disable the MFA authentication app?'),
                    },
                })
                .onClose.subscribe((action: any) => {
                    if (action === 'yes') {
                        this.mfaService.disableAuthApp().subscribe((res) => {
                            if (res.success) {
                                this.toastrService.success('MFA authentication app is disabled');
                            } else {
                                this.toastrService.error('Error while disabling MFA authentication app');
                            }
                            this.getMfaStatus();
                        });
                    } else {
                        this.getMfaStatus();
                    }
                });
        }
    }

    viewBackupCodes() {
        this.dialogService.open(BackupCodesComponent, {}).onClose.subscribe((res) => {
            this.getMfaStatus();
        });
    }
}
