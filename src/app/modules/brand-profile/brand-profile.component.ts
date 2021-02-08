import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

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

    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/features/welcome-aboard' },
            { label: this.globals.languageJson?.brand_profile },
        ];
    }
}
