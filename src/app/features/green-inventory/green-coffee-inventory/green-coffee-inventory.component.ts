import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { CoffeeProcuredTabComponent } from './coffee-procured-tab/coffee-procured-tab.component';
import { MarkedSaleComponent } from './marked-sale/marked-sale.component';

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
    @ViewChild(CoffeeProcuredTabComponent, { static: false }) procureTab;
    @ViewChild(MarkedSaleComponent, { static: false }) markForSaleTab;
    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {
        this.language();
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.greenActive++;
    }
    onSearch(event) {
        this.procureTab.searchString = event;
        this.procureTab.getProcuredCoffeeList();
    }
    onClickMarkForSaleTab() {
        this.markForSaleTab.getCoffeeSaleList();
    }
    onClickProcuredCoffee() {
        this.procureTab.getProcuredCoffeeList();
    }
}
