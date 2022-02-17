import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from '@app/shared';
import { APP_LANGUAGES } from '@constants';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeLabService, GlobalsService } from '@services';
import { getUrl } from '@utils';
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
    coffeeLabURL = environment.coffeeLabWeb;
    isPosting = false;
    question: any;
    questionId: number;
    isLoading = false;
    languageList: any[] = APP_LANGUAGES;
    categoryList: any;
    categoryValue: any;
    selectedCategory: string;
    status: string;
    questionForm: FormGroup;

    constructor(
        private location: Location,
        private dialogService: DialogService,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        private toaster: ToastrService,
        private globalsService: GlobalsService,
        private translator: TranslateService,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.questionForm = this.fb.group({
            question: ['', Validators.required],
            languageCode: ['', Validators.required],
            slug: ['', Validators.required],
        });
        this.route.queryParams.subscribe((params) => {
            const type = params.type;
            if (type === 'question') {
                this.questionId = params.id;
                this.status = params.status;
                if (this.questionId) {
                    this.getCompleteData();
                } else {
                    this.getCategory();
                    this.questionForm.get('languageCode').setValue(this.coffeeLabService.currentForumLanguage);
                }
            }
        });
    }

    getCompleteData() {
        this.isLoading = true;
        const params = { language: this.coffeeLabService.currentForumLanguage };
        combineLatest([
            this.coffeeLabService.getForumDetails('question', this.questionId),
            this.coffeeLabService.getCategory(params),
        ])
            .pipe(take(1))
            .subscribe(([res, category]: [any, any]) => {
                if (category.success) {
                    this.categoryList = category.result;
                }
                if (res.success) {
                    this.question = res.result;
                    this.categoryValue = this.question.categories;
                    this.questionForm.patchValue({
                        question: res.result.question,
                        slug: this.question.slug,
                        languageCode: res.result.lang_code,
                    });
                    this.questionForm.get('slug').disable();
                } else {
                    this.toaster.error('Error while get question');
                    this.location.back();
                }
                this.isLoading = false;
            });
    }

    getCategory() {
        this.categoryList = [];
        const params = {
            language: this.questionForm.get('languageCode').value ? this.questionForm.get('languageCode').value : 'en',
        };
        this.coffeeLabService.getCategory(params).subscribe((category) => {
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
        if (this.questionForm.invalid) {
            this.toastrService.error('Please fill all the data');
            return;
        }
        this.questionForm.get('question').setValue(this.questionForm.get('question').value.trim());
        const data = {
            question: this.questionForm.get('question').value,
            allow_translation: 1,
            status,
            language: this.questionForm.get('languageCode').value,
            slug: this.questionForm.controls.slug.value || this.question.slug,
            categories: this.categoryValue?.map((item) => item.id) || [],
        };
        const confirmText = status === 'DRAFT' ? 'save this question in draft?' : 'publish this question?';
        if (status === 'DRAFT' || this.status === 'draft') {
            if (this.questionId) {
                this.coffeeLabService.updateForum('question', this.questionId, data).subscribe((res: any) => {
                    this.isPosting = false;
                    if (res.success) {
                        if (data.status === 'DRAFT') {
                            this.toaster.success(this.translator.instant('draft_success'));
                        } else if (this.status === 'draft') {
                            this.toastrService.success(this.translator.instant('question_posted_success'));
                        } else {
                            this.toaster.success(this.translator.instant('question_updated_success'));
                        }
                        this.router.navigate(['/coffee-lab/overview/qa-forum']);
                    } else {
                        this.toaster.error(this.translator.instant('question_updated_failed'));
                    }
                });
            } else {
                this.coffeeLabService.postForum('question', data).subscribe((res: any) => {
                    this.isPosting = false;
                    if (res.success) {
                        this.toastrService.success(this.translator.instant('draft_question_saved'));
                        this.router.navigate(['/coffee-lab/overview/qa-forum']);
                    } else {
                        this.toastrService.error(this.translator.instant('question_post_failed'));
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
                                        this.toaster.success(this.translator.instant('question_updated_success'));
                                        this.router.navigate(['/coffee-lab/overview/qa-forum']);
                                    } else {
                                        this.toaster.error(this.translator.instant('question_updated_failed'));
                                    }
                                });
                        } else {
                            this.coffeeLabService.postForum('question', data).subscribe((res: any) => {
                                this.isPosting = false;
                                if (res.success) {
                                    if (status === 'PUBLISHED') {
                                        this.toastrService.success(this.translator.instant('question_posted_success'));
                                    } else if (status === 'DRAFT') {
                                        this.toastrService.success(this.translator.instant('draft_question_saved'));
                                    }
                                    this.router.navigate(['/coffee-lab/overview/qa-forum']);
                                } else {
                                    this.toastrService.error(this.translator.instant('question_post_failed'));
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
                            this.toaster.success(this.translator.instant('draft_question_delete'));
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
        this.coffeeLabService.updateLang(this.questionForm.get('languageCode').value).then(() => {
            this.getCategory();
        });
    }

    onTitleChange(event) {
        if (!this.questionId && event.target.value) {
            this.coffeeLabService.verifySlug('question', getUrl(event.target.value)).subscribe((res) => {
                if (res.success) {
                    if (res.result.is_available) {
                        this.questionForm.get('slug').setValue(getUrl(event.target.value));
                    } else {
                        this.questionForm.get('slug').setValue(res.result.available_slug);
                    }
                }
            });
        }
    }
}
