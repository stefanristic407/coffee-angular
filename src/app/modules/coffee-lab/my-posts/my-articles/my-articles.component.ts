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
    isLoading = true;
    destroy$: Subject<boolean> = new Subject<boolean>();

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
            page: 1,
            per_page: 10000,
        };
        this.isLoading = true;
        this.coffeeLabService.getMyForumList('article', params).subscribe((res) => {
            if (res.success) {
                this.articles = (res.result ?? []).map((item) => {
                    item.content = this.coffeeLabService.getJustText(item.content);
                    return item;
                });
            } else {
                this.toastService.error('Cannot get Articles data');
            }
            this.isLoading = false;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
