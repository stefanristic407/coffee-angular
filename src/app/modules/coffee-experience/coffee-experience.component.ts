import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@services';
import { CoffeeExperienceTableComponent } from './coffee-experience-table/coffee-experience-table.component';
import { CoffeeExpService } from './coffee-experience.service';

@Component({
    selector: 'app-coffee-experience',
    templateUrl: './coffee-experience.component.html',
    styleUrls: ['./coffee-experience.component.scss'],
})
export class CoffeeExperienceComponent implements OnInit {
    breadItems = [
        { label: this.translator.instant('home'), routerLink: '/' },
        { label: this.translator.instant('brand_experience') },
        { label: this.translator.instant('the_coffee_experience') },
    ];
    menuItems: any[] = [];
    searchTerm = '';
    placeholders = {
        estate_orders: 'Search by Estate name, order ID, order reference',
        micro_roaster_orders: 'Search by Order ID, Customer or Product name',
        partner_orders: 'Search by Sub order ID or Product name',
        outtake_orders: 'Search by Customer Name or Estate Order ID',
    };
    estateOrders = 'estate_orders';
    placeholder = this.placeholders[this.estateOrders];
    @ViewChild(CoffeeExperienceTableComponent, { static: false }) coffeeTableTab;

    constructor(
        private authService: AuthService,
        private coffeeService: CoffeeExpService,
        private translator: TranslateService,
    ) {}

    ngOnInit(): void {
        this.coffeeService.clearSearch();
        this.searchTerm = this.coffeeService.search.getValue();
        this.menuItems = [
            {
                label: 'estate_orders',
                routerLink: [`/coffee-experience/orders`],
                command: (event) => {
                    this.updatePlaceholder(this.placeholders[event.item.label]);
                },
            },
            {
                label: 'micro_roaster_orders',
                routerLink: [`/coffee-experience/mr-orders`],
                command: (event) => {
                    this.updatePlaceholder(this.placeholders[event.item.label]);
                },
            },
            {
                label: 'partner_orders',
                routerLink: [`/coffee-experience/hrc-orders`],
                command: (event) => {
                    this.updatePlaceholder(this.placeholders[event.item.label]);
                },
            },
            {
                label: 'outtake_orders',
                routerLink: [`/coffee-experience/outtake-orders`],
                command: (event) => {
                    this.updatePlaceholder(this.placeholders[event.item.label]);
                },
            },
        ];
        if (!this.authService.shopDetails) {
            this.menuItems.splice(2, 1);
        }
    }

    onSearch() {
        this.coffeeService.setSearch(this.searchTerm);
    }

    updatePlaceholder(val) {
        this.placeholder = val;
    }
}
