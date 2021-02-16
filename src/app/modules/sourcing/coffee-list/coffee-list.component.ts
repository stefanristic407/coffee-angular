import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService } from 'src/services/globals.service';
import { SourcingService } from '../sourcing.service';
import { UserserviceService } from 'src/services/users/userservice.service';

@Component({
    selector: 'app-coffee-list',
    templateUrl: './coffee-list.component.html',
    styleUrls: ['./coffee-list.component.scss'],
})
export class CoffeeListComponent implements OnInit, OnDestroy {
    Currencies = {
        $: 'USD',
    };
    isLoaded = false;
    roasterId: any;
    coffeedata: any[] = [];
    queryParams: any;
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
            }
        });
    }

    getData(event) {
        setTimeout(() => {
            this.sourcingSrv.queryParams.next({
                ...this.queryParams,
                sort_by: event.sortField,
                sort_order: event.sortOrder === 1 ? 'asc' : 'desc',
            });
        });
    }
}
