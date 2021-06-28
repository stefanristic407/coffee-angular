import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeLabService } from '@services';

@Component({
    selector: 'app-translate-recipe',
    templateUrl: './translate-recipe.component.html',
    styleUrls: ['./translate-recipe.component.scss'],
})
export class TranslateRecipeComponent implements OnInit {
    selectedTab = 0;
    id: any;
    constructor(private route: ActivatedRoute, public router: Router, private coffeeLabService: CoffeeLabService) {
        this.id = this.route.snapshot.queryParamMap.get('origin_id');
    }

    ngOnInit(): void {}
    onSave(): void {
        this.coffeeLabService.originalPost.next(true);
    }
}
