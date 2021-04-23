import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { EstateProfileService } from '../estate-profile.service';

@Component({
    selector: 'app-estate-contact',
    templateUrl: './estate-contact.component.html',
    styleUrls: ['./estate-contact.component.scss'],
})
export class EstateContactComponent implements OnInit {
    constructor(public profileCreationService: EstateProfileService, public globals: GlobalsService) {}

    ngOnInit(): void {}
}
