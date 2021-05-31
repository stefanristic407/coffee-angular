import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { SourcingService } from '../sourcing/sourcing.service';
import { PrimeTableService } from '@services';
import { CoffeeExperienceTableComponent } from './coffee-experience-table/coffee-experience-table.component';

@Component({
    selector: 'app-coffee-experience',
    templateUrl: './coffee-experience.component.html',
    styleUrls: ['./coffee-experience.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CoffeeExperienceComponent implements OnInit {
    items = [
        { label: this.globals.languageJson.home, routerLink: '/features/welcome-aboard' },
        { label: this.globals.languageJson.brand_experience },
        { label: this.globals.languageJson.the_coffee_experience },
    ];
    searchTerm;
    menuItems: any = [];
    searchText: string;
    searchString = '';
    @ViewChild(CoffeeExperienceTableComponent, { static: false }) coffeeTable;

    constructor(
        public globals: GlobalsService,
        public cookieService: CookieService,
        public sourcingSrv: SourcingService,
        private primeTableService: PrimeTableService,
    ) {}

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
        this.coffeeTable.search(this.searchString);
    }
    handleChange(event: any) {
        this.primeTableService.records = [];
    }
}
