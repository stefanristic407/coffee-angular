import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-articles-view',
    templateUrl: './articles-view.component.html',
    styleUrls: ['./articles-view.component.scss'],
})
export class ArticlesViewComponent extends DestroyableComponent implements OnInit {
    keyword?: string;
    translationsList: any[] = [
        { label: 'yes', value: true },
        { label: 'no', value: false },
    ];
    orderList: any[] = [
        { label: 'latest', value: 'latest' },
        { label: 'oldest', value: 'oldest' },
    ];
    articlesData: any[] = [];
    isLoading = false;
    organizationId: any;
    searchInput$: Subject<any> = new Subject<any>();
    forumLanguage: string;
    categoryList: any;
    pages = 1;
    totalRecords: number;
    rows = 9;

    constructor(
        public coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        public authService: AuthService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.organizationId = this.authService.getOrgId();
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getData();
            this.getCategory();
        });
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.unsubscribeAll$)).subscribe(() => {
            this.getData();
        });
        this.searchInput$.pipe(debounceTime(1000)).subscribe(() => {
            this.getData();
        });
    }

    handleSearch(): void {
        this.searchInput$.next(this.keyword);
    }

    getCategory() {
        const params = {
            language: this.coffeeLabService.currentForumLanguage,
        };
        this.coffeeLabService.getCategory(params).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
        });
    }

    getData(): void {
        this.isLoading = true;
        const params = {
            query: this.keyword,
            translations_available: this.coffeeLabService.articleViewFilterBy,
            sort_by: 'created_at',
            sort_order:
                this.coffeeLabService.articleViewSortBy === null || this.coffeeLabService.articleViewSortBy === 'latest'
                    ? 'desc'
                    : 'asc',
            publish: true,
            category_id: this.coffeeLabService.articleViewCategory,
            page: this.pages,
            per_page: this.rows,
        };
        this.coffeeLabService.getForumList('article', params, this.forumLanguage).subscribe((res) => {
            if (res.success) {
                this.articlesData = (res.result ?? []).map((item) => {
                    item.content = this.coffeeLabService.getJustText(item.content);
                    return item;
                });
                this.totalRecords = res.result_info.total_count;
            } else {
                this.toastService.error('Cannot get Articles data');
            }
            this.isLoading = false;
        });
    }

    paginate(event: any) {
        if (this.pages !== event.page + 1) {
            this.pages = event.page + 1;
            window.scroll(0, 0);
            this.getData();
        }
    }
}
