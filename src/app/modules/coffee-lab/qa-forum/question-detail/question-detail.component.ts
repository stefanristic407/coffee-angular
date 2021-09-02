import { Component, OnInit, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CoffeeLabService, GlobalsService } from '@services';
import { DOCUMENT, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '@env/environment';

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
    recentQuestions: any[] = [];
    language: string;
    destroy$: Subject<boolean> = new Subject<boolean>();
    comment: string;
    answerDetail: any;

    constructor(
        public coffeeLabService: CoffeeLabService,
        private activatedRoute: ActivatedRoute,
        @Inject(DOCUMENT) private document: any,
        public globalsService: GlobalsService,
        public location: Location,
        private toastService: ToastrService,
        public authService: AuthService,
        private messageService: MessageService,
        public router: Router,
        private toastrService: ToastrService,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.slug = params.slug;
            this.getRecentQuestions();
            if (!this.isLoading) {
                this.getDetails();
            }
        });
        this.activatedRoute.queryParams.subscribe((queryParams) => {
            const language = this.activatedRoute.snapshot.queryParamMap.get('language');
            this.language = language || this.coffeeLabService.currentForumLanguage;
            if (!this.isLoading) {
                this.getDetails();
            }
        });
    }

    ngOnInit(): void {
        window.scroll(0, 0);
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.router.navigate(['/coffee-lab/overview/qa-forum']);
        });
    }

    getRecentQuestions(): void {
        const params = {
            sort_by: 'posted_at',
            sort_order: 'desc',
            publish: true,
        };
        this.coffeeLabService.getForumList('question', params).subscribe((res: any) => {
            if (res.success) {
                this.recentQuestions = res.result?.questions
                    ?.filter((item: any) => item.id !== this.slug && item.slug !== this.slug)
                    .slice(0, 5);
            } else {
                this.toastService.error('Cannot get recent questions');
            }
        });
    }

    getDetails(): void {
        this.isLoading = true;
        this.coffeeLabService.getForumDetails('question', this.slug).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
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

    getLink(language, slug) {
        return `/${language}/qa-forum/${slug}`;
    }

    setPagePosition(): void {
        const answerId = this.activatedRoute.snapshot.queryParamMap.get('answer');
        if (answerId) {
            const element = this.document.getElementById(answerId);
            const screenWidth = window.innerWidth;
            let offsetTop = 0;
            if (screenWidth > 991) {
                offsetTop = element.offsetTop - 136;
            } else if (screenWidth > 767) {
                offsetTop = element.offsetTop - 70;
            } else {
                offsetTop = element.offsetTop - 56;
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
            language: this.language,
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

    onSave(id: number): void {
        this.coffeeLabService.saveForum('answer', id).subscribe((res: any) => {
            if (res.success) {
                // this.question.is_saved = true;
                this.toastService.success('Successfully saved');
            } else {
                this.toastService.error('Error while save post');
            }
        });
    }

    onSameSave(id: number): void {
        this.coffeeLabService.unSaveFormByType('question', id).subscribe((res: any) => {
            if (res.success) {
                this.toastService.success(`You have removed the question successfully from saved posts.`);
                // this.question.is_saved = false;
            } else {
                this.toastService.error(`Failed to remmove a question from saved posts.`);
            }
        });
    }

    onFocus() {}
}
