import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService, GlobalsService, RoasterserviceService, UserService } from '@services';
import { OrganizationType, OrderType, OrderStatus } from '@enums';

@Component({
    selector: 'app-review-ratings',
    templateUrl: './review-ratings.component.html',
    styleUrls: ['./review-ratings.component.scss'],
})
export class ReviewRatingsComponent implements OnInit {
    roasterId: any;
    orgType: OrganizationType;
    orgId: number;
    ownerName: string;
    orderId: number;
    orderType: OrderType;
    orderStatus: OrderStatus;
    summary: any;
    average: any;
    reviews: any[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public cookieService: CookieService,
        public globals: GlobalsService,
        public roasterSrv: RoasterserviceService,
        public userSrv: UserService,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
        this.route.paramMap.subscribe((params) => {
            if (params.has('orgType') && params.has('orderId')) {
                this.orgType = params.get('orgType') as OrganizationType;
                this.orderId = +params.get('orderId');
                this.getData();
            }
        });
    }

    ngOnInit(): void {}

    getData() {
        this.roasterSrv.getViewOrderDetails(this.roasterId, this.orderId, this.orgType).subscribe((res: any) => {
            if (res.success) {
                if (this.orgType === OrganizationType.ESTATE) {
                    this.orgId = res.result.estate_id;
                    this.ownerName = res.result.estate_owner;
                    this.orderType = res.result.order_type;
                    this.orderStatus = res.result.status;
                } else if (this.orgType === OrganizationType.MICRO_ROASTER) {
                    this.orgId = res.result.micro_roaster_id;
                    this.ownerName = res.result.micro_roaster_name;
                    this.orderType = res.result.type;
                    this.orderStatus = res.result.status;
                }
                this.getReviews();
            } else {
                this.router.navigateByUrl('/');
            }
        });
    }

    getReviews() {
        console.log();
        this.userSrv.getReviewsSummary(this.orgId, this.orgType).subscribe((res: any) => {
            if (res.success) {
                this.summary = res.result.summary;
                this.average = res.result.average;
            }
        });
        this.userSrv.getReviews(this.orgId, this.orgType).subscribe((res: any) => {
            if (res.success) {
                this.reviews = res.result;
            }
        });
    }
}
