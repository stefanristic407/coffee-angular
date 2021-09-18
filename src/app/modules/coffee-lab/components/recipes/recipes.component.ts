import { Component, Input, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService } from '@services';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
    @Input() recipes: any[] = [];
    @Input() isMyPost = false;
    @Input() isSavedPost = false;
    totalRecords = 0;
    displayData: any[] = [];

    constructor(public coffeeLabService: CoffeeLabService, public authService: AuthService) {}

    ngOnInit(): void {
        this.displayData = this.recipes?.slice(0, 9);
        this.totalRecords = this.recipes?.length;
    }

    paginate(event: any) {
        this.displayData = this.recipes?.slice(event.first, event.first + event.rows);
    }
}
