import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalsService } from '@services';
import { CoffeeProcuredTabComponent } from './coffee-procured-tab/coffee-procured-tab.component';
import { MarkedSaleComponent } from './marked-sale/marked-sale.component';
import { PrimeTableService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-green-coffee-inventory',
    templateUrl: './green-coffee-inventory.component.html',
    styleUrls: ['./green-coffee-inventory.component.scss'],
})
export class GreenCoffeeInventoryComponent implements OnInit {
    searchTerm;
    appLanguage?: any = {};
    greenActive: any = 0;
    loader: boolean;
    searchText: string;
    searchString = '';
    breadItems = [
        { label: 'Home', routerLink: '/roaster-dashboard' },
        { label: 'Inventory' },
        { label: 'Green Coffee Inventory' },
    ];
    selectedTab = 0;
    isProcuredTab = true;
    @ViewChild(CoffeeProcuredTabComponent, { static: false }) procureTab;
    @ViewChild(MarkedSaleComponent, { static: false }) markForSaleTab;
    constructor(
        public globals: GlobalsService,
        public cookieService: CookieService,
        public primeTableService: PrimeTableService,
        public route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.language();
        if (this.route.snapshot.queryParams.markSale === 'yes') {
            this.selectedTab = 1;
            this.isProcuredTab = false;
            this.searchText = 'Search by estate name';
        } else {
            this.selectedTab = 0;
            this.searchText = 'Search by order ID';
        }
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.greenActive++;
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
            this.searchText = 'Search by order ID';
        } else {
            this.isProcuredTab = false;
            this.searchText = 'Search by estate name';
        }
        this.primeTableService.records = [];
    }
}
