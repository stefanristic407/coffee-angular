import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CoffeeLabService, GlobalsService } from '@services';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { CoffeeLabGlobalSearchResult } from '@models';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
    menuItems = [
        {
            label: 'qa_forum',
            routerLink: 'qa-forum',
            icon: 'assets/images/qa-forum.svg',
            activeIcon: 'assets/images/qa-forum-active.svg',
        },
        {
            label: 'posts',
            routerLink: 'articles',
            icon: 'assets/images/article.svg',
            activeIcon: 'assets/images/article-active.svg',
        },
        {
            label: 'brewing_guides',
            routerLink: 'coffee-recipes',
            icon: 'assets/images/coffee-recipe.svg',
            activeIcon: 'assets/images/coffee-recipe-active.svg',
        },
        {
            label: 'my_posts',
            routerLink: 'my-posts',
            icon: 'assets/images/my-posts.svg',
            activeIcon: 'assets/images/my-posts-active.svg',
        },
        {
            label: 'saved_posts',
            routerLink: 'saved-posts',
            icon: 'assets/images/saved-post.svg',
            activeIcon: 'assets/images/saved-post-active.svg',
        },
        {
            label: 'assigned_to_me',
            routerLink: 'assigned-to-me',
            icon: 'assets/images/assigned-to-me.svg',
            activeIcon: 'assets/images/assigned-to-me-active.svg',
        },
    ];
    keyword?: string;
    keyword$?: string;
    breadcrumbItems: MenuItem[];
    isGlobalSearchResultPage = false;
    searchInput$: Subject<any> = new Subject<any>();
    isLoading: boolean;
    searchResult: CoffeeLabGlobalSearchResult;

    constructor(
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private route: ActivatedRoute,
        private translateService: TranslateService,
    ) {
        this.searchInput$.pipe(debounceTime(1000)).subscribe(() => {
            this.startSearch();
        });
        const searchQueryParam = this.route.snapshot.queryParamMap.get('search');
        if (searchQueryParam) {
            this.keyword = searchQueryParam;
            this.startSearch();
        }
    }

    ngOnInit(): void {
        this.breadcrumbItems = [
            { label: this.translateService.instant('home'), routerLink: '/' },
            { label: this.translateService.instant('brand_and_experience') },
            { label: this.translateService.instant('the_coffee_lab') },
        ];
    }

    handleSearch(): void {
        this.searchInput$.next(this.keyword);
    }

    startSearch(): void {
        if (!this.keyword) {
            this.handleBackPage();
            return;
        }
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { search: this.keyword },
            queryParamsHandling: 'merge',
        });
        this.keyword$ = this.keyword;
        this.isGlobalSearchResultPage = true;
        const params = {
            query: this.keyword,
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
            page: 1,
            per_page: 10000,
        };
        this.isLoading = true;
        forkJoin([
            this.coffeeLabService.getForumList('question', params),
            this.coffeeLabService.getForumList('article', params),
            this.coffeeLabService.getForumList('recipe', params),
        ]).subscribe((res: any[]) => {
            const questions = res[0]?.result?.questions || [];
            const articles = res[1]?.result || [];
            const recipes = res[2]?.result || [];
            this.searchResult = {
                questions,
                articles,
                recipes,
                total_count: questions.length + articles.length + recipes.length,
            };
            this.isLoading = false;
        });
    }

    handleBackPage(): void {
        this.isGlobalSearchResultPage = false;
        this.keyword = '';
        this.router.navigate([], { relativeTo: this.route, queryParams: { search: '' }, queryParamsHandling: 'merge' });
    }
}
