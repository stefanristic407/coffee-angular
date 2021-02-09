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
    queryParamsSub: Subscription;

    constructor(
        public sourcingSrv: SourcingService,
        public globals: GlobalsService,
        private userService: UserserviceService,
        private cookieService: CookieService,
    ) {}

    ngOnInit(): void {
        this.roasterId = this.cookieService.get('roaster_id');
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
            }
        });
    }

    filter() {}
}
