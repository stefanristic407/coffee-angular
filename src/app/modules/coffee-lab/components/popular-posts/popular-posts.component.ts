import { Component, Input, OnInit } from '@angular/core';
import { PostType } from '@enums';

@Component({
    selector: 'app-popular-posts',
    templateUrl: './popular-posts.component.html',
    styleUrls: ['./popular-posts.component.scss'],
})
export class PopularPostsComponent implements OnInit {
    readonly PostType = PostType;
    @Input() relatedData: any[] = [];
    @Input() type: string;

    constructor() {}

    ngOnInit(): void {}

    onFocus() {}

    onRealtedRoute(slug: string) {
        return `/coffee-lab/${this.type === 'article' ? 'articles' : 'coffee-recipes'}/${slug}`;
    }
}
