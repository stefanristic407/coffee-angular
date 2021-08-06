import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsService } from '@services';
import { MDashboardService } from '../m-dashboard.service';
import * as _ from 'underscore';
import { COUNTRY_LIST } from '@constants';

@Component({
    selector: 'app-dashboard-sourcing',
    templateUrl: './dashboard-sourcing.component.html',
    styleUrls: ['./dashboard-sourcing.component.scss'],
})
export class DashboardSourcingComponent implements OnInit, OnDestroy {
    chartData: any[] = [];
    sourcing: any;
    sourcingSub: Subscription;
    constructor(public globals: GlobalsService, private mDashboardSrv: MDashboardService) {}

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
        oriData.map((item: any) => {
            COUNTRY_LIST.map((country: any) => {
                if (country.isoCode.toLowerCase() === item.origin.toLowerCase()) {
                    const tempItem = {
                        name: country.name,
                        value: item.available_quantity,
                    };
                    this.chartData.push(tempItem);
                }
            });
        });
    }
}
