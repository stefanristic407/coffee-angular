import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
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
    isLoading = false;
    questions: any[] = [];
    forumLanguage: string;
    articles: any;
    recipes: any;
    selectedTab = 0;
    slug: string;
    otherCategories: any[] = [];
    categoryName: string;
    topWriters: any[] = [];
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Most answered', value: 'most_answered' },
        { label: 'Oldest', value: 'oldest' },
    ];
    filterPostedByOptions = [
        {
            label: 'Coffee experts',
            value: false,
        },
        {
            label: 'End consumers',
            value: true,
        },
    ];
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
    categoryList: any;

    constructor(
        public location: Location,
        public coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        public authService: AuthService,
        private activateRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.activateRoute.params.subscribe((parmas) => {
            this.slug = parmas.slug;
        });
    }

    ngOnInit(): void {
        this.onChangeTab(0);
    }

    onChangeTab(index: number) {
        this.selectedTab = index;
        if (this.selectedTab === 0) {
            this.getQuestions();
            this.getCategories();
            this.getAllTopWriters();
        } else if (this.selectedTab === 1) {
            this.getArticles();
        } else if (this.selectedTab === 2) {
            this.getRecipes();
        }
    }

    getQuestions(): void {
        const params = {
            is_consumer: this.coffeeLabService.qaForumViewFilterBy || '',
            sort_by: this.coffeeLabService.qaForumViewSortBy === 'most_answered' ? 'most_answered' : 'posted_at',
            sort_order:
                this.coffeeLabService.qaForumViewSortBy === 'most_answered'
                    ? 'desc'
                    : this.coffeeLabService.qaForumViewSortBy === 'latest' ||
                      this.coffeeLabService.qaForumViewSortBy === ''
                    ? 'desc'
                    : 'asc',
            publish: true,
            category_slug: this.coffeeLabService.qaForumViewCategory || this.slug,
            page: 1,
            per_page: 10000,
        };
        this.isLoading = true;
        this.coffeeLabService.getForumList('question', params, this.forumLanguage).subscribe((res: any) => {
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
            sort_order: 'desc',
            translations_available: this.coffeeLabService.articleViewFilterBy,
            publish: true,
            category_slug: this.coffeeLabService.articleViewCategory || this.slug,
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
            sort_order: 'desc',
            publish: true,
            translations_available: this.coffeeLabService.recipeViewIsAvailableTranslation,
            category_slug: this.coffeeLabService.recipeViewCategory || this.slug,
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

    getCategories() {
        this.otherCategories = [];
        this.categoryName = '';
        this.coffeeLabService.getCategory().subscribe((res) => {
            if (res.success) {
                this.otherCategories = res.result.filter((item) => item.slug !== this.slug);
                this.categoryList = res.result;
                res.result.filter((item) => {
                    if (item.slug === this.slug) {
                        this.categoryName = item.name;
                    }
                });
            }
        });
    }

    getAllTopWriters() {
        this.coffeeLabService.getTopWriters({ count: 4 }).subscribe((res) => {
            if (res.success) {
                this.topWriters = res.result;
            }
        });
    }

    onCategoryClick(slug: string) {
        this.router.navigateByUrl('/coffee-lab/category/' + slug);
        this.onChangeTab(0);
    }
}
