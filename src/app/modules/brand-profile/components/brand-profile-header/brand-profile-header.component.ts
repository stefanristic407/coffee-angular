import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService, GlobalsService } from '@services';

@Component({
    selector: 'app-brand-profile-header',
    templateUrl: './brand-profile-header.component.html',
    styleUrls: ['./brand-profile-header.component.scss'],
})
export class BrandProfileHeaderComponent implements OnInit {
    @Input() pageSlug: string;
    @Output() saveClick = new EventEmitter();
    breadItems: any[];
    roasterSlug: string;
    orgId: number;
    desp: any = {
        'home-page': 'Add details according to respective sections to create your brand profile website',
        'about-us': 'Add details according to respective sections to create your brand profile website',
        learn: 'Add details about your roastery.',
        sustainability: 'Add details about your sustainability practices.',
        'visit-us': 'Add details according to respective sections to create your brand profile website',
    };

    constructor(
        private cookieService: CookieService,
        public globals: GlobalsService,
        private authService: AuthService,
    ) {
        this.roasterSlug = this.authService.currentOrganization.slug;
        this.orgId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            { label: this.globals.languageJson?.brand_experience },
            { label: this.globals.languageJson?.brand_profile, routerLink: '/brand-profile' },
            { label: this.globals.languageJson[this.pageSlug.replace('-', '_')] || this.pageSlug },
        ];
    }

    savePageData() {
        this.saveClick.emit();
    }
}
