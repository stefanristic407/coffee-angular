import { Injectable } from '@angular/core';
import { UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { COUNTRY_LIST, organizationTypes } from '@constants';
import { BehaviorSubject } from 'rxjs';
import { MicroOrganizationProfile } from '@models';
import { OrganizationType } from '@enums';

@Injectable({
    providedIn: 'root',
})
export class MicroProfileService {
    countryList = [];

    public editMode = new BehaviorSubject(true);
    public editMode$ = this.editMode.asObservable();

    public saveMode = new BehaviorSubject(false);
    public saveMode$ = this.saveMode.asObservable();

    public avatarImageChanged = new BehaviorSubject(null);
    public avatarImageChanged$ = this.avatarImageChanged.asObservable();

    public mainSubFormInvalid = false;
    public aboutFormInvalid = false;
    public contactFormInvalid = false;
    public toUpdateProfileData: MicroOrganizationProfile;
    public roasteryProfileData: MicroOrganizationProfile;

    public invalidSumEmployee = false;

    cities: Array<any> = [];

    userId: string;
    microRoasterId: string;
    roasterUsers: any = [];
    roasterContacts: any = [];
    single: { name: string; value: any }[];
    showDelete = false;
    bannerUrl?: string;
    bannerFile?: any;
    profileInfo?: any;
    isSaving?: boolean;
    roasterId: string;

    constructor(
        public userService: UserserviceService,
        public cookieService: CookieService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public router: Router,
    ) {
        this.userId = this.cookieService.get('user_id');
        this.microRoasterId = '7';
        this.roasterId = this.cookieService.get('roaster_id');
        this.roasterProfile();
        this.countryList = COUNTRY_LIST;
    }

    roasterProfile() {
        this.userService.getMicroDetails(this.roasterId, this.microRoasterId).subscribe((result: any) => {
            console.log('micro roaster details: ', result);
            if (result.success) {
                this.roasteryProfileData = result.result;
                this.toUpdateProfileData = result.result;
                this.single = [
                    {
                        name: 'Female',
                        value: this.roasteryProfileData.female_employee_count
                            ? this.roasteryProfileData.female_employee_count
                            : 0,
                    },
                    {
                        name: 'Male',
                        value: this.roasteryProfileData.male_employee_count
                            ? this.roasteryProfileData.male_employee_count
                            : 0,
                    },
                ];
                this.saveMode.next(false);
                this.editMode.next(true);
            }
        });

        this.roasterService.getRoasterUsers(this.microRoasterId).subscribe((data: any) => {
            if (data.success) {
                this.roasterUsers = data.result;

                console.log(this.roasterUsers);
            }
        });

        this.getcontactList();
    }

    getcontactList() {
        // this.roasterService.getMrRoasterContacts(this.microRoasterId).subscribe((res: any) => {
        //     if (res.success) {
        //         this.roasterContacts = res.result;
        //         console.log(this.roasterContacts);
        //     }
        // });
    }

    changeCountry(count) {
        this.cities = COUNTRY_LIST.find((con) => con.isoCode === count).cities;
    }
}
