import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalsService } from '@services';
import { PrimeTableService } from '@services';
import { CoffeeExperienceTableComponent } from './coffee-experience-table/coffee-experience-table.component';

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
    TableEvent: any;
    @ViewChild(CoffeeExperienceTableComponent, { static: false }) coffeeTableTab;

    constructor(private globals: GlobalsService, private primeTableService: PrimeTableService) {}

    ngOnInit(): void {
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
        // this.primeTableService.searchQuery = this.searchString;
        // console.log(this.primeTableService.searchQuery);
        // this.coffeeTableTab.search(this.searchString);
        // this.TableEvent.primeTableService.searchQuery = this.searchString;
        // console.log(this.TableEvent);
    }
    onRouterOutletActivate(event: any) {
        // console.log(event);
        // this.TableEvent = event;
    }
}
