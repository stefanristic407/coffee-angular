import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-micro-roaster-invite-details',
    templateUrl: './micro-roaster-invite-details.component.html',
    styleUrls: ['./micro-roaster-invite-details.component.scss'],
})
export class MicroRoasterInviteDetailsComponent implements OnInit {
    data: any;
    organizationProfile: any;
    roasterId: any;
    requestId: any;
    constructor(
        public location: Location,
        public userService: UserService,
        private authService: AuthService,
        public route: ActivatedRoute,
        private toastr: ToastrService,
    ) {
        this.roasterId = this.authService.getOrgId();
        this.requestId = this.route.snapshot.params.id;
    }

    ngOnInit(): void {
        this.getMrPublicOnboardDetails();
        // this.data = {
        //     name: 'Royal coffee roasters',
        //     owner_name: 'Markel',
        //     founded_on: 1994,
        //     last_login: '13:48:57 | 26th March 2020',
        //     vat_number: '12939823-329',
        //     reg_id: '12939823-329',
        // };
        // this.organizationProfile = {
        //     website: 'www.thirdwaveroasters.com',
        //     email: 'hello@thirdwaveroasters.com',
        //     phone: '+46 456 786 568',
        //     country: 'sv',
        //     address_line1: 'Hagagatan 1',
        //     address_line2: '',
        //     city: 'SE-113 49 Stockholm',
        //     state: 'SWEDEN',
        //     fb_profile: 'facebook.com/thirdwaveroasters',
        //     ig_profile: 'instagram.com/thirdwaveroasters',
        // };
    }
    getMrPublicOnboardDetails() {
        this.userService.getMrPublicOnboardDetails(this.roasterId, this.requestId).subscribe((res: any) => {
            console.log(res);
            if (res.success) {
                this.organizationProfile = res.result;
            }
        });
    }
    onApprove() {
        this.userService.approveMrPublicOnboard(this.roasterId, this.requestId).subscribe((res: any) => {
            if (res.success) {
                this.toastr.success('Approved');
            }
        });
    }
    onReject() {
        this.userService.rejectMrPublicOnboard(this.roasterId, this.requestId).subscribe((res: any) => {
            if (res.success) {
                this.toastr.error('Rejected');
            }
        });
    }
}
