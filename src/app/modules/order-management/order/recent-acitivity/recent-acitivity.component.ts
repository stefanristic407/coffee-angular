import { Component, Input, OnInit } from '@angular/core';
import { DestroyableComponent } from '@core/base-components';
import { GroupedRecentActivity } from '@core/models';
import { OrdersService } from '@core/services';
import * as _ from 'lodash';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-recent-acitivity',
    templateUrl: './recent-acitivity.component.html',
    styleUrls: ['./recent-acitivity.component.scss'],
})
export class RecentAcitivityComponent extends DestroyableComponent implements OnInit {
    recentActivityList: GroupedRecentActivity[] = [];

    @Input() showCancelButton = false;
    @Input() orderId: number;

    constructor(private ordersService: OrdersService) {
        super();
    }

    ngOnInit(): void {
        this.ordersService.recentActivities$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((data) => {
            if (data) {
                this.recentActivityList = _.chain(data)
                    .groupBy((x) => moment(new Date(x.created_at)).startOf('day').toISOString())
                    .map((value, key) => ({ date: key, activities: value }))
                    .sortBy((x) => moment(x.date))
                    .value() as GroupedRecentActivity[];
            }
        });
    }
}
