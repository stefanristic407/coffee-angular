import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_LANGUAGES } from '@constants';
import { PostType } from '@enums';
import { environment } from '@env/environment';
import { CroppedImage } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeLabService, CommonService, GlobalsService } from '@services';
import { ConfirmComponent, CropperDialogComponent } from '@shared';
import { editorRequired, getUrl, insertAltAttr, maxWordCountValidator } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-create-article',
    templateUrl: './create-article.component.html',
    styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
    coffeeLabURL = environment.coffeeLabWeb;
    articleForm: FormGroup;
    isPosting = false;
    isUploadingImage: any;
    imageIdList: any;
    coverImage: any;
    coverImageUrl: any;
    isCoverImageUploaded = false;
    coverImageId: any;
    articleId: any;
    article: any;
    isLoading = false;
    clicked = false;
    images = [];
    languageList: any[] = APP_LANGUAGES;
    categoryList: any[] = [];
    categoryValue: any[] = [];
    status: string;

    constructor(
        private coffeeLabService: CoffeeLabService,
        private commonService: CommonService,
        private dialogService: DialogService,
        private fb: FormBuilder,
        private globalsService: GlobalsService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private toaster: ToastrService,
        private translator: TranslateService,
    ) {}

    ngOnInit(): void {
        this.articleForm = this.fb.group({
            title: ['', Validators.compose([Validators.maxLength(120), Validators.required])],
            subtitle: ['', Validators.compose([maxWordCountValidator(50), Validators.required])],
            content: ['', [editorRequired(this.commonService)]],
            language: [],
            allow_translation: [true, Validators.compose([Validators.required])],
            slug: ['', Validators.compose([Validators.required])],
            is_era_of_we: [false],
        });
        this.route.queryParams.subscribe((params) => {
            const type = params.type;
            if (type === PostType.ARTICLE) {
                this.articleId = params.id;
                this.status = params.status;
                this.articleForm.get('language').setValue(this.coffeeLabService.currentForumLanguage);
                if (params.id) {
                    this.getCompleteData();
                } else {
                    this.getCategory();
                }
            }
        });
    }

    getCompleteData() {
        this.isLoading = true;
        const params = { language: this.coffeeLabService.currentForumLanguage };
        combineLatest([
            this.coffeeLabService.getForumDetails(PostType.ARTICLE, this.articleId),
            this.coffeeLabService.getCategory(params),
        ])
            .pipe(take(1))
            .subscribe(([res, category]: [any, any]) => {
                if (category.success) {
                    this.categoryList = category.result;
                }
                if (res.success) {
                    this.article = res.result;
                    this.coverImageUrl = res.result.cover_image_url;
                    this.coverImageId = res.result.cover_image_id;
                    this.isCoverImageUploaded = true;
                    this.images = res.result.images ?? [];
                    this.articleForm.patchValue(res.result);
                    this.articleForm.get('slug').disable();
                    this.categoryValue = res.result.categories;
                } else {
                    this.toaster.error('Error while get article');
                    this.location.back();
                }
                this.isLoading = false;
            });
    }

    getCategory() {
        this.categoryList = [];
        const params = { language: this.coffeeLabService.currentForumLanguage };
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

    onFileChange(event: any) {
        if (!event.target.files?.length) {
            return;
        }
        if (
            event.target.files[0].type === 'image/png' ||
            event.target.files[0].type === 'image/jpg' ||
            event.target.files[0].type === 'image/jpeg'
        ) {
            this.dialogService
                .open(CropperDialogComponent, {
                    data: {
                        imageChangedEvent: event,
                        aspectRatio: 672 / 276,
                        resizeToWidth: 672,
                    },
                })
                .onClose.subscribe((data: CroppedImage) => {
                    if (data?.status) {
                        this.coverImageUrl = data.croppedImgUrl;
                        this.coverImage = data.croppedImgFile;
                        this.coffeeLabService.uploadFile(this.coverImage, 'cl-articles').subscribe((res) => {
                            if (res.result) {
                                this.coverImageId = res.result.id;
                                this.isCoverImageUploaded = true;
                                this.toaster.success(
                                    'The file ' + event.target.files[0]?.name + ' uploaded successfully',
                                );
                            } else {
                                this.toaster.error('failed to upload cover image.');
                                this.coverImage = null;
                                this.coverImageId = null;
                                this.coverImageUrl = null;
                                this.isCoverImageUploaded = false;
                            }
                        });
                    }
                });
        } else {
            this.toaster.error('Please upload only image files with extension png,jpg,jpeg');
        }
    }

    onPost(status: string): void {
        if (status === 'published') {
            this.articleForm.controls.subtitle.setValidators(Validators.required);
        } else {
            this.articleForm.controls.subtitle.clearValidators();
        }
        this.articleForm.controls.subtitle.updateValueAndValidity();
        this.articleForm.markAllAsTouched();
        this.clicked = true;
        if (this.articleForm.invalid) {
            this.toaster.error('Please fill content.');
            return;
        }
        if (!this.articleForm.value.content && status === 'published') {
            this.toaster.error('Please fill content.');
            return;
        }
        if (!this.isCoverImageUploaded && status === 'published') {
            this.toaster.error('Please upload cover image.');
            return;
        }
        if (status === 'draft') {
            this.isPosting = true;
            this.handlePost(status);
        } else {
            const confirmText = status === 'draft' ? 'save this article in draft?' : 'publish this article?';
            this.dialogService
                .open(ConfirmComponent, {
                    data: {
                        title: this.globalsService.languageJson?.are_you_sure_text + ' you want to ' + confirmText,
                    },
                })
                .onClose.subscribe((action: any) => {
                    if (action === 'yes') {
                        this.isPosting = true;
                        this.handlePost(status);
                    } else {
                        this.isPosting = false;
                    }
                });
        }
    }
    handlePost(status: string) {
        this.articleForm
            .get('content')
            .setValue(insertAltAttr(this.articleForm.value.content, `${this.articleForm.value.title} detail image`));

        let data: any = {
            ...this.articleForm.value,
            images: this.imageIdList,
            status,
            categories: this.categoryValue?.map((item) => item.id),
            slug: this.articleForm.controls.slug.value,
        };
        if (this.isCoverImageUploaded) {
            data = {
                ...data,
                cover_image_id: this.coverImageId,
            };
        }
        if (this.articleId) {
            this.coffeeLabService.updateForum(PostType.ARTICLE, this.articleId, data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    if (data.status === 'draft') {
                        this.toaster.success(this.translator.instant('draft_success'));
                    } else if (this.status === 'draft') {
                        this.toaster.success('Your article have been posted successfully.');
                    } else {
                        this.toaster.success('You have updated an article successfully.');
                    }
                    this.router.navigate(['/coffee-lab/overview/articles']);
                } else {
                    this.toaster.error('Failed to update article.');
                }
            });
        } else {
            this.coffeeLabService.postForum(PostType.ARTICLE, data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    if (status === 'draft') {
                        this.toaster.success('Your article is successfully saved in draft');
                    } else {
                        this.toaster.success('Your article have been posted successfully');
                    }
                    this.router.navigate(['/coffee-lab/overview/articles']);
                } else {
                    this.toaster.error('Failed to post article.');
                }
            });
        }
    }

    deleteCoverImage(element: any) {
        this.coverImage = null;
        this.coverImageUrl = null;
        this.isCoverImageUploaded = false;
        this.coverImageId = null;
        element.value = '';
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
                    this.coffeeLabService.deleteForumById(PostType.ARTICLE, this.articleId).subscribe((res: any) => {
                        if (res.success) {
                            this.toaster.success(`Draft article deleted successfully`);
                            this.coffeeLabService.forumDeleteEvent.emit();
                            this.router.navigateByUrl('/coffee-lab/overview/articles');
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
        this.coffeeLabService.updateLang(this.articleForm.get('language').value).then(() => {
            this.getCategory();
        });
    }

    onTitleChange(event) {
        if (!this.articleId) {
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
}
