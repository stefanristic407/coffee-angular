import { Component, Input, OnInit } from '@angular/core';
import { CURRENCY_LIST } from '@constants';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-harvest-card',
    templateUrl: './harvest-card.component.html',
    styleUrls: ['./harvest-card.component.scss'],
})
export class HarvestCardComponent implements OnInit {
    @Input() data: any;
    public readonly CURRENCY_LIST = CURRENCY_LIST;

    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {}
}
