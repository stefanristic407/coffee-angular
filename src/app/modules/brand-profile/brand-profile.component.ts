import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService, GlobalsService } from '@services';
import { RoasterserviceService } from '@services';

@Component({
    selector: 'app-brand-profile',
    templateUrl: './brand-profile.component.html',
    styleUrls: ['./brand-profile.component.scss'],
})
export class BrandProfileComponent implements OnInit {
    breadItems: any[];
    pages: any[] = [
        {
            title: 'about_us',
            desp: 'about_us_overview',
            slug: 'about-us',
        },
        {
            title: 'learn',
            desp: 'learn_overview',
            slug: 'learn',
        },
        {
            title: 'sustainability',
            desp: 'sustainability_overview',
            slug: 'sustainability',
        },
        {
            title: 'visit_us',
            desp: 'visit_us_overview',
            slug: 'visit-us',
        },
    ];
    roasterId: number;
    roasterSlug: string;
    slug;

    constructor(
        private toastrService: ToastrService,
        public globals: GlobalsService,
        private cookieService: CookieService,
        private roasterSrv: RoasterserviceService,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
        this.roasterSlug = this.authService.currentOrganization.slug;
        this.slug = this.roasterSlug;
    }

    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            { label: this.globals.languageJson?.brand_experience },
            { label: this.globals.languageJson?.brand_profile },
        ];
    }

    updateSlug() {
        if (this.slug) {
            this.roasterSrv.updateRoasterSlug(this.roasterId, this.slug).subscribe((res: any) => {
                if (res.success) {
                    this.cookieService.set('roasterSlug', this.slug);
                    this.roasterSlug = this.slug;
                    this.toastrService.success('Slug updated successfully');
                } else {
                    this.toastrService.error('Error while updating slug');
                }
            });
        } else {
            this.toastrService.error('Please enter slug');
        }
    }
}
