import { Injectable } from '@angular/core';
import { AuthService, OrganizationService, UserService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EstateOrganizationProfile, OrganizationProfile } from '@models';
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
        public userService: UserService,
        public cookieService: CookieService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public router: Router,
        private profileService: ProfileService,
        private authService: AuthService,
        private organizationService: OrganizationService,
    ) {
        this.userId = this.authService.userId;
        this.roasterId = this.authService.getOrgId();
    }

    estateProfile(estateId) {
        this.organizationService
            .getGeneralProfile(estateId, OrganizationType.ESTATE)
            .subscribe((result: EstateOrganizationProfile) => {
                if (result) {
                    this.organizationProfile = result;

                    this.single = [
                        {
                            name: 'Full time',
                            value: this.organizationProfile.fullTimeEmployeeCount
                                ? this.organizationProfile.fullTimeEmployeeCount
                                : 0,
                        },
                        {
                            name: 'Part time',
                            value: this.organizationProfile.partTimeEmployeeCount
                                ? this.organizationProfile.partTimeEmployeeCount
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
