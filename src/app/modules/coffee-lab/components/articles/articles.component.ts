import { Component, Input, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService } from '@services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
    @Input() articles: any[] = [];
    organizationId: any;
    totalRecords = 0;
    displayData: any[] = [];
    pageDesc: string | undefined;

    constructor(public coffeeLabService: CoffeeLabService, public authService: AuthService, private router: Router) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        this.organizationId = this.authService.getOrgId();
        this.displayData = this.articles.slice(0, 9);
        this.totalRecords = this.articles.length;
    }

    paginate(event: any) {
        this.displayData = this.articles.slice(event.first, event.first + event.rows);
    }
}
