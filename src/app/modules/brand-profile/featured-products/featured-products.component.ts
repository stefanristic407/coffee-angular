import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GlobalsService, RoasterserviceService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import * as _ from 'underscore';

@Component({
    selector: 'app-featured-products',
    templateUrl: './featured-products.component.html',
    styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {
    roasterId: number;
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
        public userService: UserService,
        public router: Router,
        public roasterService: RoasterserviceService,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
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
        this.roasterService.getDefaultProducts(this.roasterId, query).subscribe((res: any) => {
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
        const sortPriorities = _.chain(this.productIds)
            .map((item, index) => {
                return { product_id: item, sort_priority: index + 1 };
            })
            .value();
        this.roasterService
            .updateFeatured(this.roasterId, { featured_products: sortPriorities })
            .subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Featured products updated successfully');
                    this.router.navigateByUrl('/brand-profile/home-page');
                } else {
                    this.toastrService.error('Error while updating featured products');
                }
            });
    }
}
