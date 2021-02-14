import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-horizontal-bar',
    templateUrl: './horizontal-bar.component.html',
    styleUrls: ['./horizontal-bar.component.scss'],
})
export class HorizontalBarComponent implements OnInit {
    @Input() item: any;
    isShow = false;
    constructor() {}

    ngOnInit(): void {}
}
