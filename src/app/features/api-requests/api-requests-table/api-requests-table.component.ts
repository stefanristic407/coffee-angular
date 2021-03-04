import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-api-requests-table',
    templateUrl: './api-requests-table.component.html',
    styleUrls: ['./api-requests-table.component.css'],
})
export class ApiRequestsTableComponent implements OnInit {
    showDateRange: any;
    @ViewChild('calendar')
    calendar: any;
    @ViewChild('searchInput') input: ElementRef;
    showDisplay: boolean = true;
    customerType: string = '';
    perPage: any;
    rangeDates: any;
    appLanguage?: any = {};
    greenActive: any = 0;
    showStatus: boolean = true;
    apiKeySearch: string = '';
    KeySearch: string = '';
    selectedTab = 0;
    isApiRequestPage = true;
    customerTypeArray = [
        { label: 'All', value: 'All' },
        { label: 'Shipped', value: 'Shipped' },
        { label: 'Payment', value: 'Payment' },
        { label: 'Harvest Ready', value: 'Harvest Ready' },
        { label: 'Received', value: 'Received' },
    ];
    constructor(public globals: GlobalsService) {
        this.perPage = '10';
    }

    ngOnInit(): void {
        this.language();
    }

    ngAfterViewInit() {
        fromEvent(this.input.nativeElement, 'keyup')
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                tap((text) => {
                    this.KeySearch = this.apiKeySearch;
                }),
            )
            .subscribe();
    }

    toggleDisplay() {
        this.showDisplay = !this.showDisplay;
        if (this.showDisplay === false) {
            document.getElementById('display_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('display_id').style.border = '1px solid #d6d6d6';
        }
    }

    setDisplay(displayData: any) {
        this.perPage = displayData;
    }

    openCalendar(event: any) {
        this.calendar.showOverlay(this.calendar.inputfieldViewChild.nativeElement);
        event.stopPropagation();
    }

    language() {
        this.appLanguage = this.globals.languageJson;
        this.greenActive++;
    }

    toggleStatus() {
        this.showStatus = !this.showStatus;
        if (this.showStatus === false) {
            document.getElementById('status_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('status_id').style.border = '1px solid #d6d6d6';
        }
    }

    customerTypeFilter(filterData: any) {
        this.customerType = filterData;
    }

    handleChange(event: any) {
        this.apiKeySearch = null;
        this.KeySearch = null;
        this.perPage = 10;
        this.customerType = '';
        if (event.index === 0) {
            this.isApiRequestPage = true;
        } else {
            this.isApiRequestPage = false;
        }
    }
}
