import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { PostType } from '@enums';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-qa-forum-view',
    templateUrl: './qa-forum-view.component.html',
    styleUrls: ['./qa-forum-view.component.scss'],
})
export class QaForumViewComponent extends DestroyableComponent implements OnInit {
    readonly PostType = PostType;
    viewMode = 'list';
    sortOptions = [
        { label: 'latest', value: 'latest' },
        { label: 'most_answered', value: 'most_answered' },
        { label: 'oldest', value: 'oldest' },
    ];
    filterPostedByOptions = [
        { label: 'coffee_experts', value: false },
        { label: 'coffee_consumer', value: true },
    ];
    questions: any[] = [];
    isLoading = false;
    keyword = '';
    forumLanguage: string;
    searchInput$: Subject<any> = new Subject<any>();
    categoryList: any;
    pages = 1;
    totalRecords: number;
    rows = 10;
    testData = new Date();

    constructor(
        public coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        public authService: AuthService,
    ) {
        super();
    }

    ngOnInit(): void {
        window.scroll(0, 0);
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getQuestions();
            this.getCategory();
        });
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.unsubscribeAll$)).subscribe(() => {
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

    getCategory() {
        const params = { language: this.coffeeLabService.currentForumLanguage };
        this.coffeeLabService.getCategory(params).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
        });
    }

    paginate(event: any) {
        if (this.pages !== event.page + 1) {
            this.pages = event.page + 1;
            window.scroll(0, 0);
            this.getQuestions();
        }
    }
}
