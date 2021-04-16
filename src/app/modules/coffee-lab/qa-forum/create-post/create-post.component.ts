import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@app/shared/components/confirm/confirm.component';
import { DraftPostsComponent } from '@modules/coffee-lab/qa-forum/create-post/draft-posts/draft-posts.component';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
    isAllowTranslation = true;
    content?: string;
    isPosting = false;

    constructor(
        public location: Location,
        public dialogService: DialogService,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        private router: Router,
    ) {}

    ngOnInit(): void {}

    onOpenDraftPosts(): void {
        this.dialogService.open(DraftPostsComponent, {
            showHeader: false,
            styleClass: 'draft-posts',
        });
    }

    onPostQuestion(status: string): void {
        if (!this.content) {
            this.toastrService.error('Please type your question.');
            return;
        }
        if (this.content.length < 10) {
            this.toastrService.error('Question is too short.');
            return;
        }
        if (this.content.length > 300) {
            this.toastrService.error('Question is too long.');
            return;
        }
        const data = {
            question: this.content,
            allow_translation: this.isAllowTranslation ? 1 : 0,
            status,
            language: 'en',
        };
        this.isPosting = true;
        this.coffeeLabService.postQuestion(data).subscribe((res: any) => {
            this.isPosting = false;
            console.log('post question result >>>', res);
            if (res.success) {
                this.toastrService.success('You have posted a question successfully.');
                this.router.navigate(['/coffee-lab']);
            } else {
                this.toastrService.error('Failed to post question.');
            }
        });
    }
}
