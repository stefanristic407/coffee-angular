import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeLabService } from '@services';

@Component({
    selector: 'app-recipe-tab-container',
    templateUrl: './recipe-tab-container.component.html',
    styleUrls: ['./recipe-tab-container.component.scss'],
})
export class RecipeTabContainerComponent implements OnInit {
    selectedTab = 0;
    id: any;
    constructor(private route: ActivatedRoute, public router: Router, private coffeeLabService: CoffeeLabService) {
        this.id = this.route.snapshot.queryParamMap.get('id');
        console.log('id---->>>', this.id);
    }

    ngOnInit(): void {}

    onSave() {
        console.log('save');
        this.coffeeLabService.originalPost.next(true);
    }
}
