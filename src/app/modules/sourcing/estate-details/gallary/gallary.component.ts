import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { SourcingService } from '../../sourcing.service';

@Component({
    selector: 'app-gallary',
    templateUrl: './gallary.component.html',
    styleUrls: ['./gallary.component.scss'],
})
export class GallaryComponent implements OnInit {
    constructor(public globals: GlobalsService, public sourcing: SourcingService) {}

    ngOnInit(): void {}
}
