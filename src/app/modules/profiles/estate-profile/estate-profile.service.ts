import { Injectable } from '@angular/core';
import { AuthService, UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EstateOrganizationProfile } from '@models';
import { OrganizationType } from '@enums';
import { ProfileService } from '../profile.service';

@Injectable({
    providedIn: 'root',
})
export class EstateProfileService {
    roasterId: number;
    userId: number;
    estateUsers: any = [];
    estateContacts: any = [];
    estateVirtualTourFiles: any = [];
    single: { name: string; value: any }[];
    public organizationProfile: EstateOrganizationProfile;

    constructor(
        public userService: UserserviceService,
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

    estateProfile(estateId) {
        this.profileService.getGeneralProfileDetails(OrganizationType.ESTATE, estateId).subscribe((result: any) => {
            if (result.success) {
                this.organizationProfile = result.result;

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
        this.getVirtualTourFiles(estateId);
    }

    getcontactList(estateId) {
        this.userService.getGeneralContactList(estateId, OrganizationType.ESTATE).subscribe((res: any) => {
            if (res.success) {
                this.estateContacts = res.result;
                console.log(this.estateContacts);
            }
        });
    }

    getVirtualTourFiles(estateId) {
        this.userService
            .getGeneralVirtualTourFiles(estateId, OrganizationType.ESTATE, {
                file_module: 'Gallery',
                type_in: 'VIDEO,IMAGE',
            })
            .subscribe((res: any) => {
                if (res.success) {
                    this.estateVirtualTourFiles = res.result;
                    console.log(this.estateVirtualTourFiles);
                }
            });
    }
}
