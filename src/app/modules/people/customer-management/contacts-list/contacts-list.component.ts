import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit {
    @Input() data: any;
    @Input() organizationType: any;
    constructor() {}

    ngOnInit(): void {}
}
