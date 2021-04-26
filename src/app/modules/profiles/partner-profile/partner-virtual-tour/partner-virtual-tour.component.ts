import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-partner-virtual-tour',
    templateUrl: './partner-virtual-tour.component.html',
    styleUrls: ['./partner-virtual-tour.component.scss'],
})
export class PartnerVirtualTourComponent implements OnInit {
    @Input() horecaId;
    constructor() {}

    ngOnInit(): void {}
}
