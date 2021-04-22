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
        public profileCreationService: MicroProfileService,
        public globals: GlobalsService,
        public cookieService: CookieService,
    ) {}

    ngOnInit(): void {
        this.microRoasterId = '7';
        console.log(
            'profileCreationService.roasteryProfileData?.banner_url',
            this.profileCreationService.roasteryProfileData?.banner_url,
        );
    }

    ngOnDestroy() {}
}
