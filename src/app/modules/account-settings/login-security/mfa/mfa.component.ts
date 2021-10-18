import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthenticationAppComponent } from '../authentication-app/authentication-app.component';
import { BackupCodesComponent } from '../backup-codes/backup-codes.component';

@Component({
    selector: 'app-mfa',
    templateUrl: './mfa.component.html',
    styleUrls: ['./mfa.component.scss'],
})
export class MfaComponent implements OnInit {
    isTextMessage = true;
    isAuthenticationApp = false;

    constructor(private dialogService: DialogService) {}

    ngOnInit(): void {}

    changeAuthenticationApp() {
        console.log(this.isAuthenticationApp);
        if (this.isAuthenticationApp) {
            this.dialogService.open(AuthenticationAppComponent, {});
        }
    }

    viewBackupCodes() {
        console.log('viewBackupCodes');
        this.dialogService.open(BackupCodesComponent, {});
    }
}
