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

    constructor(public coffeeLabService: CoffeeLabService, public authService: AuthService) {}

    ngOnInit(): void {}
}
