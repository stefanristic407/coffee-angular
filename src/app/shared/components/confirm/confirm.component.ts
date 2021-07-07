import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthService, GlobalsService, UserService } from '@services';
import { ApiResponse } from '@models';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
    logoutAll: boolean;
    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        public globals: GlobalsService,
        private userService: UserService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {}

    close(value = null) {
        if (this.logoutAll && value === 'yes') {
            // Save user preference
            this.userService
                .updatePreferences({ ...this.authService.preference, logout_all: this.logoutAll })
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
