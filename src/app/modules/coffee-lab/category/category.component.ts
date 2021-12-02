import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends DestroyableComponent implements OnInit {
    isLoading = false;
    questions: any[] = [];
    articles: any;
    recipes: any;
    selectedTab = 0;
    slug: string;
    currentCategory: any;
    otherCategories: any[] = [];
    isCategoryCall = 0;
    cuurentLangCode: string;
    topWriters: any[] = [];
    menuItems = [
        {
            label: 'qa_forum',
            icon: 'assets/images/qa-forum.svg',
            activeIcon: 'assets/images/qa-forum-active.svg',
        },
        {
            label: 'posts',
            icon: 'assets/images/article.svg',
            activeIcon: 'assets/images/article-active.svg',
        },
        {
            label: 'brewing_guides',
            icon: 'assets/images/coffee-recipe.svg',
            activeIcon: 'assets/images/coffee-recipe-active.svg',
        },
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

    constructor(
        public coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        public authService: AuthService,
        private activateRoute: ActivatedRoute,
        private router: Router,
    ) {
        super();
        this.activateRoute.params.subscribe((parmas) => {
            this.slug = parmas.slug;
            if (this.isCategoryCall !== 1) {
                this.getCategories(this.cuurentLangCode !== this.coffeeLabService.currentForumLanguage);
            }
            this.isCategoryCall++;
        });
        this.cuurentLangCode = this.coffeeLabService.currentForumLanguage;
    }

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            if (this.isCategoryCall !== 1) {
                this.getCategories(this.cuurentLangCode !== language);
            }
            this.isCategoryCall++;
        });
    }

    onChangeTab(index: number) {
        this.selectedTab = index;
        if (this.selectedTab === 0) {
            this.getQuestions();
            this.getAllTopWriters();
        } else if (this.selectedTab === 1) {
            this.getArticles();
        } else if (this.selectedTab === 2) {
            this.getRecipes();
        }
        window.scroll(0, 0);
    }

    getQuestions(): void {
        const params = {
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
            category_slug: this.slug,
            page: 1,
            per_page: 10000,
        };
        this.isLoading = true;
        this.coffeeLabService
            .getForumList('question', params, this.coffeeLabService.currentForumLanguage)
            .subscribe((res: any) => {
                this.isLoading = false;
                if (res.success) {
                    this.questions = res.result?.questions;
                } else {
                    this.toastService.error('Cannot get forum data');
                }
            });
    }

    getArticles(): void {
        const params = {
            sort_by: 'created_at',
            sort_order:
                this.coffeeLabService.articleViewFilterBy === 'latest' ||
                this.coffeeLabService.articleViewFilterBy === null
                    ? 'desc'
                    : 'asc',
            translations_available: this.coffeeLabService.articleViewFilterBy,
            publish: true,
            category_slug: this.slug,
            page: 1,
            per_page: 10000,
        };
        this.isLoading = true;
        this.coffeeLabService.getForumList('article', params).subscribe((res) => {
            if (res.success) {
                this.articles = res.result;
            } else {
                this.toastService.error('Cannot get Articles data');
            }
            this.isLoading = false;
        });
    }

    getRecipes(): void {
        const params = {
            sort_by: 'created_at',
            sort_order:
                this.coffeeLabService.recipeViewSortBy === 'latest' || this.coffeeLabService.recipeViewSortBy === null
                    ? 'desc'
                    : 'asc',
            publish: true,
            translations_available: this.coffeeLabService.recipeViewIsAvailableTranslation,
            category_slug: this.slug,
            page: 1,
            per_page: 10000,
        };
        this.isLoading = true;
        this.coffeeLabService.getForumList('recipe', params).subscribe((res) => {
            if (res.success) {
                this.recipes = res.result;
            } else {
                this.toastService.error('Cannot get Articles data');
            }
            this.isLoading = false;
        });
    }

    getCategories(isLangChanged: boolean) {
        this.otherCategories = [];
        this.coffeeLabService.getCategory(this.coffeeLabService.currentForumLanguage).subscribe((res) => {
            if (res.success) {
                if (isLangChanged) {
                    const isCategory = res.result.find(
                        (element) => element.parent_id === this.currentCategory?.parent_id,
                    );
                    if (isCategory) {
                        this.router.navigateByUrl('/coffee-lab/category/' + isCategory.slug);
                        this.currentCategory = isCategory;
                        this.cuurentLangCode = isCategory.language;
                    } else {
                        this.asssignCategories(res.result);
                    }
                } else {
                    this.asssignCategories(res.result);
                }
            }
        });
    }

    asssignCategories(data: any) {
        this.otherCategories = data.filter((element) => element.slug !== this.slug);
        this.currentCategory = data.find((item) => item.slug === this.slug);
        this.onChangeTab(this.selectedTab);
    }

    getAllTopWriters() {
        this.coffeeLabService.getTopWriters({ count: 4 }).subscribe((res) => {
            if (res.success) {
                this.topWriters = res.result;
            }
        });
    }

    onBack() {
        if (this.selectedTab === 0) {
            this.router.navigateByUrl('coffee-lab/overview/qa-forum');
        } else if (this.selectedTab === 1) {
            this.router.navigateByUrl('coffee-lab/overview/articles');
        } else if (this.selectedTab === 2) {
            this.router.navigateByUrl('coffee-lab/overview/coffee-recipes');
        }
    }
}
