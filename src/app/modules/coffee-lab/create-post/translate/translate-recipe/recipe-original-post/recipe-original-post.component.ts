import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CoffeeLabService } from '@services';

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
    constructor(private coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        console.log('recipeId', this.recipeId);
        if (this.recipeId) {
            this.getCoffeeDetails(true);
        }
    }

    getCoffeeDetails(isReloading: boolean): void {
        this.isLoading = isReloading;
        this.coffeeLabService.getForumDetails('recipe', this.recipeId).subscribe((res: any) => {
            if (res.success) {
                console.log('coffe details--------', res);
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
            // const ele = document.getElementById(id);
            // ele.click();
            this.coffeeLabService.copyCoverImage.emit(this.detailsData);
        }
    }
}
