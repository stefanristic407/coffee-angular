import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { SourcingService } from '../../sourcing.service';

@Component({
    selector: 'app-land-lots',
    templateUrl: './land-lots.component.html',
    styleUrls: ['./land-lots.component.scss'],
})
export class LandLotsComponent implements OnInit {
    constructor(public globals: GlobalsService, public sourcing: SourcingService) {}

    ngOnInit(): void {}
}
