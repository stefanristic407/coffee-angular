import { Component, OnInit } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService, GlobalsService, UserService } from '@services';
import * as moment from 'moment';
import { CropperDialogComponent } from '@shared';
import { CroppedImage } from '@models';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
    isEditMode = false;
    isLoading = false;
    isUpdatingProfile = false;
    previewUrl?: string;
    avatarFileError?: string;
    file?: any;
    profileInfo?: any;
    infoForm: FormGroup;
    genders = [
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' },
        { name: 'Other', value: 'other' },
    ];
    roasterId: any;
    role: any;
    userId: any;
    breadcrumbItems: MenuItem[];
    certificationArray: any[] = [];
    apiCount = 0;
    queryUserId: any;
    queryOrganization: any;

    constructor(
        private activateRoute: ActivatedRoute,
        private authService: AuthService,
        private dialogService: DialogService,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private userService: UserService,
        public globals: GlobalsService,
        public location: Location,
    ) {
        this.infoForm = this.formBuilder.group({
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
        this.infoForm.controls.firstName.setValue(this.profileInfo.firstname);
        this.infoForm.controls.aboutMe.setValue(this.profileInfo.about_me);
        this.infoForm.controls.email.setValue(this.profileInfo.email);
        this.infoForm.controls.phone.setValue(this.profileInfo.phone);
        this.infoForm.controls.role.setValue(this.role);
        this.infoForm.controls.birthday.setValue(
            moment(this.profileInfo.date_of_birth).isValid() ? moment(this.profileInfo.date_of_birth).toDate() : null,
        );
    }

    onSelectFile(event: any): void {
        if (!event.target.files?.length) {
            return;
        }
        this.dialogService
            .open(CropperDialogComponent, {
                data: {
                    imageChangedEvent: event,
                    resizeToWidth: 256,
                    resizeToHeight: 256,
                    roundCropper: true,
                },
            })
            .onClose.subscribe((data: CroppedImage) => {
                if (data.status) {
                    this.previewUrl = data.croppedImgUrl;
                    this.file = data.croppedImgFile;
                }
            });
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
        this.infoForm.markAllAsTouched();
        if (this.infoForm.invalid) {
            return;
        }

        const userInfo = { ...this.profileInfo };

        userInfo.email = this.infoForm.controls.email.value;
        userInfo.firstname = this.infoForm.controls.firstName.value;
        userInfo.lastname = '';
        userInfo.about_me = this.infoForm.controls.aboutMe.value;
        userInfo.phone = this.infoForm.controls.phone.value;
        if (this.infoForm.controls.birthday.value) {
            userInfo.date_of_birth = formatDate(this.infoForm.controls.birthday.value, 'yyyy-MM-dd', 'en-US');
        }

        if (this.file) {
            this.isUpdatingProfile = true;
            const formData: FormData = new FormData();
            formData.append('file', this.file);
            formData.append('api_call', '/ro/' + this.roasterId + '/users/' + this.userId + '/profile-image');
            formData.append('token', this.authService.token);
            this.userService.uploadProfileImage(formData).subscribe((res: any) => {
                if (!res.success) {
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
}
