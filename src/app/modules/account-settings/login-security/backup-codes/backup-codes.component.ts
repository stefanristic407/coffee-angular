import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MfaService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-backup-codes',
    templateUrl: './backup-codes.component.html',
    styleUrls: ['./backup-codes.component.scss'],
})
export class BackupCodesComponent implements OnInit {
    backupCode: string;

    constructor(
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef,
        private translator: TranslateService,
        private mfaService: MfaService,
        private toastrService: ToastrService,
    ) {
        this.config.header = this.translator.instant('backup_codes');
        this.config.styleClass = `backup-codes-dialog`;
    }

    ngOnInit(): void {
        this.getBackupCodes();
    }

    getBackupCodes() {
        this.mfaService.getBackupCodes().subscribe((res) => {
            if (res.success) {
                if (res.result?.codes?.length) {
                    this.backupCode = res.result.codes[0];
                }
            } else {
                this.toastrService.error('Error while getting backup codes');
            }
        });
    }

    createBackupCodes() {
        this.mfaService.createBackupCodes().subscribe((res) => {
            if (res.success) {
                this.toastrService.error('Backup code is generated successfully');
            } else {
                this.toastrService.error('Error while generating backup codes');
            }
        });
    }
}
