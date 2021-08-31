import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RoasteryProfileService } from './roastery-profile.service';
import { AuthService, GlobalsService, UserService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { CropperDialogComponent } from '@app/shared';
import { CroppedImage } from '@models';

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
    breadItems = [
        { label: this.globals.languageJson?.home, routerLink: '/' },
        { label: this.globals.languageJson?.roastery_profile },
    ];
    isSaveMode: boolean;
    isEditMode: boolean;

    subProfileForm: FormGroup;
    roasterId: number;
    isAdminRole = false;

    constructor(
        private authService: AuthService,
        private dialogService: DialogService,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private userService: UserService,
        public cookieService: CookieService,
        public globals: GlobalsService,
        public roasteryProfileService: RoasteryProfileService,
    ) {}

    ngOnInit(): void {
        this.detectMode();
        this.initialForm();
        this.roasterId = this.authService.getOrgId();
        this.checkAdminRole();
    }

    ngOnDestroy() {
        this.roasteryProfileService.saveMode.next(false);
        this.roasteryProfileService.editMode.next(true);
    }

    checkAdminRole() {
        this.userService.getUserDetail().subscribe((res: any) => {
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
        this.roasteryProfileService.subProfileForm = this.subProfileForm;

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
        this.subProfileForm.patchValue(this.roasteryProfileService.toUpdateProfileData);
    }

    handleFile(event) {
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
                    this.roasteryProfileService.orgImgPrevUrl = data.croppedImgUrl;
                    this.roasteryProfileService.orgImgCroppedFile = data.croppedImgFile;
                }
            });
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
