import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-blog-card',
    templateUrl: './blog-card.component.html',
    styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {
    @Input() imgUrl: string;
    @Input() title: string;
    @Input() description: string;
    @Input() link: string;
    constructor() {}

    ngOnInit(): void {}
}
