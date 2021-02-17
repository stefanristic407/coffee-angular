import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService } from '@services';

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
    desp: any = {
        'home-page': 'Add details according to respective sections to create your brand profile website',
        'about-us': 'Add details according to respective sections to create your brand profile website',
        learn: 'Add details about your estate to give yours a view.',
        sustainability: 'Add details about your estate to give yours a view.',
        'visit-us': 'Add details according to respective sections to create your brand profile website',
    };

    constructor(private cookieService: CookieService, public globals: GlobalsService) {
        this.roasterSlug = this.cookieService.get('roasterSlug');
    }

    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/features/welcome-aboard' },
            { label: this.globals.languageJson?.brand_profile, routerLink: '/brand-profile' },
            { label: this.globals.languageJson[this.pageSlug] || this.pageSlug },
        ];
    }

    savePageData() {
        this.saveClick.emit();
    }
}
