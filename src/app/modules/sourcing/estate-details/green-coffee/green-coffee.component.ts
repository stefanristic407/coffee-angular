import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { SourcingService } from '../../sourcing.service';

@Component({
    selector: 'app-green-coffee',
    templateUrl: './green-coffee.component.html',
    styleUrls: ['./green-coffee.component.scss'],
})
export class GreenCoffeeComponent implements OnInit {
    constructor(public globals: GlobalsService, public sourcing: SourcingService) {}

    ngOnInit(): void {}
}
