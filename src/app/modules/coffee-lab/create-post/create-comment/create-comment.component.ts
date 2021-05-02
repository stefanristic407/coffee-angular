import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoffeeLabService, AuthService } from '@services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-create-comment',
    templateUrl: './create-comment.component.html',
    styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent implements OnInit {
    isAllowTranslation = true;
    comment?: string;
    isPosting = false;
    commentId: any;
    isLoading = false;
    forumType: string;
    forumId: any;

    constructor(
        public location: Location,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        private route: ActivatedRoute,
        private toaster: ToastrService,
        public authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.commentId = this.route.snapshot.queryParamMap.get('id');
        this.forumType = this.route.snapshot.queryParamMap.get('forumType');
        this.forumId = this.route.snapshot.queryParamMap.get('forumId');
        if (this.commentId) {
            this.getCommentById();
        }
    }

    getCommentById(): void {
        this.isLoading = true;
        this.coffeeLabService.getComment(this.commentId).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                this.comment = res.result.comment;
            } else {
                this.toaster.error('Error while get comment');
                this.location.back();
            }
        });
    }

    onPostComment(): void {
        if (this.comment?.length) {
            this.isPosting = true;
            const body = {
                comment: this.comment,
            };
            if (this.commentId) {
                this.coffeeLabService.updateForum('comment', this.commentId, body).subscribe((res: any) => {
                    this.isPosting = false;
                    if (res.success) {
                        this.toaster.success('You have updated an article successfully.');
                        this.location.back();
                    } else {
                        this.toaster.error('Failed to update article.');
                    }
                });
            } else {
                this.coffeeLabService.postComment(this.forumType, this.forumId, body).subscribe((res: any) => {
                    this.isPosting = false;
                    if (res.success) {
                        this.location.back();
                    } else {
                        this.toastrService.error('Cannot post comment.');
                    }
                });
            }
        }
    }
}
