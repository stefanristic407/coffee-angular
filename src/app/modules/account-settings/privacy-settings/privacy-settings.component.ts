import { Component, OnInit } from '@angular/core';
import { GlobalsService, UserService, UserserviceService } from '@services';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-privacy-settings',
    templateUrl: './privacy-settings.component.html',
    styleUrls: ['./privacy-settings.component.scss'],
})
export class PrivacySettingsComponent implements OnInit {
    privacyTerms?: any = {};
    isLoading?: boolean;
    breadcrumbItems: MenuItem[];

    constructor(
        private userService: UserService,
        private userOriginalService: UserserviceService,
        public location: Location,
        private toastr: ToastrService,
        public globals: GlobalsService,
    ) {}

    ngOnInit(): void {
        this.getPrivacyTerms();
        this.breadcrumbItems = [
            { label: this.globals.languageJson?.home, routerLink: '/dashboard' },
            { label: this.globals.languageJson?.account_settings, routerLink: '../../account-settings' },
            { label: this.globals.languageJson?.privacy_settings },
        ];
    }

    getPrivacyTerms(): void {
        this.isLoading = true;
        this.userOriginalService.getPrivacyTerms().subscribe((res: any) => {
            console.log('get privacy terms >>>>>>>>>>>>>', res);
            this.isLoading = false;
            if (res.success) {
                this.privacyTerms = res.result;
            } else {
                this.toastr.error('Failed to get data');
            }
        });
    }

    onChangeData(): void {
        this.userOriginalService.updatePrivacyTerms(this.privacyTerms).subscribe((res: any) => {
            console.log('update data result ??????????', res);
        });
    }
}
