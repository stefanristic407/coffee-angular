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

        this.userService.getAvailableEstates(this.roasterId, queryStr).subscribe((res: any) => {
            if (res.success) {
                this.estateData = res.result;
                this.estateData.forEach((element) => {
                    element.certificates = this.getCertificateData(element.certificates);
                });
                console.error(this.estateData);
            }
        });
    }

    filter() {}

    getCertificateData(data) {
        if (data && data.length) {
            data.forEach((element) => {
                element.image_url = this.sourcingSrv.finalCertify.find((item) => item.id === element.type_id).image_url;
            });
            return data;
        } else {
            return [];
        }
    }

    GetMonthName(month: number) {
        let monthName;
        switch (month) {
            case 1:
                monthName = 'Jan';
                break;
            case 2:
                monthName = 'Feb';
                break;

            case 3:
                monthName = 'Mar';
                break;

            case 4:
                monthName = 'Apr';
                break;
            case 5:
                monthName = 'May';
                break;
            case 6:
                monthName = 'Jun';
                break;
            case 7:
                monthName = 'Jul';
                break;
            case 8:
                monthName = 'Aug';
                break;
            case 9:
                monthName = 'Sept';
                break;
            case 10:
                monthName = 'Oct';
                break;
            case 11:
                monthName = 'Nov';
                break;
            case 12:
                monthName = 'Dec';
                break;
            default:
                monthName = '';
                break;
        }
        return monthName;
    }
}
