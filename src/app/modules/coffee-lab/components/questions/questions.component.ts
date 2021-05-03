import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

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

    constructor(private cookieService: CookieService) {}

    ngOnInit(): void {
        this.organizationId = +this.cookieService.get('roaster_id');
    }
}
