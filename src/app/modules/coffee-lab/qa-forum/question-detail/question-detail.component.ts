import { Component, OnInit, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, CoffeeLabService, GlobalsService } from '@services';
import { DOCUMENT, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.scss'],
    providers: [MessageService],
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
    slug?: string;
    isLoading = false;
    detailsData: any;
    recentQuestions: any[] = [];
    language: string;
    organizationId: any;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public coffeeLabService: CoffeeLabService,
        private activatedRoute: ActivatedRoute,
        @Inject(DOCUMENT) private document: any,
        public globalsService: GlobalsService,
        public location: Location,
        private toastService: ToastrService,
        public authService: AuthService,
        private messageService: MessageService,
        private cookieService: CookieService,
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
        this.organizationId = +this.cookieService.get('roaster_id');
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.getDetails();
        });
    }

    getRecentQuestions(): void {
        const params = {
            sort_by: 'posted_at',
            sort_order: 'desc',
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
            console.log('question details >>>>>>>>>>>>', res);
            this.isLoading = false;
            if (res.success) {
                this.detailsData = res.result;
                setTimeout(() => {
                    this.setPagePosition();
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
}
