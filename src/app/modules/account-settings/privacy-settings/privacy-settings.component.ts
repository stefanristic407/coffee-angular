import { Component, OnInit } from '@angular/core';
import { AuthService, GlobalsService, UserserviceService } from '@services';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-privacy-settings',
    templateUrl: './privacy-settings.component.html',
    styleUrls: ['./privacy-settings.component.scss'],
})
export class PrivacySettingsComponent implements OnInit {
    breadcrumbItems: MenuItem[];
    roasterId: any;
    agreements: any[] = [
        {
            title: 'general_terms_and_conditions',
            url: 'https://support.eraofwe.com/en/kb/articles/general-terms-conditions-user',
            isShow: true,
        },
        {
            title: 'general_terms_and_conditions_for_legal_entity',
            url: 'https://support.eraofwe.com/en/kb/articles/general-terms-conditions-legal-entity',
            isShow: this.authService.currentUser.id === this.authService.currentOrganization.admin_id,
        },
        {
            title: 'cookie_policy',
            url: 'https://support.eraofwe.com/en/kb/articles/cookie-policy',
            isShow: true,
        },
        {
            title: 'privacy_policy',
            url: 'https://support.eraofwe.com/en/kb/articles/privacy-policy',
            isShow: true,
        },
        {
            title: 'data_processing_agreement',
            url: 'https://support.eraofwe.com/en/kb/articles/data-processing-agreement',
            isShow: this.authService.currentUser.id === this.authService.currentOrganization.admin_id,
        },
        // {
        //     title: 'master_agreement_estate',
        //     url: '',
        //     isShow: this.authService.currentUser.id === this.authService.currentOrganization.admin_id,
        // },
    ];

    constructor(
        public location: Location,
        public globals: GlobalsService,
        public authService: AuthService,
        private userService: UserserviceService,
        private cookieService: CookieService
    ) {}

    ngOnInit(): void {
        this.roasterId = this.cookieService.get('roaster_id');
        this.breadcrumbItems = [
            { label: this.globals.languageJson?.home, routerLink: '/dashboard' },
            { label: this.globals.languageJson?.account_settings, routerLink: '../../account-settings' },
            { label: this.globals.languageJson?.privacy_settings },
        ];
        // this.getOrganizationTerms();
    }

    getOrganizationTerms(): void {
        this.userService.getOrganizationTerm(this.roasterId).subscribe((res: any) => {
            console.log('getOrganizationTerms >>>>>>>>>>', res);
        });
    }
}
