import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { WelcomeService } from './welcome.service';

@Component({
    selector: 'app-welcome-aboard',
    templateUrl: './welcome-aboard.component.html',
    styleUrls: ['./welcome-aboard.component.scss'],
})
export class WelcomeAboardComponent implements OnInit {
    appLanguage?: any;
    welcomeActive: any = 0;
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

        $('.nav-links__item').removeClass('active');
        $('.nav-links__item').eq(0).addClass('active');
        this.appLanguage = this.globals.languageJson;

        const promises = [];
        promises.push(new Promise((resolve) => this.getStats(resolve)));
        promises.push(new Promise((resolve) => this.getAvailableEstates(resolve)));
        promises.push(new Promise((resolve) => this.getReviewsSummary(resolve)));
        Promise.all(promises).then(() => {
            this.welcomeActive++;
        });

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
        this.roasterSrv.getEstateOrders(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.welcomeSrv.orders.next(res.result);
            } else {
                this.toastrService.error('Error while getting orders');
            }
        });
    }
}
