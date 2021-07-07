import { Injectable } from '@angular/core';
import { AuthService, UserService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ProfilePhotoService } from './profile-photo/profile-photo.service';
import { Router } from '@angular/router';
import { COUNTRY_LIST } from '@constants';
import { BehaviorSubject } from 'rxjs';
import { OrganizationProfile } from '@models';
import { ContactGroup } from '@enums';
@Injectable({
    providedIn: 'root',
})
export class RoasteryProfileService {
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
    public toUpdateProfileData: OrganizationProfile;
    public organizationProfile: OrganizationProfile;

    public invalidSumEmployee = false;

    cities: Array<any> = [];

    userId: number;
    roasterId: number;
    roasterUsers: any = [];
    topContacts: any = [];
    updatedContacts: number[] = [];
    single: { name: string; value: any }[];
    showDelete = false;
    bannerUrl?: string;
    bannerFile?: any;
    profileInfo?: any;
    isSaving?: boolean;

    constructor(
        public userService: UserService,
        public cookieService: CookieService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public profilePhotoService: ProfilePhotoService,
        public router: Router,
        private authService: AuthService,
        private newUserService: UserService,
    ) {
        this.userId = this.authService.userId;
        this.roasterId = this.authService.getOrgId();
        this.roasterProfile();
        this.countryList = COUNTRY_LIST;
    }

    public editProfileData(subData: any) {
        this.toUpdateProfileData = {
            ...this.toUpdateProfileData,
            ...subData,
        };
    }

    public editTopContacts(subData: any) {
        this.updatedContacts = subData;
    }

    roasterProfile() {
        this.userService.getRoasterAccount(this.roasterId).subscribe((result: any) => {
            if (result.success) {
                console.log('roaster details: ', result);
                this.organizationProfile = result.result;
                this.toUpdateProfileData = result.result;

                this.profilePhotoService.croppedImage = this.organizationProfile.company_image_url;

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
                this.saveMode.next(false);
                this.editMode.next(true);
            }
        });

        this.roasterService.getRoasterUsers(this.roasterId).subscribe((data: any) => {
            if (data.success) {
                this.roasterUsers = data.result;
            }
        });

        this.getcontactList();
    }

    getcontactList() {
        this.newUserService.getContacts(ContactGroup.TOP).subscribe((res: any) => {
            if (res.success) {
                this.topContacts = res.result || [];
            }
        });
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
            this.userService.uploadFile(this.roasterId, this.bannerFile, 'Cover-Image').subscribe((res) => {
                if (res.success) {
                    this.toUpdateProfileData.banner_file_id = res.result.id;
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
        const promises = [];
        // add top contacts
        this.updatedContacts.forEach((element) => {
            const idx = this.topContacts.findIndex((item) => item.user_id === element);
            if (element && element && idx === -1) {
                const payload = {
                    user_id: element,
                };
                promises.push(
                    new Promise((resolve, reject) =>
                        this.roasterService.addRoasterContacts(this.roasterId, payload).subscribe(
                            (res: any) => {
                                if (res.success) {
                                    resolve(res.result);
                                } else {
                                    reject();
                                }
                            },
                            (err) => {
                                reject();
                            },
                        ),
                    ),
                );
            }
        });
        // remove top contacts
        this.topContacts.forEach((element) => {
            const idx = this.updatedContacts.findIndex((item) => item === element.user_id);
            if (idx === -1) {
                promises.push(
                    new Promise((resolve, reject) => {
                        this.roasterService.deleteRoasterContacts(this.roasterId, element.id).subscribe(
                            (res: any) => {
                                if (res.success) {
                                    resolve(res.result);
                                }
                            },
                            (err) => {
                                reject();
                            },
                        );
                    }),
                );
            }
        });

        const data: OrganizationProfile = this.toUpdateProfileData;
        delete data.company_image_url;
        delete data.company_image_thumbnail_url;
        promises.push(
            new Promise((resolve, reject) => {
                this.userService.updateRoasterAccount(this.roasterId, data).subscribe((response: any) => {
                    if (response.success) {
                        resolve(response.success);
                    } else {
                        reject();
                    }
                });
            }),
        );

        const base64Rejex =
            /^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;
        const isBase64Valid = base64Rejex.test(this.profilePhotoService.croppedImage); // base64Data is the base64 string
        if (isBase64Valid) {
            const ImageURL = this.profilePhotoService.croppedImage;
            const block = ImageURL.split(';');
            const contentType = block[0].split(':')[1];
            const realData = block[1].split(',')[1];
            // Convert it to a blob to upload
            const blob = this.b64toBlob(realData, contentType, 0);
            const formData: FormData = new FormData();
            formData.append('file', blob);
            formData.append('api_call', '/ro/' + this.roasterId + '/company-image');
            formData.append('token', this.authService.token);
            promises.push(
                new Promise((resolve, reject) => {
                    this.userService.uploadProfileImage(formData).subscribe((result: any) => {
                        if (result.success) {
                            resolve(result.success);
                        } else {
                            reject();
                        }
                    });
                }),
            );
        }

        Promise.all(promises)
            .then(() => {
                this.roasterProfile();
                this.isSaving = false;
                this.toastrService.success('Roaster profile details updated successfully');
            })
            .catch(() => {
                this.roasterProfile();
                this.isSaving = false;
                this.toastrService.error('Error while updating details, please try again.');
            });
    }

    handleBannerImageFile(inputElement: any) {
        const file = inputElement.files[0];
        if (!file) {
            return;
        }
        if (file.type.split('/')[0] !== 'image') {
            return;
        }
        if (file.size >= 2097152) {
            this.toastrService.error('File size is too big to upload');
            return;
        }

        const reader = new FileReader();

        reader.onload = (event: any) => {
            const img = new Image();
            img.onload = () => {
                this.bannerFile = inputElement.files[0];
                this.bannerUrl = event.target.result;
            };
            img.src = window.URL.createObjectURL(file);
        };
        reader.readAsDataURL(file);
    }

    handleDeleteBannerImage(): void {
        if (this.organizationProfile.banner_url && this.organizationProfile.banner_file_id !== 0) {
            this.userService.deleteBanner(this.roasterId).subscribe(
                (res) => {
                    this.toastrService.success('Deleted Banner Image');
                    this.organizationProfile.banner_file_id = 0;
                    this.organizationProfile.banner_url = '';
                    this.bannerUrl = '';
                },
                (error) => {
                    this.toastrService.error('Failed, Please try again later');
                },
            );
        }
        this.bannerUrl = '';
    }

    editRoasterProfile() {
        this.toUpdateProfileData = this.organizationProfile;
        this.isSaving = false;
        this.showDelete = true;
        this.editMode.next(false);
        this.saveMode.next(true);
    }

    preview() {
        this.bannerUrl = this.organizationProfile.banner_url;
        this.profilePhotoService.croppedImage = this.organizationProfile.company_image_url;
        this.editMode.next(true);
        this.saveMode.next(false);
    }
}
