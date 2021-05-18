import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { GlobalsService } from '@services';
import { SourcingService } from '../sourcing.service';
import { FilterComponent } from '../filter/filter.component';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { extend } from 'hammerjs';
import { DestroyableComponent } from '@base-components';
import { GRADE_ITEMS, MONTH_LIST } from '@constants';

@Component({
    selector: 'app-sourcing',
    templateUrl: './sourcing.component.html',
    styleUrls: ['./sourcing.component.scss'],
})
export class SourcingComponent extends DestroyableComponent implements OnInit, AfterViewInit {
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
    menuItems: any[];
    varietyItems: any[] = [
        { label: 'Bourbon', value: 'Bourbon' },
        { label: 'Castillo', value: 'Castillo' },
        { label: 'Arabica', value: 'Arabica' },
        { label: 'asdasd', value: 'asdasd' },
        { label: 'Arabsdsica', value: 'Araasdbica' },
    ];
    gradeItems = GRADE_ITEMS;
    cropItems: any[] = MONTH_LIST;
    availableItems: any[] = [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
    ];
    weightItems: any[] = [
        { label: 'lb', value: 'lb' },
        { label: 'Kg', value: 'kg' },
    ];

    queryParams: any;
    viewMode = 'grid';
    viewModeItems: any[] = [{ value: 'table' }, { value: 'grid' }];

    constructor(public dialogSrv: DialogService, public globals: GlobalsService, public sourcingSrv: SourcingService) {
        super();
    }

    ngOnInit(): void {
        this.menuItems = [
            { label: this.globals.languageJson?.estates, routerLink: ['/sourcing/estate-list'] },
            {
                label: this.globals.languageJson?.available_green_coffee,
                routerLink: ['/sourcing/coffee-list'],
            },
        ];
        this.sourcingSrv.clearQueryParams();
        this.queryParams = { ...this.sourcingSrv.queryParams.getValue() };
        this.viewMode = this.sourcingSrv.viewMode.getValue();
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
        this.sourcingSrv.queryParams.next({ ...this.queryParams });
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
            header: this.globals.languageJson.more_filters,
        });
    }
}
