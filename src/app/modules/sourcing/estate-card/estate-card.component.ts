import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { SourcingService } from '../sourcing.service';

@Component({
    selector: 'app-estate-card',
    templateUrl: './estate-card.component.html',
    styleUrls: ['./estate-card.component.scss'],
})
export class EstateCardComponent implements OnInit {
    @Input() data: any;

    constructor(public globals: GlobalsService, public sourcing: SourcingService) {}

    ngOnInit(): void {}
}
