import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ACTIVITY_TYPE } from '@constants';
import { GlobalsService } from '@services';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { MDashboardService } from '../m-dashboard.service';

@Component({
    selector: 'app-dashboard-activity',
    templateUrl: './dashboard-activity.component.html',
    styleUrls: ['./dashboard-activity.component.scss'],
})
export class DashboardActivityComponent implements OnInit, OnDestroy {
    readonly ACTIVITY_TYPE = ACTIVITY_TYPE;
    recentActivities: any[] = [];
    recentActivitiesSub: Subscription;

    loading = true;
    @ViewChild('activeDT') activeTable: Table;
    selectedMetaData: any[];

    constructor(public globals: GlobalsService, private welcomeSrv: MDashboardService) {}

    ngOnInit(): void {
        this.recentActivitiesSub = this.welcomeSrv.recentActivities$.subscribe((res: any) => {
            this.recentActivities = res || [];
            this.loading = false;
        });
    }

    ngOnDestroy() {
        this.recentActivitiesSub.unsubscribe();
    }

    checkAll(ev: any) {
        this.recentActivities.forEach((x) => (x.state = ev.target.checked));
    }

    checkOne(ev: any) {
        console.log(ev);
    }

    isAllChecked() {
        return this.recentActivities.every((_) => _.state);
    }
}
