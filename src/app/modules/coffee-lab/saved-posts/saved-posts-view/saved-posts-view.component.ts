import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-saved-posts-view',
    templateUrl: './saved-posts-view.component.html',
    styleUrls: ['./saved-posts-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SavedPostsViewComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}