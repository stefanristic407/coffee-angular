import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsService } from '@services';
import { WelcomeService } from '../welcome.service';
import { Table } from 'primeng/table';
import { ACTIVITY_TYPE } from '@constants';

@Component({
    selector: 'app-dashboard-activity',
    templateUrl: './dashboard-activity.component.html',
    styleUrls: ['./dashboard-activity.component.scss'],
})
export class DashboardActivityComponent implements OnInit, OnDestroy {
    recentActivities: any[] = [];
    recentActivitiesSub: Subscription;

    loading = true;
    @ViewChild('activeDT') activeTable: Table;
    selectedMetaData: any[];
    activityTypes = ACTIVITY_TYPE;

    constructor(public globals: GlobalsService, private welcomeSrv: WelcomeService) {}

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
