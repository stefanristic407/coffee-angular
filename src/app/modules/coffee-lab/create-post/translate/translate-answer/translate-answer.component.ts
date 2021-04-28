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
export class TranslateAnswerComponent implements OnInit, OnDestroy {
    answerId: any;
    answer: any;
    isLoading = false;
    applicationLanguages = APP_LANGUAGES;
    form: FormGroup;
    translatedAnswer = '';
    isUploadingImage = false;
    imageIdList = [];
    isPosting = false;
    originAnswer: any;
    needToTranslateQuestion = true;

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
        console.log('translate answer component !!!!!!!!!!!!!');
        this.coffeeLabService.pageName.next('translate-answer');
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
            console.log('answer id and anaswer res >>>>>>>>>>>', this.answerId, res);
            if (res.success) {
                this.answer = res.result;
                console.log('answer >>>>>>>>>>>>>', res.result);
                if (this.answer.parent_answer_id) {
                    this.coffeeLabService
                        .getForumDetails('answer', this.answer.parent_answer_id)
                        .subscribe((originAnswerRes: any) => {
                            this.isLoading = false;
                            if (originAnswerRes.success) {
                                this.originAnswer = originAnswerRes.result;
                            } else {
                                this.toastrService.error('Error while get origin answer');
                            }
                        });
                } else {
                    this.isLoading = false;
                    this.originAnswer = this.answer;
                }
            } else {
                this.isLoading = false;
                this.toastrService.error('Error while get answer');
                this.router.navigate(['/coffee-lab']);
            }
        });
    }

    onChangeTranslationLanguage(selectedLanguage: string): void {
        console.log('origin answer >>>>>>>>>>', this.originAnswer);
        if (
            this.originAnswer.translations.find((item: any) => item.language === selectedLanguage) ||
            this.originAnswer.lang_code === selectedLanguage
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

    ngOnDestroy(): void {
        this.coffeeLabService.pageName.next(null);
    }
}
