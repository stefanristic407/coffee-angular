import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService, CoffeeLabService, FileService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-create-answer',
    templateUrl: './create-answer.component.html',
    styleUrls: ['./create-answer.component.scss'],
})
export class CreateAnswerComponent implements OnInit {
    isAllowTranslation = true;
    isPosting = false;
    parentForumType: string;
    forumType: string;
    parentForumId: any;
    forumId: any;
    isLoading: boolean;
    language: string;

    // these 4 parameters are mandatory to use forum-editor
    content: any;
    isUploadingImage = false;
    imageIdList = [];
    images = [];

    constructor(
        public location: Location,
        public dialogService: DialogService,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        public authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.parentForumType = this.route.snapshot.queryParamMap.get('parentForumType') || 'question';
        this.forumType = this.route.snapshot.queryParamMap.get('forumType') || 'answer';
        this.parentForumId = this.route.snapshot.queryParamMap.get('parentForumId');
        this.forumId = this.route.snapshot.queryParamMap.get('forumId');
        this.language = this.coffeeLabService.currentForumLanguage;
        if (this.forumId) {
            this.getForumById();
        }
    }

    getForumById(): void {
        this.isLoading = true;
        this.coffeeLabService.getForumDetails(this.forumType, this.forumId).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                if (this.forumType === 'comment') {
                    this.content = res.result.comment;
                } else {
                    this.language = res.result.lang_code;
                    this.content = res.result.answer;
                    this.images = res.result.images;
                }
            } else {
                this.toastrService.error('Error while get comment');
                this.location.back();
            }
        });
    }

    onPost(status: string): void {
        if (!this.content) {
            this.toastrService.error('Please fill out field.');
            return;
        }
        let data: any = {};
        if (this.forumType === 'answer') {
            data = {
                answer: this.content,
                allow_translation: this.isAllowTranslation ? 1 : 0,
                status,
                images: this.imageIdList,
                language: this.language,
            };
        } else {
            data = {
                comment: this.content,
            };
        }
        this.isPosting = true;
        if (this.forumId) {
            this.coffeeLabService.updateForum(this.forumType, this.forumId, data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    this.toastrService.success('You have updated an article successfully.');
                    this.location.back();
                } else {
                    this.toastrService.error('Failed to update article.');
                }
            });
        } else {
            this.coffeeLabService.postComment(this.parentForumType, this.parentForumId, data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    this.toastrService.success('You have posted a comment successfully.');
                    this.location.back();
                } else {
                    this.toastrService.error('Failed to post comment.');
                }
            });
        }
    }
}
