import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProfilePhotoService } from '@services';
import { RoasteryProfileService } from '@services';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-profile-creation',
    templateUrl: './profile-creation.component.html',
    styleUrls: ['./profile-creation.component.scss'],
})
export class ProfileCreationComponent implements OnInit {
    @ViewChild('image', { static: true }) image;
    roasteryActive: any = 0;
    menuItems: any[];
    items = [{ label: 'Home', routerLink: '/' }, { label: 'Roaster Profile' }];

    constructor(
        private router: Router,
        private toastrService: ToastrService,
        public profilePhotoService: ProfilePhotoService,
        public roasteryProfileService: RoasteryProfileService,
        public globals: GlobalsService,
    ) {}

    ngOnInit(): void {
        this.language();
    }

    language() {
        this.roasteryActive++;
        this.menuItems = [
            {
                label: this.globals.languageJson?.about_roastery,
                routerLink: '/roastery-profile/about_roastery',
            },
            { label: this.globals.languageJson?.virtual_tour, routerLink: '/roastery-profile/virtual_tour' },
            { label: this.globals.languageJson?.contact, routerLink: '/roastery-profile/contact' },
            { label: this.globals.languageJson?.reviews, routerLink: '/roastery-profile/reviews' },
        ];
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
