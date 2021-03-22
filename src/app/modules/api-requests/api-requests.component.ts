import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { GlobalsService } from '@services';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-api-requests',
    templateUrl: './api-requests.component.html',
    styleUrls: ['./api-requests.component.scss'],
})
export class ApiRequestsTableComponent implements OnInit, AfterViewInit {
    breadCrumbItem: MenuItem[] = [];
    showDateRange: any;
    @ViewChild('calendar')
    calendar: any;
    @ViewChild('searchInput') input: ElementRef;
    showDisplay = true;
    customerType = null;
    perPage = 10;
    rangeDates: any;
    appLanguage?: any = {};
    greenActive: any = 0;
    showStatus = true;
    apiKeySearch = '';
    KeySearch = '';
    selectedTab = 0;
    FilterTypeList: any[] = [
        { org_type: 'Micro roaster', value: 'mr' },
        { org_type: 'horeca', value: 'hrc' },
    ];
    isApiRequestPage = true;
    displayArray = [];
    constructor(public globals: GlobalsService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe((params) => {
            const paramsData = JSON.parse(JSON.stringify(params));
            if (paramsData.data === 'generated-key') {
                this.selectedTab = 1;
                this.isApiRequestPage = false;
            }
        });
    }

    ngOnInit(): void {
        this.supplyBreadCrumb();
        this.loadFilterValues();
    }

    loadFilterValues() {
        this.displayArray = [
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '50', value: 50 },
        ];
    }

    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/',
        };
        const obj2: MenuItem = {
            label: this.globals.languageJson?.api_request,
            routerLink: 'features/api-request',
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
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

    filterCall() {
        this.calendar.showOverlay(this.calendar.inputfieldViewChild.nativeElement);
        event.stopPropagation();
    }

    handleChange(event: any) {
        this.apiKeySearch = null;
        this.KeySearch = null;
        this.perPage = 10;
        this.customerType = null;
        if (event.index === 0) {
            this.isApiRequestPage = true;
        } else {
            this.isApiRequestPage = false;
        }
    }
}
