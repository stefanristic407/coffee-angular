import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';
import { NavigationExtras, Router } from '@angular/router';
import { PrimeTableService } from 'src/services/prime-table.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-coffee-procured-tab',
    templateUrl: './coffee-procured-tab.component.html',
    styleUrls: ['./coffee-procured-tab.component.scss'],
})
export class CoffeeProcuredTabComponent implements OnInit {
    // tslint:disable: variable-name
    termStatus: any;
    display: any;
    appLanguage?: any;
    roaster_id: string;
    mainData: any[] = [];
    originArray: any[] = [];
    searchString = '';
    sellerItems = [
        { label: 'All origins', value: null },
        { label: 'Sweden', value: 'SE' },
        { label: 'UK', value: 'UK' },
        { label: 'India', value: 'IN' },
    ];
    displayItems = [
        { label: 'All', value: '' },
        { label: 'Display 10', value: 10 },
        { label: 'Display 20', value: 20 },
        { label: 'Display 25', value: 25 },
        { label: 'Display 50', value: 50 },
    ];
    @Input('form')
    set form(value: FormGroup) {
        this._form = value;
    }

    get form() {
        return this._form;
    }

    constructor(
        public globals: GlobalsService,
        public roasterService: RoasterserviceService,
        public router: Router,
        public cookieService: CookieService,
        public roasteryProfileService: RoasteryProfileService,
        public primeTableService: PrimeTableService,
        public fb: FormBuilder,
    ) {
        this.termStatus = { name: 'All origins', isoCode: '' };
        this.display = '10';
        this.roaster_id = this.cookieService.get('roaster_id');
        this.primeTableService.rows = 10;
        this.primeTableService.sortBy = 'created_at';
    }

    // tslint:disable: variable-name
    public _form: FormGroup;

    @ViewChild('procuredCoffeeTable', { static: true }) table: Table;
    public isMobile = false;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTableProcuredCoffee();
    }

    initializeTableProcuredCoffee() {
        this.primeTableService.windowWidth = window.innerWidth;

        if (this.primeTableService.windowWidth <= this.primeTableService.responsiveStartsAt) {
            this.primeTableService.isMobileView = true;
            this.primeTableService.allColumns = [
                {
                    field: 'id',
                    header: 'Order ID',
                    sortable: false,
                    width: 40,
                },
                {
                    field: 'order_reference',
                    header: 'Roaster order ref.',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'availability_name',
                    header: 'Availability Name',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'estate_name',
                    header: 'Estate Name',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'quantity',
                    header: 'Quantity',
                    sortable: false,
                    width: 50,
                },
            ];
        } else {
            this.primeTableService.isMobileView = false;
            this.primeTableService.allColumns = [
                {
                    field: 'id',
                    header: 'Order ID',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'availability_name',
                    header: 'Availibility Name',
                    sortable: false,
                    width: 70,
                },
                {
                    field: 'estate_name',
                    header: 'Estate Name',
                    sortable: false,
                    width: 70,
                },
                {
                    field: 'origin',
                    header: 'Origin',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'order_reference',
                    header: 'Roaster Ref. No.',
                    sortable: false,
                    width: 70,
                },
                {
                    field: 'varieties',
                    header: 'Variety',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'quantity',
                    header: 'Quantity',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'cup_score',
                    header: 'Cup score',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'status',
                    header: 'Status',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'actions',
                    header: 'Actions',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'options',
                    header: '',
                    sortable: false,
                    width: 30,
                },
            ];
        }
    }

    ngOnInit(): void {
        this.primeTableService.url = `/ro/${this.roaster_id}/procured-coffees`;

        this.initializeTableProcuredCoffee();

        this.primeTableService.form = this.form;

        this.primeTableService.form?.valueChanges.subscribe((data) =>
            setTimeout(() => {
                this.table.reset();
            }, 100),
        );

        this.appLanguage = this.globals.languageJson;
        // this.getProcuredCoffeeList();
        // this.originArray.push({ name: 'All origins', isoCode: '' });
        // this.originArray = this.originArray.concat(this.roasteryProfileService.countryList);
    }
    // getProcuredCoffeeList() {
    //     const origin = this.termStatus && this.termStatus.name !== 'All' ? this.termStatus.isoCode : undefined;
    //     const displayCount = this.display ? this.display : undefined;
    //     const searchString = this.searchString ? this.searchString : undefined;
    //     this.mainData = [];
    //     this.roasterService.getProcuredCoffeeList(this.roaster_id, origin, displayCount, searchString).subscribe(
    //         (response) => {
    //             console.log(response);
    //             if (response && response.result) {
    //                 this.mainData = response.result;
    //             }
    //         },
    //         (err) => {
    //             console.log(err);
    //         },
    //     );
    // }

    // setStatus(term: any, term1?) {
    //     this.termStatus = term;
    //     this.getProcuredCoffeeList();
    // }
    setStatus() {
        this.primeTableService.form?.patchValue({
            status: this.termStatus,
        });
        this.table.reset();
    }

    setDisplay() {
        if (this.display) {
            this.primeTableService.rows = this.display;
        } else {
            this.primeTableService.rows = 10;
        }

        this.table.reset();
    }

    onEdit(item) {
        let link = [];
        link = [`/features/lot-sale/${item.id}`];
        return link;
    }
}
