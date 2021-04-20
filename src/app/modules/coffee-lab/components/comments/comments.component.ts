import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';

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
    profilePic: any;

    constructor(private userService: UserserviceService, private cookieService: CookieService) {}

    ngOnInit(): void {
        this.commentList = this.commentData?.slice(0, 3);
        const roasterId = this.cookieService.get('roaster_id');
        this.userService.getRoasterProfile(roasterId).subscribe((res: any) => {
            if (res.success) {
                this.profilePic = res.result.profile_image_thumb_url;
            }
        });
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
