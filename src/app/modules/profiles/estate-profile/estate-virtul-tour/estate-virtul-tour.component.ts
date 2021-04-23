import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-estate-virtul-tour',
    templateUrl: './estate-virtul-tour.component.html',
    styleUrls: ['./estate-virtul-tour.component.scss'],
})
export class EstateVirtulTourComponent implements OnInit {
    @Input() estateId;

    constructor() {}

    ngOnInit(): void {}
}
