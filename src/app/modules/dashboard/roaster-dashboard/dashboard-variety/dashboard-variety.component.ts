import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsService } from '@services';
import { MDashboardService } from '../m-dashboard.service';

@Component({
    selector: 'app-dashboard-variety',
    templateUrl: './dashboard-variety.component.html',
    styleUrls: ['./dashboard-variety.component.scss'],
})
export class DashboardVarietyComponent implements OnInit, OnDestroy {
    varieties: any;
    varietiesSub: Subscription;
    chartData: any[] = [];

    constructor(public globals: GlobalsService, private welcomeSrv: MDashboardService) {}

    ngOnInit(): void {
        this.varietiesSub = this.welcomeSrv.varieties$.subscribe((res: any) => {
            this.varieties = res;
            if (this.varieties?.variety_stats) {
                this.makeChartData();
            }
        });
    }

    ngOnDestroy() {
        this.varietiesSub.unsubscribe();
    }

    makeChartData() {
        const tempData = [];
        let otherValue = 0;
        this.varieties.variety_stats = this.varieties.variety_stats.sort((a, b) => b.order_count - a.order_count);
        this.varieties.variety_stats.forEach((element, index) => {
            if (index <= 4) {
                tempData.push({
                    name: element.variety,
                    value: element.order_count,
                });
            } else {
                otherValue += element.order_count;
            }
        });
        tempData.push({
            name: 'Other',
            value: otherValue,
        });
        this.chartData = tempData;
    }
}
