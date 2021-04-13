import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService } from '@services';
import { UserserviceService } from '@services';
import { SourcingService } from '../sourcing.service';

@Component({
    selector: 'app-estate-list',
    templateUrl: './estate-list.component.html',
    styleUrls: ['./estate-list.component.scss'],
})
export class EstateListComponent implements OnInit, OnDestroy {
    isLoaded = false;
    roasterId: any;
    estateData: any[] = [];
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
            this.getAvailableEstates();
        });
    }

    ngOnDestroy() {
        this.queryParamsSub.unsubscribe();
    }

    getAvailableEstates() {
        const query = [];
        this.queryParams = {
            ...this.queryParams,
            page: this.pageNumber,
            per_page: this.rows,
        };
        Object.entries(this.queryParams).forEach(([key, value]) => {
            this.queryParams[key] = value || '';
            if (value) {
                query.push(`${key}=${value}`);
            }
        });
        const queryStr = '?' + query.join('&');
        this.isLoaded = false;
        this.userService.getAvailableEstates(this.roasterId, queryStr).subscribe((res: any) => {
            this.isLoaded = true;
            if (res.success) {
                this.estateData = res.result;
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
