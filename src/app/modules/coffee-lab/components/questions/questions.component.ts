import { Component, Input, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService } from '@services';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    @Input() questions: any[] = [];
    @Input() isMyPost = false;
    @Input() isSavedPost = false;
    @Input() isAssignedToMe = false;
    @Input() viewMode = 'list';
    totalRecords = 0;
    displayData: any[] = [];

    constructor(public coffeeLabService: CoffeeLabService, public authService: AuthService) {}

    ngOnInit(): void {
        this.displayData = this.questions?.slice(0, 10);
        this.totalRecords = this.questions?.length;
    }

    paginate(event: any) {
        this.displayData = this.questions.slice(event.first, event.first + event.rows);
    }
}
