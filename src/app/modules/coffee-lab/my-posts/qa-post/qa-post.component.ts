import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoffeeLabService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-qa-post',
    templateUrl: './qa-post.component.html',
    styleUrls: ['./qa-post.component.scss'],
})
export class QaPostComponent implements OnInit {
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

    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private cookieService: CookieService,
        private activateRoute: ActivatedRoute,
    ) {
        this.pageDesc = this.activateRoute.snapshot.routeConfig?.path;
    }

    ngOnInit(): void {
        this.getAuthors();
        this.getPosts();
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
                org_type: 'ro',
                sort_order: this.sortBy === 'most_answered' ? 'desc' : this.sortBy === 'latest' ? 'desc' : 'asc',
            };
            this.coffeeLabService.getForumList('question', params).subscribe((res: any) => {
                this.isLoading = false;
                if (res.success) {
                    this.questions = res.result?.questions || [];
                } else {
                    this.toastService.error('Cannot get forum data');
                }
            });
        }
    }
}
