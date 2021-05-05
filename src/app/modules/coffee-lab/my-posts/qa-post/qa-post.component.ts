import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-qa-post',
    templateUrl: './qa-post.component.html',
    styleUrls: ['./qa-post.component.scss'],
})
export class QaPostComponent implements OnInit, OnDestroy {
    viewMode = 'list';
    questions = [];
    isLoading = false;
    isDisplayTip = true;
    viewModeItems: any[] = [{ value: 'list' }, { value: 'grid' }];
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Most Answered', value: 'most_answered' },
        { label: 'Oldest', value: 'oldest' },
    ];
    filterOptions = [{ label: 'Posted by: All', value: null }];
    sortBy = 'latest';
    filterBy = null;
    keyword = '';
    filteredData = [];
    pageDesc: string | undefined;
    destroy$: Subject<boolean> = new Subject<boolean>();
    forumLanguage: string;

    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private router: Router,
    ) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        this.getAuthors();
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getPosts();
        });
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.getPosts();
        });
    }

    getAuthors(): void {
        this.coffeeLabService.getAuthors('question').subscribe((res: any) => {
            if (res.success) {
                const filterArray = res.result.question_authors.map((item: any) => {
                    return {
                        label: `Posted by: ${item.name}`,
                        value: item.id,
                    };
                });
                this.filterOptions = [...this.filterOptions, ...filterArray];
            } else {
                this.toastService.error('Cannot get authors');
            }
        });
    }

    getPosts(): void {
        this.isLoading = true;
        if (this.pageDesc === 'saved-posts') {
            this.coffeeLabService.getSavedForumList('question').subscribe((res: any) => {
                this.isLoading = false;
                if (res.success) {
                    this.questions = res.result || [];
                } else {
                    this.toastService.error('Cannot get forum data');
                }
            });
        } else {
            const params = {
                query: this.keyword,
                sort_by: this.sortBy === 'most_answered' ? 'most_answered' : 'posted_at',
                // org_type: 'ro',
                sort_order: this.sortBy === 'most_answered' ? 'desc' : this.sortBy === 'latest' ? 'desc' : 'asc',
            };
            console.log('getting my questions here..............', params);
            this.coffeeLabService.getFOrganizationForumList('question', params).subscribe((res: any) => {
                this.isLoading = false;
                if (res.success) {
                    this.questions = res.result?.questions || [];
                } else {
                    this.toastService.error('Cannot get forum data');
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
