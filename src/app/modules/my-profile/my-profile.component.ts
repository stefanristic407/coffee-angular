import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { COUNTRY_LIST, LANGUAGES } from '@constants';
import { OrganizationType, PostType, ProfileImageType } from '@enums';
import { CroppedImage, UserProfile } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, ChatHandlerService, UserService, ValidateEmailService } from '@services';
import { CropperDialogComponent } from '@shared';
import { emailValidator } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
    public readonly COUNTRY_LIST = COUNTRY_LIST;
    public readonly LANGUAGES = LANGUAGES;
    readonly OrgType = OrganizationType;
    readonly postType = PostType;

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
    queryUserId: number;
    orgType: OrganizationType;
    isMyProfile = true;
    menuItems = [
        {
            label: 'question_answers',
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
        private chatHandler: ChatHandlerService,
        private dialogService: DialogService,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
        private validateService: ValidateEmailService,
        public location: Location,
    ) {
        this.queryUserId = +this.activateRoute.snapshot.queryParamMap.get('user_id');
        this.orgType =
            (this.activateRoute.snapshot.queryParamMap.get('organization') as OrganizationType) ||
            this.authService.orgType;

        this.isMyProfile = true;
        if (
            this.queryUserId &&
            (this.queryUserId !== this.authService.userId || this.orgType !== this.authService.orgType)
        ) {
            this.isMyProfile = false;
        }
    }

    ngOnInit(): void {
        this.breadcrumbItems = [
            { label: this.translator.instant('home'), routerLink: '/' },
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
        if (!this.queryUserId) {
            promises.push(this.getCertificates());
        }
        promises.push(new Promise((resolve, reject) => this.getUserDetail(resolve, reject)));
        promises.push(new Promise((resolve, reject) => this.getConverseLanguages(resolve, reject)));
        Promise.all(promises)
            .then(() => {
                this.isLoading = false;
            })
            .catch(() => {
                this.isLoading = false;
            });
    }

    getUserDetail(resolve, reject): void {
        this.userService.getUserDetail(this.queryUserId, this.orgType).subscribe((res) => {
            if (res.success) {
                this.profileInfo = res.result;
                this.infoForm.patchValue(this.profileInfo);
                this.bannerUrl = this.profileInfo.banner_url;
                this.profileUrl = this.profileInfo.profile_image_url;
                if (this.queryUserId) {
                    this.certificationArray = res.result?.certificates || [];
                }
                resolve();
            } else {
                this.toastr.error('Error while fetching profile');
                this.router.navigate(['/']);
                reject();
            }
        });
    }

    getConverseLanguages(resolve, reject): void {
        this.userService.getConverseLanguages().subscribe((res) => {
            if (res.success && res.result?.languages?.length) {
                this.infoForm.patchValue({ converseLanguages: res.result?.languages });
            }
            resolve();
        });
    }

    getCertificates(): void {
        this.userService.getUserCertificates().subscribe((res: any) => {
            if (res.success) {
                this.certificationArray = res.result || [];
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
                    aspectRatio: 1240 / 274,
                    resizeToWidth: 1240,
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
            this.toastr.error(this.translator.instant('please_fill_all_the_fields'));
            return;
        }

        const promises = [];
        if (this.bannerFile) {
            promises.push(
                new Promise((resolve, reject) =>
                    this.uploadProfileImage(this.bannerFile, ProfileImageType.BANNER, resolve, reject),
                ),
            );
        }
        if (this.profileFile) {
            promises.push(
                new Promise((resolve, reject) =>
                    this.uploadProfileImage(this.profileFile, ProfileImageType.PROFILE, resolve, reject),
                ),
            );
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

    uploadProfileImage(file: File, type: ProfileImageType, resolve, reject) {
        this.userService.uploadProfileImage(file, type).subscribe((res) => {
            if (res.success) {
                if (type === ProfileImageType.BANNER) {
                    this.bannerFile = null;
                } else if (type === ProfileImageType.PROFILE) {
                    this.profileFile = null;
                }
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

    openChat(): void {
        this.chatHandler.openChatThread({
            user_id: this.profileInfo.id,
            org_type: this.orgType,
            org_id: this.profileInfo.organization_id,
        });
    }
}
