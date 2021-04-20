import { Component, OnInit, Input } from '@angular/core';
import { languages } from '@constants';
import { CoffeeLabService, GlobalsService } from '@services';
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
            value: 'en',
        },
        {
            label: 'Swedish',
            value: 'sv',
        },
        {
            label: 'Portuguese',
            value: 'pt',
        },
        {
            label: 'Spanish',
            value: 'es',
        },
    ];
    selectedLanguage: string;

    constructor(public globalsService: GlobalsService, private router: Router, public coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        this.selectedLanguage = this.coffeeLabService.currentForumLanguage;
    }

    onChangeLanguage(): void {
        this.coffeeLabService.forumLanguage.next(this.selectedLanguage);
    }
}
