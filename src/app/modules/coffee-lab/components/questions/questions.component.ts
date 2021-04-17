import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    @Input() questions: any[] = [];
    @Input() viewMode = 'list';
    questionMenuItems: MenuItem[] = [];
    loadingQuestionId?: any;
    pageDesc: string | undefined;

    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private activateRoute: ActivatedRoute,
    ) {
        this.pageDesc = this.activateRoute.snapshot.routeConfig?.path;
    }

    ngOnInit(): void {
        if (this.pageDesc === 'my-posts') {
            this.questionMenuItems = [
                {
                    items: [
                        {
                            label: 'Edit',
                            command: () => {
                                this.onEditPost({});
                            },
                        },
                        {
                            label: 'Delete',
                            command: () => {
                                this.onDeletePost({});
                            },
                        },
                        {
                            label: 'Share',
                            command: () => {
                                this.onSharePost({});
                            },
                        },
                    ],
                },
            ];
        } else {
            this.questionMenuItems = [
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
        }
    }

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

    onEditPost(postItem: any): void {}
    onDeletePost(postItem: any): void {}
    onSharePost(postItem: any): void {}
    onSavePost(postItem: any): void {
        console.log('working...');
    }
}
