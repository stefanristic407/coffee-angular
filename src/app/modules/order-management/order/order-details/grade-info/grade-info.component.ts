import { Component, Input, OnInit } from '@angular/core';
import { DestroyableComponent } from '@core/base-components';
import { CuppingScore } from '@core/models';
import { OrdersService } from '@core/services';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-grade-info',
    templateUrl: './grade-info.component.html',
    styleUrls: ['./grade-info.component.scss'],
})
export class GradeInfoComponent extends DestroyableComponent implements OnInit {
    @Input() harvestId: number;

    cuppingScore: CuppingScore[] = [];

    constructor(private orderService: OrdersService) {
        super();
    }

    ngOnInit(): void {
        this.orderService.cuppingScore$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res) => {
            if (res.length === 1) {
                res.push({
                    cuppingDate: null,
                    evaluatorName: null,
                    evaluatorType: 'Roaster',
                    finalScore: null,
                    totalScore: null,
                });

                this.cuppingScore = res;
            }
        });
    }

    viewReport(): void {
        this.orderService.getCuppingReportUrl(this.harvestId).subscribe((url) => window.open(url, '_blank'));
    }
}
