import { Component, Input, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';

@Component({
    selector: 'app-join-community',
    templateUrl: './join-community.component.html',
    styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
    @Input() pages: any;
    @Input() type: string;
    @Input() detailType: string;
    @Input() categories: [] = [];
    relatedData: any[] = [];
    idOrSlug: any;
    isLoading = true;
    constructor(private coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.isLoading = true;
        const categories = [];
        this.categories?.filter((item: any) => categories.push(item.parent_id));
        this.coffeeLabService
            .getForumList(this.type === 'question' && this.detailType !== 'question-detail' ? 'article' : 'question', {
                page: 1,
                per_page: 15,
                category_id: categories,
                sort_by: 'posted_at',
                sort_order: 'desc',
            })
            .subscribe((res: any) => {
                if (res.success) {
                    this.relatedData =
                        this.type === 'question' && this.detailType !== 'question-detail'
                            ? res.result
                            : res.result?.questions;
                    this.isLoading = false;
                }
            });
    }

    getLink(item: any) {
        return `/coffee-lab/${
            this.type === 'question' && this.detailType !== 'question-detail' ? 'article' : 'question'
        }s/${item.slug}`;
    }
}
