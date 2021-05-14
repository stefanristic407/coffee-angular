import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DestroyableComponent } from '@base-components';
import { CURRENCY_LIST, LBUNIT } from '@constants';
import { QuantityUnit } from '@enums';
import { AvailabilityService, GlobalsService } from '@services';
import { SourcingService } from '../sourcing.service';

@Component({
    selector: 'app-coffee-list',
    templateUrl: './coffee-list.component.html',
    styleUrls: ['./coffee-list.component.scss'],
})
export class CoffeeListComponent extends DestroyableComponent implements OnInit {
    public readonly CURRENCY_LIST = CURRENCY_LIST;
    public readonly QuantityUnit = QuantityUnit;
    public readonly LBUNIT = LBUNIT;
    isLoaded = false;
    coffeedata: any[] = [];
    queryParams: any;
    rows = 15;
    pageNumber = 1;
    totalRecords;

    constructor(
        public globals: GlobalsService,
        private availabilityService: AvailabilityService,
        public sourcingSrv: SourcingService,
    ) {
        super();
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.sourcingSrv.sortItems = [
                { label: 'Name (A-Z)', value: ['name', 'asc'] },
                { label: 'Recently added', value: ['available_at', 'desc'] },
                { label: 'Cup score (High-Low)', value: ['cup_score', 'desc'] },
                { label: 'Price (High - low)', value: ['price', 'desc'] },
                { label: 'Quantity (High- Low)', value: ['total_quantity', 'desc'] },
            ];
        });
        this.sourcingSrv.clearQueryParams();
        this.sourcingSrv.queryParams$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res: any) => {
            this.queryParams = res;
            this.getAvailableCoffee();
        });
    }

    getAvailableCoffee() {
        this.queryParams = {
            ...this.queryParams,
            page: this.pageNumber,
            per_page: this.rows,
        };

        const query = {
            ...this.queryParams,
        };
        if (this.queryParams.grade) {
            query.cup_score_min = this.queryParams.grade[0];
            query.cup_score_max = this.queryParams.grade[1] || '';
        }
        this.isLoaded = false;
        this.availabilityService.getAvailableGces(query).subscribe((res: any) => {
            this.isLoaded = true;
            if (res.success) {
                this.coffeedata = res.result;
                this.totalRecords = res.result_info.total_count;
            }
        });
    }

    getData(event) {
        if (event.page > -1) {
            this.pageNumber = event.page + 1;
        }
        setTimeout(() => {
            if (event.sortField) {
                this.queryParams = {
                    ...this.queryParams,
                    sort_by: event.sortField,
                    sort_order: event.sortOrder === -1 ? 'desc' : 'asc',
                };
            }
            this.sourcingSrv.queryParams.next({
                ...this.queryParams,
            });
        });
    }
}
