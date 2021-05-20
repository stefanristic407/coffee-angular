import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-qa-post',
    templateUrl: './qa-post.component.html',
    styleUrls: ['./qa-post.component.scss'],
})
export class QaPostComponent implements OnInit, OnDestroy {
    viewMode = 'list';
    questions = [];
    isLoading = false;
    isDisplayTip = true;
    viewModeItems: any[] = [{ value: 'list' }, { value: 'grid' }];
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Most Answered', value: 'most_answered' },
        { label: 'Oldest', value: 'oldest' },
    ];
    filterOptions = [{ label: 'Posted by: All', value: null }];
    sortBy = 'latest';
    filterBy = null;
    keyword = '';
    filteredData = [];
    pageDesc: string | undefined;
    destroy$: Subject<boolean> = new Subject<boolean>();
    forumLanguage: string;

    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private router: Router,
    ) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        this.getAuthors();
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getPosts();
        });
        this.coffeeLabService.forumDeleteEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.getPosts();
        });
    }

    getAuthors(): void {
        this.coffeeLabService.getAuthors('question').subscribe((res: any) => {
            if (res.success) {
                const filterArray = res.result.question_authors.map((item: any) => {
                    return {
                        label: `Posted by: ${item.name}`,
                        value: item.id,
                    };
                });
                this.filterOptions = [...this.filterOptions, ...filterArray];
            } else {
                this.toastService.error('Cannot get authors');
            }
        });
    }

    getPosts(): void {
        this.isLoading = true;
        if (this.pageDesc === 'saved-posts') {
            const params = {
                query: this.keyword,
                sort_by: this.sortBy === 'most_answered' ? 'most_answered' : 'created_at',
                // org_type: 'ro',
                sort_order: this.sortBy === 'most_answered' ? 'desc' : this.sortBy === 'latest' ? 'desc' : 'asc',
            };
            this.coffeeLabService.getSavedForumList('question', params).subscribe((res: any) => {
                this.isLoading = false;
                if (res.success) {
                    this.questions = res.result || [];
                    if (this.questions && this.questions.length > 0) {
                        this.questions = this.questions.map((item) => {
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
                            return item;
                        });
                    }
                } else {
                    this.toastService.error('Cannot get forum data');
                }
            });
        } else {
            const params = {
                query: this.keyword,
                sort_by: this.sortBy === 'most_answered' ? 'most_answered' : 'posted_at',
                // org_type: 'ro',
                sort_order: this.sortBy === 'most_answered' ? 'desc' : this.sortBy === 'latest' ? 'desc' : 'asc',
            };
            this.coffeeLabService.getOrganizationForumList('question', params).subscribe((res: any) => {
                this.isLoading = false;
                if (res.success) {
                    this.questions = res.result?.questions || [];
                } else {
                    this.toastService.error('Cannot get forum data');
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
