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
    organizationId: any;
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
    pageDesc: string | undefined;

    constructor(
        private toastService: ToastrService,
        private activateRoute: ActivatedRoute,
        private coffeeLab: CoffeeLabService,
        private cookieService: CookieService,
    ) {
        this.pageDesc = this.activateRoute.snapshot.routeConfig?.path;
    }

    ngOnInit(): void {
        this.organizationId = +this.cookieService.get('roaster_id');
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
            this.coffeeLab.getSavedForumList('recipe').subscribe((res) => {
                if (res.success) {
                    this.coffeeRecipeData = res.result;
                    this.coffeeRecipeData.map((item) => {
                        item.description = this.getJustText(item.description);
                        return item;
                    });
                } else {
                    this.toastService.error('Cannot get Recipes data');
                }
                this.isLoading = false;
            });
        } else if (this.pageDesc === 'my-posts') {
            this.coffeeLab.getMyForumList('recipe').subscribe((res) => {
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
                    this.coffeeRecipeData.map((item) => {
                        item.description = this.getJustText(item.description);
                        return item;
                    });
                    console.log('coffeeRecipeData Data---->>>', this.coffeeRecipeData);
                } else {
                    this.toastService.error('Cannot get Recipes data');
                }
                this.isLoading = false;
            });
        }
    }

    getJustText(content: any) {
        console.log('content---->>>>>', content);
        const contentElement = document.createElement('div');
        contentElement.innerHTML = content;
        const images = contentElement.querySelectorAll('img');
        for (let i = 0; i < images.length; i++) {
            images[0].parentNode.removeChild(images[0]);
        }
        return contentElement.innerHTML;
    }
}
