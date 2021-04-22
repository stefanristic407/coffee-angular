import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { CoffeeLabService } from '@services';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {
    isAllowTranslation = true;
    content?: string;
    isPosting = false;

    constructor(
        public location: Location,
        public dialogService: DialogService,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        private router: Router,
    ) {}

    ngOnInit(): void {}

    onPostQuestion(status: string): void {
        if (!this.content) {
            this.toastrService.error('Please type your question.');
            return;
        }
        if (this.content.length < 10) {
            this.toastrService.error('Question is too short.');
            return;
        }
        if (this.content.length > 300) {
            this.toastrService.error('Question is too long.');
            return;
        }
        const data = {
            question: this.content,
            allow_translation: this.isAllowTranslation ? 1 : 0,
            status,
            language: this.coffeeLabService.currentForumLanguage,
        };
        this.isPosting = true;
        this.coffeeLabService.postForum('question', data).subscribe((res: any) => {
            this.isPosting = false;
            console.log('post question result >>>', res);
            if (res.success) {
                this.toastrService.success('You have posted a question successfully.');
                this.router.navigate(['/coffee-lab']);
            } else {
                this.toastrService.error('Failed to post question.');
            }
        });
    }
}
