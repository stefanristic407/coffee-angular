import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoffeeLabService, RoasterserviceService, GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-create-article',
    templateUrl: './create-article.component.html',
    styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
    articleForm: FormGroup;
    isPosting = false;
    content: any;
    isUploadingImage: any;
    imageIdList: any;
    coverImage: any;
    coverImageUrl: any;
    isCoverImageUploaded = false;
    coverImageId: any;
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private coffeeLabService: CoffeeLabService,
        public globals: GlobalsService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.articleForm = this.fb.group({
            title: ['', Validators.compose([Validators.required])],
            subtitle: ['', Validators.compose([Validators.required])],
            allow_translation: [true, Validators.compose([Validators.required])],
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
            this.toaster.error('Please fill content.');
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
                    this.toaster.success('Cover image has been successfuly uploaded.');
                    this.handlePost(status);
                } else {
                    this.toaster.error('failed to upload cover image.');
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
            question: this.content,
            ...this.articleForm.value,
            cover_image_id: this.coverImageId,
            content: this.content,
            images: this.imageIdList,
            status,
            language: this.coffeeLabService.currentForumLanguage,
        };
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
