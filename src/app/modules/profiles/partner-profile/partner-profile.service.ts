import { Injectable } from '@angular/core';
import { UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PartnerOrganizationProfile } from '@models';
import { OrganizationType } from '@enums';

@Injectable({
    providedIn: 'root',
})
export class PartnerProfileService {
    userId: string;
    horecaId: string;
    operatorUsers: any = [];
    operatorContacts: any = [];
    roasterId: string;
    public organizationProfile: PartnerOrganizationProfile;

    constructor(
        public userService: UserserviceService,
        public cookieService: CookieService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public router: Router,
    ) {
        this.userId = this.cookieService.get('user_id');
        this.roasterId = this.cookieService.get('roaster_id');
    }

    partnerProfile(horecaId) {
        this.userService.getHorecaDetails(this.roasterId, horecaId).subscribe((result: any) => {
            if (result.success) {
                this.organizationProfile = result.result;
                console.log('horeca details: ', this.organizationProfile);
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
