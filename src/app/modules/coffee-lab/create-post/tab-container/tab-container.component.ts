import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tab-container',
    templateUrl: './tab-container.component.html',
    styleUrls: ['./tab-container.component.scss'],
})
export class TabContainerComponent implements OnInit {
    menuItems = [
        {
            label: 'qa_post',
            routerLink: 'question',
            icon: 'assets/images/qa-forum.svg',
            activeIcon: 'assets/images/qa-forum-active.svg',
        },
        {
            label: 'recipe_post',
            routerLink: 'recipe',
            icon: 'assets/images/coffee-recipe.svg',
            activeIcon: 'assets/images/coffee-recipe-active.svg',
        },
        {
            label: 'article',
            routerLink: 'article',
            icon: 'assets/images/article.svg',
            activeIcon: 'assets/images/article-active.svg',
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
