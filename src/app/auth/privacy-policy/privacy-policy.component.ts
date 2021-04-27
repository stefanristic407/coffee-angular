import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from '@services';

@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
    agreeTerms = false;
    agreePolicy = false;
    accessChat = false;
    accessData = false;
    accessDetails = false;
    constructor(private router: Router, public toastrService: ToastrService, private userService: UserserviceService) {}

    ngOnInit(): void {}

    public next() {
        if (!this.accessDetails || !this.accessChat || !this.accessData || !this.agreePolicy || !this.agreeTerms) {
            this.toastrService.error('Please accept the terms and conditions');
        } else {
            const data = {
                access_account: this.accessDetails,
                access_data: this.accessData,
                access_chat: this.accessChat,
                agree_privacy: this.agreePolicy,
                agree_terms: this.agreeTerms,
            };
            this.userService.privacyTerms(data).subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Privacy terms accepted.');
                    this.router.navigate(['/features']);
                } else {
                    this.toastrService.error('Error in accepting privacy terms. Please try again');
                }
            });
        }
    }
}
