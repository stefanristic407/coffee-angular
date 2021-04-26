import { Injectable } from '@angular/core';
import { UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EstateOrganizationProfile } from '@models';
import { OrganizationType } from '@enums';

@Injectable({
    providedIn: 'root',
})
export class EstateProfileService {
    roasterId: string;
    userId: string;
    estateUsers: any = [];
    estateContacts: any = [];
    single: { name: string; value: any }[];
    public organizationProfile: EstateOrganizationProfile;

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

    estateProfile(estateId) {
        this.userService.getEstateDetails(this.roasterId, estateId).subscribe((result: any) => {
            if (result.success) {
                this.organizationProfile = result.result;
                console.log('estate details: ', this.organizationProfile);

                this.single = [
                    {
                        name: 'Full time',
                        value: this.organizationProfile.full_time_employee_count
                            ? this.organizationProfile.full_time_employee_count
                            : 0,
                    },
                    {
                        name: 'Part time',
                        value: this.organizationProfile.part_time_employee_count
                            ? this.organizationProfile.part_time_employee_count
                            : 0,
                    },
                ];
            }
        });

        this.getcontactList(estateId);
    }

    getcontactList(estateId) {
        this.userService.getGeneralContactList(estateId, OrganizationType.ESTATE).subscribe((res: any) => {
            if (res.success) {
                this.estateContacts = res.result;
                console.log(this.estateContacts);
            }
        });
    }
}
