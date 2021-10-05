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
        { label: 'Latest', value: 'desc' },
        { label: 'Oldest', value: 'asc' },
    ];
    pageDesc: string;
    isMyPostsPage = false;
    isLoading = false;
    forumDeleteSub: Subscription;
    totalRecords = 0;
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
        this.getAnswers();
        if (this.pageDesc === 'my-posts') {
            this.isMyPostsPage = true;
        }
        this.forumDeleteSub = this.coffeeLabService.forumDeleteEvent.subscribe(() => {
            this.getAnswers();
        });
    }

    getAnswers(): void {
        this.isLoading = true;
        const params = {
            sort_by: 'created_at',
            sort_order: this.coffeeLabService.myAnswersSortBy,
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
            this.totalRecords = this.answers.length;
            this.displayData = this.answers.slice(0, 10);
            this.isLoading = false;
        });
    }

    paginate(event: any) {
        this.displayData = this.answers.slice(event.first, event.first + event.rows);
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
                    this.getAnswers();
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
