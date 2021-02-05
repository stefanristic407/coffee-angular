import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '@services';
import { GlobalsService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import * as _ from 'underscore';

@Component({
    selector: 'app-featured-products',
    templateUrl: './featured-products.component.html',
    styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {
    roasterId: string;
    originItems: any[] = [
        { label: 'Sweden', value: 'se' },
        { label: 'India', value: 'IN' },
    ];
    products: any[];
    productIds: number[] = [];
    queryParams: any = {};

    constructor(
        public globals: GlobalsService,
        private toastrService: ToastrService,
        public cookieService: CookieService,
        public userService: UserserviceService,
        public router: Router,
        public roasterService: RoasterserviceService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        const query = [];
        Object.entries(this.queryParams).forEach(([key, value]) => {
            this.queryParams[key] = value || '';
            if (value) {
                query.push(`${key}=${value}`);
            }
        });
        const queryStr = '?' + query.join('&');
        this.roasterService.getSelectProductDetails(this.roasterId, queryStr).subscribe((res: any) => {
            if (res.success) {
                this.products = res.result;
                this.productIds = _.pluck(
                    this.products.filter((element) => element.is_featured),
                    'id',
                );
            }
        });
    }

    filterCall() {
        console.log(this.queryParams);
        this.getProducts();
    }

    clickProduct(item) {
        if (item.is_featured) {
            this.productIds.push(item.id);
        } else {
            const idx = this.productIds.findIndex((element) => element === item.id);
            if (idx > -1) {
                this.productIds.splice(idx, 1);
            }
        }
    }

    save() {
        this.roasterService.updateFeatured(this.roasterId, this.productIds).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('Featured products updated successfully');
                this.router.navigateByUrl('/brand-profile/home-page');
            } else {
                this.toastrService.error('Error while updating featured products');
            }
        });
    }
}
