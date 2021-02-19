import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from '@services';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { UserserviceService } from '@services';
import { OrgType } from '@models';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
    roasterId: any;
    orgType: string;
    orderId: string;
    ownerName: string;
    companyImg: string;
    rating: number;
    country: string;
    lastLoginAt: Date;
    submitted = false;

    infoForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private formSrv: FormService,
        private route: ActivatedRoute,
        private router: Router,
        public globals: GlobalsService,
        public roasterSrv: RoasterserviceService,
        public userService: UserserviceService,
        public cookieService: CookieService,
        private toastrService: ToastrService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.route.paramMap.subscribe((params) => {
            if (params.has('orgType') && params.has('orderId')) {
                this.orgType = params.get('orgType');
                this.orderId = params.get('orderId');
                this.getData();
            }
        });
    }

    ngOnInit(): void {
        this.infoForm = this.fb.group({
            overall_experience: [null, Validators.compose([Validators.required])],
            communication: [null, Validators.compose([Validators.required])],
            green_coffee: [null, Validators.compose([Validators.required])],
            review: ['', Validators.compose([Validators.required])],
        });
    }

    getData() {
        this.roasterSrv.getViewOrderDetails(this.roasterId, this.orderId, this.orgType).subscribe((res: any) => {
            if (res.success) {
                if (this.orgType === OrgType.ESTATE) {
                    console.log('Order detail:', res.result);
                    this.getEstate(res.result.estate_id);
                } else if (this.orgType === OrgType.MICRO_ROASTER) {
                    console.log('MR');
                }
            } else {
                this.router.navigateByUrl('/');
            }
        });
    }

    getEstate(estateId) {
        console.log('this.getEstate');
        this.userService.getAvailableEstateList(this.roasterId, estateId).subscribe((res: any) => {
            if (res.success) {
                console.log(res.result);
                this.ownerName = res.result.owner_name;
                this.companyImg = res.result.company_image_thumbnail_url;
                this.rating = res.result.rating;
                this.country = res.result.country;
                this.lastLoginAt = new Date(res.result.last_login_at);
            }
        });
    }

    submitRating() {
        if (this.infoForm.valid) {
            this.submitted = true;
            this.userService.addReviewOrder(this.roasterId, this.orderId, this.infoForm.value).subscribe((res: any) => {
                this.submitted = false;
                if (res.success) {
                    this.toastrService.success('Rate and Review of order submitted successfully');
                } else if (!res.success) {
                    if (res.messages.order_id === 'not_found') {
                        this.toastrService.error('Order Id not found.');
                    } else if (res.messages.review.find((element) => element === 'already_exists')) {
                        this.toastrService.error('Review already exists.');
                    }
                } else {
                    this.toastrService.error('Error while submitting details');
                }
            });
        } else {
            this.formSrv.markGroupDirty(this.infoForm);
        }
    }
}
