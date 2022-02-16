import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvertToShortDescriptionPipe } from '@app/shared/pipes/convert-to-short-description.pipe';
import { DestroyableComponent } from '@base-components';
import { LinkType, PostType } from '@enums';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.scss'],
    providers: [MessageService, ConvertToShortDescriptionPipe],
})
export class QuestionDetailComponent extends DestroyableComponent implements OnInit {
    readonly PostType = PostType;
    readonly qaLink = LinkType.QA;
    isAllowTranslation = true;
    slug?: string;
    isLoading = false;
    detailsData: any;
    comment: string;
    answerDetail: any;
    isMyPost = false;
    isSavedPost = false;
    isAssignedToMe = false;
    isMyAnswer = false;
    isSaveBtn = false;
    isLikedBtn = false;
    showToaster = false;
    answerComment: any;
    answerAllowTranslation: boolean;
    items: ({ label: any; routerLink: string } | { label: any; routerLink?: undefined })[];

    constructor(
        public coffeeLabService: CoffeeLabService,
        private activatedRoute: ActivatedRoute,
        @Inject(DOCUMENT) private document: any,
        private toastService: ToastrService,
        public authService: AuthService,
        private messageService: MessageService,
        public router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        private convertToShortDescription: ConvertToShortDescriptionPipe,
    ) {
        super();
        this.activatedRoute.params.subscribe((params) => {
            this.slug = params.slug;
            if (!this.isLoading) {
                this.getDetails();
            }
        });
        this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.isMyPost = queryParams.isMyPost;
            this.isSavedPost = queryParams.isSavedPost;
            this.isAssignedToMe = queryParams.isAssignedToMe;
            this.isMyAnswer = queryParams.isMyAnswer;
            if (!this.isLoading) {
                this.getDetails();
            }
        });
    }

    ngOnInit(): void {
        window.scroll(0, 0);
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res) => {
            if (res === PostType.ANSWER) {
                this.getDetails();
            } else {
                this.onBack();
            }
        });
    }

    getDetails(): void {
        this.isLoading = true;
        this.answerDetail = {};
        this.coffeeLabService.getForumDetails('question', this.slug).subscribe((res: any) => {
            if (res.success) {
                this.coffeeLabService.updateLang(res.result.lang_code).then(() => {
                    this.detailsData = res.result;
                    this.items = [
                        { label: this.translator.instant('the_coffee_lab'), routerLink: '/coffee-lab' },
                        {
                            label: this.translator.instant('question_answers'),
                            routerLink: `/coffee-lab/overview/qa-forum`,
                        },
                        {
                            label: this.convertToShortDescription.transform(this.detailsData.question, 4),
                        },
                    ];
                    if (this.detailsData.parent_question_id > 0) {
                        this.detailsData.answers.forEach((element) => {
                            if (element.parent_answer_id > 0) {
                                this.getAnswerDetail(element.id);
                            }
                        });
                    }
                    setTimeout(() => {
                        this.setPagePosition();
                        if (document.getElementById('text-focus')) {
                            document.getElementById('text-focus').focus();
                        }
                    }, 500);
                    if (res.result.parent_question_id) {
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
                this.toastService.error('Cannot get detail data');
            }
        });
    }

    getAnswerDetail(id: any) {
        this.coffeeLabService.getForumDetails(PostType.ANSWER, id).subscribe((res: any) => {
            this.answerDetail = res.result;
        });
    }

    getLink(slug) {
        return `/coffee-lab/questions/${slug}`;
    }

    setPagePosition(): void {
        const answerId = this.activatedRoute.snapshot.queryParamMap.get(PostType.ANSWER);
        if (answerId) {
            const element = this.document.getElementById(answerId);
            const screenWidth = window.innerWidth;
            let offsetTop = 0;
            if (screenWidth > 991) {
                offsetTop = element?.offsetTop - 136;
            } else if (screenWidth > 767) {
                offsetTop = element?.offsetTop - 70;
            } else {
                offsetTop = element?.offsetTop - 56;
            }
            window.scroll(0, offsetTop);
        }
    }

    onPost(): void {
        const data = {
            allow_translation: this.isAllowTranslation ? 1 : 0,
            answer: this.comment,
            status: 'PUBLISHED',
            language: this.coffeeLabService.currentForumLanguage,
        };
        this.coffeeLabService.postComment('question', this.detailsData.id, data).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('You have posted a comment successfully.');
                this.comment = '';
                this.getDetails();
            } else {
                this.toastrService.error('Failed to post comment.');
            }
        });
    }

    onShare(): void {
        this.coffeeLabService.copyContext(`${environment.adminWeb}/coffee-lab/questions/${this.detailsData.slug}`);
    }

    onFocusCommentBox(event?) {
        document.getElementById('text-focus').focus();
    }

    onLike(answer) {
        this.isLikedBtn = true;
        if (answer.is_liked) {
            this.coffeeLabService.updateUnLike(PostType.ANSWER, answer.id).subscribe((res) => {
                if (res.success) {
                    answer.is_liked = false;
                    answer.likes = answer.likes - 1;
                }
                this.isLikedBtn = false;
            });
        } else {
            this.coffeeLabService.updateLike(PostType.ANSWER, answer.id).subscribe((res) => {
                if (res.success) {
                    answer.is_liked = true;
                    answer.likes = answer.likes + 1;
                }
                this.isLikedBtn = false;
            });
        }
    }

    onSave(id: number, index: number): void {
        this.isSaveBtn = true;
        if (this.detailsData.answers[index].is_saved) {
            this.coffeeLabService.unSaveFormByType(PostType.ANSWER, id).subscribe((res: any) => {
                if (res.success) {
                    this.detailsData.answers[index].is_saved = false;
                    this.toastService.success(`You have removed the answer successfully from saved posts.`);
                } else {
                    this.toastService.error(`Failed to remmove a question from saved posts.`);
                }
                this.isSaveBtn = false;
            });
        } else {
            this.coffeeLabService.saveForum(PostType.ANSWER, id).subscribe((res: any) => {
                if (res.success) {
                    this.detailsData.answers[index].is_saved = true;
                    this.toastService.success('You have saved the answer successfully from saved posts.');
                } else {
                    this.toastService.error('Error while save post');
                }
                this.isSaveBtn = false;
            });
        }
    }

    onBack() {
        if (this.isMyPost) {
            this.router.navigateByUrl('/coffee-lab/overview/my-posts/qa-post');
        } else if (this.isSavedPost) {
            this.router.navigateByUrl('/coffee-lab/overview/saved-posts/qa-post');
        } else if (this.isAssignedToMe) {
            this.router.navigateByUrl('/coffee-lab/overview/assigned-to-me');
        } else if (this.isMyAnswer) {
            this.router.navigateByUrl('/coffee-lab/overview/my-posts/answer');
        } else {
            this.router.navigateByUrl('/coffee-lab/overview/qa-forum');
        }
    }

    onEditAnswer(event: any, index?: number) {
        if (event) {
            const isEdit = 'isEdit';
            this.detailsData.answers[index][isEdit] = true;
            this.getForumById(this.detailsData.answers[index].id);
        }
    }

    getForumById(forumId: number): void {
        this.coffeeLabService.getForumDetails(PostType.ANSWER, forumId).subscribe((res: any) => {
            if (res.success) {
                this.answerComment = res.result.answer;
                this.answerAllowTranslation = res.result?.allow_translation;
            } else {
                this.toastrService.error('Error while get comment');
                // this.location.back();
            }
        });
    }

    onEditPost(forumId: number): void {
        if (!this.answerComment) {
            this.toastrService.error('Please fill out field.');
            return;
        }
        let data: any = {};
        data = {
            answer: this.answerComment,
            allow_translation: this.answerAllowTranslation ? (this.answerAllowTranslation ? 1 : 0) : 0,
            status: 'PUBLISHED',
            language: this.coffeeLabService.currentForumLanguage,
        };

        this.isLoading = true;
        if (forumId) {
            this.coffeeLabService.updateForum(PostType.ANSWER, forumId, data).subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Your comment updated successfully');
                    this.getDetails();
                } else {
                    this.toastrService.error('Failed to update article.');
                }
            });
        }
    }

    onCancel(index: number) {
        this.detailsData.answers[index].isEdit = false;
    }

    toastCalled(event) {
        if (event) {
            this.showToaster = true;
        }
    }

    onOrginalArticle(language) {
        this.coffeeLabService.forumLanguage.next(language);
    }
}
