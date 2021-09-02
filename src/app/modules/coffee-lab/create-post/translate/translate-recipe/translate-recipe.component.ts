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
    hideTab1 = false;
    hideTab2 = false;
    hideTab3 = false;
    constructor(private route: ActivatedRoute, public router: Router, private coffeeLabService: CoffeeLabService) {
        this.id = this.route.snapshot.queryParamMap.get('origin_id');
    }

    ngOnInit(): void {}
    onSave(): void {
        this.coffeeLabService.originalPost.next(true);
    }

    onChangeTab(event) {
        this.selectedTab = event.index;
    }

    checkTranslationExits(lang) {
        this.tranalatedLangs.push(lang);
    }
}
