import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from '@app/shared';
import { APP_LANGUAGES } from '@constants';
import { AuthService, CoffeeLabService, GlobalsService, GoogletranslateService } from '@services';
import { insertAltAttr } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-translate-answer',
    templateUrl: './translate-answer.component.html',
    styleUrls: ['./translate-answer.component.scss'],
})
export class TranslateAnswerComponent implements OnInit {
    answerId: any;
    answer: any;
    draftId: string;
    originAnswer: any;
    isLoading = false;
    applicationLanguages = [];
    form: FormGroup;
    translatedAnswer = '';
    isUploadingImage = false;
    imageIdList = [];
    isPosting = false;
    question: any;
    draftQuestionId: number;
    needToTranslateQuestion = true;
    originLanguage: string;
    translateLangCode = 'sv';
    translatedLangArray = [];
    allLanguage: any[] = APP_LANGUAGES;
    remainingAnswerLangugage = [];
    selectedTab = 0;
    categoryList: any[] = [];
    showNoDataSection = false;
    isMobile = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        private formBuilder: FormBuilder,
        private location: Location,
        public authService: AuthService,
        private gtrans: GoogletranslateService,
        private dialogService: DialogService,
        private globalsService: GlobalsService,
    ) {
        this.form = this.formBuilder.group({
            language: ['', Validators.required],
            question: ['', Validators.required],
        });
        this.isMobile = window.innerWidth < 767;
    }

    ngOnInit(): void {
        this.answerId = this.route.snapshot.queryParamMap.get('origin_id');

        this.route.queryParams.subscribe(() => {
            this.draftId = this.route.snapshot.queryParamMap.get('draft_id');
            if (this.draftId) {
                this.getDraftById(+this.draftId);
            }
        });
        if (!this.answerId) {
            this.router.navigate(['/coffee-lab']);
        } else {
            this.getAnswerById();
        }
    }

    getAnswerById(): void {
        this.isLoading = true;
        this.coffeeLabService.getForumDetails('answer', this.answerId).subscribe((res: any) => {
            if (res.success) {
                this.answer = res.result;
                this.answer?.translations?.forEach((element) => {
                    this.translatedLangArray.push(element.language);
                });
                this.allLanguage.forEach((item) => {
                    if (!this.translatedLangArray?.includes(item.value) && this.answer.lang_code !== item.value) {
                        this.remainingAnswerLangugage.push(item);
                    }
                });
                if (this.remainingAnswerLangugage.length === 0) {
                    this.showNoDataSection = true;
                    this.toastrService.error(this.globalsService.languageJson?.no_language_available_translated);
                }
                this.originLanguage = res.result?.original_details?.language || res.result.lang_code;
                if (res.result.parent_answer_id) {
                    this.coffeeLabService
                        .getForumDetails('answer', res.result.parent_answer_id)
                        .subscribe((originAnswerRes: any) => {
                            if (originAnswerRes.success) {
                                this.originAnswer = originAnswerRes.result;
                                this.setLanguageOptions();
                            } else {
                                this.toastrService.error('Error while get origin answer');
                            }
                        });
                } else {
                    this.originAnswer = this.answer;
                    this.setLanguageOptions();
                }
                this.coffeeLabService
                    .getForumDetails('question', this.answer.question_id)
                    .subscribe((questionRes: any) => {
                        this.isLoading = false;
                        if (questionRes.success) {
                            this.question = questionRes.result;
                            this.handleChange({ index: 0 });
                            this.checkQuestionTranslated(0);
                        } else {
                            this.toastrService.error('Error while get parent question');
                        }
                    });
            } else {
                this.isLoading = false;
                this.toastrService.error('Error while get answer');
                this.router.navigate(['/coffee-lab']);
            }
        });
    }

    getDraftById(draftId: number): void {
        this.coffeeLabService.getForumDetails('answer', draftId).subscribe((res: any) => {
            if (res.success) {
                this.form.get('question').setValue(res.result?.question);
                this.draftQuestionId = res.result.question_id;
                this.translatedAnswer = res.result?.answer;
            } else {
                this.toastrService.error('Error while get draft');
                this.location.back();
            }
        });
    }

    checkQuestionTranslated(ind) {
        const isTranslate = this.question?.translations?.find(
            (item) => item.language === this.remainingAnswerLangugage[ind].value,
        );
        if (isTranslate) {
            this.form.get('question').disable();
            return true;
        } else {
            this.form.get('question').enable();
            return false;
        }
    }

    getCategory() {
        this.categoryList = [];
        this.coffeeLabService.getCategory(this.translateLangCode).subscribe((category) => {
            if (category.success) {
                category.result.forEach((item) => {
                    this.question.categories.forEach((element) => {
                        if (item.parent_id === element.parent_id) {
                            this.categoryList.push(item);
                        }
                    });
                });
            }
        });
    }

    handleChange(e?) {
        this.checkQuestionTranslated(e.index);
        this.selectedTab = e.index;
        this.translateLangCode = this.remainingAnswerLangugage[e.index].value;
        if (this.question?.categories) {
            this.getCategory();
        }
        const draft = this.coffeeLabService.allDrafts.value.find((item) => {
            return (
                item.parent_id === +this.answerId &&
                item.post_type === 'answer' &&
                item.language === this.translateLangCode
            );
        });
        if (draft) {
            this.router.navigate(['/coffee-lab/create-post/translate-answer'], {
                queryParams: {
                    origin_id: this.answerId,
                    draft_id: draft.post_id,
                    type: 'answer',
                },
            });
        } else {
            this.router.navigate(['/coffee-lab/create-post/translate-answer'], {
                queryParams: {
                    origin_id: this.answerId,
                    type: 'answer',
                },
            });
            const translateData = [this.originAnswer.question, this.originAnswer.answer];
            this.gtrans.translateCoffeeLab(translateData, this.translateLangCode).subscribe((translatedOutput: any) => {
                this.form.patchValue({
                    question: translatedOutput[0].translatedText,
                });
                this.translatedAnswer = translatedOutput[1].translatedText;
            });
        }
    }

    setLanguageOptions(): void {
        this.applicationLanguages = APP_LANGUAGES.filter((item: any) => {
            if (
                item.value !== this.originLanguage &&
                (this.originAnswer.translations || []).findIndex((translate) => translate.language === item.value) ===
                    -1
            ) {
                return item;
            }
        });
    }

    onPost(status: string): void {
        this.form.markAllAsTouched();
        if (!this.translatedAnswer) {
            this.toastrService.error('Please type your answer.');
            return;
        }
        this.translatedAnswer = insertAltAttr(this.translatedAnswer, `answer image`);
        const data: any = {
            answer: this.translatedAnswer,
            status,
            images: this.imageIdList,
            language: this.translateLangCode,
        };

        if (!this.checkQuestionTranslated(this.selectedTab)) {
            data.question = this.form.controls.question.value;
        }

        if (this.categoryList && this.categoryList.length > 0) {
            data.categories = this.categoryList?.map((item) => item.id);
        }

        this.isPosting = true;
        if ((status === 'DRAFT' || status === 'PUBLISHED') && this.draftId) {
            data.question_id = this.draftQuestionId;
            this.coffeeLabService.translateAnswer(this.draftId, data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    if (status === 'DRAFT') {
                        this.toastrService.success('Your translated Q/A post is updated successfully in draft.');
                    } else {
                        this.toastrService.success('You have translated an answer successfully.');
                    }
                    this.router.navigate([`/coffee-lab/questions/${this.question.slug}`]);
                } else {
                    this.toastrService.error('Failed to update draft.');
                }
            });
        } else {
            this.coffeeLabService.translateForum('answer', this.answerId, data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    if (status === 'DRAFT') {
                        this.toastrService.success('Your translated Q/A post is successfully saved in draft');
                    } else {
                        this.toastrService.success('You have translated an answer successfully.');
                    }
                    this.router.navigate([`/coffee-lab/questions/${this.question.slug}`]);
                } else {
                    this.toastrService.error('Failed to translate answer.');
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
                    this.coffeeLabService.deleteForumById('answer', this.draftId).subscribe((res: any) => {
                        if (res.success) {
                            this.toastrService.success(`Draft answer deleted successfully`);
                            this.coffeeLabService.forumDeleteEvent.emit();
                            this.router.navigateByUrl('/coffee-lab/overview/qa-forum');
                        } else {
                            this.toastrService.error(`Failed to delete a forum.`);
                        }
                    });
                }
            });
    }

    onCancel() {
        if (this.draftId) {
            this.router.navigate(['/coffee-lab/create-post/tab'], {
                queryParams: {
                    type: 'draft',
                },
            });
        } else {
            this.router.navigateByUrl('/coffee-lab/questions/' + this.question?.slug);
        }
    }
}
