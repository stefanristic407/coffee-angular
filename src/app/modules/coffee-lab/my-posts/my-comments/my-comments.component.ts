import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoffeeLabService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-my-comments',
    templateUrl: './my-comments.component.html',
    styleUrls: ['./my-comments.component.scss'],
})
export class MyCommentsComponent implements OnInit {
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
    constructor(
        private coffeeLabService: CoffeeLabService,
        private cookieService: CookieService,
        private activateRoute: ActivatedRoute,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.pageDesc = this.activateRoute.snapshot.routeConfig?.path;
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
                if (item.post_slug) {
                    const slug = 'slug';
                    const id = 'id';
                    item[slug] = item.post_slug;
                    item[id] = item.post_id;
                }
                return item;
            });
            this.isLoading = false;
        });
    }
}
