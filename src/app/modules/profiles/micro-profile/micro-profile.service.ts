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

    constructor(
        public userService: UserserviceService,
        public cookieService: CookieService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public router: Router,
    ) {
        this.userId = this.cookieService.get('user_id');
        this.microRoasterId = '7';
        this.roasterProfile();
        this.countryList = COUNTRY_LIST;
    }

    public editProfileData(subData: any) {
        this.toUpdateProfileData = {
            ...this.roasteryProfileData,
            ...subData,
        };
    }

    roasterProfile() {
        this.userService
            .getProfileCreationData(this.microRoasterId, OrganizationType.MICRO_ROASTER)
            .subscribe((result: any) => {
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

    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    saveRoasterProfile() {
        if (this.mainSubFormInvalid || this.aboutFormInvalid || this.contactFormInvalid || this.invalidSumEmployee) {
            this.toastrService.error('Please fill all correct values for required fields');
            return;
        }
        this.isSaving = true;
        if (this.bannerFile) {
            this.userService.uploadFile(this.microRoasterId, this.bannerFile, 'Cover-Image').subscribe((res) => {
                if (res.success) {
                    this.toUpdateProfileData.banner_file_id = res.result.id;
                } else {
                    this.isSaving = false;
                    this.toastrService.error('Error while uploading banner image, please try again.');
                }
            });
        } else {
        }
    }

    editRoasterProfile() {
        this.isSaving = false;
        this.showDelete = true;
        this.editMode.next(false);
        this.saveMode.next(true);
    }

    preview() {
        this.bannerUrl = this.roasteryProfileData.banner_url;
        this.editMode.next(true);
        this.saveMode.next(false);
    }
}
