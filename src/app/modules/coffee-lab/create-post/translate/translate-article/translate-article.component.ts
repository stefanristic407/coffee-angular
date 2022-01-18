import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from '@app/shared';
import { APP_LANGUAGES } from '@constants';
import { environment } from '@env/environment';
import { AuthService, CoffeeLabService, GlobalsService, GoogletranslateService } from '@services';
import { getUrl, insertAltAttr, maxWordCountValidator } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-translate-article',
    templateUrl: './translate-article.component.html',
    styleUrls: ['./translate-article.component.scss'],
})
export class TranslateArticleComponent implements OnInit {
    coffeeLabURL = environment.coffeeLabWeb;
    articleId: any;
    draftId: any;
    article: any;
    isLoading = false;
    articleForm: FormGroup;
    articleFormOriginal: FormGroup;
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
    selectedArticleLangCode = 'sv';
    allLanguage: any[] = APP_LANGUAGES;
    isTranslationArticle = [];
    remainingLangugage = [];
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
        public globals: GlobalsService,
        private dialogService: DialogService,
        private globalsService: GlobalsService,
    ) {
        this.isMobile = window.innerWidth < 767;
        this.articleForm = this.formBuilder.group({
            language: [''],
            title: ['', Validators.compose([Validators.maxLength(120), Validators.required])],
            subtitle: ['', Validators.compose([maxWordCountValidator(50), Validators.required])],
            content: [''],
            slug: ['', Validators.compose([Validators.required])],
        });
    }

    ngOnInit(): void {
        this.articleFormOriginal = this.formBuilder.group({
            title: [''],
            subtitle: [''],
            slug: [''],
        });
        this.articleId = this.route.snapshot.queryParamMap.get('origin_id');
        if (!this.articleId) {
            this.location.back();
        } else {
            this.getArticleById();
        }
        this.route.queryParams.subscribe(() => {
            this.draftId = this.route.snapshot.queryParamMap.get('draft_id');
            if (this.draftId) {
                this.getDraftById(this.draftId);
            }
        });
    }

    getArticleById(): void {
        this.isLoading = true;
        this.coffeeLabService.getForumDetails('article', this.articleId).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                this.article = res.result;
                this.articleFormOriginal.patchValue(res.result);
                this.coverImageUrl = res.result.cover_image_url;
                this.article?.translated_articles?.forEach((element) => {
                    this.isTranslationArticle.push(element.language);
                });
                this.allLanguage.forEach((item) => {
                    if (!this.isTranslationArticle?.includes(item.value) && this.article.language !== item.value) {
                        this.remainingLangugage.push(item);
                    }
                });
                if (
                    this.article.user_id !== this.authService.currentUser.id ||
                    this.article.organisation_type !== this.authService.orgType
                ) {
                    this.copyCoverImage('noCopy');
                }
                if (this.remainingLangugage.length === 0) {
                    this.showNoDataSection = true;
                    this.toastrService.error(this.globalsService.languageJson?.no_language_available_translated);
                }
                this.handleChange({ value: this.remainingLangugage[0].value });
                this.articleFormOriginal.disable();
            } else {
                this.toastrService.error('Error while get article');
                this.router.navigate(['/coffee-lab/overview/articles']);
            }
        });
    }

    getCategory() {
        this.categoryList = [];
        const params = { language: this.selectedArticleLangCode };
        this.coffeeLabService.getCategory(params).subscribe((category) => {
            if (category.success) {
                category.result.forEach((item) => {
                    this.article.categories.forEach((element) => {
                        if (item.parent_id === element.parent_id) {
                            this.categoryList.push(item);
                        }
                    });
                });
            }
        });
    }

    handleChange(event?) {
        this.selectedArticleLangCode = this.remainingLangugage.find((item) => item.value === event.value).value;
        if (this.article?.categories) {
            this.getCategory();
        }
        const draft = this.coffeeLabService.allDrafts.value?.find((item) => {
            return (
                item.parent_id === +this.articleId &&
                item.post_type === 'article' &&
                item.language === this.selectedArticleLangCode
            );
        });
        if (draft) {
            this.router.navigate(['/coffee-lab/create-post/translate-article'], {
                queryParams: {
                    origin_id: this.articleId,
                    draft_id: draft.post_id,
                    type: 'article',
                },
            });
        } else {
            this.router.navigate(['/coffee-lab/create-post/translate-article'], {
                queryParams: {
                    origin_id: this.articleId,
                    type: 'article',
                },
            });
            const translateData = [this.article.title, this.article.subtitle, this.article.content];
            this.gtrans
                .translateCoffeeLab(translateData, this.selectedArticleLangCode)
                .subscribe((translatedOutput: any) => {
                    this.articleForm.patchValue({
                        title: translatedOutput[0].translatedText,
                        subtitle: translatedOutput[1].translatedText,
                        content: translatedOutput[2].translatedText,
                    });
                    this.coffeeLabService
                        .verifySlug('article', getUrl(translatedOutput[0].translatedText))
                        .subscribe((res) => {
                            if (res.success) {
                                if (res.result.is_available) {
                                    this.articleForm.get('slug').setValue(getUrl(translatedOutput[0].translatedText));
                                } else {
                                    this.articleForm.get('slug').setValue(res.result.available_slug);
                                }
                            }
                        });
                });
        }
    }

    getDraftById(draftId: number): void {
        this.coffeeLabService.getForumDetails('article', draftId).subscribe((res: any) => {
            if (res.success) {
                this.coverImageUrl = res.result.cover_image_url;
                this.coverImageId = res.result.cover_image_id;
                this.isCoverImageUploaded = true;
                this.images = res.result.images ?? [];
                this.articleForm.patchValue(res.result);
            } else {
                this.toastrService.error('Error while get draft');
                this.location.back();
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
        this.articleForm.markAllAsTouched();
        if (this.articleForm.invalid) {
            return;
        }
        if (!this.articleForm.value.content && status === 'published') {
            this.toastrService.error('Please fill content.');
            return;
        }

        this.isPosting = true;
        this.handlePost(status);
    }
    handlePost(status: string) {
        this.articleForm
            .get('content')
            .setValue(insertAltAttr(this.articleForm.value.content, `${this.articleForm.value.title} detail image`));
        let data: any = {
            ...this.articleForm.value,
            language: this.selectedArticleLangCode,
            status,
        };
        let coverImageId: number;
        if (this.article.user_id === this.authService.currentUser.id) {
            coverImageId = this.article.cover_image_id;
        } else {
            coverImageId = this.copiedCoverImageId;
        }
        data = {
            ...data,
            cover_image_id: coverImageId,
        };
        if (this.categoryList && this.categoryList.length > 0) {
            data.categories = this.categoryList?.map((item) => item.id);
        }
        if ((status === 'draft' || status === 'published') && this.draftId) {
            this.coffeeLabService.updateForum('article', this.draftId, data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    if (status === 'draft') {
                        this.toastrService.success('Your translated article is updated successfully in draft.');
                    } else {
                        this.toastrService.success('You have posted a translated article successfully.');
                    }
                    this.router.navigate([`/coffee-lab/articles/${this.article.slug}`]);
                } else {
                    this.toastrService.error('Failed to update draft.');
                }
            });
        } else {
            this.coffeeLabService.translateForum('article', this.articleId, data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    if (data.status === 'draft') {
                        this.toastrService.success('Your translated article is successfully saved in draft.');
                    } else {
                        this.toastrService.success('You have posted a translated article successfully.');
                    }
                    this.router.navigate([`/coffee-lab/articles/${this.article.slug}`]);
                } else {
                    this.toastrService.error('Failed to post translated article.');
                }
            });
        }
    }

    copyCoverImage(copy?: string) {
        if (this.isCopying) {
            return;
        }
        this.isCopying = true;
        this.coffeeLabService.copyFile(this.article.cover_image_id).subscribe((res: any) => {
            this.isCopying = false;
            if (res.success) {
                this.copiedCoverImageId = res.result.id;
                this.copiedCoverImageUrl = res.result.url;
                if (!copy) {
                    this.toastrService.success('Copied cover image successfully.');
                }
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
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp: this.globals.languageJson?.are_you_sure_delete + ' cover image?',
                    yesButton: 'Remove',
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.coverImage = null;
                    this.coverImageUrl = null;
                    this.isCoverImageUploaded = false;
                    this.coverImageId = null;
                    element.value = '';
                }
            });
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
                    this.coffeeLabService.deleteForumById('article', this.draftId).subscribe((res: any) => {
                        if (res.success) {
                            this.toastrService.success(`Draft article deleted successfully`);
                            this.coffeeLabService.forumDeleteEvent.emit();
                            this.router.navigateByUrl('/coffee-lab/overview/articles');
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
            this.router.navigateByUrl('/coffee-lab/articles/' + this.article?.slug);
        }
    }

    onTitleChange(event) {
        if (event.target.value) {
            this.coffeeLabService.verifySlug('article', getUrl(event.target.value)).subscribe((res) => {
                if (res.success) {
                    if (res.result.is_available) {
                        this.articleForm.get('slug').setValue(getUrl(event.target.value));
                    } else {
                        this.articleForm.get('slug').setValue(res.result.available_slug);
                    }
                }
            });
        }
    }
}
