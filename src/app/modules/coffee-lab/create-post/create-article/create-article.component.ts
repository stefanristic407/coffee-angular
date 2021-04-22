import { Component, OnInit } from '@angular/core';
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
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private coffeeLabService: CoffeeLabService,
        public globals: GlobalsService,
    ) {}

    ngOnInit(): void {
        this.articleForm = this.fb.group({
            title: ['', Validators.compose([Validators.required])],
            subtitle: ['', Validators.compose([Validators.required])],
            content: ['', Validators.compose([Validators.required])],
            allow_translation: [true, Validators.compose([Validators.required])],
        });
    }

    uploadImage(event: any, index?, type?) {}

    onPost(status: string): void {}
}
