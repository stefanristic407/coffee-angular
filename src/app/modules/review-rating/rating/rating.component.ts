import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService, RoasterserviceService, UserserviceService } from '@services';
import { OrganizationType, OrderType, OrderStatus } from '@enums';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
    roasterId: any;
    orgType: OrganizationType;
    orgId: number;
    orderId: number;
    orderType: OrderType;
    orderStatus: OrderStatus;
    orgName: string;
    companyImg: string;
    rating: number;
    country: string;
    submitted = false;
    infoForm: FormGroup;
    review: any;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public globals: GlobalsService,
        public roasterSrv: RoasterserviceService,
        public userSrv: UserserviceService,
        public cookieService: CookieService,
        private toastrService: ToastrService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.route.paramMap.subscribe((params) => {
            if (params.has('orgType') && params.has('orderId')) {
                this.orgType = params.get('orgType') as OrganizationType;
                this.orderId = +params.get('orderId');
                this.getData();
                this.getReview();
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
                if (this.orgType === OrganizationType.ESTATE) {
                    this.orgId = res.result.estate_id;
                    this.orgName = res.result.estate_name;
                    this.orderType = res.result.order_type;
                    this.orderStatus = res.result.status;
                    this.getEstate(res.result.estate_id);
                } else if (this.orgType === OrganizationType.MICRO_ROASTER) {
                    this.orgId = res.result.micro_roaster_id;
                    this.orgName = res.result.micro_roaster_name;
                    this.orderType = res.result.type;
                    this.orderStatus = res.result.status;
                    this.getMicroRoaster(res.result.micro_roaster_id);
                }
            } else {
                this.router.navigateByUrl('/');
            }
        });
    }

    getEstate(estateId) {
        this.userSrv.getAvailableEstateList(this.roasterId, estateId).subscribe((res: any) => {
            if (res.success) {
                this.companyImg = res.result.company_image_thumbnail_url;
                this.rating = res.result.rating;
                this.country = res.result.country;
            }
        });
    }

    getMicroRoaster(estateId) {
        this.userSrv.getMicroDetails(this.roasterId, estateId).subscribe((res: any) => {
            if (res.success) {
                this.companyImg = res.result.company_image_thumbnail_url;
                this.rating = res.result.rating;
                this.country = res.result.country;
            }
        });
    }

    getReview() {
        let queryIdStr = '';
        if (this.orgType === OrganizationType.ESTATE) {
            queryIdStr = 'gc_order_id';
        } else if (this.orgType === OrganizationType.MICRO_ROASTER) {
            queryIdStr = 'mr_gc_order_id';
        }
        this.roasterSrv.getRoasterReviews(this.roasterId, { [queryIdStr]: this.orderId }).subscribe((res: any) => {
            if (res.success) {
                if (res.result && res.result[0]) {
                    this.review = res.result[0];
                    this.infoForm.patchValue(this.review);
                    this.infoForm.get('review').setValue(this.review.comment);
                }
            }
        });
    }

    submitRating() {
        if (this.infoForm.valid) {
            this.submitted = true;
            this.userSrv
                .addReviewOrder(this.roasterId, this.orderId, this.infoForm.value, this.orgType)
                .subscribe((res: any) => {
                    this.submitted = false;
                    if (res.success) {
                        this.review = res.result;
                        this.toastrService.success('Rate and Review of order submitted successfully');
                    } else if (!res.success) {
                        if (res.messages.order_id && res.messages.order_id.find((element) => element === 'not_found')) {
                            this.toastrService.error('Order Id not found.');
                        } else if (
                            res.messages.review &&
                            res.messages.review.find((element) => element === 'already_exists')
                        ) {
                            this.toastrService.error('Review already exists.');
                        }
                    } else {
                        this.toastrService.error('Error while submitting details');
                    }
                });
        } else {
            this.infoForm.markAllAsTouched();
        }
    }
}
