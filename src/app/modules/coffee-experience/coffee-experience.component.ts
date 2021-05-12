import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalsService, RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { SourcingService } from '../sourcing/sourcing.service';

@Component({
    selector: 'app-coffee-experience',
    templateUrl: './coffee-experience.component.html',
    styleUrls: ['./coffee-experience.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CoffeeExperienceComponent implements OnInit {
    items = [
        { label: 'Home', routerLink: '/features/welcome-aboard' },
        { label: 'Brand & Experience' },
        { label: 'The Coffee Experience' },
    ];
    queryParams: any;
    rows = 15;
    pageNumber = 1;
    totalRecords;
    searchTerm: any;
    customerType = 'estate';
    coffeeExperienceData: any;
    roasterId: string;
    params: any;

    constructor(
        public globals: GlobalsService,
        public cookieService: CookieService,
        private coffeeExperienceOrders: RoasterserviceService,
        private toastrService: ToastrService,
        public sourcingSrv: SourcingService,
    ) {}

    ngOnInit(): void {
        this.roasterId = this.cookieService.get('roaster_id');
        this.getEstateOrders();
    }

    onTabChange(event) {
        if (event.index === 0) {
            this.customerType = 'estate';
            this.getEstateOrders();
        } else if (event.index === 1) {
            this.customerType = 'micro-roasters';
            this.getEstateOrders();
        } else if (event.index === 2) {
            this.customerType = 'hrc';
            this.getEstateOrders();
        }
    }

    getEstateOrders() {
        if (this.customerType === 'hrc') {
            this.params = {
                page: this.pageNumber,
                per_page: this.rows,
                status: 'DELIVERED',
            };
        } else {
            this.params = {
                page: this.pageNumber,
                per_page: this.rows,
                status: 'RECEIVED',
            };
        }
        this.coffeeExperienceData = [];
        this.coffeeExperienceOrders
            .getCoffeeExperienceOrders(this.roasterId, this.customerType, this.params)
            .subscribe((res: any) => {
                if (res.success) {
                    this.coffeeExperienceData = res.result;
                    this.totalRecords = res.result_info.total_count;
                } else {
                    this.toastrService.error('Error while getting orders');
                }
            });
    }
    getData(event) {
        if (event.page > -1) {
            this.pageNumber = event.page + 1;
        }
        this.getEstateOrders();
    }
}
