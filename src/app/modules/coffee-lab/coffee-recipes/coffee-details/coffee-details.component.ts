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
    selector: 'app-coffee-details',
    templateUrl: './coffee-details.component.html',
    styleUrls: ['./coffee-details.component.scss'],
    providers: [MessageService, ConvertToShortDescriptionPipe],
})
export class CoffeeDetailsComponent extends DestroyableComponent implements OnInit {
    readonly PostType = PostType;
    readonly recipeLink = LinkType.RECIPE;
    relatedData: any[] = [];
    detailsData: any;
    slug = '';
    isLoading = true;
    commentData: any[] = [];
    stickySecData: any;
    comment: string;
    language: string;
    allComments: any[] = [];
    showCommentBtn = true;
    orginalUserData: any;
    isMyPost = false;
    isSavedPost = false;
    isSaveBtn = false;
    isLikedBtn = false;
    showToaster = false;
    infoData: any[] = [
        {
            icon: 'assets/images/aeropress.svg',
            label: 'equipment',
            key: 'equipment_name',
        },
        {
            icon: 'assets/images/brew-ratio.svg',
            label: 'brew_ratio',
            key: 'coffee_ratio',
            key2: 'water_ratio',
        },
        {
            icon: 'assets/images/yeild.svg',
            label: 'yeild',
            key: 'serves',
        },
    ];
    items: ({ label: any; routerLink: string } | { label: any; routerLink?: undefined })[];

    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        public coffeeLabService: CoffeeLabService,
        private messageService: MessageService,
        public authService: AuthService,
        private userService: UserService,
        private toastrService: ToastrService,
        private translator: TranslateService,
        private chatHandler: ChatHandlerService,
        private convertToShortDescription: ConvertToShortDescriptionPipe,
    ) {
        super();
        this.activatedRoute.params.subscribe((params) => {
            this.slug = params.id;
            const language = this.activatedRoute.snapshot.queryParamMap.get('language');
            this.language = language || this.coffeeLabService.currentForumLanguage;
            this.getCoffeeDetails(true);
        });
        this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.isMyPost = queryParams.isMyPost;
            this.isSavedPost = queryParams.isSavedPost;
        });
    }

    ngOnInit(): void {
        window.scroll(0, 0);
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.unsubscribeAll$)).subscribe(() => {
            this.router.navigate(['/coffee-lab/overview/coffee-recipes']);
        });
    }

    onFocusCommentBox() {
        document.getElementById('text-recipe-focus').focus();
    }

    getCoffeeDetails(isReloading: boolean): void {
        this.isLoading = isReloading;
        this.coffeeLabService.getForumDetails(PostType.RECIPE, this.slug).subscribe((res: any) => {
            if (res.success) {
                this.coffeeLabService.updateLang(res.result.lang_code).then(() => {
                    this.detailsData = res.result;
                    this.items = [
                        { label: this.translator.instant('the_coffee_lab'), routerLink: '/' },
                        {
                            label: this.translator.instant('brewing_guides'),
                            routerLink: `/coffee-lab/overview/coffee-recipes`,
                        },
                        {
                            label: this.convertToShortDescription.transform(this.detailsData?.name, 4),
                        },
                    ];
                    this.getCoffeeRecipesData();
                    this.detailsData.description = this.getJustText(this.detailsData.description);
                    if (
                        this.detailsData?.original_recipe_state &&
                        this.detailsData?.original_recipe_state === 'ACTIVE'
                    ) {
                        this.getOriginalUserDetail(this.detailsData.original_details);
                    }
                    this.getUserDetail(this.detailsData);
                    this.getCommentsData();
                    if (this.detailsData?.steps && this.detailsData?.steps.length > 0) {
                        this.detailsData.steps.map((item) => {
                            item.description = this.getJustText(item.description);
                            return item;
                        });
                    }
                    if (res.result.parent_id) {
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

    getCoffeeRecipesData() {
        this.coffeeLabService
            .getPopularList(
                PostType.RECIPE,
                {
                    count: 7,
                },
                this.detailsData.lang_code,
            )
            .subscribe((res) => {
                if (res.success) {
                    this.relatedData = (res.result || [])
                        .filter((item) => item && item?.slug !== this.slug)
                        .slice(0, 6);
                }
            });
    }

    onRealtedRoute(slug: string, isOrginal: boolean, language?: string) {
        if (this.isMyPost) {
            this.router.navigate(['/coffee-lab/recipes/' + slug], {
                queryParams: {
                    isMyPost: true,
                },
            });
        } else if (this.isSavedPost) {
            this.router.navigate(['/coffee-lab/recipes/' + slug], {
                queryParams: {
                    isSavedPost: true,
                },
            });
        } else {
            this.router.navigateByUrl('/coffee-lab/recipes/' + slug);
        }
        if (isOrginal) {
            this.coffeeLabService.forumLanguage.next(language);
        }
        window.scrollTo(0, 0);
    }

    getCommentsData(): void {
        this.coffeeLabService.getCommentList(PostType.RECIPE, this.detailsData.slug).subscribe((res: any) => {
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

    onShare(): void {
        this.coffeeLabService.copyContext(`${environment.adminWeb}/coffee-lab/recipes/${this.detailsData.slug}`);
    }

    viewAllComments() {
        this.commentData = this.allComments;
        this.showCommentBtn = false;
    }

    getJustText(content: any) {
        const contentElement = document.createElement('div');
        contentElement.innerHTML = content;
        return contentElement.innerHTML;
    }

    getUserDetail(userDatils: any): void {
        this.userService.getUserDetail(userDatils.user_id, userDatils.organisation_type).subscribe((res) => {
            if (res.success) {
                this.stickySecData = res.result;
            }
        });
    }

    getOriginalUserDetail(userDetails: any): void {
        this.userService.getUserDetail(userDetails.user_id, userDetails.organisation_type).subscribe((res) => {
            if (res.success) {
                this.orginalUserData = res.result;
            }
        });
    }

    onPost(): void {
        const data = {
            comment: this.comment,
            status: 'PUBLISHED',
            language: this.language,
        };
        this.coffeeLabService.postComment(PostType.RECIPE, this.detailsData.id, data).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('You have posted a comment successfully.');
                this.comment = '';
                this.getCommentsData();
            } else {
                this.toastrService.error('Failed to post comment.');
            }
        });
    }

    onLike(recipeId: number) {
        this.isLikedBtn = true;
        if (this.detailsData?.is_liked) {
            this.coffeeLabService.updateUnLike(PostType.RECIPE, recipeId).subscribe((res) => {
                if (res.success) {
                    this.detailsData.is_liked = false;
                    this.detailsData.likes = this.detailsData.likes - 1;
                }
                this.isLikedBtn = false;
            });
        } else {
            this.coffeeLabService.updateLike(PostType.RECIPE, recipeId).subscribe((res) => {
                if (res.success) {
                    this.detailsData.is_liked = true;
                    this.detailsData.likes = this.detailsData.likes + 1;
                }
                this.isLikedBtn = false;
            });
        }
    }

    updateMarkBrewed(recipeId: number, isBrewed: boolean) {
        if (isBrewed) {
            this.coffeeLabService.unMarkBrewed(PostType.RECIPE, recipeId).subscribe((res: any) => {
                if (res.success) {
                    this.detailsData.is_brewed = false;
                    this.toastrService.success(this.detailsData?.name + ' un-marked as brewed successfully');
                } else {
                    this.toastrService.error('Error while update mark brewed');
                }
            });
        } else {
            this.coffeeLabService.markBrewed(PostType.RECIPE, recipeId).subscribe((res: any) => {
                if (res.success) {
                    this.detailsData.is_brewed = true;
                    this.toastrService.success(this.detailsData?.name + ' marked as brewed successfully');
                } else {
                    this.toastrService.error('Error while update mark brewed');
                }
            });
        }
    }

    onSave(recipeId: number): void {
        this.isSaveBtn = true;
        if (this.detailsData?.is_saved) {
            this.coffeeLabService.unSaveFormByType(PostType.RECIPE, recipeId).subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success(`You have removed the recipe successfully from saved posts.`);
                    this.detailsData.is_saved = false;
                } else {
                    this.toastrService.error(`Failed to remmove a recipe from saved posts.`);
                }
                this.isSaveBtn = false;
            });
        } else {
            this.coffeeLabService.saveForum(PostType.RECIPE, recipeId).subscribe((res: any) => {
                if (res.success) {
                    this.detailsData.is_saved = true;
                    this.toastrService.success('Successfully saved');
                    this.isSaveBtn = false;
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
            this.router.navigateByUrl('/coffee-lab/overview/my-posts/recipe');
        } else if (this.isSavedPost) {
            this.router.navigateByUrl('/coffee-lab/overview/saved-posts/recipe');
        } else {
            this.router.navigateByUrl('/coffee-lab/overview/coffee-recipes');
        }
    }

    toastCalled(event) {
        if (event) {
            this.showToaster = true;
        }
    }
}
