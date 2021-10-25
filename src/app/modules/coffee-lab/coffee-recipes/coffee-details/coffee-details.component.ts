import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { AuthService, ChatHandlerService, CoffeeLabService, GlobalsService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { combineLatest, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-coffee-details',
    templateUrl: './coffee-details.component.html',
    styleUrls: ['./coffee-details.component.scss'],
    providers: [MessageService],
})
export class CoffeeDetailsComponent implements OnInit, OnDestroy {
    relatedData: any[] = [];
    detailsData: any;
    slug = '';
    isLoading = true;
    commentData: any[] = [];
    destroy$: Subject<boolean> = new Subject<boolean>();
    stickySecData: any;
    comment: string;
    language: string;
    allComments: any[] = [];
    showCommentBtn = true;
    isSaveRecipe = false;
    orginalUserData: any;
    isMyPost = false;
    isSavedPost = false;
    isLikedBtn = true;
    pages: any;
    recentQuestions: any[] = [];
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

    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        public coffeeLabService: CoffeeLabService,
        private messageService: MessageService,
        public authService: AuthService,
        public globalsService: GlobalsService,
        private userService: UserService,
        private toastrService: ToastrService,
        private chatHandler: ChatHandlerService,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.slug = params.id;
            const language = this.activatedRoute.snapshot.queryParamMap.get('language');
            this.language = language || this.coffeeLabService.currentForumLanguage;
            this.getCoffeeDetails(true);
            this.getCoffeeRecipesData();
        });
        this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.isMyPost = queryParams.isMyPost;
            this.isSavedPost = queryParams.isSavedPost;
        });
    }

    ngOnInit(): void {
        window.scroll(0, 0);
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.router.navigate(['/coffee-lab/overview/coffee-recipes']);
        });
    }

    onFocusCommentBox() {
        document.getElementById('text-recipe-focus').focus();
    }

    getCoffeeDetails(isReloading: boolean): void {
        this.isLoading = isReloading;
        combineLatest([
            this.coffeeLabService.getForumDetails('recipe', this.slug),
            this.coffeeLabService.getForumList('question', {
                page: this.pages ? this.pages + 1 : 2,
                per_page: 15,
                category_slug: this.coffeeLabService.qaForumViewCategory,
            }),
        ])
            .pipe(take(1))
            .subscribe(([res, ques]: [any, any]) => {
                if (res.success || ques.success) {
                    this.detailsData = res.result;
                    this.detailsData.description = this.getJustText(this.detailsData.description);
                    this.isSaveRecipe = this.detailsData.is_saved;
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
                    this.recentQuestions = ques.result?.questions;
                    this.isLoading = false;
                } else {
                    this.toastrService.error('Cannot get detail data');
                }
            });
    }

    getCoffeeRecipesData() {
        const params = {
            count: 10,
        };
        this.coffeeLabService.getPopularList('recipe', params).subscribe((res) => {
            if (res.success) {
                this.relatedData = res.result;
                this.relatedData.map((item) => {
                    item.description = this.getJustText(item.description);
                    return item;
                });
            }
        });
    }

    onRealtedRoute(slug) {
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
        window.scrollTo(0, 0);
    }

    getCommentsData(): void {
        this.coffeeLabService.getCommentList('recipe', this.detailsData.slug).subscribe((res: any) => {
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

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
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
        this.coffeeLabService.postComment('recipe', this.detailsData.id, data).subscribe((res: any) => {
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
        this.isLikedBtn = false;
        this.coffeeLabService.updateLike('recipe', recipeId).subscribe((res) => {
            if (res.success) {
                this.detailsData.is_liked = true;
                this.detailsData.likes = this.detailsData.likes + 1;
                this.isLikedBtn = true;
            }
        });
    }

    onUnLike(recipeId: number) {
        this.isLikedBtn = false;
        this.coffeeLabService.updateUnLike('recipe', recipeId).subscribe((res) => {
            if (res.success) {
                this.detailsData.is_liked = false;
                this.detailsData.likes = this.detailsData.likes - 1;
                this.isLikedBtn = true;
            }
        });
    }

    updateMarkBrewed(recipeId: number, isBrewed: boolean) {
        if (isBrewed) {
            this.coffeeLabService.unMarkBrewed('recipe', recipeId).subscribe((res: any) => {
                if (res.success) {
                    this.detailsData.is_brewed = false;
                    this.toastrService.success(this.detailsData?.name + ' un-marked as brewed successfully');
                } else {
                    this.toastrService.error('Error while update mark brewed');
                }
            });
        } else {
            this.coffeeLabService.markBrewed('recipe', recipeId).subscribe((res: any) => {
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
        this.coffeeLabService.saveForum('recipe', recipeId).subscribe((res: any) => {
            if (res.success) {
                this.isSaveRecipe = true;
                this.toastrService.success('Successfully saved');
            } else {
                this.toastrService.error('Error while save post');
            }
        });
    }

    onSameSave(recipeId: number) {
        this.coffeeLabService.unSaveFormByType('recipe', recipeId).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success(`You have removed the recipe successfully from saved posts.`);
                this.isSaveRecipe = false;
            } else {
                this.toastrService.error(`Failed to remmove a recipe from saved posts.`);
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
            this.router.navigateByUrl('/coffee-lab/overview/my-posts/recipe');
        } else if (this.isSavedPost) {
            this.router.navigateByUrl('/coffee-lab/overview/saved-posts/recipe');
        } else {
            this.router.navigateByUrl('/coffee-lab/overview/coffee-recipes');
        }
    }

    onCategoryClick(slug: string) {
        this.router.navigateByUrl('/coffee-lab/category/' + slug);
    }
}
