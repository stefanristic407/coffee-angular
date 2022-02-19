import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DestroyableComponent } from '@base-components';
import { EstateService, GlobalsService } from '@services';
import { SourcingService } from '../sourcing.service';

@Component({
    selector: 'app-estate-list',
    templateUrl: './estate-list.component.html',
    styleUrls: ['./estate-list.component.scss'],
})
export class EstateListComponent extends DestroyableComponent implements OnInit {
    isLoaded = false;
    estateData: any[] = [];
    queryParams: any;
    rows = 15;
    pageNumber = 1;
    totalRecords;

    constructor(
        public sourcingSrv: SourcingService,
        public globals: GlobalsService,
        private estateService: EstateService,
    ) {
        super();
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.sourcingSrv.sortItems = [
                { label: 'Name (A-Z)', value: ['name', 'asc'] },
                { label: 'Recently added', value: ['created_at', 'desc'] },
                { label: 'Rating (High-Low)', value: ['rating', 'desc'] },
            ];
            this.sourcingSrv.showUnitFilter = false;
            this.sourcingSrv.showAvailableFilter = true;
            this.sourcingSrv.showTypeFilter = false;
        });
        this.sourcingSrv.clearQueryParams();
        this.sourcingSrv.queryParams$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res: any) => {
            this.queryParams = { ...res };
            this.getAvailableEstates();
        });
    }

    getAvailableEstates() {
        this.queryParams = {
            ...this.queryParams,
            page: this.pageNumber,
            per_page: this.rows,
        };
        this.isLoaded = false;
        this.estateService.getAvailableEstates(this.queryParams).subscribe((res: any) => {
            this.isLoaded = true;
            if (res.success) {
                this.estateData = res.result;
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
