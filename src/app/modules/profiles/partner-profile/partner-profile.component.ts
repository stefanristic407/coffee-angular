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
    breadItems = [{ label: 'home', routerLink: '/' }, { label: 'Company Profile' }];
    tabIndex: number;
    horecaId: any;
    constructor(
        public profileCreationService: PartnerProfileService,
        public globals: GlobalsService,
        public cookieService: CookieService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.tabIndex = 0;
        this.horecaId = this.route.snapshot.params?.id || ''; // 23
        this.horecaId = this.profileCreationService.partnerProfile(this.horecaId);
    }
}
