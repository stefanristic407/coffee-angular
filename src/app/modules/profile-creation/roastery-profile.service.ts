import { Injectable } from '@angular/core';
import { UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ProfilePhotoService } from './profile-photo/profile-photo.service';
import { Router } from '@angular/router';
import { COUNTRY_LIST } from '@constants';
import { BehaviorSubject, Subject } from 'rxjs';
import { RoasteryProfile } from './roastery-profile-model';
@Injectable({
    providedIn: 'root',
})
export class RoasteryProfileService {
    countryList = [];
    savemode = false;
    editmode = true;

    public editMode = new BehaviorSubject(true);
    public editMode$ = this.editMode.asObservable();

    public saveMode = new BehaviorSubject(false);
    public saveMode$ = this.saveMode.asObservable();

    roasteryProfileData: RoasteryProfile;

    cities: Array<any> = [];

    userId: string;
    roasterId: string;
    summary: any;
    foundedIn: any;
    website: any;
    name: any;
    phoneno: any;
    country: any;
    state: any;
    city: any;
    zipcode: any;
    email: any;
    companyImageUrl: any;
    instagram: any;
    facebook: any;
    address1: any;
    address2: any;
    countryName: any;
    kgs: any = '';
    capacity: any;
    capabilities: string;
    maleNum: any;
    femaleNum: any;
    employeeAvg: any;
    employeeNos: any;
    roasterUsers: any = [];
    empName: any = '';
    roasterContacts: any = [];
    single: { name: string; value: any }[];
    vatNos: any;
    cmpyRid: any;
    companyDetailsPublic: any = false;
    showDelete = false;
    bannerUrl?: string;
    bannerFile?: any;
    bannerFileId?: any;
    profileInfo?: any;
    isSaving?: boolean;

    constructor(
        public userService: UserserviceService,
        public cookieService: CookieService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public profilePhotoService: ProfilePhotoService,
        public router: Router,
    ) {
        this.userId = this.cookieService.get('user_id');
        this.roasterId = this.cookieService.get('roaster_id');
        this.roasterProfile();
        this.countryList = COUNTRY_LIST;
    }

    roasterProfile() {
        this.userService.getRoasterAccount(this.roasterId).subscribe((result: any) => {
            if (result.success) {
                console.log('roaster details: ', result);
                this.roasteryProfileData = result.result;
                this.profilePhotoService.croppedImage = this.roasteryProfileData.company_image_url;

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

                // this.profileInfo = result.result;
                // this.summary = result.result.description;
                // this.foundedIn = result.result.founded_on;
                // this.website = result.result.website;
                // this.name = result.result.name;
                // this.phoneno = result.result.phone;
                // this.country = result.result.country;
                // const country = COUNTRY_LIST.find((con) => con.isoCode === this.country);
                // this.countryName = country ? country.name : '';
                // this.state = result.result.state;
                // this.city = result.result.city;
                // this.zipcode = result.result.zipcode;
                // this.email = result.result.email;
                // this.profilePhotoService.croppedImage = result.result.company_image_url;
                // this.facebook = result.result.fb_profile;
                // this.instagram = result.result.ig_profile;
                // this.address1 = result.result.address_line1;
                // this.address2 = result.result.address_line2;
                // this.kgs = result.result.capacity_unit;
                // this.maleNum = result.result.male_employee_count;
                // this.femaleNum = result.result.female_employee_count;
                // this.capacity = result.result.capacity;
                // this.capabilities = result.result.capabilities;
                // this.employeeNos = result.result.total_employees;
                // this.employeeAvg = result.result.avg_employee_age;
                // this.vatNos = result.result.vat_number;
                // this.cmpyRid = result.result.registration_id;
                // this.companyDetailsPublic = result.result.is_company_details_public;
                // this.bannerFileId = result.result.banner_file_id;
                // this.bannerUrl = result.result.banner_url;
                // this.companyImageUrl = result.result.company_image_url;
                // this.changeCountry(this.country);
            }
        });

        this.roasterService.getRoasterUsers(this.roasterId).subscribe((data: any) => {
            if (data.success) {
                this.roasterUsers = data.result;

                console.log(this.roasterUsers);
            }
        });

        this.getcontactList();
    }

    getcontactList() {
        this.roasterService.getRoasterContacts(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.roasterContacts = res.result;
                console.log(this.roasterContacts);
            }
        });
    }

    //  Function Name :Change Country.
    // Description: This function helps to get the values of cities according to selcted country.
    changeCountry(count) {
        console.log('changing country selection >>>>>>>>>>>>>>>', count);
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
        this.isSaving = true;
        if (this.bannerFile) {
            this.userService.uploadFile(this.roasterId, this.bannerFile, 'Cover-Image').subscribe((res) => {
                console.log('banner file upload result >>>>>>', res);
                if (res.success) {
                    this.bannerFileId = res.result.id;
                    this.updateRoasterAccount();
                } else {
                    this.isSaving = false;
                    this.toastrService.error('Error while uploading banner image, please try again.');
                }
            });
        } else {
            this.updateRoasterAccount();
        }
    }

    updateRoasterAccount(): void {
        const data = {
            description: this.summary,
            state: this.state,
            country: this.country,
            city: this.city,
            name: this.name,
            website: this.website,
            phone: this.phoneno.internationalNumber,
            email: this.email,
            founded_on: this.foundedIn,
            zipcode: this.zipcode,
            address_line1: this.address1,
            adderss_line2: this.address2,
            fb_profile: this.facebook,
            ig_profile: this.instagram,
            capacity: this.capacity,
            capabilities: this.capabilities,
            total_employees: this.employeeNos,
            avg_employee_age: this.employeeAvg,
            female_employee_count: this.femaleNum,
            male_employee_count: this.maleNum,
            vat_number: this.vatNos,
            registration_id: this.cmpyRid,
            capacity_unit: this.kgs,
            is_company_details_public: this.companyDetailsPublic,
            banner_file_id: this.bannerFileId || 0,
        };
        this.userService.updateRoasterAccount(this.roasterId, data).subscribe((response: any) => {
            if (response.success === true) {
                console.log(response);
                const base64Rejex = /^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;
                const isBase64Valid = base64Rejex.test(this.profilePhotoService.croppedImage); // base64Data is the base64 string

                if (isBase64Valid === false) {
                    if (this.empName === '') {
                        this.toastrService.success('Roaster profile details updated successfully');
                        this.savemode = false;
                        this.editmode = true;
                        this.empName = '';
                        this.roasterProfile();
                    } else {
                        const contactData = {
                            user_id: parseInt(this.empName, 10),
                        };
                    }
                } else {
                    console.log('entering here');
                    const ImageURL = this.profilePhotoService.croppedImage;
                    // Split the base64 string in data and contentType
                    const block = ImageURL.split(';');
                    // Get the content type of the image
                    const contentType = block[0].split(':')[1]; // In this case "image/gif"
                    // get the real base64 content of the file
                    const realData = block[1].split(',')[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

                    // Convert it to a blob to upload
                    const blob = this.b64toBlob(realData, contentType, 0);

                    const formData: FormData = new FormData();
                    formData.append('file', blob);
                    formData.append('api_call', '/ro/' + this.roasterId + '/company-image');
                    formData.append('token', this.cookieService.get('Auth'));
                    this.userService.uploadProfileImage(formData).subscribe((result: any) => {
                        console.log(result);
                        if (result.success) {
                            if (this.empName === '') {
                                this.toastrService.success('Roaster profile details updated successfully');
                                this.savemode = false;
                                this.editmode = true;
                                this.empName = '';
                                this.roasterProfile();
                            } else {
                            }
                        } else {
                            console.log(result);
                            this.isSaving = false;
                            this.toastrService.error('Error while uploading company image, please try again.');
                        }
                    });
                }
            } else {
                this.isSaving = false;
                this.toastrService.error('Error while updating details, please try again.');
            }
        });
    }

    handleBannerImageFile(inputElement: any) {
        this.bannerFile = inputElement.files[0];
        if (!this.bannerFile) {
            return;
        }
        if (this.bannerFile.type.split('/')[0] !== 'image') {
            return;
        }
        if (this.bannerFile.size >= 2097152) {
            this.toastrService.error('File size is too big to upload');
            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(this.bannerFile);

        reader.onload = (event: any) => {
            this.bannerUrl = event.target.result;
        };
    }

    handleDeleteBannerImage(): void {
        console.log('banner file id ?????????????', this.bannerFileId);
        this.userService.deleteFile(this.roasterId, this.bannerFileId).subscribe((res) => {
            console.log('remove banner file res >>>>>>>>>', res);
        });
    }

    editRoasterProfile() {
        this.isSaving = false;
        // this.savemode = true;
        this.showDelete = true;
        // this.editmode = false;
        console.log('mode');
        this.editMode.next(false);
        this.saveMode.next(true);
    }

    preview() {
        // if (this.phoneno?.internationalNumber) {
        //     this.phoneno = this.phoneno.internationalNumber;
        // }
        // this.bannerUrl = this.profileInfo.banner_url;
        // this.profilePhotoService.croppedImage = this.profileInfo.company_image_url;
        this.editMode.next(true);
        this.saveMode.next(false);
        // this.savemode = false;
        // this.editmode = true;
    }
}
