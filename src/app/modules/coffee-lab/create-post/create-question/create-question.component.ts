import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { CoffeeLabService } from '@services';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { APP_LANGUAGES } from '@constants';

@Component({
    selector: 'app-create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {
    isAllowTranslation = true;
    content?: string;
    isPosting = false;
    questionId: any;
    isLoading = false;
    languageCode?: string;
    isQuestion = false;
    languageList: any[] = APP_LANGUAGES;
    constructor(
        public location: Location,
        public dialogService: DialogService,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        private toaster: ToastrService,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            const type = params.type;
            if (type === 'question') {
                this.questionId = params.id;
            }
            if (this.questionId) {
                this.getQuestionById();
            } else {
                this.languageCode = this.coffeeLabService.currentForumLanguage;
            }
        });
    }

    getQuestionById(): void {
        this.isLoading = true;
        this.coffeeLabService.getForumDetails('question', this.questionId).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                this.content = res.result.question;
                this.languageCode = res.result.lang_code;
                this.isAllowTranslation = res.result?.allow_translation;
            } else {
                this.toaster.error('Error while get question');
                this.location.back();
            }
        });
    }

    onPostQuestion(status: string): void {
        if (!this.content) {
            this.isQuestion = true;
            this.toastrService.error('Please type your question.');
            return;
        }
        if (this.content.length < 10) {
            this.toastrService.error('Question is too short.');
            return;
        }

        const data = {
            question: this.content,
            allow_translation: this.isAllowTranslation ? 1 : 0,
            status,
            language: this.languageCode,
        };
        this.isPosting = true;
        if (this.questionId) {
            this.coffeeLabService.updateForum('question', this.questionId, data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    if (data.status === 'DRAFT') {
                        this.toaster.success('Your changes have been successfully updated to the draft.');
                    } else {
                        this.toaster.success('You have updated a question successfully.');
                    }
                    this.router.navigate(['/coffee-lab']);
                } else {
                    this.toaster.error('Failed to update question.');
                }
            });
        } else {
            this.coffeeLabService.postForum('question', data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    if (status === 'PUBLISHED') {
                        this.toastrService.success('You have posted a question successfully.');
                    } else if (status === 'DRAFT') {
                        this.toastrService.success('Your question is successfully saved in draft.');
                    }
                    this.router.navigate(['/coffee-lab']);
                } else {
                    this.toastrService.error('Failed to post question.');
                }
            });
        }
    }

    changeLanguage(value) {
        this.coffeeLabService.forumLanguage.next(this.languageCode);
    }
}
