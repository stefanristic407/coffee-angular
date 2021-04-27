import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-qa-forum-view',
    templateUrl: './qa-forum-view.component.html',
    styleUrls: ['./qa-forum-view.component.scss'],
})
export class QaForumViewComponent implements OnInit, OnDestroy {
    isDisplayTip = true;
    viewModeItems: any[] = [{ value: 'list' }, { value: 'grid' }];
    viewMode = 'list';
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Most Answered', value: 'most_answered' },
        { label: 'Oldest', value: 'oldest' },
    ];
    filterOptions = [{ label: 'Posted by: All', value: null }];
    sortBy = 'latest';
    filterBy = null;
    questions: any[] = [];
    isLoading = false;
    keyword = '';
    forumLanguageSub: Subscription;
    forumLanguage: string;

    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        public authService: AuthService,
    ) {}

    ngOnInit(): void {
        window.scroll(0, 0);
        this.getAuthors();
        this.forumLanguageSub = this.coffeeLabService.forumLanguage.subscribe((language) => {
            this.forumLanguage = language;
            this.getQuestions();
        });
    }

    getAuthors(): void {
        this.coffeeLabService.getAuthors('question').subscribe((res: any) => {
            if (res.success) {
                const filterArray = res.result.question_authors.map((item: any) => {
                    return {
                        label: `Posted by: ${item.name}`,
                        value: item.id,
                    };
                });
                this.filterOptions = [...this.filterOptions, ...filterArray];
            } else {
                this.toastService.error('Cannot get authors');
            }
        });
    }

    getQuestions(): void {
        const params = {
            query: this.keyword,
            posted_user_id: this.filterBy,
            sort_by: this.sortBy === 'most_answered' ? 'most_answered' : 'posted_at',
            sort_order: this.sortBy === 'most_answered' ? 'desc' : this.sortBy === 'latest' ? 'desc' : 'asc',
        };
        this.isLoading = true;
        this.coffeeLabService.getForumList('question', params, this.forumLanguage).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                console.log('questions >>>>>>>', res);
                this.questions = res.result?.questions;
            } else {
                this.toastService.error('Cannot get forum data');
            }
        });
    }

    ngOnDestroy(): void {
        this.forumLanguageSub.unsubscribe();
    }
}
