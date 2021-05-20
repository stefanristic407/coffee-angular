import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RoasterserviceService } from '@services';
import { GlobalsService } from '@services';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-agreement',
    templateUrl: './agreement.component.html',
    styleUrls: ['./agreement.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AgreementComponent implements OnInit {
    searchTerm: any;
    customerType: string;
    navItems: MenuItem[];
    selectedNav: MenuItem;

    constructor(public roasterService: RoasterserviceService, public globals: GlobalsService) {}

    ngOnInit(): void {
        this.customerType = 'hrc';
        this.navItems = [{ label: this.globals.languageJson?.menu_sales_contracts }];
        this.selectedNav = { label: this.globals.languageJson?.home, routerLink: '/' };
    }

    onTabChange(event) {
        if (event.index === 0) {
            this.customerType = 'hrc';
        } else if (event.index === 1) {
            this.customerType = 'micro-roasters';
        }
    }
}
