import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '@services';
import { PrimeTableService } from '@services';
import { CoffeeExperienceTableComponent } from './coffee-experience-table/coffee-experience-table.component';
import { CoffeeExpService } from './coffee-experience.service';

@Component({
    selector: 'app-coffee-experience',
    templateUrl: './coffee-experience.component.html',
    styleUrls: ['./coffee-experience.component.scss'],
})
export class CoffeeExperienceComponent implements OnInit {
    items = [
        { label: this.globals.languageJson.home, routerLink: '/features/welcome-aboard' },
        { label: this.globals.languageJson.brand_experience },
        { label: this.globals.languageJson.the_coffee_experience },
    ];
    menuItems: any = [];
    searchString = '';
    placeholder = 'Search by Order ID';
    @ViewChild(CoffeeExperienceTableComponent, { static: false }) coffeeTableTab;

    constructor(private globals: GlobalsService, private coffeeService: CoffeeExpService) {}

    ngOnInit(): void {
        /*if (this.path === 'orders') {
            this.placeholder = 'Search by Estate name, order ID, order reference';
        } else if (this.path === 'mr-orders') {
            this.placeholder = 'Search by Order ID, Customer name or Product name';
        } else if (this.path === 'hrc-orders') {
            this.placeholder = 'Search by Sub order ID or Product name';
        } else if (this.path === 'outtake-orders') {
            this.placeholder = 'Search by Customer Name or Estate Order ID';
        }*/

        this.coffeeService.clearSearch();
        this.searchString = this.coffeeService.search.getValue();
        this.menuItems = [
            {
                label: 'estate_orders',
                routerLink: [`/coffee-experience/orders`],
            },
            {
                label: 'micro_roaster_orders',
                routerLink: [`/coffee-experience/mr-orders`],
            },
            {
                label: 'partner_orders',
                routerLink: [`/coffee-experience/hrc-orders`],
            },
            {
                label: 'outtake_orders',
                routerLink: [`/coffee-experience/outtake-orders`],
            },
        ];
    }
    onSearch() {
        this.coffeeService.setSearch(this.searchString);
    }
    onRouterOutletActivate(event: any) {
        // console.log(event);
        // this.TableEvent = event;
    }
}
