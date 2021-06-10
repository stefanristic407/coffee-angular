import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService, CoffeeLabService } from '@services';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { ApiResponse } from '@models';

@Component({
    selector: 'app-coffee-recipes-view',
    templateUrl: './coffee-recipes-view.component.html',
    styleUrls: ['./coffee-recipes-view.component.scss'],
})
export class CoffeeRecipesViewComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();
    isAvailableTranslation = '';
    organizationId: any;
    label?: string;
    ingredientValue?: string;
    searchQuery = '';
    searchIngredient = '';
    coffeeRecipeData: any[] = [];
    isLoading = false;
    forumLanguage: string;
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
    labels: any[] = [
        {
            label: 'Easy',
            value: 'Easy',
        },
        {
            label: 'Intermediate',
            value: 'Intermediate',
        },
        {
            label: 'Hard',
            value: 'Hard',
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
    selectedOrder = 'latest';
    pageDesc: string | undefined;
    @ViewChild('paginator', {static: false}) private paginator: Paginator;
    perPage = 9;
    totalRecords = 0;
    hidePaginator = false;

    constructor(
        private toastService: ToastrService,
        private router: Router,
        public coffeeLabService: CoffeeLabService,
        public authService: AuthService,
    ) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        this.organizationId = this.authService.getOrgId();
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getCoffeeRecipesData();
        });
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.getCoffeeRecipesData();
        });
    }

    reloadPageData(): void {
        this.hidePaginator = true;
        this.getCoffeeRecipesData();
    }

    getCoffeeRecipesData(page = 1): void {
        this.isLoading = true;
        const params = {
            query: this.searchQuery,
            ingredient: this.searchIngredient,
            translations_available: this.isAvailableTranslation,
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' ? 'desc' : 'asc',
            level: this.label?.toLowerCase(),
            publish: true,
            page,
            per_page: this.perPage
        };
        console.log('query param >>>>>>> ', params);
        if (this.pageDesc === 'saved-posts') {
            this.coffeeLabService.getSavedForumList('recipe', params).subscribe((res) => {
                this.handleRecipeDataResponse(res);
            });
        } else if (this.pageDesc === 'my-posts') {
            this.coffeeLabService.getMyForumList('recipe').subscribe((res) => {
                this.handleRecipeDataResponse(res);
            });
        } else {
            this.coffeeLabService.getForumList('recipe', params, this.forumLanguage).subscribe((res) => {
                this.handleRecipeDataResponse(res);
            });
        }
    }

    handleRecipeDataResponse(res: ApiResponse<any>): void {
        if (res.success) {
            this.coffeeRecipeData = (res.result ?? []).map((item) => {
                item.description = this.getJustText(item.description);
                return item;
            });
            this.totalRecords = res.result_info.total_count;
            this.hidePaginator = false;
        } else {
            this.toastService.error('Cannot get Recipes data');
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
        this.getCoffeeRecipesData(event.page + 1);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
