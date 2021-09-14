import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_LANGUAGES } from '@constants';
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
    allLanguage: any[] = APP_LANGUAGES;
    remainingLangugage = [];

    constructor(private route: ActivatedRoute, public router: Router, private coffeeLabService: CoffeeLabService) {
        this.id = this.route.snapshot.queryParamMap.get('origin_id');
        this.isMobile = window.innerWidth < 767;
    }

    ngOnInit(): void {}

    onSave(status: boolean): void {
        if (status) {
            this.coffeeLabService.originalPost.next(true);
        } else {
            this.coffeeLabService.draftPost.next(true);
        }
    }

    onChangeTab(event) {
        this.selectedTab = event.index;
    }

    checkTranslationExits(emitedObject) {
        this.allLanguage.forEach((item) => {
            const isTranslate = emitedObject?.translation?.find((trans) => item.value === trans.language);
            if (!isTranslate && emitedObject.lang_code !== item.value) {
                this.remainingLangugage.push(item);
            }
        });
    }
}
