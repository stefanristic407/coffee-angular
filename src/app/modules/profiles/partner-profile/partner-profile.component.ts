import { OrganizationType } from '@enums';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { PartnerProfileService } from './partner-profile.service';

@Component({
    selector: 'app-partner-profile',
    templateUrl: './partner-profile.component.html',
    styleUrls: ['./partner-profile.component.scss'],
})
export class PartnerProfileComponent implements OnInit {
    tabIndex: number;
    horecaId: any;

    public readonly OrganizationType = OrganizationType;

    constructor(
        public profileCreationService: PartnerProfileService,
        public globals: GlobalsService,
        public cookieService: CookieService,
        private route: ActivatedRoute,
        public location: Location,
    ) {
        this.tabIndex = 0;
        this.horecaId = this.route.snapshot.params?.id || '';
    }

    ngOnInit(): void {
        this.profileCreationService.partnerProfile(this.horecaId);
    }
}
