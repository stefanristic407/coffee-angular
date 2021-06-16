import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { CookieService } from 'ngx-cookie-service';
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

    constructor(
        public coffeeLabService: CoffeeLabService,
        private cookieService: CookieService,
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

    ngOnDestroy(): void {
        this.forumDeleteSub.unsubscribe();
    }
}
