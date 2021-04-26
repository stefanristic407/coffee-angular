import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { APP_LANGUAGES } from '@constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
    selector: 'app-translate-article',
    templateUrl: './translate-article.component.html',
    styleUrls: ['./translate-article.component.scss'],
})
export class TranslateArticleComponent implements OnInit {
    articleId: any;
    article: any;
    isLoading = false;
    applicationLanguages = APP_LANGUAGES;
    articleForm: FormGroup;
    content = '';
    isUploadingImage = false;
    imageIdList = [];
    isPosting = false;
    coverImage: any;
    coverImageUrl: any;
    isCoverImageUploaded = false;
    coverImageId: any;
    copiedCoverImageId: any;
    copiedCoverImageUrl: any;

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
            language: ['', Validators.required],
            title: ['', Validators.compose([Validators.required])],
            subtitle: ['', Validators.compose([Validators.required])],
        });
    }

    ngOnInit(): void {
        this.articleId = this.route.snapshot.queryParamMap.get('id');
        if (!this.articleId) {
            this.location.back();
        } else {
            this.getArticleById();
        }
    }

    getArticleById(): void {
        this.isLoading = true;
        this.coffeeLabService.getForumDetails('article', this.articleId).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                this.article = res.result;
            } else {
                this.toastrService.error('Error while get article');
                this.router.navigate(['/coffee-lab']);
            }
        });
    }

    onFileChange(event: any) {
        if (event.target.files && event.target.files.length > 0) {
            this.isCoverImageUploaded = false;
            this.coverImage = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(this.coverImage);
            reader.onload = () => {
                this.coverImageUrl = reader.result;
            };
        }
    }

    onPost(status: string): void {
        this.articleForm.markAllAsTouched();
        if (this.articleForm.invalid) {
            return;
        }
        if (!this.content) {
            this.toastrService.error('Please fill content.');
            return;
        }
        this.isPosting = true;
        if (this.isCoverImageUploaded) {
            this.handlePost(status);
        } else {
            this.coffeeLabService.uploadFile(this.coverImage, 'cl-articles').subscribe((res) => {
                if (res.result) {
                    this.coverImageId = res.result.id;
                    this.isCoverImageUploaded = true;
                    this.toastrService.success('Cover image has been successfuly uploaded.');
                    this.handlePost(status);
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
    handlePost(status: string) {
        const data = {
            ...this.articleForm.value,
            cover_image_id: this.coverImageId,
            content: this.content,
            images: this.imageIdList,
            status,
        };
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

    copyCoverImage() {
        this.isPosting = true;
        this.coffeeLabService.copyFile(this.article.cover_image_id).subscribe((res: any) => {
            this.isPosting = false;
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
}
