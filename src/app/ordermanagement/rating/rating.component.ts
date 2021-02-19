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
    orgType: OrgType;
    orderId: string;
    ownerName: string;
    companyImg: string;
    rating: number;
    country: string;
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
                this.orgType = params.get('orgType') as OrgType;
                this.orderId = params.get('orderId');
                console.log(this.orgType, this.orderId);
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
                    this.getEstate(res.result.estate_id);
                } else if (this.orgType === OrgType.MICRO_ROASTER) {
                    this.getMicroRoaster(res.result.micro_roaster_id);
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
                this.ownerName = res.result.owner_name;
                this.companyImg = res.result.company_image_thumbnail_url;
                this.rating = res.result.rating;
                this.country = res.result.country;
            }
        });
    }

    getMicroRoaster(estateId) {
        this.userService.getMicroDetails(this.roasterId, estateId).subscribe((res: any) => {
            if (res.success) {
                this.ownerName = res.result.owner_name;
                this.companyImg = res.result.company_image_thumbnail_url;
                this.rating = res.result.rating;
                this.country = res.result.country;
            }
        });
    }

    submitRating() {
        if (this.infoForm.valid) {
            this.submitted = true;
            let request;
            if (this.orgType === OrgType.ESTATE) {
                request = this.userService.addReviewOrder(this.roasterId, this.orderId, this.infoForm.value);
            } else if (this.orgType === OrgType.MICRO_ROASTER) {
                request = this.userService.addMrReviewOrder(this.roasterId, this.orderId, this.infoForm.value);
            }
            request.subscribe((res: any) => {
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
