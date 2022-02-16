import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvertToShortDescriptionPipe } from '@app/shared/pipes/convert-to-short-description.pipe';
import { DestroyableComponent } from '@base-components';
import { LinkType, PostType } from '@enums';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, ChatHandlerService, CoffeeLabService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-aticle-details',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss'],
    providers: [MessageService, ConvertToShortDescriptionPipe],
})
export class ArticleDetailComponent extends DestroyableComponent implements OnInit {
    readonly PostType = PostType;
    readonly articleLink = LinkType.ARTICLE;
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string | number = '';
    commentData: any[] = [];
    allComments: any[] = [];
    showCommentBtn = true;
    isLoading = true;
    buttonList = [{ button: 'Roasting' }, { button: 'Coffee grinding' }, { button: 'Milling' }, { button: 'Brewing' }];
    comment: string;
    language: string;
    stickySecData: any;
    orginalUserData: any;
    isMyPost = false;
    isSavedPost = false;
    isSaveBtn = false;
    isLikedBtn = false;
    showToaster = false;
    items: ({ label: any; routerLink: string } | { label: any; routerLink?: undefined })[];

    constructor(
        public coffeeLabService: CoffeeLabService,
        public authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private messageService: MessageService,
        private toastrService: ToastrService,
        private userService: UserService,
        private chatHandler: ChatHandlerService,
        private translator: TranslateService,
        private convertToShortDescription: ConvertToShortDescriptionPipe,
    ) {
        super();
        this.activatedRoute.params.subscribe((params) => {
            this.idOrSlug = params.idOrSlug;
            const language = this.activatedRoute.snapshot.queryParamMap.get('language');
            this.language = language || this.coffeeLabService.currentForumLanguage;
            this.getDetails(true);
        });
        this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.isMyPost = queryParams.isMyPost;
            this.isSavedPost = queryParams.isSavedPost;
        });
    }

    ngOnInit(): void {
        window.scroll(0, 0);
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.unsubscribeAll$)).subscribe(() => {
            this.router.navigate(['/coffee-lab/overview/articles']);
        });
    }

    getArticleList(): any {
        const params = (this.relatedData = []);
        this.coffeeLabService
            .getPopularList(
                PostType.ARTICLE,
                {
                    count: 7,
                },
                this.detailsData.language,
            )
            .subscribe((res: any) => {
                if (res.success) {
                    this.relatedData = (res.result || [])
                        .filter((item) => item && item?.slug !== this.idOrSlug)
                        .slice(0, 6);
                }
            });
    }

    onShare(): void {
        this.coffeeLabService.copyContext(`${environment.adminWeb}/coffee-lab/articles/${this.detailsData.slug}`);
    }

    getDetails(isReloading: boolean): void {
        this.isLoading = isReloading;
        this.coffeeLabService.getForumDetails(PostType.ARTICLE, this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                this.coffeeLabService.updateLang(res.result.language).then(() => {
                    this.detailsData = res.result;
                    this.items = [
                        { label: this.translator.instant('the_coffee_lab'), routerLink: '/' },
                        { label: this.translator.instant('articles'), routerLink: `/coffee-lab/overview/articles` },
                        {
                            label: this.convertToShortDescription.transform(this.detailsData.title, 4),
                        },
                    ];
                    this.getArticleList();
                    if (
                        this.detailsData?.original_article_state &&
                        this.detailsData?.original_article_state === 'ACTIVE'
                    ) {
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
                    this.isLoading = false;
                });
            } else {
                this.toastrService.error('Cannot get detail data');
            }
        });
    }

    getCommentsData(): void {
        this.coffeeLabService.getCommentList(PostType.ARTICLE, this.detailsData.slug).subscribe((res: any) => {
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

    onRealtedRoute(slug: string, isOrginal: boolean, language?: string) {
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
        if (isOrginal) {
            this.coffeeLabService.forumLanguage.next(language);
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
        this.coffeeLabService.postComment(PostType.ARTICLE, this.detailsData.id, data).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('You have posted a comment successfully.');
                this.comment = '';
                this.getCommentsData();
            } else {
                this.toastrService.error('Failed to post comment.');
            }
        });
    }

    onFocusCommentBox() {
        document.getElementById('text-article-focus').focus();
    }

    onSave(articleId: number): void {
        this.isSaveBtn = true;
        if (this.detailsData?.is_saved) {
            this.coffeeLabService.unSaveFormByType(PostType.ARTICLE, articleId).subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success(`You have removed the article successfully from saved posts.`);
                    this.detailsData.is_saved = false;
                } else {
                    this.toastrService.error(`Failed to remmove a article from saved posts.`);
                }
                this.isSaveBtn = false;
            });
        } else {
            this.coffeeLabService.saveForum(PostType.ARTICLE, articleId).subscribe((res: any) => {
                if (res.success) {
                    this.detailsData.is_saved = true;
                    this.toastrService.success('Successfully saved');
                } else {
                    this.toastrService.error('Error while save post');
                }
                this.isSaveBtn = false;
            });
        }
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
        this.isLikedBtn = true;
        if (this.detailsData.is_liked) {
            this.coffeeLabService.updateUnLike(PostType.ARTICLE, articleId).subscribe((res) => {
                if (res.success) {
                    this.detailsData.is_liked = false;
                    this.detailsData.likes = this.detailsData.likes - 1;
                }
                this.isLikedBtn = false;
            });
        } else {
            this.coffeeLabService.updateLike(PostType.ARTICLE, articleId).subscribe((res) => {
                if (res.success) {
                    this.detailsData.is_liked = true;
                    this.detailsData.likes = this.detailsData.likes + 1;
                }
                this.isLikedBtn = false;
            });
        }
    }

    toastCalled(event) {
        if (event) {
            this.showToaster = true;
        }
    }
}
