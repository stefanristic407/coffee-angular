import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeLabService, AuthService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiResponse } from '@models';
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
    isAvailableTranslation?: any;
    selectedOrder = 'latest';
    articlesData: any[] = [];
    isLoading = false;
    pageDesc: string | undefined;
    organizationId: any;
    destroy$: Subject<boolean> = new Subject<boolean>();
    forumLanguage: string;
    constructor(
        public coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private router: Router,
        private coffeeLab: CoffeeLabService,
        public authService: AuthService,
    ) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }
    perPage = 9;
    totalRecords = 0;
    hidePaginator = false;

    ngOnInit(): void {
        this.organizationId = this.authService.getOrgId();
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getData();
        });
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.getData();
        });
    }

    reloadPageData(): void {
        this.hidePaginator = true;
        this.getData();
    }

    getData(page = 1): void {
        this.isLoading = true;
        const params = {
            query: this.keyword,
            translations_available: this.isAvailableTranslation,
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' ? 'desc' : 'asc',
            publish: true,
            page,
            per_page: this.perPage
        };
        if (this.pageDesc === 'saved-posts') {
            this.coffeeLab.getSavedForumList('article', params).subscribe((res) => {
                this.handleDataResponse(res);
            });
        } else if (this.pageDesc === 'my-posts') {
            this.coffeeLab.getMyForumList('article').subscribe((res) => {
                this.handleDataResponse(res);
            });
        } else {
            this.coffeeLabService.getForumList('article', params, this.forumLanguage).subscribe((res) => {
               this.handleDataResponse(res);
            });
        }
    }

    handleDataResponse(res: ApiResponse<any>): void {
        if (res.success) {
            this.articlesData = (res.result ?? []).map((item) => {
                item.content = this.getJustText(item.content);
                return item;
            });
            this.totalRecords = res.result_info.total_count;
            this.hidePaginator = false;
        } else {
            this.toastService.error('Cannot get Articles data');
        }
        this.isLoading = false;
    }

    getJustText(content: any) {
        const contentElement = document.createElement('div');
        contentElement.innerHTML = content;
        const images = contentElement.querySelectorAll('img');
        images.forEach((image) => {
            image.parentNode.removeChild(image);
        });
        return contentElement.innerHTML;
    }

    paginate(event: any) {
        this.getData(event.page + 1);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
