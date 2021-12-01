import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-my-answers',
    templateUrl: './my-answers.component.html',
    styleUrls: ['./my-answers.component.scss'],
})
export class MyAnswersComponent implements OnInit, OnDestroy {
    answers: any[] = [];
    sortOptions = [
        { label: 'latest', value: 'desc' },
        { label: 'oldest', value: 'asc' },
    ];
    pageDesc: string;
    isMyPostsPage = false;
    isSavedPostsPage = false;
    isLoading = false;
    forumDeleteSub: Subscription;
    pages = 1;
    totalRecords: number;
    rows = 10;
    displayData: any[] = [];
    answerComment: any;
    answerAllowTranslation: boolean;

    constructor(
        public coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        private router: Router,
    ) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        if (this.pageDesc === 'my-posts') {
            this.isMyPostsPage = true;
            this.getMyAnswers();
        } else if (this.pageDesc === 'saved-posts') {
            this.isSavedPostsPage = true;
            this.getSavedAnswers();
        }
        this.forumDeleteSub = this.coffeeLabService.forumDeleteEvent.subscribe(() => {
            if (this.pageDesc === 'my-posts') {
                this.getMyAnswers();
            } else if (this.pageDesc === 'saved-posts') {
                this.getSavedAnswers();
            }
        });
    }

    getSavedAnswers(): void {
        this.isLoading = true;
        const params = {
            sort_by: 'created_at',
            sort_order: this.coffeeLabService.myAnswersSortBy,
            page: this.pages,
            per_page: this.rows,
        };
        this.coffeeLabService.getSavedForumList('answer', params).subscribe((res) => {
            this.answers = (res.result ?? []).map((item) => {
                if (item.question_slug) {
                    const slug = 'slug';
                    const id = 'id';
                    item[slug] = item.question_slug;
                    item[id] = item.answer_id;
                }
                return item;
            });
            this.totalRecords = res.result_info.total_count;
            this.displayData = this.answers;
            this.isLoading = false;
        });
    }

    getMyAnswers(): void {
        this.isLoading = true;
        const params = {
            sort_by: 'created_at',
            sort_order: this.coffeeLabService.myAnswersSortBy,
            page: this.pages,
            per_page: this.rows,
        };
        this.coffeeLabService.getMyForumList('answer', params).subscribe((res) => {
            this.answers = (res.result ?? []).map((item) => {
                if (item.question_slug) {
                    const slug = 'slug';
                    const id = 'id';
                    item[slug] = item.question_slug;
                    item[id] = item.answer_id;
                }
                return item;
            });
            this.totalRecords = res.result_info.total_count;
            this.displayData = this.answers;
            this.isLoading = false;
        });
    }

    paginate(event: any) {
        if (this.pages !== event.page + 1) {
            this.pages = event.page + 1;
            if (this.pageDesc === 'my-posts') {
                this.getMyAnswers();
            } else if (this.pageDesc === 'saved-posts') {
                this.getSavedAnswers();
            }
        }
    }

    onEditAnswer(event: any, index?: number) {
        if (event) {
            const isEdit = 'isEdit';
            this.answers[index][isEdit] = true;
            this.getForumById(this.answers[index].id);
        }
    }

    getForumById(forumId: number): void {
        this.coffeeLabService.getForumDetails('answer', forumId).subscribe((res: any) => {
            if (res.success) {
                this.answerComment = res.result.answer;
                this.answerAllowTranslation = res.result?.allow_translation;
            } else {
                this.toastrService.error('Error while get comment');
                // this.location.back();
            }
        });
    }

    onEditPost(forumId: number): void {
        if (!this.answerComment) {
            this.toastrService.error('Please fill out field.');
            return;
        }
        let data: any = {};
        data = {
            answer: this.answerComment,
            allow_translation: this.answerAllowTranslation ? (this.answerAllowTranslation ? 1 : 0) : 0,
            status: 'PUBLISHED',
            language: this.coffeeLabService.currentForumLanguage,
        };

        this.isLoading = true;
        if (forumId) {
            this.coffeeLabService.updateForum('answer', forumId, data).subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Your comment updated successfully');
                    this.getMyAnswers();
                } else {
                    this.toastrService.error('Failed to update article.');
                }
            });
        }
    }

    onCancel(index: number) {
        this.answers[index].isEdit = false;
    }

    ngOnDestroy(): void {
        this.forumDeleteSub.unsubscribe();
    }
}
