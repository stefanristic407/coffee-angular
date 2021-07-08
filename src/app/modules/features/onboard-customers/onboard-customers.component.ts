import { Component, OnInit } from '@angular/core';
import { OrganizationType } from '@enums';
@Component({
    selector: 'app-onboard-customers',
    templateUrl: './onboard-customers.component.html',
    styleUrls: ['./onboard-customers.component.scss'],
})
export class OnboardCustomersComponent implements OnInit {
    readonly OrgType = OrganizationType;

    constructor() {}

    ngOnInit(): void {}
}
