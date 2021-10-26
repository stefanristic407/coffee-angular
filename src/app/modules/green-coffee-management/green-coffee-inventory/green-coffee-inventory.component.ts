import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalsService } from '@services';
import { CoffeeProcuredTabComponent } from './coffee-procured-tab/coffee-procured-tab.component';
import { MarkedSaleComponent } from './marked-sale/marked-sale.component';
import { PrimeTableService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-green-coffee-inventory',
    templateUrl: './green-coffee-inventory.component.html',
    styleUrls: ['./green-coffee-inventory.component.scss'],
})
export class GreenCoffeeInventoryComponent implements OnInit {
    searchTerm;
    loader: boolean;
    searchText: string;
    searchString = '';
    breadItems = [
        { label: this.translator.instant('home'), routerLink: '/' },
        { label: this.translator.instant('inventory') },
        { label: this.translator.instant('green_coffee_inventory') },
    ];
    selectedTab = 0;
    isProcuredTab = true;
    @ViewChild(CoffeeProcuredTabComponent, { static: false }) procureTab;
    @ViewChild(MarkedSaleComponent, { static: false }) markForSaleTab;
    constructor(
        public cookieService: CookieService,
        public primeTableService: PrimeTableService,
        public route: ActivatedRoute,
        private translator: TranslateService,
    ) {}

    ngOnInit(): void {
        if (this.route.snapshot.queryParams.markSale === 'yes') {
            this.selectedTab = 1;
            this.isProcuredTab = false;
            this.searchText = 'search_by_estate_name';
        } else {
            this.selectedTab = 0;
            this.searchText = 'search_by_orderid_estatename';
        }
    }

    onSearch() {
        if (this.procureTab) {
            this.procureTab.search(this.searchString);
        } else if (this.markForSaleTab) {
            this.markForSaleTab.search(this.searchString);
        }
    }
    handleChange(event: any) {
        if (event.index === 0) {
            this.isProcuredTab = true;
            this.searchText = 'search_by_orderid_estatename';
        } else {
            this.isProcuredTab = false;
            this.searchText = 'search_by_estate_name';
        }
        this.primeTableService.records = [];
    }
}
