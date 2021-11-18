import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-qa-forum-view',
    templateUrl: './qa-forum-view.component.html',
    styleUrls: ['./qa-forum-view.component.scss'],
})
export class QaForumViewComponent implements OnInit, OnDestroy {
    viewMode = 'list';
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Most answered', value: 'most_answered' },
        { label: 'Oldest', value: 'oldest' },
    ];
    filterPostedByOptions = [
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
    forumLanguage: string;
    searchInput$: Subject<any> = new Subject<any>();
    categoryList: any;
    pages = 1;
    totalRecords: number;
    rows = 10;

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
            this.getCategory();
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
        this.isLoading = true;
        const params = {
            query: this.keyword,
            is_consumer: this.coffeeLabService.qaForumViewFilterBy || '',
            sort_by: this.coffeeLabService.qaForumViewSortBy === 'most_answered' ? 'most_answered' : 'posted_at',
            sort_order:
                this.coffeeLabService.qaForumViewSortBy === 'most_answered'
                    ? 'desc'
                    : this.coffeeLabService.qaForumViewSortBy === 'latest' ||
                      this.coffeeLabService.qaForumViewSortBy === null
                    ? 'desc'
                    : 'asc',
            publish: true,
            category_id: this.coffeeLabService.qaForumViewCategory,
            page: this.pages,
            per_page: this.rows,
        };
        this.coffeeLabService.getForumList('question', params, this.forumLanguage).subscribe((res: any) => {
            if (res.success) {
                this.questions = res.result?.questions;
                this.totalRecords = res.result_info.total_count;
                this.isLoading = false;
            } else {
                this.toastService.error('Cannot get questions');
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    getCategory() {
        this.coffeeLabService.getCategory(this.coffeeLabService.currentForumLanguage).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
        });
    }

    paginate(event: any) {
        if (this.pages !== event.page + 1) {
            this.pages = event.page + 1;
            this.getQuestions();
        }
    }
}
