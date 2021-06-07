import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsService, UserService, UserserviceService, ChatHandlerService, AuthService } from '@services';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-chat-and-notifications',
    templateUrl: './chat-and-notifications.component.html',
    styleUrls: ['./chat-and-notifications.component.scss'],
})
export class ChatAndNotificationsComponent implements OnInit, OnDestroy {
    preference?: any = {};
    isLoading?: boolean;
    textSizes = [
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' },
    ];
    breadcrumbItems: MenuItem[];
    roasterId?: any;
    settingUpdateSubscription: Subscription;
    constructor(
        private userService: UserService,
        private userOriginalService: UserserviceService,
        public location: Location,
        private toastr: ToastrService,
        private cookieService: CookieService,
        public globals: GlobalsService,
        public chatHandlerService: ChatHandlerService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.roasterId = this.authService.getOrgId();
        this.getPreferences();
        this.breadcrumbItems = [
            { label: this.globals.languageJson?.home, routerLink: '/dashboard' },
            { label: this.globals.languageJson?.account_settings, routerLink: '../../account-settings' },
            { label: this.globals.languageJson?.preferences },
        ];

        this.settingUpdateSubscription = this.chatHandlerService.settingUpdated.subscribe(() => {
            const setting = this.chatHandlerService.setting;
            if (this.preference && setting) {
                for (const key in setting) {
                    if (setting.hasOwnProperty(key)) {
                        this.preference[key] = setting[key];
                    }
                }
            }
        });
    }

    getPreferences(): void {
        this.isLoading = true;
        console.log('estateId >>>>>>>', this.roasterId);
        this.userOriginalService.getPreferences(this.roasterId).subscribe((res: any) => {
            console.log('preferences result >>>>>>>>>>>>>', res);
            this.isLoading = false;
            if (res.success) {
                this.preference = res.result;
            } else {
                this.toastr.error('Failed to get data');
            }
        });
    }

    onChangeData(): void {
        this.userOriginalService.updatePreferences(this.roasterId, this.preference).subscribe((res: any) => {
            if (res.success) {
                this.chatHandlerService.updateSetting(this.preference);
            }
            console.log('chat and notification change res >>>>>>', res);
        });
    }
    ngOnDestroy() {
        if (this.settingUpdateSubscription && this.settingUpdateSubscription.unsubscribe) {
            this.settingUpdateSubscription.unsubscribe();
        }
    }
}
