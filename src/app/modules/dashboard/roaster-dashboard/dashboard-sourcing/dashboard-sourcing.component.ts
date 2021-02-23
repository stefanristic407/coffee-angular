import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Browser } from '@syncfusion/ej2-base';
import { GlobalsService } from 'src/services/globals.service';
import { WelcomeService } from '../welcome.service';
import * as _ from 'underscore';

@Component({
    selector: 'app-dashboard-sourcing',
    templateUrl: './dashboard-sourcing.component.html',
    styleUrls: ['./dashboard-sourcing.component.scss'],
})
export class DashboardSourcingComponent implements OnInit, OnDestroy {
    chartData: any[] = [];
    sourcing: any;
    sourcingSub: Subscription;
    constructor(public globals: GlobalsService, private welcomeSrv: WelcomeService) {}

    ngOnInit(): void {
        this.sourcingSub = this.welcomeSrv.sourcing$.subscribe((res: any) => {
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
            this.globals.countryList.map((country: any) => {
                if (country.isoCode.toLowerCase() === item.origin.toLowerCase()) {
                    const tempItem = {
                        name: country.name,
                        value: item.available_quantity,
                    };
                    this.chartData.push(tempItem);
                }
            });
        });
        console.log('result chart data: ', this.chartData);
    }
}
