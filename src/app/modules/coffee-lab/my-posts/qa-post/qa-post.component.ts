import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-qa-post',
    templateUrl: './qa-post.component.html',
    styleUrls: ['./qa-post.component.scss'],
})
export class QaPostComponent implements OnInit, OnDestroy {
    viewMode = 'list';
    questions = [];
    isLoading = false;
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Most answered', value: 'most_answered' },
        { label: 'Oldest', value: 'oldest' },
    ];
    pageDesc: string | undefined;
    destroy$: Subject<boolean> = new Subject<boolean>();
    forumLanguage: string;
    pages = 1;
    totalRecords: number;
    rows = 10;

    constructor(
        public coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private router: Router,
    ) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getPosts();
        });
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.getPosts();
        });
    }

    getPosts(): void {
        this.isLoading = true;
        const params = {
            sort_by: this.coffeeLabService.qaPostSortBy === 'most_answered' ? 'most_answered' : 'posted_at',
            sort_order:
                this.coffeeLabService.qaPostSortBy === 'most_answered'
                    ? 'desc'
                    : this.coffeeLabService.qaPostSortBy === 'latest' || this.coffeeLabService.qaPostSortBy === null
                    ? 'desc'
                    : 'asc',
            page: this.pages,
            per_page: this.rows,
        };
        if (this.pageDesc === 'saved-posts') {
            this.coffeeLabService.getSavedForumList('question', params).subscribe((res: any) => {
                this.isLoading = false;
                if (res.success) {
                    this.questions = (res.result || []).map((item) => {
                        const answers = 'answers';
                        item[answers] = [];
                        if (item.answer_1_content) {
                            const answerObj1 = {
                                answer: item.answer_1_content,
                                id: item.answer_1_id,
                                org_id: item.answer_1_org_id,
                                org_type: item.answer_1_org_type,
                                profile_image_url: item.answer_1_profile_image_thumb_url,
                                user_id: item.answer_1_user_id,
                                user_name: item.answer_1_user_name,
                                updated_at: item.answer_1_updated_at,
                                created_at: item.answer_1_created_at,
                                company_name: item.answer_1_org_name,
                            };
                            item.answers.push(answerObj1);
                            item.total_answers = 1;
                        }
                        if (item.answer_2_content) {
                            const answerObj2 = {
                                answer: item.answer_2_content,
                                id: item.answer_2_id,
                                org_id: item.answer_2_org_id,
                                org_type: item.answer_2_org_type,
                                profile_image_url: item.answer_2_profile_image_thumb_url,
                                user_id: item.answer_2_user_id,
                                user_name: item.answer_2_user_name,
                                updated_at: item.answer_2_updated_at,
                                created_at: item.answer_2_created_at,
                                company_name: item.answer_2_org_name,
                            };
                            item.answers.push(answerObj2);
                            item.total_answers += 1;
                        }
                        item.is_saved = true;
                        return item;
                    });
                    this.totalRecords = res.result_info.total_count;
                } else {
                    this.toastService.error('Cannot get forum data');
                }
            });
        } else {
            this.coffeeLabService.getOrganizationForumList('question', params).subscribe((res: any) => {
                this.isLoading = false;
                if (res.success) {
                    this.questions = res.result?.questions || [];
                    this.totalRecords = res.result_info.total_count;
                } else {
                    this.toastService.error('Cannot get forum data');
                }
            });
        }
    }

    paginate(event: any) {
        if (this.pages !== event.page + 1) {
            this.pages = event.page + 1;
            this.getPosts();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
