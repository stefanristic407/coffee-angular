import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerServiceService } from '@app/modules/people/customer-management/customer-service.service';
import { GlobalsService, RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { COUNTRY_LIST } from '@constants';

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
    rangeDates: any;
    selectedOrigin: string;
    originArray = [];
    items = [
        { label: this.globals.languageJson.home, routerLink: '/features/welcome-aboard' },
        { label: this.globals.languageJson.brand_experience },
        { label: this.globals.languageJson.the_coffee_experience },
    ];
    displayItems = [
        { label: this.globals.languageJson.display + ' ' + 10, value: 10 },
        { label: this.globals.languageJson.display + ' ' + 20, value: 20 },
        { label: this.globals.languageJson.display + ' ' + 25, value: 25 },
        { label: this.globals.languageJson.display + ' ' + 50, value: 50 },
    ];
    roasterId: any;
    filteredCoffeeData: any[];
    filterDisplay: number;

    constructor(
        public router: Router,
        public globals: GlobalsService,
        public cookieService: CookieService,
        public toastrService: ToastrService,
        public customer: CustomerServiceService,
        private roasterService: RoasterserviceService,
    ) {}

    ngOnChanges(): void {
        if (this.coffeeExperienceData) {
            this.filteredCoffeeData = this.coffeeExperienceData;
            this.filteredCoffeeData.map((org) => {
                COUNTRY_LIST.find((item) => {
                    if (org.origin.toUpperCase() === item.isoCode) {
                        this.originArray.push(item);
                    }
                });
            });
            this.originArray = this.originArray.filter((v, i, a) => a.findIndex((t) => t.isoCode === v.isoCode) === i);
        }
    }

    ngOnInit(): void {
        this.estatetermOrigin = '';
        this.language();
    }

    filterOrigin() {
        if (!this.selectedOrigin) {
            this.filteredCoffeeData = this.coffeeExperienceData;
        } else {
            this.filteredCoffeeData = this.coffeeExperienceData.filter((item) => item.origin === this.selectedOrigin);
        }
    }

    getOrdersData() {
        this.filteredCoffeeData = this.coffeeExperienceData.slice(0, this.filterDisplay);
    }

    language() {
        this.appLanguage = this.globals.languageJson;
    }

    filterDate() {
        const startDate = new Date(this.rangeDates[0]);
        const endDate = new Date(this.rangeDates[1]);
        if (this.rangeDates[0] && this.rangeDates[1]) {
            if (startDate.getTime() === endDate.getTime()) {
                this.filteredCoffeeData = this.coffeeExperienceData.filter((res) => {
                    let dataDate;
                    if (this.customerType === 'hrc-orders') {
                        dataDate = new Date(res.order_date);
                    } else {
                        dataDate = new Date(res.created_at);
                    }
                    if (
                        startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear() ===
                        dataDate.getDate() + '/' + (dataDate.getMonth() + 1) + '/' + dataDate.getFullYear()
                    ) {
                        return res;
                    }
                });
            } else {
                this.filteredCoffeeData = this.coffeeExperienceData.filter((res) => {
                    let dataDate;
                    if (this.customerType === 'hrc-orders') {
                        dataDate = new Date(res.order_date);
                    } else {
                        dataDate = new Date(res.created_at);
                    }
                    if (dataDate >= startDate && dataDate <= endDate) {
                        return res;
                    }
                });
            }
        } else {
            this.filteredCoffeeData = this.coffeeExperienceData;
        }
    }

    closeCalendar(value: any) {
        if (value) {
            this.filteredCoffeeData = this.coffeeExperienceData;
        }
    }
}
