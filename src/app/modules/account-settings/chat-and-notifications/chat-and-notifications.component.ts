import { Component, OnInit } from '@angular/core';
import { GlobalsService, UserService, UserserviceService } from '@services';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-chat-and-notifications',
    templateUrl: './chat-and-notifications.component.html',
    styleUrls: ['./chat-and-notifications.component.scss'],
})
export class ChatAndNotificationsComponent implements OnInit {
    preference?: any = {};
    isLoading?: boolean;
    textSizes = [
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' },
    ];
    breadcrumbItems: MenuItem[];
    roasterId?: any;

    constructor(
        private userService: UserService,
        private userOriginalService: UserserviceService,
        public location: Location,
        private toastr: ToastrService,
        private cookieService: CookieService,
        public globals: GlobalsService,
    ) {}

    ngOnInit(): void {
        this.roasterId = this.cookieService.get('roaster_id');
        this.getPreferences();
        this.breadcrumbItems = [
            { label: this.globals.languageJson?.home, routerLink: '/dashboard' },
            { label: this.globals.languageJson?.account_settings, routerLink: '../../account-settings' },
            { label: this.globals.languageJson?.preferences },
        ];
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
        this.userOriginalService.updatePreferences(this.roasterId, this.preference).subscribe((res) => {
            console.log('chat and notification change res >>>>>>', res);
        });
    }
}
