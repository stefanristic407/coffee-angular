import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoffeeLabService, AuthService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-articles-view',
    templateUrl: './articles-view.component.html',
    styleUrls: ['./articles-view.component.scss'],
})
export class ArticlesViewComponent implements OnInit, OnDestroy {
    keyword?: string;
    translationsList: any[] = [
        {
            label: 'Yes',
            value: true,
        },
        {
            label: 'No',
            value: false,
        },
    ];
    orderList: any[] = [
        {
            label: 'Latest',
            value: 'latest',
        },
        {
            label: 'Oldest',
            value: 'oldest',
        },
    ];
    articlesData: any[] = [];
    isLoading = false;
    organizationId: any;
    destroy$: Subject<boolean> = new Subject<boolean>();
    searchInput$: Subject<any> = new Subject<any>();
    forumLanguage: string;
    constructor(
        public coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        public authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.organizationId = this.authService.getOrgId();
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getData();
        });
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.getData();
        });
        this.searchInput$.pipe(debounceTime(1000)).subscribe(() => {
            this.getData();
        });
    }

    handleSearch(): void {
        this.searchInput$.next(this.keyword);
    }

    reloadPageData(): void {
        this.getData();
    }

    getData(): void {
        this.isLoading = true;
        const params = {
            query: this.keyword,
            translations_available: this.coffeeLabService.articleViewFilterBy,
            sort_by: 'created_at',
            sort_order:
                this.coffeeLabService.articleViewSortBy === '' || this.coffeeLabService.articleViewSortBy === 'latest'
                    ? 'desc'
                    : 'asc',
            publish: true,
            page: 1,
            per_page: 10000,
        };
        this.coffeeLabService.getForumList('article', params, this.forumLanguage).subscribe((res) => {
            if (res.success) {
                this.articlesData = (res.result ?? []).map((item) => {
                    item.content = this.coffeeLabService.getJustText(item.content);
                    return item;
                });
            } else {
                this.toastService.error('Cannot get Articles data');
            }
            this.isLoading = false;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
