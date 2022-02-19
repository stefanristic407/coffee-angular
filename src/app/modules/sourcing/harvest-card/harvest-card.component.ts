import { Component, Input, OnInit } from '@angular/core';
import { LBUNIT } from '@constants';
import { HarvestType, QuantityUnit } from '@enums';
import { SourcingService } from '../sourcing.service';

@Component({
    selector: 'app-harvest-card',
    templateUrl: './harvest-card.component.html',
    styleUrls: ['./harvest-card.component.scss'],
})
export class HarvestCardComponent implements OnInit {
    readonly HarvestType = HarvestType;
    @Input() data: any;
    public readonly QuantityUnit = QuantityUnit;
    public readonly LBUNIT = LBUNIT;

    constructor(public sourcingSrv: SourcingService) {}

    ngOnInit(): void {}
}
