import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @Input() questions: any[] = [];
    @Input() isMyPost = false;
    @Input() isSavedPost = false;
    @Input() isAssignedToMe = false;
    @Input() viewMode = 'list';
    @Output() pageChange = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}
}
