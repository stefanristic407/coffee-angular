import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-qa-post',
    templateUrl: './qa-post.component.html',
    styleUrls: ['./qa-post.component.scss'],
})
export class QaPostComponent extends DestroyableComponent implements OnInit {
    viewMode = 'list';
    questions = [];
    isLoading = false;
    sortOptions = [
        { label: 'latest', value: 'latest' },
        { label: 'most_answered', value: 'most_answered' },
        { label: 'oldest', value: 'oldest' },
    ];
    pageDesc: string | undefined;
    forumLanguage: string;
    pages = 1;
    totalRecords: number;
    rows = 10;

    constructor(
        public coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private router: Router,
    ) {
        super();
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getPosts();
        });
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.unsubscribeAll$)).subscribe(() => {
            this.getPosts();
        });
    }

    getPosts(): void {
        this.isLoading = true;
        const params = {
            sort_by: this.coffeeLabService.qaPostSortBy === 'most_answered' ? 'most_answered' : 'posted_at',
            sort_order:
                this.coffeeLabService.qaPostSortBy === 'most_answered'
                    ? 'desc'
                    : this.coffeeLabService.qaPostSortBy === 'latest' || this.coffeeLabService.qaPostSortBy === null
                    ? 'desc'
                    : 'asc',
            page: this.pages,
            publish: true,
            per_page: this.rows,
        };
        if (this.pageDesc === 'saved-posts') {
            this.coffeeLabService.getSavedForumList('question', params).subscribe((res: any) => {
                this.isLoading = false;
                if (res.success) {
                    this.questions = res.result || [];
                    this.totalRecords = res.result_info.total_count;
                } else {
                    this.toastService.error('Cannot get forum data');
                }
            });
        } else {
            this.coffeeLabService.getOrganizationForumList('question', params).subscribe((res: any) => {
                this.isLoading = false;
                if (res.success) {
                    this.questions = res.result?.questions || [];
                    this.totalRecords = res.result_info.total_count;
                } else {
                    this.toastService.error('Cannot get forum data');
                }
            });
        }
    }

    paginate(event: any) {
        if (this.pages !== event.page + 1) {
            this.pages = event.page + 1;
            this.getPosts();
        }
    }
}
