import { Component, OnInit, Input } from '@angular/core';
import { languages } from '@constants';
import { GlobalsService } from '@services';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-language-dropdown',
    templateUrl: './language-dropdown.component.html',
    styleUrls: ['./language-dropdown.component.scss'],
})
export class LanguageDropdownComponent implements OnInit {
    languages = languages;
    languageList: any[] = [
        {
            label: 'English',
            value: 'EN',
        },
        {
            label: 'Swedish',
            value: 'SV',
        },
        {
            label: 'Portuguese',
            value: 'PT',
        },
        {
            label: 'Spanish',
            value: 'ES',
        },
    ];
    selectedLanguage = 'EN';

    constructor(public globalsService: GlobalsService, private router: Router) {}

    ngOnInit(): void {}

    onChangeLanguage(event: any): void {}
}
