import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-article-blog',
    templateUrl: './article-blog.component.html',
    styleUrls: ['./article-blog.component.scss'],
})
export class ArticleBlogComponent implements OnInit {
    @Input() articleDate;
    @Input() title;
    @Input() description;
    @Input() articleUrl;
    @Input() articleImageUrl;
    constructor() {}

    ngOnInit(): void {}
}
