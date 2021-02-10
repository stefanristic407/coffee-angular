import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { SourcingService } from '../sourcing.service';

@Component({
    selector: 'app-sourcing',
    templateUrl: './sourcing.component.html',
    styleUrls: ['./sourcing.component.scss'],
})
export class SourcingComponent implements OnInit {
    menuItems: any[];
    originItems: any[] = [
        { label: 'Sweden', value: 'se' },
        { label: 'India', value: 'IN' },
    ];
    varietyItems: any[] = [
        { label: 'Bourbon', value: 'Bourbon' },
        { label: 'Castillo', value: 'Castillo' },
        { label: 'Arabica', value: 'Arabica' },
        { label: 'asdasd', value: 'asdasd' },
        { label: 'Arabsdsica', value: 'Araasdbica' },
    ];
    gradeItems: any[] = [
        { label: '81.0 - 83.0', value: ['81.0', '83.0'] },
        { label: '84.0 - 86.0', value: ['84.0', '86.0'] },
        { label: '87.0 - 89.0', value: ['87.0', '89.0'] },
        { label: '90+', value: ['90', '100'] },
    ];
    cropItems: any[];
    weightItems: any[] = [
        { label: 'KG', value: 'kg' },
        { label: 'lb', value: 'lb' },
    ];
    sortItems: any[] = [
        { label: 'Name (A-Z)', value: 'name' },
        { label: 'Recently added', value: 'created_at' },
        { label: 'Cup score (High-Low)', value: 'cup_score' },
        { label: 'Price (High - low)', value: 'price' },
        { label: 'Quantity (High- Low)', value: 'quantity' },
    ];
    listingStatusItems = [
        { label: 'At Estate', value: 'ESTATE' },
        { label: 'At mill', value: 'MILL' },
        { label: 'Warehouse', value: 'WAREHOUSE' },
    ];

    queryParams: any;
    viewMode = 'grid';
    viewModeItems: any[] = [{ value: 'table' }, { value: 'grid' }];
    displayFilterModal = false;
    limitFlavour = true;

    constructor(public globals: GlobalsService, public sourcingSrv: SourcingService) {}

    ngOnInit(): void {
        this.menuItems = [
            { label: this.globals.languageJson?.estates, routerLink: ['/sourcing/estate-list'] },
            {
                label: this.globals.languageJson?.available_green_coffee,
                routerLink: ['/sourcing/coffee-list'],
            },
        ];
        this.cropItems = this.globals.monthList;
        this.queryParams = { ...this.sourcingSrv.queryParams.getValue() };
        this.viewMode = this.sourcingSrv.viewMode.getValue();

        this.sourcingSrv.flavourprofileList();
    }

    filterCall() {
        this.sourcingSrv.queryParams.next({ ...this.queryParams });
    }

    changeViewMode() {
        this.sourcingSrv.viewMode.next(this.viewMode);
    }
}
