import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CoffeeLabService } from '@services';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-recipe-original-post',
    templateUrl: './recipe-original-post.component.html',
    styleUrls: ['./recipe-original-post.component.scss'],
})
export class RecipeOriginalPostComponent implements OnInit, OnChanges {
    @Input() recipeId;
    id: string | number = '';
    isLoading = true;
    detailsData: any;
    roasterId: string;
    constructor(private coffeeLabService: CoffeeLabService, private cookieService: CookieService) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        console.log('recipeId', this.recipeId);
        this.roasterId = this.cookieService.get('roaster_id');
        if (this.recipeId) {
            this.getCoffeeDetails(true);
        }
    }

    getCoffeeDetails(isReloading: boolean): void {
        this.isLoading = isReloading;
        this.coffeeLabService.getRecipeById('recipe', this.recipeId, this.roasterId).subscribe((res: any) => {
            if (res.success) {
                console.log('coffee details--------', res);
                this.detailsData = res.result;
            }
            this.isLoading = false;
        });
    }

    copyImage(id: string): void {
        if (id === 'stepImg') {
            const ele = document.getElementById(id);
            ele.click();
        } else {
            this.coffeeLabService.copyCoverImage.emit(this.detailsData);
        }
    }
}
