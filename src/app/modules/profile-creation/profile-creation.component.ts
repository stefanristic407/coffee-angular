import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfilePhotoService } from './profile-photo/profile-photo.service';
import { RoasteryProfileService } from './roastery-profile.service';
import { GlobalsService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile-creation',
    templateUrl: './profile-creation.component.html',
    styleUrls: ['./profile-creation.component.scss'],
})
export class ProfileCreationComponent implements OnInit {
    @ViewChild('image', { static: true }) image;
    menuItems = [
        {
            label: 'about_roastery',
            routerLink: '/roastery-profile/about_roastery',
        },
        { label: 'virtual_tour', routerLink: '/roastery-profile/virtual_tour' },
        { label: 'contact', routerLink: '/roastery-profile/contact' },
        { label: 'reviews', routerLink: '/roastery-profile/reviews' },
    ];
    breadItems = [{ label: 'home', routerLink: '/' }, { label: 'roaster_profile' }];
    isSaveMode: boolean;
    isEditMode: boolean;

    subProfileForm: FormGroup;

    constructor(
        private toastrService: ToastrService,
        public profilePhotoService: ProfilePhotoService,
        public roasteryProfileService: RoasteryProfileService,
        public globals: GlobalsService,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.detectMode();
        this.initialForm();
    }

    initialForm() {
        this.subProfileForm = this.fb.group({
            company_name: ['', Validators.compose([Validators.required])],
            website: [''],
        });
    }

    detectMode() {
        this.roasteryProfileService.saveMode$.subscribe((res: boolean) => {
            this.isSaveMode = res;
            if (res) {
                this.setFormValue();
            }
        });
        this.roasteryProfileService.editMode$.subscribe((res: boolean) => {
            this.isEditMode = res;
        });
    }

    setFormValue() {
        this.subProfileForm.controls.company_name.setValue(
            this.roasteryProfileService.roasteryProfileData.company_name,
        );
        this.subProfileForm.controls.website.setValue(this.roasteryProfileService.roasteryProfileData.website);
    }

    //  Function Name : Profile Image function.
    //  Description   : This function helps to trigger click event of upload image.
    showModalDialog() {
        this.image.nativeElement.click();
    }
    //  Function Name : Handle Profile File function.
    //  Description   : This function helps To open file explorer,after selecting image it will open Image Cropper Modal.
    handleFile(e) {
        if (e.target.files.length > 0) {
            for (let i = 0; i <= e.target.files.length - 1; i++) {
                const fsize = e.target.files.item(i).size;
                const file = Math.round(fsize / 1024);
                // The size of the file.
                if (file >= 2048) {
                    // alert("file is big")
                    this.toastrService.error('File too big, please select a file smaller than 2mb');
                    this.profilePhotoService.displayModal = false;
                } else {
                    this.profilePhotoService.displayModal = true;
                    this.profilePhotoService.imageChangedEvent = e;
                }
            }
        }
    }

    //  Function Name : Close Profile Modal.
    //  Description   : This function helps to close profile Image Cropper modal.
    closeProfileModal() {
        this.profilePhotoService.croppedImage = 'assets/images/oval.svg';
        this.profilePhotoService.displayModal = false;
    }
}
