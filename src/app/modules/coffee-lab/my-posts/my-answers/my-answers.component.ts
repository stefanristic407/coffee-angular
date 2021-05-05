import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-my-answers',
    templateUrl: './my-answers.component.html',
    styleUrls: ['./my-answers.component.scss'],
})
export class MyAnswersComponent implements OnInit {
    answers: any[] = [];
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Oldest', value: 'oldest' },
    ];
    sortBy = 'latest';
    pageDesc: string;
    isMyPostsPage = false;
    isLoading = false;
    userId: string;
    forumDeleteSub: Subscription;

    constructor(
        private coffeeLabService: CoffeeLabService,
        private cookieService: CookieService,
        private router: Router,
    ) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
        this.userId = this.cookieService.get('user_id');
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
        this.coffeeLabService.getMyForumList('answer').subscribe((res) => {
            this.answers = res.result.map((item) => {
                if (item.question_slug) {
                    const slug = 'slug';
                    const id = 'id';
                    item[slug] = item.question_slug;
                    item[id] = item.answer_id;
                }
                return item;
            });
            this.isLoading = false;
        });
    }
}
