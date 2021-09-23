import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
    destroy$: Subject<boolean> = new Subject<boolean>();
    isLoading = false;
    questions: any[] = [];
    articles: any;
    recipes: any;
    selectedTab = 0;
    slug: string;
    selectedSlugId: number;
    otherCategories: any[] = [];
    categoryName: string;
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
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.onChangeTab(0);
        });
    }

    onChangeTab(index: number) {
        this.selectedTab = index;
        if (this.selectedTab === 0) {
            this.getCategories();
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

    getCategories() {
        this.otherCategories = [];
        this.categoryName = '';
        this.coffeeLabService.getCategory(this.coffeeLabService.currentForumLanguage).subscribe((res) => {
            if (res.success) {
                // this.updateSlug(res.result);
                this.otherCategories = res.result.filter((item) => item.slug !== this.slug);
                res.result.filter((item) => {
                    if (item.slug === this.slug) {
                        this.categoryName = item.name;
                    }
                });
                res.result.filter((item) => {
                    if (item.slug === this.slug) {
                        this.selectedSlugId = item.parent_id;
                    }
                });
            }
        });
    }

    updateSlug(data) {
        data.filter((item) => {
            if (item.parent_id === this.selectedSlugId) {
                this.slug = item.slug;
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
