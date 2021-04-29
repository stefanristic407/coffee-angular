import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsService } from '@services';
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
            if (res) {
                const estateData: any = res;
                const sortedEstateData = estateData.sort((a: any, b: any) => {
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                });
                sortedEstateData.length > 4
                    ? (this.estates = sortedEstateData.slice(0, 4))
                    : (this.estates = sortedEstateData);
                this.estates.map((item: any) => {
                    const countryName = this.globals.getCountryName(item.country);
                    item.countryName = countryName;
                    if (item.variety) {
                        const tags = item.variety.split(',');
                        item.tags = tags;
                    } else {
                        item.tags = [];
                    }
                });
            }
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
