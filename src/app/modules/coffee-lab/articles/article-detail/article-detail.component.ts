import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService, GlobalsService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Subject, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-aticle-details',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss'],
    providers: [MessageService],
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string | number = '';
    commentData?: any[];
    isLoading = true;
    organizationId: any;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        public globalsService: GlobalsService,
        private messageService: MessageService,
        private cookieService: CookieService,
        public location: Location,
        public authService: AuthService,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.idOrSlug = params.idOrSlug;
            this.getDetails(true);
            this.getArticleList();
        });
    }

    ngOnInit(): void {
        window.scroll(0, 0);
        this.organizationId = this.authService.getOrgId();
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.router.navigate(['/coffee-lab/overview/articles']);
        });
    }

    getArticleList(): any {
        const params = {
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
        };
        this.coffeeLabService.getForumList('article', params).subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result
                    .filter((item: any) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 4);
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

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
