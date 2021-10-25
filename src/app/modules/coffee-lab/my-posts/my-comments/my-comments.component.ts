import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, CoffeeLabService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-my-comments',
    templateUrl: './my-comments.component.html',
    styleUrls: ['./my-comments.component.scss'],
})
export class MyCommentsComponent implements OnInit, OnDestroy {
    comments: any[] = [];
    sortOptions = [
        { label: 'Latest', value: 'desc' },
        { label: 'Oldest', value: 'asc' },
    ];
    organizationId: number;
    isLoading = false;
    isMyPostsPage = false;
    pageDesc: string;
    forumDeleteSub: Subscription;
    pages = 1;
    totalRecords: number;
    rows = 10;
    displayData: any[] = [];

    constructor(public coffeeLabService: CoffeeLabService, private authService: AuthService, private router: Router) {
        this.organizationId = this.authService.getOrgId();
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        if (this.pageDesc === 'my-posts') {
            this.isMyPostsPage = true;
        }
        this.forumDeleteSub = this.coffeeLabService.forumDeleteEvent.subscribe(() => {
            this.getComments();
        });
        this.getComments();
    }

    getComments(): void {
        this.isLoading = true;
        const params = {
            sort_by: 'created_at',
            sort_order: this.coffeeLabService.myCommentsSortBy,
            page: this.pages,
            per_page: this.rows,
        };
        this.coffeeLabService.getMyForumList('my-comment', params).subscribe((res) => {
            this.comments = (res.result ?? []).map((item) => {
                const id = 'id';
                if (item.post_slug) {
                    const slug = 'slug';
                    item[slug] = item.post_slug;
                    item[id] = item.post_id;
                }
                if (item.comments) {
                    item.comments.map((ele) => {
                        ele.comment = '<p>' + ele.comment + '</p>';
                        ele[id] = ele.comment_id;
                        return ele;
                    });
                }
                return item;
            });
            this.totalRecords = res.result_info.total_count;
            this.displayData = this.comments;
            this.isLoading = false;
        });
    }

    paginate(event: any) {
        if (this.pages !== event.page + 1) {
            this.pages = event.page + 1;
            this.getComments();
        }
    }

    ngOnDestroy(): void {
        this.forumDeleteSub.unsubscribe();
    }
}
