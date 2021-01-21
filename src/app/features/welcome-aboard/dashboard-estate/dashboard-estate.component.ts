import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsService } from 'src/services/globals.service';
import { WelcomeService } from '../welcome.service';

@Component({
    selector: 'app-dashboard-estate',
    templateUrl: './dashboard-estate.component.html',
    styleUrls: ['./dashboard-estate.component.scss'],
})
export class DashboardEstateComponent implements OnInit, OnDestroy {
    roasterId: string;
    estates: any[] = [];
    estatesSub: Subscription;
    sourcing: any;
    sourcingSub: Subscription;
    chartData: any[] = [];

    constructor(public globals: GlobalsService, private welcomeSrv: WelcomeService) {}

    ngOnInit(): void {
        this.sourcingSub = this.welcomeSrv.sourcing$.subscribe((res: any) => {
            this.sourcing = res;
            if (this.sourcing) {
                this.makeChartData();
            }
        });
        this.estatesSub = this.welcomeSrv.estates$.subscribe((res: any) => {
            this.estates = res;
        });
    }

    ngOnDestroy() {
        this.sourcingSub.unsubscribe();
        this.estatesSub.unsubscribe();
    }

    makeChartData() {
        const tempData = [];
        this.sourcing.sourcing_stats.forEach((element) => {
            const countryName = this.globals.getCountryName(element.origin) || element.origin;
            tempData.push({
                name: countryName,
                value: (element.available_quantity / 1000).toFixed(0),
            });
        });
        this.chartData = tempData;
    }
}
