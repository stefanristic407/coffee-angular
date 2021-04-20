import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { CoffeeLabService } from '@services';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-coffee-recipes-view',
    templateUrl: './coffee-recipes-view.component.html',
    styleUrls: ['./coffee-recipes-view.component.scss'],
})
export class CoffeeRecipesViewComponent implements OnInit {
    isAvailableTranslation?: string;
    label?: string;
    ingredientValue?: string;
    searchQuery = '';
    searchIngredient = '';
    coffeeRecipeData: any[] = [];
    isLoading = false;
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
            label: 'easy',
            value: 'easy',
        },
        {
            label: 'intermediate',
            value: 'intermediate',
        },
        {
            label: 'hard',
            value: 'hard',
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
    items: MenuItem[] = [
        {
            items: [
                {
                    label: 'Share',
                    command: () => {
                        this.onShare({});
                    },
                },
                {
                    label: 'Save Post',
                    command: () => {
                        this.onSavePost({});
                    },
                },
                {
                    label: 'Translate answer',
                    command: () => {
                        this.onTranslate({});
                    },
                },
            ],
        },
    ];
    pageDesc: string | undefined;
    roasterId: string;

    constructor(
        private toastService: ToastrService,
        private activateRoute: ActivatedRoute,
        private coffeeLab: CoffeeLabService,
        private cookieService: CookieService,
    ) {
        this.pageDesc = this.activateRoute.snapshot.routeConfig?.path;
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.getCoffeeRecipesData();
    }

    getCoffeeRecipesData(): void {
        this.isLoading = true;
        const params = {
            query: this.searchQuery,
            ingredient: this.searchIngredient,
            translations_available: this.isAvailableTranslation,
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' ? 'desc' : 'asc',
            level: this.label,
        };
        if (this.pageDesc === 'saved-posts') {
            this.coffeeLab.getSavedForumList('recipe', this.roasterId).subscribe((res) => {
                if (res.success) {
                    this.coffeeRecipeData = res.result;
                } else {
                    this.toastService.error('Cannot get Recipes data');
                }
                this.isLoading = false;
            });
        } else if (this.pageDesc === 'my-posts') {
            this.coffeeLab.getMyForumList('recipe', this.roasterId).subscribe((res) => {
                if (res.success) {
                    this.coffeeRecipeData = res.result;
                } else {
                    this.toastService.error('Cannot get Recipes data');
                }
                this.isLoading = false;
            });
        } else {
            this.coffeeLab.getForumList('recipe', params).subscribe((res) => {
                if (res.success) {
                    console.log('response----->>>>>', res);
                    this.coffeeRecipeData = res.result;
                    console.log('coffeeRecipeData Data---->>>', this.coffeeRecipeData);
                } else {
                    this.toastService.error('Cannot get Recipes data');
                }
                this.isLoading = false;
            });
        }
    }

    onShare(postItem: any): void {}
    onSavePost(postItem: any): void {}
    onTranslate(postItem: any): void {}
}
