import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostType } from '@enums';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-recipe-card',
    templateUrl: './recipe-card.component.html',
    styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
    @Input() recipe: any;
    @Input() isMyPost = false;
    @Input() isSavedPost = false;
    isSaveBtn = false;

    constructor(
        public coffeeLabService: CoffeeLabService,
        public authService: AuthService,
        private router: Router,
        private toastService: ToastrService,
    ) {}

    ngOnInit(): void {}

    openRecipe(slug: string) {
        if (!this.isSaveBtn) {
            this.router.navigateByUrl('/coffee-lab/recipes/' + slug);
        }
    }

    onSave(recipeId: number): void {
        this.isSaveBtn = true;
        setTimeout(() => {
            if (this.recipe?.is_saved) {
                this.coffeeLabService.unSaveFormByType(PostType.RECIPE, recipeId).subscribe((res: any) => {
                    if (res.success) {
                        this.toastService.success(`You have removed the recipe successfully from saved posts.`);
                        this.recipe.is_saved = false;
                        this.isSaveBtn = false;
                    } else {
                        this.toastService.error(`Failed to remmove a recipe from saved posts.`);
                    }
                });
            } else {
                this.coffeeLabService.saveForum(PostType.RECIPE, recipeId).subscribe((res: any) => {
                    if (res.success) {
                        this.recipe.is_saved = true;
                        this.toastService.success('Successfully saved');
                        this.isSaveBtn = false;
                    } else {
                        this.toastService.error('Error while save post');
                    }
                });
            }
        }, 100);
    }
}
