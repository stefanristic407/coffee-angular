import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { LinkType, PostType } from '@enums';
import { CoffeeLabService } from '@services';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends DestroyableComponent implements OnInit {
    isLoading = true;
    questions: any[] = [];
    articles: any;
    recipes: any;
    selectedTab = 0;
    slug: string;
    currentCategory: any;
    otherCategories: any[] = [];
    topWriters: any[] = [];
    totalRecords: any;
    rows: number;
    pages = 1;
    menuItems = [];
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
    selectedPostType: string;
    isCategoryCall = 0;
    cuurentLangCode: string;

    constructor(
        private coffeeLabService: CoffeeLabService,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {
        super();
        this.selectedPostType = this.activateRoute.firstChild.routeConfig.path;
        this.activateRoute.params.subscribe((parmas) => {
            this.slug = parmas.slug;
            if (this.selectedPostType === LinkType.QA) {
                this.getCategories(false);
            }
        });
    }

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.onTabChange(this.selectedPostType, true);
            if (this.selectedPostType !== LinkType.QA) {
                this.getSingleCategory(true);
            } else {
                this.getCategories(true);
            }
        });
    }

    getSingleCategory(isLangChanged?: boolean): void {
        this.isLoading = true;
        const params = {
            language: this.coffeeLabService.currentForumLanguage,
            slug: this.currentCategory ? '' : this.slug,
            parent_id: this.currentCategory?.parent_id,
            is_recipe: false,
        };
        if (this.selectedPostType === LinkType.RECIPE) {
            params.is_recipe = true;
        }
        this.coffeeLabService.getCategory(params).subscribe((res) => {
            if (res.success) {
                if (isLangChanged) {
                    this.currentCategory = res.result[0];
                    this.getMenuItems();
                    this.router.navigateByUrl(
                        '/coffee-lab/category/' + this.currentCategory.slug + '/' + this.selectedPostType,
                    );
                }
            }
            this.isLoading = false;
            this.cdr.detectChanges();
        });
    }

    getCategories(isLangChanged: boolean) {
        this.otherCategories = [];
        this.isLoading = true;
        const params = { language: this.coffeeLabService.currentForumLanguage, is_recipe: false };
        if (this.selectedPostType === LinkType.RECIPE) {
            params.is_recipe = true;
        }
        this.coffeeLabService.getCategory(params).subscribe((res) => {
            if (res.success) {
                if (isLangChanged) {
                    const isCategory = res.result.find(
                        (element) => element.parent_id === this.currentCategory?.parent_id,
                    );
                    if (isCategory) {
                        this.slug = isCategory.slug;
                        this.router.navigateByUrl('/coffee-lab/category/' + this.slug + '/' + this.selectedPostType);
                        this.currentCategory = isCategory;
                        this.getMenuItems();
                    }
                } else {
                    this.asssignCategories(res.result);
                }
            }
            this.isLoading = false;
            this.cdr.detectChanges();
        });
    }

    asssignCategories(data: any) {
        this.otherCategories = data.filter((element) => element.slug !== this.slug);
        this.coffeeLabService.otherCategories.next(this.otherCategories);
        this.currentCategory = data.find((item) => item.slug === this.slug);
        this.getMenuItems();
    }

    onBack() {
        if (this.selectedPostType === LinkType.QA) {
            this.router.navigateByUrl('coffee-lab/overview/qa-forum');
        } else if (this.selectedPostType === LinkType.ARTICLE) {
            this.router.navigateByUrl('coffee-lab/overview/articles');
        } else if (this.selectedPostType === LinkType.RECIPE) {
            this.router.navigateByUrl('coffee-lab/overview/coffee-recipes');
        }
    }

    onTabChange(type: string, onLoad?: boolean) {
        if (type === PostType.QA && !onLoad) {
            this.getCategories(false);
        }
    }

    getMenuItems() {
        if (this.currentCategory?.is_recipe) {
            this.menuItems = [
                {
                    label: 'brewing_guides',
                    postType: PostType.RECIPE,
                    routerLink: `/coffee-lab/category/${this.slug}/coffee-recipes`,
                    command: () => this.onTabChange(PostType.RECIPE),
                },
            ];
        } else {
            this.menuItems = [
                {
                    label: 'question_answers',
                    postType: PostType.QA,
                    routerLink: `/coffee-lab/category/${this.slug}/qa-forum`,
                    command: () => this.onTabChange(PostType.QA),
                },
                {
                    label: 'posts',
                    postType: PostType.ARTICLE,
                    routerLink: `/coffee-lab/category/${this.slug}/articles`,
                    command: () => this.onTabChange(PostType.ARTICLE),
                },
            ];
        }
    }
}
