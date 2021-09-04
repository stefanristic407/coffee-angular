import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'app-translate-recipe',
    templateUrl: './translate-recipe.component.html',
    styleUrls: ['./translate-recipe.component.scss'],
})
export class TranslateRecipeComponent implements OnInit {
    selectedTab = 0;
    tranalatedLangs = [];
    id: any;
    isMobile = false;
    allLanguage = [
        { label: 'swedish', value: 'sv' },
        { label: 'spanish', value: 'es' },
        { label: 'portuguese', value: 'pt' },
    ];
    remainingLangugage = [];

    constructor(private route: ActivatedRoute, public router: Router, private coffeeLabService: CoffeeLabService) {
        this.id = this.route.snapshot.queryParamMap.get('origin_id');
        this.isMobile = window.innerWidth < 767;
    }

    ngOnInit(): void {}
    onSave(): void {
        this.coffeeLabService.originalPost.next(true);
    }

    onChangeTab(event) {
        this.selectedTab = event.index;
    }

    checkTranslationExits(translatedArray) {
        this.allLanguage.forEach((item) => {
            const isTranslate = translatedArray?.find((trans) => item.value === trans.language);
            if (!isTranslate) {
                this.remainingLangugage.push(item);
            }
        });
    }
}
