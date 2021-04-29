import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoffeeLabService } from '@services';
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
    sortBy = 'latest';
    shortComments = false;
    result: any;
    roasterId: string;
    pageDesc: string;
    isMyPostsPage = false;
    constructor(private coffeeLabService: CoffeeLabService, private activateRoute: ActivatedRoute) {
        this.pageDesc = this.activateRoute.snapshot.routeConfig?.path;
    }

    ngOnInit(): void {
        this.getComments();
        if (this.pageDesc === 'my-posts') {
            this.isMyPostsPage = true;
        }
    }

    getComments(): void {
        this.coffeeLabService.getMyForumList('answer').subscribe((res) => {
            this.answers = res.result.map((item) => {
                if (item.question_slug) {
                    const slug = 'slug';
                    item[slug] = item.question_slug;
                }
                return item;
            });
        });
    }
}
