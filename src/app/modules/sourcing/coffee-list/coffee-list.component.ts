import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService } from '@services';
import { SourcingService } from '../sourcing.service';
import { UserserviceService } from '@services';
import { CURRENCY_LIST } from '@constants';

@Component({
    selector: 'app-coffee-list',
    templateUrl: './coffee-list.component.html',
    styleUrls: ['./coffee-list.component.scss'],
})
export class CoffeeListComponent implements OnInit, OnDestroy {
    public readonly CURRENCY_LIST = CURRENCY_LIST;
    isLoaded = false;
    roasterId: any;
    coffeedata: any[] = [];
    queryParams: any;
    rows = 15;
    pageNumber = 1;
    totalRecords;
    queryParamsSub: Subscription;

    constructor(
        public sourcingSrv: SourcingService,
        public globals: GlobalsService,
        private userService: UserserviceService,
        private cookieService: CookieService,
    ) {}

    ngOnInit(): void {
        this.roasterId = this.cookieService.get('roaster_id');
        this.sourcingSrv.clearQueryParams();
        this.queryParamsSub = this.sourcingSrv.queryParams$.subscribe((res: any) => {
            this.queryParams = res;
            this.getAvailableCoffee();
        });
    }

    ngOnDestroy() {
        this.queryParamsSub.unsubscribe();
    }

    getAvailableCoffee() {
        const query = [];
        this.queryParams = {
            ...this.queryParams,
            page: this.pageNumber,
            per_page: this.rows,
        };
        Object.entries(this.queryParams).forEach(([key, value]) => {
            if (value) {
                if (key === 'grade') {
                    query.push(`cup_score_min=${value[0]}`);
                    query.push(`cup_score_max=${value[1] || ''}`);
                } else {
                    query.push(`${key}=${value}`);
                }
            }
        });
        const queryStr = '?' + query.join('&');
        this.isLoaded = false;
        this.userService.getAvailableGreenCoffee(this.roasterId, queryStr).subscribe((res: any) => {
            this.isLoaded = true;
            if (res.success) {
                this.coffeedata = res.result;
                this.totalRecords = res.result_info.total_count;
            }
        });
    }

    getData(event) {
        if (event.page > -1) {
            this.pageNumber = event.page + 1;
        }
        setTimeout(() => {
            if (event.sortField) {
                this.queryParams = {
                    ...this.queryParams,
                    sort_by: event.sortField,
                    sort_order: event.sortOrder === -1 ? 'desc' : 'asc',
                };
            }
            this.sourcingSrv.queryParams.next({
                ...this.queryParams,
            });
        });
    }
}
