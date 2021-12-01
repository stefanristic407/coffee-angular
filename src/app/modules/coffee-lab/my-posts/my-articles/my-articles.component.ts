import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-my-articles',
    templateUrl: './my-articles.component.html',
    styleUrls: ['./my-articles.component.scss'],
})
export class MyArticlesComponent implements OnInit, OnDestroy {
    articles: any[] = [];
    sortOptions = [
        { label: 'latest', value: 'desc' },
        { label: 'oldest', value: 'asc' },
    ];
    isLoading = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    pages = 1;
    totalRecords: number;
    rows = 9;

    constructor(public coffeeLabService: CoffeeLabService, private toastService: ToastrService) {
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
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
        this.coffeeLabService.getMyForumList('article', params).subscribe((res) => {
            if (res.success) {
                this.articles = (res.result ?? []).map((item) => {
                    item.content = this.coffeeLabService.getJustText(item.content);
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

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
