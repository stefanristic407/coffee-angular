import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
    menuItems = [
        {
            label: 'qa_forum',
            routerLink: 'qa-forum',
            icon: 'assets/images/qa-forum.svg',
            activeIcon: 'assets/images/qa-forum-active.svg',
        },
        {
            label: 'articles',
            routerLink: 'articles',
            icon: 'assets/images/article.svg',
            activeIcon: 'assets/images/article-active.svg',
        },
        {
            label: 'coffee_recipes',
            routerLink: 'coffee-recipes',
            icon: 'assets/images/coffee-recipe.svg',
            activeIcon: 'assets/images/coffee-recipe-active.svg',
        },
        {
            label: 'my_posts',
            routerLink: 'my-posts',
            icon: 'assets/images/article.svg',
            activeIcon: 'assets/images/article-active.svg',
        },
        {
            label: 'saved_posts',
            routerLink: 'saved-posts',
            icon: 'assets/images/saved-post.svg',
            activeIcon: 'assets/images/saved-post-active.svg',
        },
        {
            label: 'assigned_to_me',
            routerLink: 'assigned-to-me',
            icon: 'assets/images/assigned-to-me.svg',
            activeIcon: 'assets/images/assigned-to-me-active.svg',
        },
    ];
    keyword?: string;

    constructor() {}

    ngOnInit(): void {}
}
