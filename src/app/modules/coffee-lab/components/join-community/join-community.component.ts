import { Component, OnInit, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';
import { CoffeeLabService, I18NService } from '@services';
import { ActivatedRoute } from '@angular/router';

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
    idOrSlug: any;
    relatedData = [];
    constructor(@Inject(DOCUMENT) private document: Document, public coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.coffeeLabService
            .getForumList('question', {
                page: this.pages ? this.pages + 1 : 2,
                per_page: 5,
                category_slug: this.coffeeLabService.qaForumViewCategory,
            })
            .subscribe((res: any) => {
                if (res.success) {
                    this.relatedData = res.result.questions;
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
