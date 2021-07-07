import { ProfileService } from './../profile.service';
import { Injectable } from '@angular/core';
import { AuthService, UserService } from '@services';
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

    userId: number;
    roasterContacts: any = [];
    single: { name: string; value: any }[];
    roasterId: number;
    microRoasterVirtualTourFiles: any = [];

    constructor(
        public userService: UserService,
        public cookieService: CookieService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public router: Router,
        private profileService: ProfileService,
        private authService: AuthService,
    ) {
        this.userId = this.authService.userId;
        this.roasterId = this.authService.getOrgId();
    }

    roasterProfile(microRoasterId) {
        this.profileService
            .getGeneralProfileDetails(OrganizationType.MICRO_ROASTER, microRoasterId)
            .subscribe((result: any) => {
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
        this.getVirtualTourFiles(microRoasterId);
    }

    getcontactList(microRoasterId) {
        this.userService.getGeneralContactList(microRoasterId, OrganizationType.MICRO_ROASTER).subscribe((res: any) => {
            if (res.success) {
                this.roasterContacts = res.result;
                console.log(this.roasterContacts);
            }
        });
    }

    getVirtualTourFiles(microRoasterId) {
        this.userService
            .getGeneralVirtualTourFiles(microRoasterId, OrganizationType.MICRO_ROASTER, {
                file_module: 'Gallery',
                type_in: 'VIDEO,IMAGE',
            })
            .subscribe((res: any) => {
                if (res.success) {
                    this.microRoasterVirtualTourFiles = res.result;
                }
            });
    }
}
