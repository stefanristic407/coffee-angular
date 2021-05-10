import { Component, OnInit } from '@angular/core';
import { AuthService, GlobalsService } from '@services';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-privacy-settings',
    templateUrl: './privacy-settings.component.html',
    styleUrls: ['./privacy-settings.component.scss'],
})
export class PrivacySettingsComponent implements OnInit {
    breadcrumbItems: MenuItem[];
    agreements: any[] = [
        {
            title: 'general_terms_and_conditions',
            url: 'https://support.eraofwe.com/en/kb/articles/general-terms-conditions-user',
            role: '',
        },
        {
            title: 'general_terms_and_conditions_for_legal_entity',
            url: 'https://support.eraofwe.com/en/kb/articles/general-terms-conditions-legal-entity',
            role: 'Support Admin',
        },
        {
            title: 'cookie_policy',
            url: 'https://support.eraofwe.com/en/kb/articles/cookie-policy',
            role: '',
        },
        {
            title: 'privacy_policy',
            url: 'https://support.eraofwe.com/en/kb/articles/privacy-policy',
            role: '',
        },
        {
            title: 'data_processing_agreement',
            url: 'https://support.eraofwe.com/en/kb/articles/data-processing-agreement',
            role: 'Support Admin',
        },
        // {
        //     title: 'master_agreement_estate',
        //     url: '',
        //     role: ''
        // },
    ];

    constructor(public location: Location, public globals: GlobalsService, public authService: AuthService) {}

    ngOnInit(): void {
        this.breadcrumbItems = [
            { label: this.globals.languageJson?.home, routerLink: '/dashboard' },
            { label: this.globals.languageJson?.account_settings, routerLink: '../../account-settings' },
            { label: this.globals.languageJson?.privacy_settings },
        ];
        console.log('current user >>>>>>>>>>>', this.authService.currentUser);
    }
}
