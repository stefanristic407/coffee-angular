import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
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
            title: 'Home Page',
            desp: 'This is your company’s main landing page, use interesting content to bring in your user',
            slug: 'home-page',
        },
        {
            title: 'About Us',
            desp: 'Write about your origin, who you are and what makes your company special',
            slug: 'about-us',
        },
        {
            title: 'Learn',
            desp: 'Share facts about your coffee vairety, lots coffee making techinques',
            slug: 'learn',
        },
        {
            title: 'Sustainability',
            desp: 'Tell you users about your social responsibility and sustainability practices',
            slug: 'sustainability',
        },
        {
            title: 'Blog',
            desp: 'Add images and videos of your estate to give the user a whole experience',
            slug: 'blog',
        },
        {
            title: 'Visit Us',
            desp: 'Add your contact details and basic FAQs of your estate',
            slug: 'visit-us',
        },
    ];
    roasterId: string;
    roasterSlug: string;
    slug;

    constructor(
        private toastrService: ToastrService,
        public globals: GlobalsService,
        private cookieService: CookieService,
        private roasterSrv: RoasterserviceService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.roasterSlug = this.cookieService.get('roasterSlug');
        this.slug = this.roasterSlug;
    }

    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/features/welcome-aboard' },
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
