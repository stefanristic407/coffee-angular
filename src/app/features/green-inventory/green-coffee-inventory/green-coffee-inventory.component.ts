import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { CoffeeProcuredTabComponent } from './coffee-procured-tab/coffee-procured-tab.component';
import { MarkedSaleComponent } from './marked-sale/marked-sale.component';
import { PrimeTableService } from 'src/services/prime-table.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-green-coffee-inventory',
    templateUrl: './green-coffee-inventory.component.html',
    styleUrls: ['./green-coffee-inventory.component.scss'],
})
export class GreenCoffeeInventoryComponent implements OnInit {
    appLanguage?: any = {};
    greenActive: any = 0;
    loader: boolean;
    searchString = '';
    breadItems = [
        { label: 'Home', routerLink: '/roaster-dashboard' },
        { label: 'Inventory' },
        { label: 'Green coffee management' },
    ];
    selectedTab = 0;
    isProcuredTab = true;
    @ViewChild(CoffeeProcuredTabComponent, { static: false }) procureTab;
    @ViewChild(MarkedSaleComponent, { static: false }) markForSaleTab;
    constructor(
        public globals: GlobalsService,
        public cookieService: CookieService,
        public primeTableService: PrimeTableService,
    ) {}

    ngOnInit(): void {
        this.language();
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.greenActive++;
    }
    onSearch(event) {
        this.procureTab.searchString = event;
    }
    // onClickMarkForSaleTab() {
    //     this.markForSaleTab.initializeTable();
    // }
    // onClickProcuredCoffee() {
    //     this.procureTab.initializeTableProcuredCoffee();
    // }
    handleChange(event: any) {
        if (event.index === 0) {
            this.isProcuredTab = true;
            // this.onClickProcuredCoffee();
        } else {
            this.isProcuredTab = false;
            // this.onClickMarkForSaleTab();
        }
    }
}
