import { Injectable } from '@angular/core';
import { UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { COUNTRY_LIST } from '@constants';
import { BehaviorSubject } from 'rxjs';
import { MicroOrganizationProfile } from '@models';
import { OrganizationType } from '@enums';

@Injectable({
    providedIn: 'root',
})
export class MicroProfileService {
    public organizationProfile: MicroOrganizationProfile;

    userId: string;
    roasterContacts: any = [];
    single: { name: string; value: any }[];
    roasterId: string;

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

    roasterProfile(microRoasterId) {
        this.userService.getMicroDetails(this.roasterId, microRoasterId).subscribe((result: any) => {
            console.log('micro roaster details: ', result);
            if (result.success) {
                this.organizationProfile = result.result;
                this.single = [
                    {
                        name: 'Female',
                        value: this.organizationProfile.female_employee_count
                            ? this.organizationProfile.female_employee_count
                            : 0,
                    },
                    {
                        name: 'Male',
                        value: this.organizationProfile.male_employee_count
                            ? this.organizationProfile.male_employee_count
                            : 0,
                    },
                ];
            }
        });

        this.getcontactList(microRoasterId);
    }

    getcontactList(microRoasterId) {
        this.userService.getGeneralContactList(microRoasterId, OrganizationType.MICRO_ROASTER).subscribe((res: any) => {
            if (res.success) {
                this.roasterContacts = res.result;
                console.log(this.roasterContacts);
            }
        });
    }
}
