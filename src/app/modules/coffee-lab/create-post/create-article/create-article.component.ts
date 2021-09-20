import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoffeeLabService, GlobalsService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { insertAltAttr, maxWordCountValidator } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent, CropperDialogComponent } from '@shared';
import { CroppedImage } from '@models';
import { APP_LANGUAGES } from '@constants';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
    selector: 'app-create-article',
    templateUrl: './create-article.component.html',
    styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
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
        private fb: FormBuilder,
        private toaster: ToastrService,
        private coffeeLabService: CoffeeLabService,
        public globals: GlobalsService,
        private dialogService: DialogService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            const type = params.type;
            if (type === 'article') {
                this.articleId = params.id;
                this.status = params.status;
            }
            if (this.articleId) {
                this.getCompleteData();
            } else {
                this.getCategory();
            }
        });
        this.articleForm = this.fb.group({
            title: ['', Validators.compose([Validators.required])],
            subtitle: ['', Validators.compose([maxWordCountValidator(30), Validators.required])],
            content: [''],
            language: [],
            allow_translation: [true, Validators.compose([Validators.required])],
            is_era_of_we: [false],
        });

        this.articleForm.get('language').setValue(this.coffeeLabService.currentForumLanguage);
    }

    getCompleteData() {
        this.isLoading = true;
        combineLatest([
            this.coffeeLabService.getForumDetails('article', this.articleId),
            this.coffeeLabService.getCategory(),
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
                    this.categoryValue = res.result.categories;
                } else {
                    this.toaster.error('Error while get article');
                    this.location.back();
                }
                this.isLoading = false;
            });
    }

    getCategory() {
        this.coffeeLabService.getCategory().subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
        });
    }

    onFileChange(event: any) {
        if (!event.target.files?.length) {
            return;
        }
        this.dialogService
            .open(CropperDialogComponent, {
                data: {
                    imageChangedEvent: event,
                    aspectRatio: 672 / 276,
                    resizeToWidth: 672,
                },
            })
            .onClose.subscribe((data: CroppedImage) => {
                if (data.status) {
                    this.coverImageUrl = data.croppedImgUrl;
                    this.coverImage = data.croppedImgFile;
                    this.coffeeLabService.uploadFile(this.coverImage, 'cl-articles').subscribe((res) => {
                        if (res.result) {
                            this.coverImageId = res.result.id;
                            this.isCoverImageUploaded = true;
                            this.toaster.success('Cover image has been successfully uploaded.');
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
        this.isPosting = true;
        this.handlePost(status);
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
        };
        if (this.isCoverImageUploaded) {
            data = {
                ...data,
                cover_image_id: this.coverImageId,
            };
        }
        if (this.articleId) {
            this.coffeeLabService.updateForum('article', this.articleId, data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    if (data.status === 'draft') {
                        this.toaster.success('Your changes have been successfully updated to the draft.');
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
            this.coffeeLabService.postForum('article', data).subscribe((res: any) => {
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
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp: this.globals.languageJson?.are_you_sure_delete + ' cover image?',
                    yesButton: 'Remove',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
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

    resetCategory() {
        this.categoryValue = null;
    }

    changeLanguage(value) {
        this.coffeeLabService.forumLanguage.next(this.articleForm.get('language').value);
    }
}
