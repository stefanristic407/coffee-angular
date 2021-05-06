import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { UserserviceService } from '@services';
import { RoasterserviceService } from '@services';
import { WelcomeService } from './welcome.service';

@Component({
    selector: 'app-roaster-dashboard',
    templateUrl: './roaster-dashboard.component.html',
    styleUrls: ['./roaster-dashboard.component.scss'],
})
export class RoasterDashboardComponent implements OnInit {
    appLanguage?: any;
    userName = '';
    roasterId: string;
    constructor(
        private router: Router,
        private cookieService: CookieService,
        public globals: GlobalsService,
        private userSrv: UserserviceService,
        private roasterSrv: RoasterserviceService,
        private toastrService: ToastrService,
        private welcomeSrv: WelcomeService,
    ) {}

    ngOnInit(): void {
        // Auth checking
        if (this.cookieService.get('Auth') === '') {
            this.router.navigate(['/auth/login']);
        }
        this.userName = this.cookieService.get('userName');
        this.roasterId = this.cookieService.get('roaster_id');

        this.appLanguage = this.globals.languageJson;

        const promises = [];
        promises.push(new Promise((resolve) => this.getStats(resolve)));
        promises.push(new Promise((resolve) => this.getAvailableEstates(resolve)));
        promises.push(new Promise((resolve) => this.getReviewsSummary(resolve)));
        Promise.all(promises).then(() => {});

        this.getRecentActivities();
        this.getEstateOrders();
    }

    getStats(resolve) {
        this.userSrv.getStats(this.roasterId).subscribe((res: any) => {
            console.log('get stats: ', res);
            if (res.success) {
                this.welcomeSrv.disputes.next(res.result.disputes);
                this.welcomeSrv.sales.next(res.result.sales);
                this.welcomeSrv.sourcing.next(res.result.sourcing);
                this.welcomeSrv.stock.next(res.result.stock);
                this.welcomeSrv.varieties.next(res.result.varieties);
            } else {
                this.toastrService.error('Error while getting stats');
            }
            resolve();
        });
    }

    getAvailableEstates(resolve) {
        this.userSrv.getAvailableEstates(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.welcomeSrv.estates.next(res.result);
            } else {
                this.toastrService.error('Error while getting estates');
            }
            resolve();
        });
    }

    getReviewsSummary(resolve) {
        this.userSrv.getReviewsSummary(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.welcomeSrv.reviewsSummary.next(res.result.summary);
            } else {
                this.toastrService.error('Error while getting reviews');
            }
            resolve();
        });
    }

    getRecentActivities() {
        this.userSrv.getRecentActivities(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.welcomeSrv.recentActivities.next(res.result);
            } else {
                this.toastrService.error('Error while getting recent activity');
            }
        });
    }

    getEstateOrders() {
        this.roasterSrv
            .getEstateOrders(this.roasterId, 'page=1&per_page=10&sort_by=date_received&sort_order=desc')
            .subscribe((res: any) => {
                if (res.success) {
                    this.welcomeSrv.orders.next(res.result);
                } else {
                    this.toastrService.error('Error while getting orders');
                }
            });
    }
}
