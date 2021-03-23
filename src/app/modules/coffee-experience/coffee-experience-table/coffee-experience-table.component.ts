import { formatDate, NumberFormatStyle } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CustomerServiceService } from '@app/modules/people/customer-management/customer-service.service';
import { GlobalsService } from '@services';
import { DataTableDirective } from 'angular-datatables';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-coffee-experience-table',
    templateUrl: './coffee-experience-table.component.html',
    styleUrls: ['./coffee-experience-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CoffeeExperienceTableComponent implements OnInit, OnChanges {
    estatetermOrigin: any;
    appLanguage?: any;
    orderId: any;

    @Input() searchTerm = '';
    @Input() coffeeExperienceData = [];
    @Input() customerType: any;
    itemId: any;
    showStatus = true;
    showDisplay = true;
    filterDisplay: number;
    rangeDates: any;
    pageNumber = 1;
    selectedOrigin: string;
    loading?: boolean;
    items = [
        { label: 'Home', routerLink: '/features/welcome-aboard' },
        { label: 'Farm link' },
        { label: 'The Coffee Experience' },
    ];
    originData = [
        { label: 'India', value: 'IN' },
        { label: 'USA', value: 'US' },
    ];
    displayItems = [
        { label: 'All', value: '' },
        { label: 'Display 10', value: 10 },
        { label: 'Display 20', value: 20 },
        { label: 'Display 25', value: 25 },
        { label: 'Display 50', value: 50 },
    ];
    @ViewChild(DataTableDirective, { static: false })
    datatableElement: DataTableDirective;
    showDateRange: any;
    @ViewChild('calendar') calendar: any;
    mainData: any[] = [];
    mrData: any[] = [];
    roasterId: any;
    tableColumns: any[];
    filteredCoffeeData: any[];

    constructor(
        public router: Router,
        public globals: GlobalsService,
        public cookieService: CookieService,
        public customer: CustomerServiceService,
    ) {}
    ngOnChanges(): void {
        if (this.coffeeExperienceData) {
            this.filteredCoffeeData = this.coffeeExperienceData;
        }
    }

    ngOnInit(): void {
        this.coffeeExperienceData = [];
        this.estatetermOrigin = '';
        this.language();
        this.getOrdersData();
    }

    filterDate() {
        if (this.rangeDates[0] && this.rangeDates[1]) {
            this.getOrdersData();
        }
    }
    filterOrigin() {
        if (!this.selectedOrigin) {
            this.filteredCoffeeData = this.coffeeExperienceData;
        } else {
            this.filteredCoffeeData = this.coffeeExperienceData.filter((item) => item.origin === this.selectedOrigin);
        }
    }

    getOrdersData() {
        if (this.selectedOrigin === '') {
            this.filteredCoffeeData = this.coffeeExperienceData;
        } else {
            this.filteredCoffeeData = this.coffeeExperienceData.slice(0, this.filterDisplay);
        }
    }

    language() {
        this.appLanguage = this.globals.languageJson;
    }

    shareDetails(size: any) {
        console.log(size);
        this.orderId = size.id;
        const navigationExtras: NavigationExtras = {
            queryParams: {
                orderId: encodeURIComponent(this.orderId),
            },
        };
        this.router.navigate(['/coffee-experience/default-settings'], navigationExtras);
    }
}
