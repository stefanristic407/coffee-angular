import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService, UserserviceService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MicroProfileService } from './micro-profile.service';

@Component({
    selector: 'app-micro-profile',
    templateUrl: './micro-profile.component.html',
    styleUrls: ['./micro-profile.component.scss'],
})
export class MicroProfileComponent implements OnInit, OnDestroy {
    menuItems = [
        {
            label: 'about_micro_roastery',
            routerLink: '/micro-roastery-profile/about-micro-roastery',
        },
        { label: 'virtual_tour', routerLink: '/micro-roastery-profile/virtual-tour' },
        { label: 'contact', routerLink: '/micro-roastery-profile/contact' },
        { label: 'reviews', routerLink: '/micro-roastery-profile/reviews' },
    ];
    breadItems = [{ label: 'home', routerLink: '/' }, { label: 'Roastery Profile' }];
    isSaveMode: boolean;
    isEditMode: boolean;

    subProfileForm: FormGroup;
    isShowAvatarModal: boolean;
    isAdminRole = false;
    microRoasterId: string;

    constructor(
        private toastrService: ToastrService,
        public profileCreationService: MicroProfileService,
        public globals: GlobalsService,
        private fb: FormBuilder,
        public cookieService: CookieService,
        private userService: UserserviceService,
    ) {}

    ngOnInit(): void {
        this.detectMode();
        this.initialForm();
        this.microRoasterId = '7';
        this.checkAdminRole(this.microRoasterId);
    }

    ngOnDestroy() {
        this.profileCreationService.saveMode.next(false);
        this.profileCreationService.editMode.next(true);
    }

    checkAdminRole(userId) {
        this.userService.getRoasterProfile(userId).subscribe((res: any) => {
            console.log('check admin role: ', res);
            if (res.success) {
                this.isAdminRole = res.result.has_system_role;
            }
        });
    }

    initialForm() {
        this.subProfileForm = this.fb.group({
            company_name: ['', Validators.compose([Validators.required])],
            website: [''],
        });
        this.subProfileForm.valueChanges.subscribe((changedData: any) => {
            this.profileCreationService.mainSubFormInvalid = this.subProfileForm.invalid;
            this.profileCreationService.editProfileData(changedData);
        });
    }

    detectMode() {
        this.profileCreationService.saveMode$.subscribe((res: boolean) => {
            this.isSaveMode = res;
            if (res) {
                this.setFormValue();
            } else {
                this.profileCreationService.bannerFile = null;
                this.profileCreationService.bannerUrl = '';
            }
        });
        this.profileCreationService.editMode$.subscribe((res: boolean) => {
            this.isEditMode = res;
        });
    }

    setFormValue() {
        this.subProfileForm.controls.company_name.setValue(
            this.profileCreationService.roasteryProfileData.company_name,
        );
        this.subProfileForm.controls.website.setValue(this.profileCreationService.roasteryProfileData.website);
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
                    this.profileCreationService.avatarImageChanged.next(e);
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
