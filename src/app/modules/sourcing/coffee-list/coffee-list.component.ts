import { Component, OnInit } from '@angular/core';
import { ResizeableComponent } from '@base-components';
import { LBUNIT } from '@constants';
import { QuantityUnit } from '@enums';
import { AvailabilityService, GlobalsService, ResizeService } from '@services';
import { takeUntil } from 'rxjs/operators';
import { SourcingService } from '../sourcing.service';

@Component({
    selector: 'app-coffee-list',
    templateUrl: './coffee-list.component.html',
    styleUrls: ['./coffee-list.component.scss'],
})
export class CoffeeListComponent extends ResizeableComponent implements OnInit {
    public readonly QuantityUnit = QuantityUnit;
    public readonly LBUNIT = LBUNIT;
    isLoaded = false;
    tableColumns: any[] = [];
    coffeedata: any[] = [];
    queryParams: any;
    rows = 15;
    pageNumber = 1;
    totalRecords;

    constructor(
        public globals: GlobalsService,
        private availabilityService: AvailabilityService,
        public sourcingSrv: SourcingService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
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
            this.sourcingSrv.showUnitFilter = true;
            this.sourcingSrv.showAvailableFilter = false;
            this.sourcingSrv.showTypeFilter = true;
        });
        this.sourcingSrv.clearQueryParams();
        this.sourcingSrv.queryParams$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res: any) => {
            this.queryParams = res;
            this.getAvailableCoffee();
        });
        this.initializeTable();
    }

    initializeTable() {
        this.tableColumns = [
            {
                field: 'name',
                header: 'name',
                width: 17,
            },
            {
                field: 'estate_name',
                header: 'estate_name',
                width: 14,
            },
            {
                field: 'origin',
                header: 'origin',
                width: 10,
            },
            {
                field: 'variety',
                header: 'variety',
                width: 17,
            },
            {
                field: 'price',
                header: 'price',
                width: 12,
                sortable: true,
            },
            {
                field: 'quantity',
                header: 'quantity',
                width: 8,
                sortable: true,
            },
            {
                field: 'flavour_profile',
                header: 'flavour_profile',
                width: 14,
            },
            {
                field: 'cup_score',
                header: 'cup_score',
                width: 8,
            },
        ];
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
