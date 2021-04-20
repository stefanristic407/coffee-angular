import { Component, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-my-answers',
    templateUrl: './my-answers.component.html',
    styleUrls: ['./my-answers.component.scss'],
})
export class MyAnswersComponent implements OnInit {
    comments: any[] = [];
    filteredComments: any[] = [];
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Oldest', value: 'oldest' },
    ];
    sortBy = 'latest';
    shortComments = false;
    result: any;
    roasterId: string;
    constructor(private coffeeLabService: CoffeeLabService, private cookieService: CookieService) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.getComments();
    }

    getComments(): void {
        this.coffeeLabService.getMyAnswers(this.roasterId).subscribe((res) => {
            this.comments = res.result;
            this.filteredComments = res.result;
        });
    }
    postMyAnswers() {
        // for (let questionId = 1; questionId < 100; questionId++) {
        // const
        this.coffeeLabService.postMyAnswers(this.roasterId, 65).subscribe((res) => {
            console.log(res);
        });
        // }
    }
}
