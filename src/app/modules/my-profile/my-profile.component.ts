import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService, GlobalsService, RoasterserviceService, UserService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { formatDate, Location } from '@angular/common';
import { MyProfileService } from '@modules/my-profile/my-profile.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { dataURItoBlob } from '@utils';
import * as moment from 'moment';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit, OnDestroy {
    isEditMode = false;
    isLoading = false;
    isUpdatingProfile = false;
    previewUrl?: string;
    avatarFileError?: string;
    file?: any;
    profileInfo?: any;
    form: FormGroup;
    genders = [
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' },
        { name: 'Other', value: 'other' },
    ];
    profilePictureSavedEvent$?: Subscription;
    roasterId: any;
    role: any;
    userId: any;
    breadcrumbItems: MenuItem[];
    certificationArray: any[] = [];
    apiCount = 0;
    queryUserId: any;
    queryOrganization: any;

    constructor(
        private formBuilder: FormBuilder,
        public location: Location,
        private toastr: ToastrService,
        public globals: GlobalsService,
        private userService: UserService,
        private cookieService: CookieService,
        public myProfileService: MyProfileService,
        private authService: AuthService,
        private roasterService: RoasterserviceService,
        private activateRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            aboutMe: [''],
            email: ['', [Validators.required, Validators.email]],
            role: [{ value: '', disabled: true }],
            phone: [''],
            birthday: [''],
        });
        this.roasterId = this.authService.getOrgId();
        this.userId = this.authService.userId;
        this.queryUserId = this.activateRoute.snapshot.queryParamMap.get('user_id');
        this.queryOrganization = this.activateRoute.snapshot.queryParamMap.get('organization') || 'ro';
        this.getUserInfo();
    }

    ngOnInit(): void {
        this.breadcrumbItems = [
            { label: this.globals.languageJson?.home, routerLink: '/dashboard' },
            { label: this.globals.languageJson?.my_profile },
        ];
        this.profilePictureSavedEvent$ = this.myProfileService.profilePictureSavedEvent.subscribe(() => {
            this.handleCroppedProfilePicture();
        });
    }

    getUserInfo(): void {
        this.isLoading = true;
        this.apiCount = 0;
        this.getUserDetail();
        if (this.queryUserId) {
            this.apiCount += 1;
        } else {
            this.getCertificates();
        }
    }

    getUserDetail(): void {
        this.userService.getUserDetail(this.queryUserId, this.queryOrganization).subscribe((res: any) => {
            this.apiCount += 1;
            if (res.success) {
                this.profileInfo = res.result;
                this.previewUrl = this.profileInfo.profile_image_url;
                if (this.queryUserId) {
                    this.apiCount += 1;
                    this.certificationArray = res.result?.certificates || [];
                } else {
                    this.getUserBasedRoles();
                }
                this.checkApiCompletion();
            } else {
                this.toastr.error('Error while fetching profile');
                this.router.navigate(['/']);
            }
        });
    }

    getUserBasedRoles(): void {
        this.userService.getUserRoles().subscribe((res: any) => {
            this.apiCount += 1;
            if (res.success) {
                this.role = res.result[0].name;
            } else {
                this.toastr.error('Error while fetching role');
            }
            this.checkApiCompletion();
        });
    }

    getCertificates(): void {
        this.userService.getCertificates(this.roasterId, this.userId).subscribe((res: any) => {
            this.apiCount += 1;
            if (res.success) {
                this.certificationArray = res.result;
            } else {
                this.toastr.error('Error while fetching certificates');
            }
            console.log('certificates >>>>>>>>', res);
            this.checkApiCompletion();
        });
    }

    checkApiCompletion(): void {
        if (this.apiCount === 3) {
            this.isLoading = false;
            this.setFormFields();
            this.apiCount = 0;
        }
    }

    setFormFields(): void {
        this.form.controls.firstName.setValue(this.profileInfo.firstname);
        this.form.controls.aboutMe.setValue(this.profileInfo.about_me);
        this.form.controls.email.setValue(this.profileInfo.email);
        this.form.controls.phone.setValue(this.profileInfo.phone);
        this.form.controls.role.setValue(this.role);
        this.form.controls.birthday.setValue(
            moment(this.profileInfo.date_of_birth).isValid() ? moment(this.profileInfo.date_of_birth).toDate() : null,
        );
    }

    onSelectFile(event: any): void {
        const inputElement = event.target;
        this.avatarFileError = '';
        this.file = inputElement.files[0];
        if (!this.file) {
            return;
        }
        this.myProfileService.imageChangedEvent = event;
        this.myProfileService.displayCropImageDialog = true;
    }

    handleCroppedProfilePicture(): void {
        this.previewUrl = this.myProfileService.croppedImage;
        this.file = dataURItoBlob(this.previewUrl);
    }

    handleCancel(): void {
        this.previewUrl = this.profileInfo.profile_image_url;
        this.isEditMode = false;
        this.getUserInfo();
    }

    handleProfileUpdateSuccess(): void {
        this.userService.getUserDetail().subscribe((res: any) => {
            this.isUpdatingProfile = false;
            this.profileInfo = res.result;
            this.isEditMode = false;
            this.authService.userSubject.next(res.result);
            this.apiCount = 2;
            this.getCertificates();
            this.toastr.success('Successfully saved');
        });
    }

    handleSubmit(): void {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            console.log('invalid');
            return;
        }

        const userInfo = { ...this.profileInfo };

        userInfo.email = this.form.controls.email.value;
        userInfo.firstname = this.form.controls.firstName.value;
        userInfo.lastname = '';
        userInfo.about_me = this.form.controls.aboutMe.value;
        userInfo.phone = this.form.controls.phone.value;
        if (this.form.controls.birthday.value) {
            userInfo.date_of_birth = formatDate(this.form.controls.birthday.value, 'yyyy-MM-dd', 'en-US');
        }

        if (this.file) {
            this.isUpdatingProfile = true;
            let newProfileImageUrl = '';
            const formData: FormData = new FormData();
            formData.append('file', this.file);
            formData.append('api_call', '/ro/' + this.roasterId + '/users/' + this.userId + '/profile-image');
            formData.append('token', this.authService.token);
            this.userService.uploadProfileImage(formData).subscribe((res: any) => {
                if (res.success) {
                    newProfileImageUrl = res.result.file_path;
                } else {
                    this.toastr.error('Failed to upload profile image.');
                }
                this.userService.updateRoasterProfile(this.roasterId, userInfo).subscribe((res2: any) => {
                    if (res2.success) {
                        this.handleProfileUpdateSuccess();
                    } else {
                        this.isUpdatingProfile = false;
                        this.toastr.error('Failed to update profile.');
                    }
                });
            });
        } else {
            this.isUpdatingProfile = true;
            this.userService.updateRoasterProfile(this.roasterId, userInfo).subscribe((res: any) => {
                if (res.success) {
                    this.handleProfileUpdateSuccess();
                } else {
                    this.isUpdatingProfile = false;
                    this.toastr.error('Failed to save data');
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.profilePictureSavedEvent$?.unsubscribe();
    }
}
