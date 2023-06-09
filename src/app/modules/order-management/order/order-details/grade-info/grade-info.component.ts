import { Component, Input, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { CuppingScore } from '@models';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-grade-info',
    templateUrl: './grade-info.component.html',
    styleUrls: ['./grade-info.component.scss'],
})
export class GradeInfoComponent extends DestroyableComponent implements OnInit {
    @Input() harvestId: number;

    cuppingScore: CuppingScore[] = [];

    constructor(private orderService: OrderManagementService) {
        super();
    }

    ngOnInit(): void {
        this.orderService.cuppingScore$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res) => {
            if (res.length === 1) {
                res.push({
                    cupping_date: null,
                    evaluator_name: 'Roaster',
                    evaluator_type: 'Roaster',
                    final_score: null,
                    total_score: null,
                });

                this.cuppingScore = res;
            }
        });
    }

    viewReport(): void {
        this.orderService.getCuppingReportUrl(this.harvestId).subscribe((url) => window.open(url, '_blank'));
    }
}
