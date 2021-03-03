import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-harvest-card',
    templateUrl: './harvest-card.component.html',
    styleUrls: ['./harvest-card.component.scss'],
})
export class HarvestCardComponent implements OnInit {
    @Input() data: any;
    Currencies = {
        $: 'USD',
    };

    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {}
}
