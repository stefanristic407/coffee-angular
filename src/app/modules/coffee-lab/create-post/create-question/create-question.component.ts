import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from '@app/shared';
import { APP_LANGUAGES } from '@constants';
import { CoffeeLabService, GlobalsService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {
    content?: string;
    isPosting = false;
    question: any;
    questionId: any;
    isLoading = false;
    languageCode?: string;
    isQuestion = false;
    languageList: any[] = APP_LANGUAGES;
    categoryList: any;
    categoryValue: any;
    selectedCategory: string;
    status: string;

    constructor(
        public location: Location,
        public dialogService: DialogService,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        private toaster: ToastrService,
        private globalsService: GlobalsService,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            const type = params.type;
            if (type === 'question') {
                this.questionId = params.id;
                this.status = params.status;
                if (this.questionId) {
                    this.getCompleteData();
                } else {
                    this.languageCode = this.coffeeLabService.currentForumLanguage;
                    this.getCategory();
                }
            }
        });
    }

    getCompleteData() {
        this.isLoading = true;
        combineLatest([
            this.coffeeLabService.getForumDetails('question', this.questionId),
            this.coffeeLabService.getCategory(this.coffeeLabService.currentForumLanguage),
        ])
            .pipe(take(1))
            .subscribe(([res, category]: [any, any]) => {
                if (category.success) {
                    this.categoryList = category.result;
                }
                if (res.success) {
                    this.content = res.result.question;
                    this.question = res.result;
                    this.languageCode = res.result.lang_code;
                    this.categoryValue = res.result.categories;
                } else {
                    this.toaster.error('Error while get question');
                    this.location.back();
                }
                this.isLoading = false;
            });
    }

    getCategory() {
        this.categoryList = [];
        this.languageCode = this.languageCode ? this.languageCode : 'en';
        this.coffeeLabService.getCategory(this.languageCode).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
                if (this.categoryValue) {
                    const changedCategoryValue = [];
                    this.categoryList.forEach((item) => {
                        this.categoryValue.forEach((element) => {
                            if (item.parent_id === element.parent_id) {
                                changedCategoryValue.push(item);
                            }
                        });
                    });
                    this.categoryValue = changedCategoryValue;
                }
            }
        });
    }

    onPostQuestion(status: string): void {
        this.content = this.content.trim();
        if (!this.content) {
            this.isQuestion = true;
            this.toastrService.error('Please type your question.');
            return;
        }
        const data = {
            question: this.content,
            allow_translation: 1,
            status,
            language: this.languageCode,
            categories: this.categoryValue?.map((item) => item.id) || [],
        };
        const confirmText = status === 'DRAFT' ? 'save this question in draft?' : 'publish this question?';
        if (status === 'DRAFT' || this.status === 'draft') {
            if (this.questionId) {
                this.coffeeLabService.updateForum('question', this.questionId, data).subscribe((res: any) => {
                    this.isPosting = false;
                    if (res.success) {
                        if (data.status === 'DRAFT') {
                            this.toaster.success('Your changes have been successfully updated to the draft.');
                        } else if (this.status === 'draft') {
                            this.toastrService.success('Your question have been posted successfully.');
                        } else {
                            this.toaster.success('You have updated a question successfully.');
                        }
                        this.router.navigate(['/coffee-lab/overview/qa-forum']);
                    } else {
                        this.toaster.error('Failed to update question.');
                    }
                });
            } else {
                this.coffeeLabService.postForum('question', data).subscribe((res: any) => {
                    this.isPosting = false;
                    if (res.success) {
                        this.toastrService.success('Your question is successfully saved in draft.');
                        this.router.navigate(['/coffee-lab/overview/qa-forum']);
                    } else {
                        this.toastrService.error('Failed to post question.');
                    }
                });
            }
        } else {
            this.dialogService
                .open(ConfirmComponent, {
                    data: {
                        title: this.globalsService.languageJson?.are_you_sure_text + ' you want to ' + confirmText,
                    },
                })
                .onClose.subscribe((action: any) => {
                    if (action === 'yes') {
                        this.isPosting = true;
                        if (this.questionId) {
                            this.coffeeLabService
                                .updateForum('question', this.questionId, data)
                                .subscribe((res: any) => {
                                    this.isPosting = false;
                                    if (res.success) {
                                        this.toaster.success('You have updated a question successfully.');
                                        this.router.navigate(['/coffee-lab/overview/qa-forum']);
                                    } else {
                                        this.toaster.error('Failed to update question.');
                                    }
                                });
                        } else {
                            this.coffeeLabService.postForum('question', data).subscribe((res: any) => {
                                this.isPosting = false;
                                if (res.success) {
                                    if (status === 'PUBLISHED') {
                                        this.toastrService.success('Your question have been posted successfully.');
                                    } else if (status === 'DRAFT') {
                                        this.toastrService.success('Your question is successfully saved in draft.');
                                    }
                                    this.router.navigate(['/coffee-lab/overview/qa-forum']);
                                } else {
                                    this.toastrService.error('Failed to post question.');
                                }
                            });
                        }
                    } else {
                        this.isPosting = false;
                    }
                });
        }
    }

    onDeleteDraft(): void {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp: this.globalsService.languageJson?.delete_from_coffee_lab,
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.coffeeLabService.deleteForumById('question', this.questionId).subscribe((res: any) => {
                        if (res.success) {
                            this.toaster.success(`Draft question deleted successfully`);
                            this.coffeeLabService.forumDeleteEvent.emit();
                            this.router.navigateByUrl('/coffee-lab/overview/qa-forum');
                        } else {
                            this.toaster.error(`Failed to delete a forum.`);
                        }
                    });
                }
            });
    }

    resetCategory() {
        this.categoryValue = null;
    }

    changeLanguage(value) {
        this.coffeeLabService.forumLanguage.next(this.languageCode);
        this.getCategory();
    }
}
