import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerServiceService } from '@app/modules/people/customer-management/customer-service.service';
import { GlobalsService, RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

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
    items = [
        { label: 'Home', routerLink: '/features/welcome-aboard' },
        { label: 'Farm link' },
        { label: 'The Coffee Experience' },
    ];
    originData = [];
    displayItems = [
        { label: 'All', value: '' },
        { label: 'Display 10', value: 10 },
        { label: 'Display 20', value: 20 },
        { label: 'Display 25', value: 25 },
        { label: 'Display 50', value: 50 },
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
            const origin = this.coffeeExperienceData.map((res) => {
                if (res.origin) {
                    return res.origin.toUpperCase();
                }
            });
            this.originData = [...new Set(origin)];
            this.originData = this.originData.map((item) => {
                const transformItem = { label: '', value: '' };
                transformItem.label = item;
                transformItem.value = item;
                return transformItem;
            });
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
        if (this.selectedOrigin === '') {
            this.filteredCoffeeData = this.coffeeExperienceData;
        } else {
            this.filteredCoffeeData = this.coffeeExperienceData.slice(0, this.filterDisplay);
        }
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
                    if (this.customerType === 'hrc') {
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
                    if (this.customerType === 'hrc') {
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
