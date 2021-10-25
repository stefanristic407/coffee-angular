import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { AuthService, CoffeeLabService, GlobalsService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { combineLatest, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.scss'],
    providers: [MessageService],
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
    isAllowTranslation = true;
    slug?: string;
    isLoading = false;
    detailsData: any;
    destroy$: Subject<boolean> = new Subject<boolean>();
    comment: string;
    answerDetail: any;
    isMyPost = false;
    isSavedPost = false;
    isAssignedToMe = false;
    isMyAnswer = false;
    isLikedBtn = true;
    answerComment: any;
    answerAllowTranslation: boolean;
    pages: any;
    relatedData: any;

    constructor(
        public coffeeLabService: CoffeeLabService,
        private activatedRoute: ActivatedRoute,
        @Inject(DOCUMENT) private document: any,
        public globalsService: GlobalsService,
        private toastService: ToastrService,
        public authService: AuthService,
        private messageService: MessageService,
        public router: Router,
        private toastrService: ToastrService,
    ) {
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
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe((res) => {
            if (res === 'answer') {
                this.getDetails();
            } else {
                this.onBack();
            }
        });
    }

    getDetails(): void {
        this.isLoading = true;
        this.answerDetail = {};
        combineLatest([
            this.coffeeLabService.getForumDetails('question', this.slug),
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
                    if (this.detailsData.parent_question_id > 0) {
                        this.detailsData.answers.forEach((element) => {
                            if (element.parent_answer_id > 0) {
                                this.getAnswerDetail(element.id);
                            }
                        });
                    }
                    setTimeout(() => {
                        this.setPagePosition();
                        document.getElementById('text-focus').focus();
                    }, 500);
                    if (res.result.parent_question_id) {
                        this.messageService.clear();
                        this.messageService.add({
                            key: 'translate',
                            severity: 'success',
                            closable: false,
                        });
                    }
                    this.relatedData = ques.result?.questions;
                    this.isLoading = false;
                } else {
                    this.toastService.error('Cannot get detail data');
                }
            });
    }

    getAnswerDetail(id: any) {
        this.coffeeLabService.getForumDetails('answer', id).subscribe((res: any) => {
            this.answerDetail = res.result;
        });
    }

    getLink(slug) {
        return `/coffee-lab/questions/${slug}`;
    }

    setPagePosition(): void {
        const answerId = this.activatedRoute.snapshot.queryParamMap.get('answer');
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

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
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

    onFocusCommentBox() {
        document.getElementById('text-focus').focus();
    }

    onLike(answer) {
        this.isLikedBtn = false;
        this.coffeeLabService.updateLike('answer', answer.id).subscribe((res) => {
            if (res.success) {
                answer.is_liked = true;
                answer.likes = answer.likes + 1;
                this.isLikedBtn = true;
            }
        });
    }

    onUnLike(answer) {
        this.isLikedBtn = false;
        this.coffeeLabService.updateUnLike('answer', answer.id).subscribe((res) => {
            if (res.success) {
                answer.is_liked = false;
                answer.likes = answer.likes - 1;
                this.isLikedBtn = true;
            }
        });
    }

    onSave(id: number, index: number): void {
        this.coffeeLabService.saveForum('answer', id).subscribe((res: any) => {
            if (res.success) {
                this.detailsData.answers[index].is_saved = true;
                this.toastService.success('You have saved the answer successfully from saved posts.');
            } else {
                this.toastService.error('Error while save post');
            }
        });
    }

    onSameSave(id: number, index: number): void {
        this.coffeeLabService.unSaveFormByType('answer', id).subscribe((res: any) => {
            if (res.success) {
                this.detailsData.answers[index].is_saved = false;
                this.toastService.success(`You have removed the answer successfully from saved posts.`);
            } else {
                this.toastService.error(`Failed to remmove a question from saved posts.`);
            }
        });
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
        this.coffeeLabService.getForumDetails('answer', forumId).subscribe((res: any) => {
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
            this.coffeeLabService.updateForum('answer', forumId, data).subscribe((res: any) => {
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

    onCategoryClick(slug: string) {
        this.router.navigateByUrl('/coffee-lab/category/' + slug);
    }
}
