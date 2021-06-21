import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-qa-forum-view',
    templateUrl: './qa-forum-view.component.html',
    styleUrls: ['./qa-forum-view.component.scss'],
})
export class QaForumViewComponent implements OnInit, OnDestroy {
    viewModeItems: any[] = [{ value: 'list' }, { value: 'grid' }];
    viewMode = 'list';
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Most Answered', value: 'most_answered' },
        { label: 'Oldest', value: 'oldest' },
    ];
    filterOptions = [
        {
            label: 'Coffee experts',
            value: false,
        },
        {
            label: 'End consumers',
            value: true,
        },
    ];
    questions: any[] = [];
    isLoading = false;
    keyword = '';
    destroy$: Subject<boolean> = new Subject<boolean>();
    searchInput$: Subject<any> = new Subject<any>();
    forumLanguage: string;

    constructor(
        public coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        public authService: AuthService,
    ) {}

    ngOnInit(): void {
        window.scroll(0, 0);
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getQuestions();
        });
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.getQuestions();
        });
        this.searchInput$.pipe(debounceTime(1000)).subscribe(() => {
            this.getQuestions();
        });
    }

    handleSearch(): void {
        this.searchInput$.next(this.keyword);
    }

    getQuestions(): void {
        const params = {
            query: this.keyword,
            is_consumer: this.coffeeLabService.qaForumViewFilterBy,
            sort_by: this.coffeeLabService.qaForumViewSortBy === 'most_answered' ? 'most_answered' : 'posted_at',
            sort_order:
                this.coffeeLabService.qaForumViewSortBy === 'most_answered'
                    ? 'desc'
                    : this.coffeeLabService.qaForumViewSortBy === 'latest'
                    ? 'desc'
                    : 'asc',
            publish: true,
            page: 1,
            per_page: 10000,
        };
        this.isLoading = true;
        this.coffeeLabService.getForumList('question', params, this.forumLanguage).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                this.questions = res.result?.questions;
            } else {
                this.toastService.error('Cannot get forum data');
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
