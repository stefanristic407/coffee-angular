import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '@services';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnChanges {
    @Input() commentData?: any[];
    @Input() forumId: any;
    @Input() forumType: string;
    commentList?: any[];

    constructor(public authService: AuthService) {}

    ngOnInit(): void {
        this.commentList = this.commentData?.slice(0, 3);
    }

    ngOnChanges(): void {
        this.commentList = this.commentData?.slice(0, 3);
    }

    onClickMoreComment(): void {
        this.commentList = this.commentData;
    }
}
