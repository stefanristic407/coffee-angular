import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@services';

@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
    cookieAndPrivacy = false;
    legalEntity = false;
    dataProcessingAgreement = false;
    generalTermsUser = false;
    type: string;
    documents: any = {
        cookie: 'https://support.eraofwe.com/en/kb/articles/cookie-policy',
        privacy: 'https://support.eraofwe.com/en/kb/articles/privacy-policy',
        legalEntity: 'https://support.eraofwe.com/en/kb/articles/general-terms-conditions-legal-entity',
        dataProcessing: 'https://support.eraofwe.com/en/kb/articles/data-processing-agreement',
        generalTermsUser: 'https://support.eraofwe.com/en/kb/articles/general-terms-conditions-user',
    };
    constructor(
        private router: Router,
        public toastrService: ToastrService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
    }

    public next() {
        if (this.type === 'org') {
            if (!this.cookieAndPrivacy || !this.legalEntity || !this.dataProcessingAgreement) {
                this.toastrService.error('Please accept the terms and conditions');
            } else {
                const data = {
                    privacy_policy: this.cookieAndPrivacy,
                    cookie_policy: this.cookieAndPrivacy,
                    legal_entity: this.legalEntity,
                    data_processing: this.dataProcessingAgreement,
                };
                this.userService.updateOrganizationPrivacyTerms(data).subscribe((res) => {
                    if (res.success) {
                        this.type = 'user';
                        this.cookieAndPrivacy = false;
                    } else {
                        this.toastrService.error('Error in accepting privacy terms. Please try again');
                    }
                });
            }
        } else {
            if (!this.cookieAndPrivacy || !this.generalTermsUser) {
                this.toastrService.error('Please accept the terms and conditions');
            } else {
                const data = {
                    cookie_policy: this.cookieAndPrivacy,
                    privacy_policy: this.cookieAndPrivacy,
                    general_terms: this.generalTermsUser,
                };
                this.userService.updatePrivacyTerms(data).subscribe((res: any) => {
                    if (res.success) {
                        this.toastrService.success('Privacy terms accepted.');
                        this.router.navigate(['/']);
                    } else {
                        this.toastrService.error('Error in accepting privacy terms. Please try again');
                    }
                });
            }
        }
    }

    viewDocument(type) {
        window.open(this.documents[type], '_blank');
    }
}
