import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GlobalsService } from '@services';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    providers: [TitleCasePipe],
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
            icon: 'assets/images/my-posts.svg',
            activeIcon: 'assets/images/my-posts-active.svg',
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
    breadcrumbItems: MenuItem[];

    constructor(public globals: GlobalsService, private titleCasePipe: TitleCasePipe) {}

    ngOnInit(): void {
        this.breadcrumbItems = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            { label: this.globals.languageJson?.brand_and_experience },
            { label: this.titleCasePipe.transform(this.globals.languageJson?.the_coffee_lab) },
        ];
    }
}
