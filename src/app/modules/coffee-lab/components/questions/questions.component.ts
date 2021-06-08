import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService, CoffeeLabService } from '@services';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    @Input() questions: any[] = [];
    @Input() viewMode = 'list';
    questionMenuItems: MenuItem[] = [];
    organizationId: any;
    pageDesc: string;
    totalRecords = 0;
    displayData: any[] = [];

    constructor(
        private router: Router,
        public coffeeLabService: CoffeeLabService,
        public authService: AuthService
    ) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        this.organizationId = this.authService.getOrgId();;
        this.displayData = this.questions.slice(0, 10);
        this.totalRecords = this.questions.length;
    }

    paginate(event: any) {
        this.displayData = this.questions.slice(event.first, event.first + event.rows);
    }
}
