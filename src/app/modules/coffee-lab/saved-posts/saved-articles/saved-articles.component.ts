import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-saved-articles',
    templateUrl: './saved-articles.component.html',
    styleUrls: ['./saved-articles.component.scss'],
})
export class SavedArticlesComponent extends DestroyableComponent implements OnInit {
    articles: any[] = [];
    isLoading = true;
    pages = 1;
    totalRecords: number;
    rows = 9;

    constructor(private coffeeLabService: CoffeeLabService, private toastService: ToastrService) {
        super();
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.unsubscribeAll$)).subscribe(() => {
            this.getArticles();
        });
    }

    ngOnInit(): void {
        this.getArticles();
    }

    getArticles(): void {
        const params = {
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
            page: this.pages,
            per_page: this.rows,
        };
        this.isLoading = true;
        this.coffeeLabService.getSavedForumList('article', params).subscribe((res) => {
            if (res.success) {
                this.articles = (res.result ?? []).map((item) => {
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
            this.getArticles();
        }
    }
}
