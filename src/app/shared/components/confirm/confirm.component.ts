import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '@models';
import { UserService } from '@services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
    logoutAll: boolean;
    constructor(private ref: DynamicDialogRef, private userService: UserService, public config: DynamicDialogConfig) {
        this.config.showHeader = false;
        this.config.styleClass = `confirm-dialog ${this.config.data.type}`;
    }

    ngOnInit(): void {}

    close(value = null) {
        if (this.logoutAll && value === 'yes') {
            // Save user preference
            this.userService
                .patchPreferences({ logout_all_confirmation: this.logoutAll })
                .subscribe((res: ApiResponse<any>) => {
                    if (res.success) {
                        this.ref.close(value);
                    }
                });
        } else {
            this.ref.close(value);
        }
    }
}
