import { Component, Input, OnInit } from '@angular/core';
import { CURRENCY_LIST, LBUNIT } from '@constants';
import { QuantityUnit } from '@enums';
import { GlobalsService } from '@services';
import { SourcingService } from '../sourcing.service';

@Component({
    selector: 'app-harvest-card',
    templateUrl: './harvest-card.component.html',
    styleUrls: ['./harvest-card.component.scss'],
})
export class HarvestCardComponent implements OnInit {
    @Input() data: any;
    public readonly CURRENCY_LIST = CURRENCY_LIST;
    public readonly QuantityUnit = QuantityUnit;
    public readonly LBUNIT = LBUNIT;

    constructor(public globals: GlobalsService, public sourcingSrv: SourcingService) {}

    ngOnInit(): void {}
}
