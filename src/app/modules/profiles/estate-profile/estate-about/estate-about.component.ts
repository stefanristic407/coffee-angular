import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-estate-about',
    templateUrl: './estate-about.component.html',
    styleUrls: ['./estate-about.component.scss'],
})
export class EstateAboutComponent implements OnInit {
    @Input() estateId;

    constructor() {}

    ngOnInit(): void {}
}
