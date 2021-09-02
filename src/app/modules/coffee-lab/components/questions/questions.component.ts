import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService, CoffeeLabService } from '@services';
import { OrganizationType } from '@enums';
// import { getWordCount } from '@utils';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    @Input() questions: any[] = [];
    @Input() viewMode = 'list';
    questionMenuItems: MenuItem[] = [];
    pageDesc: string;
    totalRecords = 0;
    displayData: any[] = [];
    assignOptions = [
        {
            label: 'Estates',
            value: OrganizationType.ESTATE,
        },
        {
            label: 'Roasters & Micro-roasters',
            value: OrganizationType.ROASTER,
        },
        {
            label: 'Facilitator',
            value: OrganizationType.FACILITATOR,
        },
        {
            label: 'Partner',
            value: OrganizationType.HORECA,
        },
    ];

    constructor(
        private router: Router,
        public coffeeLabService: CoffeeLabService,
        public authService: AuthService,
        private toastrService: ToastrService,
    ) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        this.displayData = this.questions.slice(0, 10);
        this.totalRecords = this.questions.length;
    }

    paginate(event: any) {
        this.displayData = this.questions.slice(event.first, event.first + event.rows);
    }

    wordCount(description) {
        // return getWordCount(description);
    }
}
