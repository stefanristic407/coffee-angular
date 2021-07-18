import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService, GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    infoForm: FormGroup;

    constructor(
        private toastrService: ToastrService,
        public globals: GlobalsService,
        private cookieService: CookieService,
        private roasterSrv: RoasterserviceService,
        private authService: AuthService,
        private fb: FormBuilder,
    ) {
        this.roasterId = this.authService.getOrgId();
        // this.roasterSlug = this.authService.currentOrganization.slug;
    }

    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            { label: this.globals.languageJson?.brand_experience },
            { label: this.globals.languageJson?.brand_profile },
        ];
        this.infoForm = this.fb.group({
            slug: [this.roasterSlug, [Validators.required, Validators.pattern(/^[a-z_-]+$/)]],
        });
    }

    updateSlug() {
        if (this.infoForm.valid) {
            this.roasterSrv.updateRoasterSlug(this.roasterId, this.infoForm.value.slug).subscribe((res: any) => {
                if (res.success) {
                    this.authService.organizationSubject.next({
                        ...this.authService.currentOrganization,
                        slug: this.infoForm.value.slug,
                    });
                    this.roasterSlug = this.infoForm.value.slug;
                    this.toastrService.success('Slug updated successfully');
                } else {
                    this.toastrService.error('Error while updating slug');
                }
            });
        } else {
            console.log(this.infoForm.controls.slug);
            if (this.infoForm.controls.slug.errors?.required) {
                this.toastrService.error('Please enter slug');
            } else if (this.infoForm.controls.slug.errors?.pattern) {
                this.toastrService.error('Please enter valid slug');
            }
        }
    }
}
