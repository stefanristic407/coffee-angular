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
    @Input() relatedData: any[] = [];
    idOrSlug: any;
    constructor(public coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {}

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
