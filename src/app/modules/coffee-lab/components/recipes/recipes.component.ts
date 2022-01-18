import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
    @Input() recipes: any[] = [];
    @Input() isMyPost = false;
    @Input() isSavedPost = false;

    constructor() {}

    ngOnInit(): void {}
}
