import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { PostType } from '@enums';
import { CoffeeLabService, StartupService } from '@services';
import { forkJoin, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-global-search',
    templateUrl: './global-search.component.html',
    styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent extends DestroyableComponent implements OnInit {
    readonly PostType = PostType;
    isLoading: boolean;
    keyword = '';
    searchResult: any;
    searchInput$: Subject<any> = new Subject<any>();
    selectedTab: any = 0;
    sortBy: any;
    filterBy: any;
    isAvailableTranslation?: any;
    selectedOrder: string;
    selectedRecipeOrder: string;
    isAvailableRecipeTranslation?: any;
    selectedCategory: any;
    level: any;
    levels = [
        { label: 'expertise_easy', value: 'expertise_easy' },
        { label: 'expertise_intermediate', value: 'expertise_intermediate' },
        { label: 'expertise_hard', value: 'expertise_hard' },
    ];
    sortOptions = [
        { label: 'latest', value: 'latest' },
        { label: 'most_answered', value: 'most_answered' },
        { label: 'oldest', value: 'oldest' },
    ];
    filterPostedByOptions = [
        { label: 'coffee_experts', value: false },
        { label: 'coffee_consumer', value: true },
    ];
    translationsList: any[] = [
        { label: 'yes', value: true },
        { label: 'no', value: false },
    ];
    orderList: any[] = [
        { label: 'latest', value: 'latest' },
        { label: 'oldest', value: 'oldest' },
    ];
    categoryList: any;
    tabMenuItems: { label: string; postType: PostType }[] = [];
    rows = 9;
    page = 1;

    get postType(): PostType {
        return this.tabMenuItems[this.selectedTab]?.postType || PostType.QA;
    }

    constructor(
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private route: ActivatedRoute,
        private startupService: StartupService,
    ) {
        super();
        const searchQueryParam = this.route.snapshot.queryParamMap.get('query');
        if (searchQueryParam) {
            this.keyword = searchQueryParam;
        }
        this.searchInput$.pipe(debounceTime(1000)).subscribe(() => {
            if (this.keyword) {
                this.router.navigate([], {
                    queryParams: { query: this.keyword },
                    queryParamsHandling: 'merge',
                });
            }
            this.startSearch();
        });
    }

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.startupService.load(language);
            if (this.router.url !== `/coffee-lab/search?query=${this.keyword}`) {
                this.router.navigate([`/coffee-lab/search`], {
                    queryParams: { query: this.keyword },
                });
            }
            this.startSearch();
        });
        this.scrollTop();
    }

    handleSearch(): void {
        this.searchInput$.next(this.keyword);
    }

    clearFilters() {
        this.sortBy = null;
        this.filterBy = null;
        this.isAvailableTranslation = null;
        this.selectedCategory = null;
        this.page = 1;
        this.router.navigate([], {
            queryParams: { query: this.keyword },
            queryParamsHandling: 'merge',
        });
    }

    getCategory() {
        const params = {
            language: this.coffeeLabService.currentForumLanguage,
            is_recipe: this.postType === PostType.RECIPE,
        };
        this.coffeeLabService.getCategory(params).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
        });
    }

    getPosts() {
        const postType = this.tabMenuItems[this.selectedTab]?.postType;
        if (!postType) {
            return;
        }
        const params = {
            query: this.keyword,
            sort_by:
                postType === PostType.QA
                    ? this.sortBy === 'most_answered'
                        ? 'most_answered'
                        : 'posted_at'
                    : 'created_at',
            sort_order:
                postType === PostType.QA
                    ? this.sortBy === 'most_answered'
                        ? 'desc'
                        : this.sortBy === 'latest' || !this.sortBy
                        ? 'desc'
                        : 'asc'
                    : this.selectedOrder === 'latest' || !this.selectedOrder
                    ? 'desc'
                    : 'asc',
            is_consumer: this.filterBy,
            level: this.level?.toLowerCase(),
            translations_available: this.isAvailableTranslation,
            publish: true,
            category_id: this.selectedCategory,
            page: this.page,
            per_page: this.rows,
        };

        this.isLoading = true;
        this.scrollTop();
        this.coffeeLabService.getForumList(postType, params).subscribe((res: any) => {
            if (res.success) {
                if (postType === PostType.QA) {
                    this.searchResult.questions = res.result.questions;
                    this.searchResult.qa_total_count = res.result_info.total_count || 0;
                } else if (postType === PostType.ARTICLE) {
                    this.searchResult.articles = res.result;
                    this.searchResult.article_total_count = res.result_info.total_count || 0;
                } else if (postType === PostType.RECIPE) {
                    this.searchResult.recipes = res.result;
                    this.searchResult.recipe_total_count = res.result_info.total_count || 0;
                }
            }
            this.isLoading = false;
        });
    }

    startSearch(): void {
        if (!this.keyword) {
            return;
        }
        this.isLoading = true;
        const params = {
            query: this.keyword,
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
            page: this.page,
            per_page: this.rows,
        };
        forkJoin([
            this.coffeeLabService.getForumList(PostType.QA, params),
            this.coffeeLabService.getForumList(PostType.ARTICLE, params),
            this.coffeeLabService.getForumList(PostType.RECIPE, params),
        ]).subscribe((res: any[]) => {
            const questions = res[0]?.result?.questions || [];
            const articles = res[1]?.result || [];
            const recipes = res[2]?.result || [];
            this.searchResult = {
                questions,
                articles,
                recipes,
                qa_total_count: res[0]?.result_info.total_count || 0,
                article_total_count: res[1]?.result_info.total_count || 0,
                recipe_total_count: res[2]?.result_info.total_count || 0,
            };
            this.tabMenuItems = [];
            if (this.searchResult.questions.length > 0) {
                this.tabMenuItems.push({ label: 'question_answers', postType: PostType.QA });
            }
            if (this.searchResult.articles.length > 0) {
                this.tabMenuItems.push({ label: 'posts', postType: PostType.ARTICLE });
            }
            if (this.searchResult.recipes.length > 0) {
                this.tabMenuItems.push({ label: 'brewing_guides', postType: PostType.RECIPE });
            }
            this.selectedTab = 0;
            this.clearFilters();
            this.getCategory();
            this.coffeeLabService.searchResult.next(this.searchResult);
            this.isLoading = false;
        });
    }

    onTabChange(event) {
        this.selectedTab = event.index;
        this.clearFilters();
        this.getPosts();
        this.getCategory();
    }

    onClose(): void {
        this.keyword = '';
        this.router.navigateByUrl('/coffee-lab/overview/qa-forum');
    }

    paginate(event: any) {
        if (this.page !== event.page + 1) {
            this.page = event.page + 1;
            this.scrollTop();
            this.startSearch();
        }
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }
}
