import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { GRADE_ITEMS, MONTH_LIST } from '@constants';
import { HarvestType } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FilterComponent } from '../filter/filter.component';
import { SourcingService } from '../sourcing.service';

@Component({
    selector: 'app-sourcing',
    templateUrl: './sourcing.component.html',
    styleUrls: ['./sourcing.component.scss'],
})
export class SourcingComponent extends DestroyableComponent implements OnInit, AfterViewInit {
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
    menuItems: any[];
    gradeItems = GRADE_ITEMS;
    cropItems: any[] = MONTH_LIST;
    availableItems: any[] = [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
    ];
    weightItems: any[] = [
        { label: 'lb', value: 'lb' },
        { label: 'kg', value: 'kg' },
    ];
    harvestTypeItems: SelectItem[] = [
        { label: 'in_parchment', value: HarvestType.PARCHMENT },
        { label: 'milling_completed', value: HarvestType.MILLING },
    ];

    queryParams: any;
    viewMode = 'grid';
    viewModeItems: any[] = [{ value: 'table' }, { value: 'grid' }];

    constructor(
        private dialogSrv: DialogService,
        private translator: TranslateService,
        public sourcingSrv: SourcingService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.menuItems = [
            { label: this.translator.instant('estates'), routerLink: ['/sourcing/estate-list'] },
            {
                label: this.translator.instant('available_green_coffee'),
                routerLink: ['/sourcing/coffee-list'],
            },
        ];
        this.sourcingSrv.showUnitFilter = false;
        this.sourcingSrv.showAvailableFilter = false;
        this.sourcingSrv.showTypeFilter = false;
        this.sourcingSrv.clearQueryParams();
        this.queryParams = { ...this.sourcingSrv.queryParams.getValue() };
        this.viewMode = this.sourcingSrv.viewMode.getValue();
        this.sourcingSrv.queryParams$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res: any) => {
            this.queryParams = { ...this.queryParams, ...res };
        });
    }

    ngAfterViewInit() {
        fromEvent(this.searchInput.nativeElement, 'keyup')
            .pipe(debounceTime(300))
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((res) => {
                this.filterCall();
            });
    }

    filterCall() {
        this.sourcingSrv.queryParams.next({ ...this.sourcingSrv.queryParams.getValue(), ...this.queryParams });
    }

    sort() {
        this.sourcingSrv.queryParams.next({
            ...this.queryParams,
            sort_by: this.sourcingSrv.sortParam[0],
            sort_order: this.sourcingSrv.sortParam[1],
        });
    }

    changeViewMode() {
        this.sourcingSrv.viewMode.next(this.viewMode);
    }

    openFilter() {
        this.dialogSrv.open(FilterComponent, {
            data: {},
            header: this.translator.instant('more_filters'),
        });
    }
}
