import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { APP_LANGUAGES } from '@constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { maxWordCountValidator } from '@utils';

@Component({
    selector: 'app-translate-article',
    templateUrl: './translate-article.component.html',
    styleUrls: ['./translate-article.component.scss'],
})
export class TranslateArticleComponent implements OnInit {
    articleId: any;
    draftId: any;
    article: any;
    isLoading = false;
    applicationLanguages: any[];
    articleForm: FormGroup;
    content = '';
    isUploadingImage = false;
    imageIdList = [];
    isPosting = false;
    isCopying = false;
    coverImage: any;
    coverImageUrl: any;
    isCoverImageUploaded = false;
    coverImageId: any;
    copiedCoverImageId: any;
    copiedCoverImageUrl: any;
    images = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        private formBuilder: FormBuilder,
        private location: Location,
        public authService: AuthService,
    ) {
        this.articleForm = this.articleForm = this.formBuilder.group({
            language: [''],
            title: ['', Validators.compose([Validators.required])],
            subtitle: ['', Validators.compose([Validators.required, maxWordCountValidator(30)])],
        });
    }

    ngOnInit(): void {
        this.articleId = this.route.snapshot.queryParamMap.get('origin_id');
        if (!this.articleId) {
            this.location.back();
        } else {
            this.getArticleById();
        }
        this.route.queryParams.subscribe(() => {
            this.draftId = this.route.snapshot.queryParamMap.get('draft_id');
            if (this.draftId) {
                this.getDraftById();
            }
        });
    }

    getArticleById(): void {
        this.isLoading = true;
        this.coffeeLabService.getForumDetails('article', this.articleId).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                this.article = res.result;
                this.applicationLanguages = APP_LANGUAGES.filter(
                    (item) =>
                        item.value !== res.result.language &&
                        !res.result.translated_articles?.find((lng) => lng.language === item.value),
                );
            } else {
                this.toastrService.error('Error while get article');
                this.router.navigate(['/coffee-lab']);
            }
        });
    }

    getDraftById(): void {
        this.coffeeLabService.getForumDetails('article', this.draftId).subscribe((res: any) => {
            if (res.success) {
                this.coverImageUrl = res.result.cover_image_url;
                this.coverImageId = res.result.cover_image_id;
                this.isCoverImageUploaded = true;
                this.content = res.result.content;
                this.images = res.result.images ?? [];
                this.articleForm.patchValue({
                    language: res.result.language,
                    title: res.result.title,
                    subtitle: res.result.subtitle,
                    allow_translation: res.result.allow_translation,
                });
            } else {
                this.toastrService.error('Error while get draft');
            }
        });
    }

    onFileChange(event: any) {
        if (event.target.files?.length) {
            this.isCoverImageUploaded = false;
            this.coverImage = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(this.coverImage);
            reader.onload = () => {
                this.coverImageUrl = reader.result;
            };
            this.coffeeLabService.uploadFile(this.coverImage, 'cl-articles').subscribe((res) => {
                if (res.result) {
                    this.coverImageId = res.result.id;
                    this.isCoverImageUploaded = true;
                    this.toastrService.success('Cover image has been successfully uploaded.');
                } else {
                    this.toastrService.error('failed to upload cover image.');
                    this.coverImage = null;
                    this.coverImageId = null;
                    this.coverImageUrl = null;
                    this.isCoverImageUploaded = false;
                }
            });
        }
    }

    onPost(status: string): void {
        if (status === 'published') {
            this.articleForm.controls.language.setValidators(Validators.required);
            this.articleForm.controls.subtitle.setValidators(Validators.required);
        } else {
            this.articleForm.controls.language.clearValidators();
            this.articleForm.controls.subtitle.clearValidators();
        }
        this.articleForm.controls.language.updateValueAndValidity();
        this.articleForm.controls.subtitle.updateValueAndValidity();
        this.articleForm.markAllAsTouched();
        if (this.articleForm.invalid) {
            return;
        }
        if (!this.content && status === 'published') {
            this.toastrService.error('Please fill content.');
            return;
        }
        if (!this.isCoverImageUploaded && status === 'published') {
            this.toastrService.error('Please upload cover image.');
            return;
        }
        this.isPosting = true;
        this.handlePost(status);
    }
    handlePost(status: string) {
        let data: any = {
            ...this.articleForm.value,
            content: this.content,
            images: this.imageIdList,
            status,
        };
        if (this.isCoverImageUploaded) {
            data = {
                ...data,
                cover_image_id: this.coverImageId,
            };
        }
        if (status === 'draft' && this.draftId) {
            this.coffeeLabService.updateForum('article', this.draftId, data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    this.toastrService.success('You have updated a draft successfully.');
                    this.location.back();
                } else {
                    this.toastrService.error('Failed to update draft.');
                }
            });
        } else {
            this.coffeeLabService.translateForum('article', this.articleId, data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    this.toastrService.success('You have posted a translated article successfully.');
                    this.router.navigate(['/coffee-lab/overview/articles']);
                } else {
                    this.toastrService.error('Failed to post translated article.');
                }
            });
        }
    }

    copyCoverImage() {
        if (this.isCopying) {
            return;
        }
        this.isCopying = true;
        this.coffeeLabService.copyFile(this.article.cover_image_id).subscribe((res: any) => {
            this.isCopying = false;
            if (res.success) {
                this.copiedCoverImageId = res.result.id;
                this.copiedCoverImageUrl = res.result.url;
                this.toastrService.success('Copied cover image successfully.');
            } else {
                this.toastrService.error('Failed to copy cover image.');
            }
        });
    }
    pasteCoverImage() {
        this.coverImageUrl = this.copiedCoverImageUrl;
        this.coverImageId = this.copiedCoverImageId;
        this.isCoverImageUploaded = true;
    }

    deleteCoverImage(element: any) {
        this.coverImage = null;
        this.coverImageUrl = null;
        this.isCoverImageUploaded = false;
        this.coverImageId = null;
        element.value = '';
    }
}
