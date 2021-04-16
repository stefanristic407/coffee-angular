import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '@services';

@Component({
    selector: 'app-my-comments',
    templateUrl: './my-comments.component.html',
    styleUrls: ['./my-comments.component.scss'],
})
export class MyCommentsComponent implements OnInit {
    comments: any[] = [];
    filteredComments: any[] = [];
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Oldest', value: 'oldest' },
    ];
    sortBy = 'latest';
    shortComments = false;
    result: any;
    constructor(private userService: UserService) {}

    ngOnInit(): void {}
}
