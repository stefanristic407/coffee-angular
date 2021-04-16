import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    @Input() questions: any[] = [];
    @Input() viewMode = 'list';
    questionMenuItems: MenuItem[] = [
        {
            items: [
                {
                    label: 'Share',
                    command: () => {
                        this.onSharePost({});
                    },
                },
                {
                    label: 'Save Post',
                    command: () => {
                        this.onSavePost({});
                    },
                },
            ],
        },
    ];
    loadingQuestionId?: any;

    constructor(private coffeeLabService: CoffeeLabService, private toastService: ToastrService) {}

    ngOnInit(): void {}

    handleShowAllAnswers(id: number): void {
        this.loadingQuestionId = id;
        this.coffeeLabService.getForumDetails('question', id).subscribe((res: any) => {
            this.loadingQuestionId = null;
            if (res.success) {
                const questionIndex = this.questions.findIndex((question) => question.id === id);
                this.questions[questionIndex].answers = res.result?.answers;
                this.questions[questionIndex].total_answers = res.result?.answers?.length;
            } else {
                this.toastService.error('Cannot get answers');
            }
            console.log('show all answers >>>>>>>>>', res);
        });
    }

    onSharePost(postItem: any): void {}
    onSavePost(postItem: any): void {
        console.log('working...');
    }
}
