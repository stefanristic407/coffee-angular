import { Component, OnInit } from '@angular/core';
import { PartnerProfileService } from '../partner-profile.service';

@Component({
    selector: 'app-partner-contact',
    templateUrl: './partner-contact.component.html',
    styleUrls: ['./partner-contact.component.scss'],
})
export class PartnerContactComponent implements OnInit {
    constructor(public profileCreationService: PartnerProfileService) {}

    ngOnInit(): void {}
}
