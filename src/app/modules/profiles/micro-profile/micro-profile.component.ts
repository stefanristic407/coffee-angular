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
    breadItems = [{ label: 'home', routerLink: '/' }, { label: 'Micro Roastery Profile' }];
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