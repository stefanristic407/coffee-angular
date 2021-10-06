import { Injectable } from '@angular/core';
import { AuthService, UserService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { RoasterService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PartnerOrganizationProfile } from '@models';
import { OrganizationType } from '@enums';
import { ProfileService } from '../profile.service';

@Injectable({
    providedIn: 'root',
})
export class PartnerProfileService {
    userId: number;
    horecaId: string;
    operatorUsers: any = [];
    operatorContacts: any = [];
    roasterId: number;
    public organizationProfile: PartnerOrganizationProfile;

    constructor(
        public userService: UserService,
        public cookieService: CookieService,
        public roasterService: RoasterService,
        public toastrService: ToastrService,
        public router: Router,
        private profileService: ProfileService,
        private authService: AuthService,
    ) {
        this.userId = this.authService.userId;
        this.roasterId = this.authService.getOrgId();
    }

    partnerProfile(horecaId) {
        this.profileService.getGeneralProfileDetails(OrganizationType.HORECA, horecaId).subscribe((result: any) => {
            if (result.success) {
                this.organizationProfile = result.result;
            }
        });
        this.getcontactList(horecaId);
    }

    getcontactList(horecaId) {
        this.userService.getGeneralContactList(horecaId, OrganizationType.HORECA).subscribe((res: any) => {
            if (res.success) {
                this.operatorContacts = res.result;
            }
        });
    }
}
