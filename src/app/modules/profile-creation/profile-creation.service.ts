import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContactGroup, FileModule, OrganizationType, ProfileImageType } from '@enums';
import { OrganizationProfile } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, RoasterService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfileCreationService {
    orgType: OrganizationType;

    public saveMode = new BehaviorSubject(false);
    public saveMode$ = this.saveMode.asObservable();

    public avatarImageChanged = new BehaviorSubject(null);
    public avatarImageChanged$ = this.avatarImageChanged.asObservable();

    aboutForm: FormGroup;
    contactForm: FormGroup;

    public toUpdateProfileData: OrganizationProfile;
    public organizationProfile: OrganizationProfile;
    public orgImgPrevUrl: any;
    public orgImgCroppedFile: File;

    roasterId: number;
    topContacts: any = [];
    updatedContacts: number[] = [];
    employeeChartData: { name: string; value: any }[];
    bannerUrl?: string;
    bannerFile?: any;
    profileInfo?: any;
    isSaving?: boolean;

    constructor(
        private authService: AuthService,
        private newUserService: UserService,
        private roasterService: RoasterService,
        private toastrService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
    ) {
        this.roasterId = this.authService.getOrgId();
        this.roasterProfile();
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
        this.userService.getOrgDetail().subscribe((result: any) => {
            if (result.success) {
                this.organizationProfile = result.result;
                this.toUpdateProfileData = result.result;
                this.authService.organizationSubject.next(result.result);
                this.orgImgPrevUrl = this.organizationProfile.company_image_url;

                this.employeeChartData = [
                    { name: 'Female', value: this.organizationProfile.female_employee_count || 0 },
                    { name: 'Male', value: this.organizationProfile.male_employee_count || 0 },
                ];
                this.saveMode.next(false);
            }
        });

        this.getContactList();
    }

    getContactList() {
        this.newUserService.getContacts(ContactGroup.TOP).subscribe((res: any) => {
            if (res.success) {
                this.topContacts = res.result || [];
            }
        });
    }

    saveProfile() {
        if (this.aboutForm?.invalid || this.contactForm?.invalid) {
            this.toastrService.error(this.translator.instant('please_ensure_all_fields_filled_for_all_tabs'));
            this.aboutForm?.markAllAsTouched();
            this.contactForm?.markAllAsTouched();
            return;
        }
        this.isSaving = true;
        if (this.bannerFile) {
            this.userService.uploadFile(this.roasterId, this.bannerFile, FileModule.CoverImage).subscribe((res) => {
                if (res.success) {
                    this.toUpdateProfileData.banner_file_id = res.result.id;
                    this.updateProfile();
                } else {
                    this.isSaving = false;
                    this.toastrService.error('Error while uploading banner image, please try again.');
                }
            });
        } else {
            if (!this.bannerUrl && this.organizationProfile.banner_file_id) {
                this.userService.deleteBanner().subscribe((res) => {
                    if (res.success) {
                        this.toUpdateProfileData.banner_file_id = 0;
                        this.toUpdateProfileData.banner_url = '';
                        this.updateProfile();
                    } else {
                        this.isSaving = false;
                        this.toastrService.error('Error while deleting banner image, please try again.');
                    }
                });
            } else {
                this.updateProfile();
            }
        }
    }

    updateProfile(): void {
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

        if (this.orgImgCroppedFile) {
            promises.push(
                new Promise((resolve, reject) => {
                    this.userService
                        .uploadProfileImage(this.orgImgCroppedFile, ProfileImageType.COMPANY)
                        .subscribe((result: any) => {
                            if (result.success) {
                                this.orgImgCroppedFile = null;
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
                this.isSaving = false;
                this.toastrService.error('Error while updating details, please try again.');
            });
    }

    editProfile() {
        this.toUpdateProfileData = this.organizationProfile;
        this.isSaving = false;
        this.saveMode.next(true);
    }

    preview() {
        this.bannerUrl = this.organizationProfile.banner_url;
        this.orgImgPrevUrl = this.organizationProfile.company_image_url;
        this.orgImgCroppedFile = null;
        this.saveMode.next(false);
    }

    clear() {
        this.aboutForm.reset();
        this.contactForm.reset();
    }
}
