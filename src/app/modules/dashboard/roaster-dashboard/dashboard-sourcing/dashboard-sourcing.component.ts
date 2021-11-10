import { Component, OnDestroy, OnInit } from '@angular/core';
import { getCountry } from '@utils';
import { Subscription } from 'rxjs';
import { MDashboardService } from '../m-dashboard.service';

@Component({
    selector: 'app-dashboard-sourcing',
    templateUrl: './dashboard-sourcing.component.html',
    styleUrls: ['./dashboard-sourcing.component.scss'],
})
export class DashboardSourcingComponent implements OnInit, OnDestroy {
    chartData: any[] = [];
    sourcing: any;
    sourcingSub: Subscription;
    constructor(private mDashboardSrv: MDashboardService) {}

    ngOnInit(): void {
        this.sourcingSub = this.mDashboardSrv.sourcing$.subscribe((res: any) => {
            if (res && res.sourcing_stats) {
                this.sourcing = res;
                this.makeChartData(res.sourcing_stats);
            }
            this.sourcing = res;
        });
    }

    ngOnDestroy() {
        this.sourcingSub.unsubscribe();
    }

    makeChartData(oriData) {
        this.chartData = oriData
            .sort((a, b) => {
                return b.available_quantity - a.available_quantity;
            })
            .splice(0, 5)
            .map((item: any) => {
                return {
                    name: getCountry(item.origin)?.name,
                    value: item.available_quantity,
                };
            });
    }
}
