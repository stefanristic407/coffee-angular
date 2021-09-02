import { Component, Input, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService } from '@services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
    @Input() recipes: any[] = [];
    totalRecords = 0;
    displayData: any[] = [];
    pageDesc: string | undefined;
    isSaveBtn = false;

    constructor(
        public coffeeLabService: CoffeeLabService,
        public authService: AuthService,
        private router: Router,
        private toastService: ToastrService,
        private dialogService: DialogService,
    ) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        this.displayData = this.recipes.slice(0, 9);
        this.totalRecords = this.recipes.length;
    }

    paginate(event: any) {
        this.displayData = this.recipes.slice(event.first, event.first + event.rows);
    }

    openRecipe(slug: string) {
        if (!this.isSaveBtn) {
            this.router.navigateByUrl('/coffee-lab/recipes/' + slug);
        }
    }

    onSave(recipeId: number, index: number): void {
        this.isSaveBtn = true;
        setTimeout(() => {
            this.coffeeLabService.saveForum('recipe', recipeId).subscribe((res: any) => {
                if (res.success) {
                    this.recipes[index].is_saved = true;
                    this.toastService.success('Successfully saved');
                    this.isSaveBtn = false;
                } else {
                    this.toastService.error('Error while save post');
                }
            });
        }, 100);
    }

    onSameSave(recipeId: number, index: number) {
        this.isSaveBtn = true;
        setTimeout(() => {
            this.coffeeLabService.unSaveFormByType('recipe', recipeId).subscribe((res: any) => {
                if (res.success) {
                    this.toastService.success(`You have removed the recipe successfully from saved posts.`);
                    this.recipes[index].is_saved = false;
                    this.isSaveBtn = false;
                } else {
                    this.toastService.error(`Failed to remmove a recipe from saved posts.`);
                }
            });
        }, 100);
    }
}
