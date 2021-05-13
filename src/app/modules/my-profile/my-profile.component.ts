import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
    AuthService,
    CoffeeLabService,
    CommonService,
    GlobalsService,
    RoasterserviceService,
    UserService,
    UserserviceService,
} from '@services';
import { CookieService } from 'ngx-cookie-service';
import { formatDate, Location } from '@angular/common';
import { MyProfileService } from '@modules/my-profile/my-profile.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

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
        private userOriginalService: UserserviceService,
        private cookieService: CookieService,
        public myProfileService: MyProfileService,
        private authService: AuthService,
        private roasterService: RoasterserviceService,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private coffeeLabService: CoffeeLabService,
    ) {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            aboutMe: [''],
            email: ['', [Validators.required, Validators.email]],
            role: [{ value: '', disabled: true }],
            phone: [''],
            birthday: [''],
        });
        this.roasterId = this.cookieService.get('roaster_id');
        this.userId = this.cookieService.get('user_id');
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
            console.log('get user info response >>>>>>>>>>>>>>>', res);
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
        this.roasterService.getUserBasedRoles(this.roasterId, this.profileInfo.id).subscribe((res: any) => {
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
        this.userOriginalService.getCertificates(this.roasterId, this.userId).subscribe((res: any) => {
            console.log('get certificates result >>>>>>>>>>>>', res);
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
        this.form.controls.birthday.setValue(new Date(this.profileInfo.date_of_birth));
    }

    onSelectFile(event: any): void {
        const inputElement = event.target;
        this.avatarFileError = '';
        this.file = inputElement.files[0];
        console.log('file >>>>>', this.file);
        this.coffeeLabService.uploadFile(this.file, 'qa-forum').subscribe((res) => {
            console.log('file upload response >>>>>>>', res);
        });
        if (!this.file) {
            return;
        }
        if (this.file.type.split('/')[0] !== 'image') {
            this.avatarFileError = 'Invalid image';
            return;
        }
        this.myProfileService.imageChangedEvent = event;
        this.myProfileService.displayCropImageDialog = true;
    }

    b64toBlob(b64Data: any, contentType: any, sliceSize: any): any {
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

    handleCroppedProfilePicture(): void {
        this.previewUrl = this.myProfileService.croppedImage;
        const ImageURL = this.myProfileService.croppedImage;
        const block = ImageURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType, 0);
        this.file = blob;
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
        userInfo.date_of_birth = formatDate(this.form.controls.birthday.value, 'yyyy-MM-dd', 'en-US');

        if (this.file) {
            this.isUpdatingProfile = true;
            let newProfileImageUrl = '';
            const formData: FormData = new FormData();
            formData.append('file', this.file);
            formData.append('api_call', '/ro/' + this.roasterId + '/users/' + this.userId + '/profile-image');
            formData.append('token', this.cookieService.get('Auth'));
            this.userOriginalService.uploadProfileImage(formData).subscribe((res: any) => {
                console.log('upload image result >>>>>>>>>', res);
                if (res.success) {
                    newProfileImageUrl = res.result.file_path;
                } else {
                    this.toastr.error('Failed to upload profile image.');
                }
                this.userOriginalService.updateRoasterProfile(this.roasterId, userInfo).subscribe((res2: any) => {
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
            this.userOriginalService.updateRoasterProfile(this.roasterId, userInfo).subscribe((res: any) => {
                console.log('profile update result >>>>>>>>', res);
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
