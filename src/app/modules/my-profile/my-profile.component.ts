import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService, UserService, ValidateEmailService } from '@services';
import { CropperDialogComponent } from '@shared';
import { CroppedImage, UserProfile } from '@models';
import { emailValidator } from '@utils';
import { COUNTRY_LIST, LANGUAGES } from '@constants';
import { OrganizationType, PostType } from '@enums';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
    public readonly COUNTRY_LIST = COUNTRY_LIST;
    public readonly LANGUAGES = LANGUAGES;

    @ViewChild('bannerInput', { static: false }) bannerInput: ElementRef;
    @ViewChild('profileInput', { static: false }) profileInput: ElementRef;
    isEditMode = false;
    isLoading = false;
    isUpdatingProfile = false;
    bannerUrl: string;
    bannerFile: File;
    profileUrl: string;
    profileFile: File;
    profileInfo: UserProfile;
    infoForm: FormGroup;
    breadcrumbItems: MenuItem[];
    certificationArray: any[] = [];
    queryUserId: any;
    orgType: OrganizationType;
    menuItems = [
        {
            label: 'qa_forum',
            postType: PostType.QA,
            icon: 'assets/images/qa-forum.svg',
            activeIcon: 'assets/images/qa-forum-active.svg',
        },
        {
            label: 'posts',
            postType: PostType.ARTICLE,
            icon: 'assets/images/article.svg',
            activeIcon: 'assets/images/article-active.svg',
        },
        {
            label: 'brewing_guides',
            postType: PostType.RECIPE,
            icon: 'assets/images/coffee-recipe.svg',
            activeIcon: 'assets/images/coffee-recipe-active.svg',
        },
    ];

    constructor(
        private activateRoute: ActivatedRoute,
        private authService: AuthService,
        private dialogService: DialogService,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
        private validateService: ValidateEmailService,
        public location: Location,
    ) {
        this.queryUserId = this.activateRoute.snapshot.queryParamMap.get('user_id');
        this.orgType =
            (this.activateRoute.snapshot.queryParamMap.get('organization') as OrganizationType) ||
            OrganizationType.ROASTER;
    }

    ngOnInit(): void {
        this.breadcrumbItems = [
            { label: this.translator.instant('home'), routerLink: '/dashboard' },
            { label: this.translator.instant('my_profile') },
        ];

        this.infoForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            about_me: [''],
            email: ['', [Validators.required], emailValidator(this.validateService)],
            phone: [''],
            country: [''],
            city: [''],
            converseLanguages: [null, [Validators.required]],
        });

        this.getUserInfo();
    }

    getUserInfo(): void {
        this.isLoading = true;
        const promises = [];
        promises.push();
        if (!this.queryUserId) {
            promises.push(this.getCertificates());
        }
        Promise.all(promises)
            .then(() => {
                this.isLoading = false;
            })
            .catch(() => {
                this.isLoading = false;
            });
        this.getUserDetail();
        this.getConverseLanguages();
    }

    getUserDetail(): void {
        this.userService.getUserDetail(this.queryUserId, this.orgType).subscribe((res) => {
            if (res.success) {
                this.profileInfo = res.result;
                this.infoForm.patchValue(this.profileInfo);
                this.bannerUrl = this.profileInfo.banner_url;
                this.profileUrl = this.profileInfo.profile_image_url;
                if (this.queryUserId) {
                    this.certificationArray = res.result?.certificates || [];
                }
            } else {
                this.toastr.error('Error while fetching profile');
                this.router.navigate(['/']);
            }
        });
    }

    getConverseLanguages(): void {
        this.isLoading = true;
        this.userService.getConverseLanguages().subscribe((res: any) => {
            if (res.result?.languages?.length) {
                this.infoForm.patchValue({ converseLanguages: res.result?.languages });
            }
        });
    }

    getCertificates(): void {
        this.userService.getUserCertificates().subscribe((res: any) => {
            if (res.success) {
                this.certificationArray = res.result;
            } else {
                this.toastr.error('Error while fetching certificates');
            }
        });
    }

    onSelectBanner(event: any): void {
        if (!event.target.files?.length) {
            return;
        }
        this.dialogService
            .open(CropperDialogComponent, {
                data: {
                    imageChangedEvent: event,
                    resizeToWidth: 1144,
                    maintainAspectRatio: false,
                },
            })
            .onClose.subscribe((data: CroppedImage) => {
                if (data?.status) {
                    this.bannerUrl = data.croppedImgUrl;
                    this.bannerFile = data.croppedImgFile;
                }
                this.bannerInput.nativeElement.value = '';
            });
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
                if (data?.status) {
                    this.profileUrl = data.croppedImgUrl;
                    this.profileFile = data.croppedImgFile;
                }
                this.profileInput.nativeElement.value = '';
            });
    }

    handleCancel(): void {
        this.bannerUrl = this.profileInfo.banner_url;
        this.bannerFile = null;
        this.profileUrl = this.profileInfo.profile_image_url;
        this.profileFile = null;
        this.isEditMode = false;
        this.getUserInfo();
    }

    handleProfileUpdateSuccess(): void {
        this.userService.getUserDetail().subscribe((res: any) => {
            this.isUpdatingProfile = false;
            this.profileInfo = res.result;
            this.isEditMode = false;
            this.authService.userSubject.next(res.result);
            this.getCertificates();
            this.toastr.success('Successfully saved');
        });
    }

    handleSubmit(): void {
        if (this.infoForm.invalid) {
            this.infoForm.markAllAsTouched();
            this.toastr.error(this.translator.instant('please_check_form_data'));
            return;
        }

        const promises = [];
        if (this.bannerFile) {
            promises.push(new Promise((resolve, reject) => this.uploadBanner(resolve, reject)));
        }
        if (this.profileFile) {
            promises.push(new Promise((resolve, reject) => this.uploadProfileImage(resolve, reject)));
        }
        promises.push(new Promise((resolve, reject) => this.updateUserProfile(resolve, reject)));
        promises.push(new Promise((resolve, reject) => this.saveConverseLanguages(resolve, reject)));

        this.isUpdatingProfile = true;
        Promise.all(promises)
            .then(() => {
                this.handleProfileUpdateSuccess();
            })
            .catch(() => {
                this.isUpdatingProfile = false;
            });
    }

    uploadBanner(resolve, reject) {
        const formData: FormData = new FormData();
        formData.append('file', this.bannerFile);
        formData.append('api_call', `${this.userService.apiCallPrefix}/users/${this.userService.userId}/banner-image`);
        formData.append('token', this.authService.token);
        this.userService.uploadProfileImage(formData).subscribe((res: any) => {
            if (res.success) {
                resolve();
            } else {
                reject();
            }
        });
    }

    uploadProfileImage(resolve, reject) {
        const formData: FormData = new FormData();
        formData.append('file', this.profileFile);
        formData.append('api_call', `${this.userService.apiCallPrefix}/users/${this.userService.userId}/profile-image`);
        formData.append('token', this.authService.token);
        this.userService.uploadProfileImage(formData).subscribe((res: any) => {
            if (res.success) {
                resolve();
            } else {
                reject();
            }
        });
    }

    updateUserProfile(resolve, reject) {
        const userInfo = { ...this.profileInfo, ...this.infoForm.value };
        this.userService.updateUserProfile(userInfo).subscribe((res: any) => {
            if (res.success) {
                resolve();
            } else {
                reject();
            }
        });
    }

    saveConverseLanguages(resolve, reject): void {
        this.userService
            .updateConverseLanguages({ languages: this.infoForm.value.converseLanguages })
            .subscribe((res) => {
                if (res.success) {
                    resolve();
                } else {
                    reject();
                }
            });
    }
}
