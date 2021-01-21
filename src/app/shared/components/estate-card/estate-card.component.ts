import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
    selector: 'app-estate-card',
    templateUrl: './estate-card.component.html',
    styleUrls: ['./estate-card.component.scss'],
})
export class EstateCardComponent implements OnInit {
    @Input() data: any;
    Currencies = {
        $: 'USD',
    };

    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {}
}
