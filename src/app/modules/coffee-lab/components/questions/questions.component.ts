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

    onEditPost(postItem: any): void {}
    onDeletePost(postItem: any): void {}
    onSharePost(postItem: any): void {}
    onSavePost(postItem: any): void {
        console.log('working...');
    }
}
