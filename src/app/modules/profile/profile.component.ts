import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationType } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, ChatHandlerService, UserService } from '@services';
import { MenuItem } from 'primeng/api';
import { ProfileService } from './profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    menuItems: MenuItem[];
    breadItems = [
        { label: this.translator.instant('home'), routerLink: '/' },
        { label: this.translator.instant('profile') },
    ];

    constructor(
        private chatHandler: ChatHandlerService,
        private route: ActivatedRoute,
        private router: Router,
        private translator: TranslateService,
        private userService: UserService,
        public profileService: ProfileService,
    ) {}

    ngOnInit(): void {
        this.profileService.clearData();
        this.route.paramMap.subscribe((params) => {
            if (params.has('orgType') && params.has('orgId')) {
                this.profileService.orgType = params.get('orgType') as OrganizationType;
                this.profileService.orgId = +params.get('orgId');

                this.makeTabs();
                this.profileService.getProfile();
            } else {
                this.router.navigate(['/']);
            }
        });
    }

    makeTabs() {
        this.menuItems = [
            { label: `about_${this.profileService.orgType}`, routerLink: './about' },
            { label: 'virtual_tour', routerLink: './virtual_tour' },
            { label: 'contact', routerLink: './contact' },
            this.profileService.orgType !== OrganizationType.HORECA
                ? { label: 'reviews', routerLink: './reviews' }
                : null,
        ].filter(Boolean);
    }

    openChat(): void {
        this.chatHandler.openChatThread({
            user_id: this.profileService.organizationProfile.admin_id,
            org_type: this.profileService.orgType,
            org_id: this.profileService.orgId,
        });
    }
}
