import { Component, OnInit } from '@angular/core';
import { OrganizationType } from '@enums';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-sewn-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    readonly OrgType = OrganizationType;
    zoom = 13;

    constructor(public profileService: ProfileService) {}

    ngOnInit(): void {}
}
