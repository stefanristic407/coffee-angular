import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-recipe-original-post',
    templateUrl: './recipe-original-post.component.html',
    styleUrls: ['./recipe-original-post.component.scss'],
})
export class RecipeOriginalPostComponent implements OnInit, OnChanges {
    @Input() recipeId;
    id: string | number = '';
    isLoading = true;
    isCopying = false;
    detailsData: any;
    constructor(private coffeeLabService: CoffeeLabService, private toaster: ToastrService) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.recipeId) {
            this.getCoffeeDetails(true);
        }
    }

    getCoffeeDetails(isReloading: boolean): void {
        this.isLoading = isReloading;
        this.coffeeLabService.getForumDetails('recipe', this.recipeId).subscribe((res: any) => {
            if (res.success) {
                this.detailsData = res.result;
            }
            this.isLoading = false;
        });
    }

    copyImage(id: number, type: string): void {
        if (this.isCopying) {
            return;
        }
        this.isCopying = true;
        this.coffeeLabService.copyFile(id).subscribe((res: any) => {
            this.isCopying = false;
            if (res.success) {
                this.toaster.success('Copied file successfully.');
                this.coffeeLabService.copyCoverImage.emit({
                    imageId: res.result.id,
                    imageUrl: res.result.url,
                    type,
                });
            } else {
                this.toaster.error('Failed to copy file.');
            }
        });
    }
}
