import { Component, OnInit, Input } from '@angular/core';
import { languages } from '@constants';
import { GlobalsService } from '@services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-translation-dropdown',
    templateUrl: './translation-dropdown.component.html',
    styleUrls: ['./translation-dropdown.component.scss'],
})
export class TranslationDropdownComponent implements OnInit {
    @Input() translatedList: any[] = [];
    @Input() forumType?: string;
    languages = languages;

    constructor(public globalsService: GlobalsService, private router: Router) {}

    ngOnInit(): void {}

    onChangeTranslate(event: any): void {
        this.router.navigate([`/coffee-lab/${this.forumType}/${event.value.slug ?? event.value.id}`]);
    }
}
