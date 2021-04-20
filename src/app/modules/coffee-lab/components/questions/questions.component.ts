import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    @Input() questions: any[] = [];
    @Input() viewMode = 'list';
    questionMenuItems: MenuItem[] = [];
    pageDesc: string | undefined;
    selectedQuestion: any;

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
                                this.onSharePost();
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
                                this.onSharePost();
                            },
                        },
                        {
                            label: 'Save Post',
                            command: () => {
                                this.onSavePost();
                            },
                        },
                    ],
                },
            ];
        }
    }

    onClickMenu(question: any): void {
        console.log('clicking menu >>>>>>>>>>', question);
    }

    onEditPost(postItem: any): void {}
    onDeletePost(postItem: any): void {}
    onSharePost(): void {
        const url = `${environment.roasterWeb}/coffee-lab/questions/${this.selectedQuestion.slug}`;
        this.coffeeLabService.copyContext(url);
    }
    onSavePost(): void {
        this.coffeeLabService.saveForum('question', this.selectedQuestion.id).subscribe((res: any) => {
            console.log('save forum result >>>>>>>>', res);
            if (res.success) {
                this.toastService.success('Successfully saved');
            } else {
                if (res?.messages?.question_id[0] === 'already_exists') {
                    this.toastService.error('You already saved this post');
                } else {
                    this.toastService.error('Error while save post');
                }
            }
        });
    }
}
