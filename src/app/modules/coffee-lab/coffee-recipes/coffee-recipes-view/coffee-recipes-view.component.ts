import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

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
    categoryList: any;
    pages = 1;
    totalRecords: number;
    rows = 9;
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
    levels: any[] = [];
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
            this.getCategory();
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
            page: this.pages,
            per_page: this.rows,
        };
        this.coffeeLabService.getForumList('recipe', params, this.forumLanguage).subscribe((res) => {
            if (res.success) {
                this.coffeeRecipeData = (res.result ?? []).map((item) => {
                    item.description = this.coffeeLabService.getJustText(item.description);
                    return item;
                });
                if (this.coffeeLabService.currentForumLanguage === 'en') {
                    this.levels = [
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
                } else if (this.coffeeLabService.currentForumLanguage === 'sv') {
                    this.levels = [
                        {
                            label: 'Lätt',
                            value: 'lätt',
                        },
                        {
                            label: 'Mellanliggande',
                            value: 'Mellanliggande',
                        },
                        {
                            label: 'Hård',
                            value: 'Hård',
                        },
                    ];
                } else if (this.coffeeLabService.currentForumLanguage === 'pt') {
                    this.levels = [
                        {
                            label: 'Fácil',
                            value: 'Fácil',
                        },
                        {
                            label: 'Intermediário',
                            value: 'Intermediário',
                        },
                        {
                            label: 'Duro',
                            value: 'Duro',
                        },
                    ];
                } else if (this.coffeeLabService.currentForumLanguage === 'es') {
                    this.levels = [
                        {
                            label: 'Fácil',
                            value: 'Fácil',
                        },
                        {
                            label: 'Intermedio',
                            value: 'Intermedio',
                        },
                        {
                            label: 'Duro',
                            value: 'Duro',
                        },
                    ];
                }
                this.totalRecords = res.result_info.total_count;
            } else {
                this.toastService.error('Cannot get Recipes data');
            }
            this.isLoading = false;
        });
    }

    paginate(event: any) {
        if (this.pages !== event.page + 1) {
            this.pages = event.page + 1;
            this.getCoffeeRecipesData();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
