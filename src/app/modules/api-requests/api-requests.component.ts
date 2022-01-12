import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
        { org_type: 'Partner', value: 'hrc' },
    ];
    isApiRequestPage = true;
    displayArray = [];

    constructor(private route: ActivatedRoute, private translator: TranslateService) {
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
            { label: 'Display 10', value: 10 },
            { label: 'Display 20', value: 20 },
            { label: 'Display 30', value: 30 },
            { label: 'Display 50', value: 50 },
        ];
    }

    supplyBreadCrumb(): void {
        this.breadCrumbItem = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('sales_management') },
            { label: this.translator.instant('api_requests') },
        ];
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
