import { Component, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-my-comments',
    templateUrl: './my-comments.component.html',
    styleUrls: ['./my-comments.component.scss'],
})
export class MyCommentsComponent implements OnInit {
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
        this.coffeeLabService.getMyComments(this.roasterId).subscribe((res) => {
            this.comments = res.result;
            this.filteredComments = res.result;
        });
    }
}
