import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService, UserserviceService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MicroProfileService } from './micro-profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-micro-profile',
    templateUrl: './micro-profile.component.html',
    styleUrls: ['./micro-profile.component.scss'],
})
export class MicroProfileComponent implements OnInit, OnDestroy {
    menuItems = [
        {
            label: 'about_micro_roastery',
            routerLink: '/profile-creation/about-micro-roastery',
        },
        { label: 'virtual_tour', routerLink: '/profile-creation/virtual-tour' },
        { label: 'contact', routerLink: '/profile-creation/contact' },
        { label: 'reviews', routerLink: '/profile-creation/reviews' },
    ];
    breadItems = [{ label: 'home', routerLink: '/' }, { label: 'Roastery Profile' }];
    isSaveMode: boolean;
    isEditMode: boolean;

    subProfileForm: FormGroup;
    isShowAvatarModal: boolean;
    isAdminRole = false;
    microRoasterId: string;
    tabIndex: number;

    constructor(
        public profileCreationService: MicroProfileService,
        public globals: GlobalsService,
        public cookieService: CookieService,
        private route: ActivatedRoute,
    ) {
        this.tabIndex = 0;
    }

    ngOnInit(): void {
        this.microRoasterId = this.route.snapshot.params?.id || '';

        this.profileCreationService.roasterProfile(this.microRoasterId);
        console.log(
            'profileCreationService.roasteryProfileData?.banner_url',
            this.profileCreationService.roasteryProfileData?.banner_url,
        );
    }

    ngOnDestroy() {}
}
