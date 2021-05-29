import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-no-internet-connection',
    templateUrl: './no-internet-connection.component.html',
    styleUrls: ['./no-internet-connection.component.scss'],
})
export class NoInternetConnectionComponent implements OnInit {
    constructor(public location: Location) {}

    ngOnInit(): void {}
}
