import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, ChatHandlerService, CoffeeLabService, GlobalsService, UserService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
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
    commentData: any[] = [];
    allComments: any[] = [];
    showCommentBtn = true;
    isLoading = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    buttonList = [{ button: 'Roasting' }, { button: 'Coffee grinding' }, { button: 'Milling' }, { button: 'Brewing' }];
    comment: string;
    language: string;
    stickySecData: any;
    orginalUserData: any;
    isSaveArticle = false;
    isMyPost = false;
    isSavedPost = false;

    constructor(
        public coffeeLabService: CoffeeLabService,
        public authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public globalsService: GlobalsService,
        private messageService: MessageService,
        private toastrService: ToastrService,
        private userService: UserService,
        private chatHandler: ChatHandlerService,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.idOrSlug = params.idOrSlug;
            const language = this.activatedRoute.snapshot.queryParamMap.get('language');
            this.language = language || this.coffeeLabService.currentForumLanguage;
            this.getDetails(true);
            this.getArticleList();
        });
        this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.isMyPost = queryParams.isMyPost;
            this.isSavedPost = queryParams.isSavedPost;
        });
    }

    ngOnInit(): void {
        window.scroll(0, 0);
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

    onShare(): void {
        this.coffeeLabService.copyContext(`${environment.adminWeb}/coffee-lab/articles/${this.detailsData.slug}`);
    }

    getDetails(isReloading: boolean): void {
        this.isLoading = isReloading;
        this.coffeeLabService.getForumDetails('article', this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                this.detailsData = res.result;
                this.isSaveArticle = this.detailsData.is_saved;
                if (this.detailsData?.original_article_state && this.detailsData?.original_article_state === 'ACTIVE') {
                    this.getOriginalUserDetail(this.detailsData.original_article);
                }
                this.getUserDetail(this.detailsData);
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
                this.allComments = res.result;
                this.commentData = this.allComments?.slice(0, 3);
                if (this.allComments?.length > 3) {
                    this.showCommentBtn = true;
                } else {
                    this.showCommentBtn = false;
                }
            }
        });
    }

    onRealtedRoute(slug) {
        if (this.isMyPost) {
            this.router.navigate(['/coffee-lab/articles/' + slug], {
                queryParams: {
                    isMyPost: true,
                },
            });
        } else if (this.isSavedPost) {
            this.router.navigate(['/coffee-lab/articles/' + slug], {
                queryParams: {
                    isSavedPost: true,
                },
            });
        } else {
            this.router.navigateByUrl('/coffee-lab/articles/' + slug);
        }
        window.scrollTo(0, 0);
    }

    viewAllComments() {
        this.commentData = this.allComments;
        this.showCommentBtn = false;
    }

    getOriginalUserDetail(userDetails: any): void {
        this.userService.getUserDetail(userDetails.user_id, userDetails.organisation_type).subscribe((res) => {
            if (res.success) {
                this.orginalUserData = res.result;
            }
        });
    }

    getUserDetail(userDetails: any): void {
        this.userService.getUserDetail(userDetails.user_id, userDetails.organisation_type).subscribe((res) => {
            if (res.success) {
                this.stickySecData = res.result;
            }
        });
    }

    onPost(): void {
        const data = {
            comment: this.comment,
            status: 'PUBLISHED',
            language: this.language,
        };
        this.coffeeLabService.postComment('article', this.detailsData.id, data).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('You have posted a comment successfully.');
                this.comment = '';
                this.getCommentsData();
            } else {
                this.toastrService.error('Failed to post comment.');
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    onFocusCommentBox() {
        document.getElementById('text-article-focus').focus();
    }

    onFocus() {}
    onSave(articleId: number): void {
        this.coffeeLabService.saveForum('article', articleId).subscribe((res: any) => {
            if (res.success) {
                this.isSaveArticle = true;
                this.toastrService.success('Successfully saved');
            } else {
                this.toastrService.error('Error while save post');
            }
        });
    }

    onSameSave(articleId: number) {
        this.coffeeLabService.unSaveFormByType('article', articleId).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success(`You have removed the article successfully from saved posts.`);
                this.isSaveArticle = false;
            } else {
                this.toastrService.error(`Failed to remmove a article from saved posts.`);
            }
        });
    }

    openChat() {
        this.chatHandler.openChatThread({
            user_id: this.stickySecData.id,
            org_type: this.stickySecData.organization_type.toLowerCase(),
            org_id: this.stickySecData.organization_id,
        });
    }

    onBack() {
        if (this.isMyPost) {
            this.router.navigateByUrl('/coffee-lab/overview/my-posts/article');
        } else if (this.isSavedPost) {
            this.router.navigateByUrl('/coffee-lab/overview/saved-posts/article');
        } else {
            this.router.navigateByUrl('/coffee-lab/overview/articles');
        }
    }

    onLike(articleId: number) {
        this.coffeeLabService.updateLike('article', articleId).subscribe((res) => {
            if (res.success) {
                this.detailsData.is_liked = true;
                this.detailsData.likes = this.detailsData.likes + 1;
            }
        });
    }

    onUnLike(articleId: number) {
        this.coffeeLabService.updateUnLike('article', articleId).subscribe((res) => {
            if (res.success) {
                this.detailsData.is_liked = false;
                this.detailsData.likes = this.detailsData.likes - 1;
            }
        });
    }

    onCategoryClick(slug: string) {
        this.router.navigateByUrl('/coffee-lab/category/' + slug);
    }
}
