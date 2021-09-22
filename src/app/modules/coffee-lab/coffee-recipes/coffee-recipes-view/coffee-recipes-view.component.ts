import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService, CoffeeLabService } from '@services';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-coffee-recipes-view',
    templateUrl: './coffee-recipes-view.component.html',
    styleUrls: ['./coffee-recipes-view.component.scss'],
})
export class CoffeeRecipesViewComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();
    searchInput$: Subject<any> = new Subject<any>();
    organizationId: any;
    keyword = '';
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
    levels: any[] = [
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
    categoryList: any;

    constructor(
        private toastService: ToastrService,
        public coffeeLabService: CoffeeLabService,
        public authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.organizationId = this.authService.getOrgId();
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getCoffeeRecipesData();
        });
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.getCoffeeRecipesData();
        });
        this.searchInput$.pipe(debounceTime(1000)).subscribe(() => {
            this.getCoffeeRecipesData();
        });
        this.getCategory();
    }

    handleSearch(): void {
        this.searchInput$.next(this.keyword);
    }

    reloadPageData(): void {
        this.getCoffeeRecipesData();
    }

    getCategory() {
        this.coffeeLabService.getCategory(this.coffeeLabService.currentForumLanguage).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
        });
    }

    getCoffeeRecipesData(): void {
        this.isLoading = true;
        const params = {
            query: this.keyword,
            ingredient: this.searchIngredient,
            translations_available: this.coffeeLabService.recipeViewIsAvailableTranslation || '',
            sort_by: 'created_at',
            sort_order:
                this.coffeeLabService.recipeViewSortBy === null || this.coffeeLabService.recipeViewSortBy === 'latest'
                    ? 'desc'
                    : 'asc',
            level: this.coffeeLabService.recipeViewLevel?.toLowerCase(),
            publish: true,
            category_slug: this.coffeeLabService.recipeViewCategory,
            page: 1,
            per_page: 10000,
        };
        this.coffeeLabService.getForumList('recipe', params, this.forumLanguage).subscribe((res) => {
            if (res.success) {
                this.coffeeRecipeData = (res.result ?? []).map((item) => {
                    item.description = this.coffeeLabService.getJustText(item.description);
                    return item;
                });
            } else {
                this.toastService.error('Cannot get Recipes data');
            }
            this.isLoading = false;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
