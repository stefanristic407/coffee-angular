import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfilePhotoService } from './profile-photo/profile-photo.service';
import { RoasteryProfileService } from './roastery-profile.service';
import { GlobalsService, UserService, UserserviceService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-profile-creation',
    templateUrl: './profile-creation.component.html',
    styleUrls: ['./profile-creation.component.scss'],
})
export class ProfileCreationComponent implements OnInit, OnDestroy {
    menuItems = [
        {
            label: 'about_roastery',
            routerLink: '/roastery-profile/about_roastery',
        },
        { label: 'virtual_tour', routerLink: '/roastery-profile/virtual_tour' },
        { label: 'contact', routerLink: '/roastery-profile/contact' },
        { label: 'reviews', routerLink: '/roastery-profile/reviews' },
    ];
    breadItems = [{ label: 'home', routerLink: '/' }, { label: 'Roastery Profile' }];
    isSaveMode: boolean;
    isEditMode: boolean;

    subProfileForm: FormGroup;
    isShowAvatarModal: boolean;
    roasterId: string;
    isAdminRole = false;

    constructor(
        private toastrService: ToastrService,
        public profilePhotoService: ProfilePhotoService,
        public roasteryProfileService: RoasteryProfileService,
        public globals: GlobalsService,
        private fb: FormBuilder,
        public cookieService: CookieService,
        private userService: UserService,
    ) {}

    ngOnInit(): void {
        this.detectMode();
        this.initialForm();
        this.roasterId = this.cookieService.get('roaster_id');
        this.checkAdminRole(this.roasterId);
    }

    ngOnDestroy() {
        this.roasteryProfileService.saveMode.next(false);
        this.roasteryProfileService.editMode.next(true);
    }

    checkAdminRole(userId) {
        this.userService.getUserDetail(userId).subscribe((res: any) => {
            console.log('check admin role: ', res);
            if (res.success) {
                this.isAdminRole = res.result.has_system_role;
            }
        });
    }

    initialForm() {
        this.subProfileForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            website: [''],
        });
        this.subProfileForm.valueChanges.subscribe((changedData: any) => {
            this.roasteryProfileService.mainSubFormInvalid = this.subProfileForm.invalid;
            this.roasteryProfileService.editProfileData(changedData);
        });
    }

    detectMode() {
        this.roasteryProfileService.saveMode$.subscribe((res: boolean) => {
            this.isSaveMode = res;
            if (res) {
                this.setFormValue();
            } else {
                this.roasteryProfileService.bannerFile = null;
                this.roasteryProfileService.bannerUrl = '';
            }
        });
        this.roasteryProfileService.editMode$.subscribe((res: boolean) => {
            this.isEditMode = res;
        });
    }

    setFormValue() {
        this.subProfileForm.controls.name.setValue(this.roasteryProfileService.roasteryProfileData.name);
        this.subProfileForm.controls.website.setValue(this.roasteryProfileService.roasteryProfileData.website);
    }

    handleFile(e) {
        if (e.target.files.length > 0) {
            for (let i = 0; i <= e.target.files.length - 1; i++) {
                const fsize = e.target.files.item(i).size;
                const file = Math.round(fsize / 1024);
                if (file >= 2048) {
                    this.toastrService.error('File too big, please select a file smaller than 2mb');
                } else {
                    this.isShowAvatarModal = true;
                    this.roasteryProfileService.avatarImageChanged.next(e);
                }
            }
        }
    }

    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.subProfileForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }

    setFormat($event) {
        $event.target.value = null;
    }
}
