import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from '@app/shared';
import { AclService, AuthService, RoasterService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { MDashboardService } from './m-dashboard.service';

@Component({
    selector: 'app-roaster-dashboard',
    templateUrl: './roaster-dashboard.component.html',
    styleUrls: ['./roaster-dashboard.component.scss'],
})
export class RoasterDashboardComponent implements OnInit {
    roasterId: number;

    constructor(
        private aclService: AclService,
        private mDashboardSrv: MDashboardService,
        private roasterSrv: RoasterService,
        private toastrService: ToastrService,
        private userSrv: UserService,
        public authService: AuthService,
        private dialogSrv: DialogService,
    ) {}

    ngOnInit(): void {
        this.welcome();
        this.roasterId = this.authService.getOrgId();

        const promises = [];
        promises.push(new Promise((resolve) => this.getStats(resolve)));
        if (this.aclService.checkPermission('sourcing-management')) {
            promises.push(new Promise((resolve) => this.getAvailableEstates(resolve)));
            this.getEstateOrders();
        }
        promises.push(new Promise((resolve) => this.getReviewsSummary(resolve)));
        Promise.all(promises).then(() => {});

        this.getRecentActivities();
    }

    getStats(resolve) {
        this.userSrv.getStats(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.mDashboardSrv.disputes.next(res.result.disputes);
                this.mDashboardSrv.sales.next(res.result.sales);
                this.mDashboardSrv.sourcing.next(res.result.sourcing);
                this.mDashboardSrv.stock.next(res.result.stock);
                this.mDashboardSrv.varieties.next(res.result.varieties);
            } else {
                this.toastrService.error('Error while getting stats');
            }
            resolve();
        });
    }

    getAvailableEstates(resolve) {
        const params = {
            page: 1,
            per_page: 10,
            sort_by: 'created_at',
            sort_order: 'desc',
        };
        this.userSrv.getAvailableEstates(this.roasterId, params).subscribe((res: any) => {
            if (res.success) {
                this.mDashboardSrv.estates.next(res.result);
            } else {
                this.toastrService.error('Error while getting estates');
            }
            resolve();
        });
    }

    getReviewsSummary(resolve) {
        this.userSrv.getReviewsSummary(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.mDashboardSrv.reviewsSummary.next(res.result.summary);
            } else {
                this.toastrService.error('Error while getting reviews');
            }
            resolve();
        });
    }

    getRecentActivities() {
        this.userSrv.getRecentActivities(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.mDashboardSrv.recentActivities.next(res.result);
            } else {
                this.toastrService.error('Error while getting recent activity');
            }
        });
    }

    getEstateOrders() {
        const params = {
            page: 1,
            per_page: 10,
            sort_by: 'date_received',
            sort_order: 'desc',
        };
        this.roasterSrv.getEstateOrders(this.roasterId, params).subscribe((res: any) => {
            if (res.success) {
                this.mDashboardSrv.orders.next(res.result);
            } else {
                this.toastrService.error('Error while getting orders');
            }
        });
    }

    welcome() {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    type: 'welcome',
                },
            })
            .onClose.subscribe((action: any) => {
                console.log('action--->>', action);
                if (action === 'yes') {
                    // this.onConfirm(id);
                }
            });
    }
}
