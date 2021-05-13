import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-successful-page',
    templateUrl: './successful-page.component.html',
    styleUrls: ['./successful-page.component.scss'],
})
export class SuccessfulPageComponent implements OnInit {
    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {}
}
