import { Component, Input, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService } from '@services';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
    @Input() articles: any;
    @Input() isMyPost = false;
    @Input() isSavedPost = false;
    totalRecords = 0;
    displayData: any[] = [];

    constructor(public coffeeLabService: CoffeeLabService, public authService: AuthService) {}

    ngOnInit(): void {
        this.displayData = this.articles?.slice(0, 9);
        this.totalRecords = this.articles?.length;
    }

    paginate(event: any) {
        this.displayData = this.articles?.slice(event.first, event.first + event.rows);
    }
}
