import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-coffee-recipes-view',
    templateUrl: './coffee-recipes-view.component.html',
    styleUrls: ['./coffee-recipes-view.component.scss'],
})
export class CoffeeRecipesViewComponent extends DestroyableComponent implements OnInit {
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
        { label: 'yes', value: true },
        { label: 'no', value: false },
    ];
    levels = [
        { label: 'expertise_easy', value: 'expertise_easy' },
        { label: 'expertise_intermediate', value: 'expertise_intermediate' },
        { label: 'expertise_hard', value: 'expertise_hard' },
    ];
    orderList: any[] = [
        { label: 'latest', value: 'latest' },
        { label: 'oldest', value: 'oldest' },
    ];

    constructor(
        private toastService: ToastrService,
        public coffeeLabService: CoffeeLabService,
        public authService: AuthService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.organizationId = this.authService.getOrgId();
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getCoffeeRecipesData();
            this.getCategory();
        });
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.unsubscribeAll$)).subscribe(() => {
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
        const params = { language: this.coffeeLabService.currentForumLanguage, is_recipe: true };
        this.coffeeLabService.getCategory(params).subscribe((category) => {
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
            category_id: this.coffeeLabService.recipeViewCategory,
            page: this.pages,
            per_page: this.rows,
        };
        this.coffeeLabService.getForumList('recipe', params, this.forumLanguage).subscribe((res) => {
            if (res.success) {
                this.coffeeRecipeData = (res.result ?? []).map((item) => {
                    item.description = this.coffeeLabService.getJustText(item.description);
                    return item;
                });
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
            window.scroll(0, 0);
            this.getCoffeeRecipesData();
        }
    }
}
