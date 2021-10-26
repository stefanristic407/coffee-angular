import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
    @Input() categoryList: any[] = [];
    @Input() isTranslatePage: boolean;
    @Input() isArticlePage: boolean;
    constructor() {}

    ngOnInit(): void {}
}
