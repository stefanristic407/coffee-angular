import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsService } from 'src/services/globals.service';
import { WelcomeService } from '../welcome.service';

@Component({
    selector: 'app-dashboard-variety',
    templateUrl: './dashboard-variety.component.html',
    styleUrls: ['./dashboard-variety.component.scss'],
})
export class DashboardVarietyComponent implements OnInit, OnDestroy {
    varieties: any;
    varietiesSub: Subscription;
    chartData: any[] = [];

    constructor(public globals: GlobalsService, private welcomeSrv: WelcomeService) {}

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
        this.varieties.variety_stats.forEach((element) => {
            tempData.push({
                name: element.variety,
                value: element.order_count,
            });
        });
        this.chartData = tempData;
    }
}
