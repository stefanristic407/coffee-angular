import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-create-answer',
    templateUrl: './create-answer.component.html',
    styleUrls: ['./create-answer.component.scss'],
})
export class CreateAnswerComponent implements OnInit {
    isAllowTranslation = true;
    content?: string;
    isPosting = false;
    questionId: any;

    constructor(
        public location: Location,
        public dialogService: DialogService,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        public authService: AuthService
    ) {}

    ngOnInit(): void {
        this.questionId = this.route.snapshot.queryParamMap.get('id');
    }

    onPost(status: string): void {
        if (!this.content) {
            this.toastrService.error('Please type your answer.');
            return;
        }
        console.log('content >>>>>>>>', this.content);
        // if (this.content.length < 10) {
        //     this.toastrService.error('Question is too short.');
        //     return;
        // }
        // if (this.content.length > 300) {
        //     this.toastrService.error('Question is too long.');
        //     return;
        // }
        const data = {
            answer: this.content,
            allow_translation: this.isAllowTranslation ? 1 : 0,
            status,
            language: this.coffeeLabService.currentForumLanguage,
        };
        this.isPosting = true;
        this.coffeeLabService.postAnswer(this.questionId, data).subscribe((res: any) => {
            this.isPosting = false;
            console.log('post question result >>>', res);
            if (res.success) {
                this.toastrService.success('You have posted an answer successfully.');
                this.location.back();
            } else {
                this.toastrService.error('Failed to post question.');
            }
        });
    }
}
