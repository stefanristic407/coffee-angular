import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GlobalsService } from '@services';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit, AfterViewInit {
    breadcrumbItems: MenuItem[];

    constructor(public router: Router, public location: Location, public globals: GlobalsService) {}

    ngOnInit(): void {
        this.breadcrumbItems = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            { label: this.globals.languageJson?.account_settings },
        ];
    }

    ngAfterViewInit(): void {
        window.dispatchEvent(new Event('resize'));
    }
}
