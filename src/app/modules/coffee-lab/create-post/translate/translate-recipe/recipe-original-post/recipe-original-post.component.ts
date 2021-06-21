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
    constructor(private coffeeLabService: CoffeeLabService, private cookieService: CookieService) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.recipeId) {
            this.getCoffeeDetails(true);
        }
    }

    getCoffeeDetails(isReloading: boolean): void {
        this.isLoading = isReloading;
        this.coffeeLabService.getForumDetails('recipe', this.recipeId).subscribe((res: any) => {
            console.log('recipe details >>>>>>>>>', res);
            if (res.success) {
                this.detailsData = res.result;
            }
            this.isLoading = false;
        });
    }

    copyImage(id: number, type: string): void {
        this.coffeeLabService.copyCoverImage.emit({ id, type });
    }
}
