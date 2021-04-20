import { Component, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-my-answers',
    templateUrl: './my-answers.component.html',
    styleUrls: ['./my-answers.component.scss'],
})
export class MyAnswersComponent implements OnInit {
    answers: any[] = [];
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Oldest', value: 'oldest' },
    ];
    questionMenuItems: MenuItem[] = [];
    sortBy = 'latest';
    shortComments = false;
    result: any;
    roasterId: string;
    constructor(private coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        this.getComments();
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

    getComments(): void {
        this.coffeeLabService.getMyForumList('answer').subscribe((res) => {
            this.answers = res.result;
        });
    }
    onSharePost(postItem: any): void {}
    onSavePost(postItem: any): void {
        console.log('working...');
    }
}
