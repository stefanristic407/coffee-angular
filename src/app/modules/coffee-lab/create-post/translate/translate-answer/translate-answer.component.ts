import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CoffeeLabService, GoogletranslateService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { APP_LANGUAGES } from '@constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { insertAltAttr } from '@utils';

@Component({
    selector: 'app-translate-answer',
    templateUrl: './translate-answer.component.html',
    styleUrls: ['./translate-answer.component.scss'],
})
export class TranslateAnswerComponent implements OnInit {
    answerId: any;
    answer: any;
    originAnswer: any;
    isLoading = false;
    applicationLanguages = [];
    form: FormGroup;
    translatedAnswer = '';
    isUploadingImage = false;
    imageIdList = [];
    isPosting = false;
    question: any;
    needToTranslateQuestion = true;
    originLanguage: string;
    translateLangCode = 'sv';
    translatedLangArray = [];
    allLanguage: any[] = APP_LANGUAGES;
    remainingAnswerLangugage = [];
    selectedTab = 0;
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
    ) {
        this.form = this.formBuilder.group({
            language: ['', Validators.required],
            question: ['', Validators.required],
        });
        this.isMobile = window.innerWidth < 767;
    }

    ngOnInit(): void {
        this.answerId = this.route.snapshot.queryParamMap.get('origin_id');
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
                this.originLanguage = res.result?.original_details?.language || res.result.lang_code;
                if (res.result.parent_answer_id) {
                    this.coffeeLabService
                        .getForumDetails('answer', res.result.parent_answer_id)
                        .subscribe((originAnswerRes: any) => {
                            if (originAnswerRes.success) {
                                this.originAnswer = originAnswerRes.result;
                                this.handleChange({ index: 0 });
                                this.setLanguageOptions();
                            } else {
                                this.toastrService.error('Error while get origin answer');
                            }
                        });
                } else {
                    this.originAnswer = this.answer;
                    this.handleChange({ index: 0 });
                    this.setLanguageOptions();
                }
                this.coffeeLabService
                    .getForumDetails('question', this.answer.question_id)
                    .subscribe((questionRes: any) => {
                        this.isLoading = false;
                        if (questionRes.success) {
                            this.question = questionRes.result;
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

    handleChange(e?) {
        this.checkQuestionTranslated(e.index);
        this.selectedTab = e.index;
        this.translateLangCode = this.remainingAnswerLangugage[e.index].value;
        const translateData = [this.originAnswer.question, this.originAnswer.answer];
        this.gtrans.translateCoffeeLab(translateData, this.translateLangCode).subscribe((translatedOutput: any) => {
            this.form.patchValue({
                question: translatedOutput[0].translatedText,
            });
            this.translatedAnswer = translatedOutput[1].translatedText;
        });
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

        this.isPosting = true;
        this.coffeeLabService.translateForum('answer', this.answerId, data).subscribe((res: any) => {
            this.isPosting = false;
            if (res.success) {
                if (status === 'draft') {
                    this.toastrService.success('Your translated Q/A post is successfully saved in draft');
                } else {
                    this.toastrService.success('You have translated an answer successfully.');
                }
                this.location.back();
            } else {
                this.toastrService.error('Failed to translate answer.');
            }
        });
    }
}
