import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeLabService } from '@services';
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
        { label: 'Latest', value: 'latest' },
        { label: 'Oldest', value: 'oldest' },
    ];
    sortBy = 'latest';
    roasterId: string;
    isLoading = false;
    isMyPostsPage = false;
    pageDesc: string;
    forumDeleteSub: Subscription;
    totalRecords = 0;
    displayData: any[] = [];

    constructor(
        private coffeeLabService: CoffeeLabService,
        private cookieService: CookieService,
        private router: Router,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
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
        this.coffeeLabService.getMyForumList('my-comment').subscribe((res) => {
            this.comments = res.result.map((item) => {
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
            this.totalRecords = this.comments.length;
            this.displayData = this.comments.slice(0, 10);
            this.isLoading = false;
        });
    }

    paginate(event: any) {
        this.displayData = this.comments.slice(event.first, event.first + event.rows);
    }

    ngOnDestroy(): void {
        this.forumDeleteSub.unsubscribe();
    }
}
