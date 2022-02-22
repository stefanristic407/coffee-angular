import { Component, Input, OnInit } from '@angular/core';
import { PostType } from '@enums';
import { CoffeeLabService } from '@services';

@Component({
    selector: 'app-join-community',
    templateUrl: './join-community.component.html',
    styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
    readonly PostType = PostType;
    @Input() pages: any;
    @Input() type: string;
    @Input() related = false;
    @Input() showBorderBottom = true;
    @Input() categories: [] = [];
    relatedData: any[] = [];
    idOrSlug: any;
    isLoading = true;
    constructor(private coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.subscribe((res) => {
            if (res) {
                this.getList();
            }
        });
    }

    getList() {
        this.isLoading = true;
        const categories = [];
        this.categories?.filter((item: any) => categories.push(item.id));
        this.coffeeLabService
            .getForumList(this.type, {
                page: 1,
                per_page: 15,
                category_id: categories,
                sort_by: 'posted_at',
                sort_order: 'desc',
            })
            .subscribe((res: any) => {
                if (res.success) {
                    this.relatedData = this.type === PostType.QA ? res.result?.questions : res.result;
                    this.isLoading = false;
                }
            });
    }

    getLink(slug: string) {
        return `/coffee-lab/${this.type}s/${slug}`;
    }
}
