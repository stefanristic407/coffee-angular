import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { CoffeeLabService } from '@services';

@Component({
    selector: 'app-join-community',
    templateUrl: './join-community.component.html',
    styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
    ssoWeb = environment.ssoWeb;
    @Input() pages: any;
    @Input() type: string;
    @Input() detailType: string;
    isLoading = false;
    idOrSlug: any;
    relatedData = [];
    constructor(public coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.isLoading = true;
        this.coffeeLabService
            .getForumList('question', {
                page: this.pages ? this.pages + 1 : 2,
                per_page: 15,
                category_slug: this.coffeeLabService.qaForumViewCategory,
            })
            .subscribe((res: any) => {
                if (res.success) {
                    this.relatedData = res.result.questions;
                    this.isLoading = false;
                }
            });
    }

    getLink(item: any, answer: any) {
        const url = `/coffee-lab/questions/${item.slug}`;
        return {
            url,
            queryParmas: {
                answer: answer?.id,
            },
        };
    }
}
