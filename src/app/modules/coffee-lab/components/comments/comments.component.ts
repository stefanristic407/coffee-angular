import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnChanges {
    @Input() commentData?: any[];
    @Output() postComment = new EventEmitter();
    commentList?: any[];
    comment?: string;

    constructor() {}

    ngOnInit(): void {
        this.commentList = this.commentData?.slice(0, 3);
    }

    ngOnChanges(): void {
        this.comment = '';
        this.commentList = this.commentData?.slice(0, 3);
    }

    addComment(): void {
        this.postComment.emit({
            comment: this.comment,
        });
    }

    onClickMoreComment(): void {
        this.commentList = this.commentData;
    }
}
