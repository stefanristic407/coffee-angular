import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthService, UserService } from '@services';
import { ApiResponse } from '@models';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
    logoutAll: boolean;
    welcomeImage: any;
    constructor(
        private authService: AuthService,
        private ref: DynamicDialogRef,
        private userService: UserService,
        public config: DynamicDialogConfig,
    ) {
        this.config.showHeader = false;
        this.config.styleClass = `confirm-dialog ${this.config.data.type}`;
    }

    ngOnInit(): void {
        this.welcomeImage = [
            {
                name: 'elevated_sourcing',
                image_url: '/assets/images/elevated-sourcing.svg',
            },
            {
                name: 'global_estates',
                image_url: '/assets/images/global-estates.svg',
            },
            {
                name: 'direct_communication',
                image_url: '/assets/images/direct-communication.svg',
            },
            {
                name: 'digital_transformation',
                image_url: '/assets/images/digital-transformation.svg',
            },
        ];
    }

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
