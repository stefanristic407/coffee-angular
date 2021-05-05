import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'app-my-posts-view',
    templateUrl: './my-posts-view.component.html',
    styleUrls: ['./my-posts-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MyPostsViewComponent implements OnInit {
    menuItems = [
        {
            label: 'qa_post',
            routerLink: ['qa-post'],
        },
        {
            label: 'article',
            routerLink: ['article'],
        },
        {
            label: 'recipe',
            routerLink: ['recipe'],
        },
        {
            label: 'my_answers',
            routerLink: ['answer'],
        },
        {
            label: 'my_comments',
            routerLink: ['comment'],
        },
    ];
    constructor() {}

    ngOnInit(): void {}
}
