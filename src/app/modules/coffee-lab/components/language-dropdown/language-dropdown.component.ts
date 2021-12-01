import { Component, OnInit } from '@angular/core';
import { APP_LANGUAGES } from '@constants';
import { CoffeeLabService } from '@services';

@Component({
    selector: 'app-language-dropdown',
    templateUrl: './language-dropdown.component.html',
    styleUrls: ['./language-dropdown.component.scss'],
})
export class LanguageDropdownComponent implements OnInit {
    languageList: any[] = APP_LANGUAGES;
    selectedLanguage: string;

    constructor(private coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        this.selectedLanguage = this.coffeeLabService.currentForumLanguage;
    }

    onChangeLanguage(): void {
        this.coffeeLabService.updateLang(this.selectedLanguage);
    }
}
