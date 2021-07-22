import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoffeeLabService, GlobalsService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { insertAltAttr, maxWordCountValidator } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { CropperDialogComponent } from '@shared';
import { CroppedImage } from '@models';

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
    images = [];

    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private coffeeLabService: CoffeeLabService,
        public globals: GlobalsService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private dialogService: DialogService,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            const type = params.type;
            if (type === 'article') {
                this.articleId = params.id;
            }
            if (this.articleId) {
                this.getArticleById();
            }
        });

        this.articleForm = this.fb.group({
            title: ['', Validators.compose([Validators.required])],
            subtitle: ['', Validators.compose([maxWordCountValidator(30)])],
            content: [''],
            allow_translation: [true, Validators.compose([Validators.required])],
        });
    }

    getArticleById(): void {
        this.isLoading = true;
        this.coffeeLabService.getForumDetails('article', this.articleId).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                this.article = res.result;
                this.coverImageUrl = res.result.cover_image_url;
                this.coverImageId = res.result.cover_image_id;
                this.isCoverImageUploaded = true;
                this.images = res.result.images ?? [];
                this.articleForm.patchValue(res.result.title);
            } else {
                this.toaster.error('Error while get article');
                this.location.back();
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
                    aspectRatio: 674 / 276,
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
        if (this.articleForm.invalid) {
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
            .setValue(insertAltAttr(this.articleForm.value.content, ` ${this.articleForm.value.title} detail image`));

        let data: any = {
            ...this.articleForm.value,
            images: this.imageIdList,
            status,
            language: this.articleId ? this.article?.language : this.coffeeLabService.currentForumLanguage,
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
                    this.toaster.success('You have updated an article successfully.');
                    this.router.navigate(['/coffee-lab/overview/articles']);
                } else {
                    this.toaster.error('Failed to update article.');
                }
            });
        } else {
            this.coffeeLabService.postForum('article', data).subscribe((res: any) => {
                this.isPosting = false;
                if (res.success) {
                    this.toaster.success('You have posted an article successfully.');
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
}
