import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PostType } from '@enums';
import { CoffeeLabService } from '@services';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-my-posts',
    templateUrl: './my-posts.component.html',
    styleUrls: ['./my-posts.component.scss'],
})
export class MyPostsComponent implements OnInit, OnDestroy {
    readonly PostType = PostType;
    @Input() postType: PostType;
    posts: any[] = [];
    isLoading = true;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        this.getPosts();
    }

    getPosts(): void {
        const params = {
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
            page: 1,
            per_page: 10000,
        };
        this.isLoading = true;
        this.coffeeLabService.getMyForumList(this.postType, params).subscribe((res) => {
            if (res.success) {
                this.posts = ((this.postType === PostType.QA ? res.result.questions : res.result) ?? []).map((item) => {
                    item.content = this.coffeeLabService.getJustText(item.content);
                    return item;
                });
            }
            this.isLoading = false;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
