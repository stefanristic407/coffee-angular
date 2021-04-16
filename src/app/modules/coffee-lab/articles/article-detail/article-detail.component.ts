import { Component, OnInit } from '@angular/core';
import { CoffeeLabService, GlobalsService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-aticle-details',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss'],
    providers: [MessageService],
})
export class ArticleDetailComponent implements OnInit {
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string | number = '';
    commentData?: any[];
    isLoading = true;
    items: MenuItem[] = [
        {
            items: [
                {
                    label: this.globalsService.languageJson.share,
                    command: () => {
                        this.onShare({});
                    },
                },
                {
                    label: this.globalsService.languageJson.save_post,
                    command: () => {
                        this.onSavePost({});
                    },
                },
            ],
        },
    ];

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        public globalsService: GlobalsService,
        private messageService: MessageService,
        private primengConfig: PrimeNGConfig,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.idOrSlug = params.idOrSlug;
            this.getDetails(true);
            this.getArticleList();
        });
    }

    ngOnInit(): void {}

    getArticleList(): any {
        this.coffeeLabService.getForumList('article').subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result
                    .filter((item: any) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 5);
            }
        });
    }

    getDetails(isReloading: boolean): void {
        this.isLoading = isReloading;
        this.coffeeLabService.getForumDetails('article', this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                this.detailsData = res.result;
                this.getCommentsData();
                if (res.result.original_article_id) {
                    this.messageService.clear();
                    this.messageService.add({
                        key: 'translate',
                        severity: 'success',
                        closable: false,
                    });
                }
            }
            this.isLoading = false;
        });
    }

    getCommentsData(): void {
        this.coffeeLabService.getCommentList('article', this.detailsData.slug).subscribe((res: any) => {
            if (res.success) {
                this.commentData = res.result;
            }
        });
    }

    postComment(event: any): void {
        this.coffeeLabService.postComment('article', this.detailsData.id, event).subscribe((res: any) => {
            if (res.success) {
                this.getDetails(false);
            }
        });
    }

    onShare(postItem: any): void {}
    onSavePost(postItem: any): void {}
}
