import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { COUNTRY_LIST } from '@constants';
import { MicroProfileService } from '../micro-profile.service';

@Component({
    selector: 'app-micro-contact',
    templateUrl: './micro-contact.component.html',
    styleUrls: ['./micro-contact.component.scss'],
})
export class MicroContactComponent implements OnInit {
    countryList = COUNTRY_LIST;
    constructor(public profileCreationService: MicroProfileService, public globals: GlobalsService) {}

    ngOnInit(): void {}
}
