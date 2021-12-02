import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-saved-recipes',
    templateUrl: './saved-recipes.component.html',
    styleUrls: ['./saved-recipes.component.scss'],
})
export class SavedRecipesComponent extends DestroyableComponent implements OnInit {
    recipes: any[] = [];
    isLoading = true;
    pages = 1;
    totalRecords: number;
    rows = 9;

    constructor(private coffeeLabService: CoffeeLabService, private toastService: ToastrService) {
        super();
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.unsubscribeAll$)).subscribe(() => {
            this.getRecipes();
        });
    }

    ngOnInit(): void {
        this.getRecipes();
    }

    getRecipes(): void {
        const params = {
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
            page: this.pages,
            per_page: this.rows,
        };
        this.isLoading = true;
        this.coffeeLabService.getSavedForumList('recipe', params).subscribe((res) => {
            if (res.success) {
                this.recipes = (res.result ?? []).map((item) => {
                    item.content = this.coffeeLabService.getJustText(item.content);
                    item.is_saved = true;
                    return item;
                });
                this.totalRecords = res.result_info.total_count;
            } else {
                this.toastService.error('Cannot get Articles data');
            }
            this.isLoading = false;
        });
    }

    paginate(event: any) {
        if (this.pages !== event.page + 1) {
            this.pages = event.page + 1;
            this.getRecipes();
        }
    }
}
