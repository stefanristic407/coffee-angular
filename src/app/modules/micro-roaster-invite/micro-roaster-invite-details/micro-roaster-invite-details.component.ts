import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-micro-roaster-invite-details',
    templateUrl: './micro-roaster-invite-details.component.html',
    styleUrls: ['./micro-roaster-invite-details.component.scss'],
})
export class MicroRoasterInviteDetailsComponent implements OnInit {
    data: any;
    organizationProfile: any;
    constructor(public location: Location) {}

    ngOnInit(): void {
        this.data = {
            name: 'Royal coffee roasters',
            owner_name: 'Markel',
            founded_on: 1994,
            last_login: '13:48:57 | 26th March 2020',
            vat_number: '12939823-329',
            reg_id: '12939823-329',
        };
        this.organizationProfile = {
            website: 'www.thirdwaveroasters.com',
            email: 'hello@thirdwaveroasters.com',
            phone: '+46 456 786 568',
            country: 'sv',
            address_line1: 'Hagagatan 1',
            address_line2: '',
            city: 'SE-113 49 Stockholm',
            state: 'SWEDEN',
            fb_profile: 'facebook.com/thirdwaveroasters',
            ig_profile: 'instagram.com/thirdwaveroasters',
        };
    }
    onApprove() {}
    onReject() {}
}
