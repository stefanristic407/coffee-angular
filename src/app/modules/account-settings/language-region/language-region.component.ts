import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { APP_LANGUAGES, LANGUAGES } from '@constants';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, StartupService, UserService } from '@services';
import * as moment from 'moment-timezone';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-language-region',
    templateUrl: './language-region.component.html',
    styleUrls: ['./language-region.component.scss'],
})
export class LanguageRegionComponent implements OnInit {
    applicationLanguages: any[] = APP_LANGUAGES;
    languages: any[] = LANGUAGES.sort((a: any, b: any) => (a.name < b.name ? -1 : 1));
    timezones: any[] = [];
    selectedConverseLanguages?: any = [];
    isLoading?: boolean;
    breadcrumbItems: MenuItem[];
    roasterId: any;
    apiCount = 0;
    userInfo?: any;

    constructor(
        private authService: AuthService,
        private startupService: StartupService,
        private translator: TranslateService,
        private userService: UserService,
        public location: Location,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        const today = new Date();
        this.timezones = moment.tz.names().map((item) => {
            return {
                label: `(GMT ${moment(today).tz(item).format('Z')}) ${item}`,
                value: item,
            };
        });
        this.getUserDetail();
        this.getConverseLanguages();
        this.breadcrumbItems = [
            { label: this.translator.instant('home'), routerLink: '/dashboard' },
            { label: this.translator.instant('account_settings'), routerLink: '../../account-settings' },
            { label: this.translator.instant('language_region') },
        ];
    }

    getUserDetail(): void {
        this.isLoading = true;
        this.userService.getUserDetail().subscribe((res: any) => {
            console.log('user info >>>>>>', res);
            this.apiCount += 1;
            if (this.apiCount === 2) {
                this.isLoading = false;
            }
            this.userInfo = res.result;
        });
    }

    getConverseLanguages(): void {
        this.isLoading = true;
        this.userService.getConverseLanguages().subscribe((res: any) => {
            this.apiCount += 1;
            if (this.apiCount === 2) {
                this.isLoading = false;
            }
            if (res.result?.languages?.length) {
                this.selectedConverseLanguages = res.result?.languages.map((languageValue: string) => {
                    return this.languages.find((language: any) => language.value === languageValue);
                });
            }
        });
    }

    handleAddConverseLanguage(language: string): void {
        if (this.selectedConverseLanguages.findIndex((item: string) => item === language) !== -1) {
            return;
        }
        this.selectedConverseLanguages.push(language);
        this.handleSaveConverseLanguages();
    }

    handleRemoveConverseLanguage(index: number): void {
        this.selectedConverseLanguages.splice(index, 1);
        this.handleSaveConverseLanguages();
    }

    onChangeUserInfo(): void {
        this.userService.updateUserProfile(this.userInfo).subscribe();
        this.startupService.load(this.userInfo.language);
    }

    handleSaveConverseLanguages(): void {
        if (this.selectedConverseLanguages.length) {
            this.userService
                .updateConverseLanguages({
                    languages: this.selectedConverseLanguages.map((item: any) => item.value),
                })
                .subscribe();
        }
    }
}
