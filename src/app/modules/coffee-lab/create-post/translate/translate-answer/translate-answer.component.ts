import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { APP_LANGUAGES } from '@constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

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
    isInvalidTranslation = false;
    imageIdList = [];
    isPosting = false;
    question: any;
    needToTranslateQuestion = true;
    originLanguage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        private formBuilder: FormBuilder,
        private location: Location,
        public authService: AuthService,
    ) {
        this.form = this.formBuilder.group({
            language: ['', Validators.required],
            question: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.answerId = this.route.snapshot.queryParamMap.get('id');
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
                this.originLanguage = res.result?.original_details?.language || res.result.lang_code;
                console.log('answer >>>>>>>>>>>>>', res.result);
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
                            console.log('parent question >>>>>>>>>', questionRes.result);
                            this.question = questionRes.result;
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

    setLanguageOptions(): void {
        console.log('origin answer >>>>>>>', this.originAnswer);
        this.applicationLanguages = APP_LANGUAGES.filter((item: any) => {
            if (
                item.value !== this.originLanguage &&
                (this.originAnswer.translations || []).findIndex((translate) => translate.language === item.value) === -1
            ) {
                return item;
            }
        });
    }

    onChangeTranslationLanguage(selectedLanguage: string): void {
        if (selectedLanguage === this.originLanguage) {
            this.toastrService.error('Cannot translate in origin language.');
            this.isInvalidTranslation = true;
            return;
        }
        if (
            (this.answer.translations || []).find((item: any) => item.language === selectedLanguage) ||
            this.answer.lang_code === selectedLanguage
        ) {
            this.toastrService.error('This answer was already translated in selected language');
            this.isInvalidTranslation = true;
            return;
        }
        this.isInvalidTranslation = false;
        if (
            this.question.translations.find((item: any) => item.language === selectedLanguage) ||
            this.question.lang_code === selectedLanguage
        ) {
            this.needToTranslateQuestion = false;
            this.form.controls.question.clearValidators();
            this.form.controls.question.updateValueAndValidity();
        } else {
            this.needToTranslateQuestion = true;
            this.form.controls.question.setValidators(Validators.required);
        }
    }

    onPost(status: string): void {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            return;
        }
        if (!this.translatedAnswer) {
            this.toastrService.error('Please type your answer.');
            return;
        }
        const data: any = {
            answer: this.translatedAnswer,
            status,
            images: this.imageIdList,
            language: this.form.controls.language.value,
        };
        if (this.needToTranslateQuestion) {
            data.question = this.form.controls.question.value;
        }
        console.log('data >>>>>>>>', data);
        this.isPosting = true;
        this.coffeeLabService.translateForum('answer', this.answerId, data).subscribe((res: any) => {
            this.isPosting = false;
            console.log('post question result >>>', res);
            if (res.success) {
                this.toastrService.success('You have translated an answer successfully.');
                this.location.back();
            } else {
                this.toastrService.error('Failed to translate answer.');
            }
        });
    }
}
