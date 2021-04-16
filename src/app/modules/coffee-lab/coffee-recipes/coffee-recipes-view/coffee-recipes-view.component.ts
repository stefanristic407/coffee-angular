import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { CoffeeLabService } from '@services';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
    selector: 'app-coffee-recipes-view',
    templateUrl: './coffee-recipes-view.component.html',
    styleUrls: ['./coffee-recipes-view.component.scss'],
})
export class CoffeeRecipesViewComponent implements OnInit {
    @ViewChild('ingredientSearchInput') ingredientSearch: ElementRef;
    @ViewChild('searchInput') recipeSearch: ElementRef;
    isAvailableTranslation?: string;
    label?: string;
    ingredientValue?: string;
    searchQuery: string = '';
    searchIngredient: string = '';
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

    constructor(private coffeeLabService: CoffeeLabService, private toastService: ToastrService) {}

    ngOnInit(): void {
        console.log('coffeeRecipeData---', this.coffeeRecipeData);
        this.getCoffeeRecipesData();
    }

    ngAfterViewInit() {
        fromEvent(this.ingredientSearch.nativeElement, 'keyup')
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                tap((text) => {
                    console.log('text-->>', text);
                    this.getCoffeeRecipesData();
                }),
            )
            .subscribe();
        fromEvent(this.recipeSearch.nativeElement, 'keyup')
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                tap((text) => {
                    console.log('text-->>', text);
                    this.getCoffeeRecipesData();
                }),
            )
            .subscribe();
    }

    getCoffeeRecipesData() {
        this.isLoading = true;
        const params = {
            query: this.searchQuery,
            ingredient: this.searchIngredient,
            translations_available: this.isAvailableTranslation,
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' ? 'desc' : 'asc',
            level: this.label,
        };
        this.coffeeLabService.getForumList('recipe', params).subscribe((res) => {
            if (res.success) {
                console.log('response----->>>>>', res);
                this.coffeeRecipeData = res.result;
                console.log('coffeeRecipeData Data---->>>', this.coffeeRecipeData);
            } else {
                this.toastService.error('Cannot get Articles data');
            }
            this.isLoading = false;
        });
    }

    onShare(postItem: any): void {}
    onSavePost(postItem: any): void {}
    onTranslate(postItem: any): void {}

    getData() {
        console.log('call get data.......');
    }
}
