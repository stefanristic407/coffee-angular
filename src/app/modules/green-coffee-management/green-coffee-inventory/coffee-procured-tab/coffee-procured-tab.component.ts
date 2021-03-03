import { Component, OnInit, Input, ViewChild, HostListener, AfterViewInit, AfterContentInit } from '@angular/core';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';
import { NavigationExtras, Router } from '@angular/router';
import { PrimeTableService } from '@services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-coffee-procured-tab',
    templateUrl: './coffee-procured-tab.component.html',
    styleUrls: ['./coffee-procured-tab.component.scss'],
})
export class CoffeeProcuredTabComponent implements OnInit {
    termStatus: any;
    display: any;
    appLanguage?: any;
    roasterID: string;
    mainData: any[] = [];
    originArray: any[] = [];
    searchString = '';
    markedCoffeeSaleLists: any = [];
    // sellerItems = [
    //     { label: 'Sweden', value: 'SE' },
    //     { label: 'UK', value: 'UK' },
    //     { label: 'India', value: 'IN' },
    // ];
    displayItems = [
        { label: 'Display 10', value: 10 },
        { label: 'Display 20', value: 20 },
        { label: 'Display 25', value: 25 },
        { label: 'Display 50', value: 50 },
    ];
    procuredCoffeeListArray: any[];
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
        private userService: UserserviceService,
        private toastrService: ToastrService,
        public router: Router,
        public cookieService: CookieService,
        public roasteryProfileService: RoasteryProfileService,
        public primeTableService: PrimeTableService,
        public fb: FormBuilder,
    ) {
        // this.termStatus = '';
        this.display = 10;
        this.roasterID = this.cookieService.get('roaster_id');
        this.primeTableService.rows = 10;
        this.primeTableService.sortBy = 'created_at';
        this.roasterService.getCoffeeSaleList(this.roasterID).subscribe((res) => {
            if (res.result && res.success) {
                this.primeTableService.markedCoffeeSaleLists = res.result;
            }
        });
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
                    width: 40,
                },
                {
                    field: 'availability_name',
                    header: 'Availibility Name',
                    sortable: false,
                    width: 80,
                },
                {
                    field: 'estate_name',
                    header: 'Estate Name',
                    sortable: false,
                    width: 90,
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
                    width: 60,
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
        this.primeTableService.url = `/ro/${this.roasterID}/procured-coffees`;

        this.initializeTableProcuredCoffee();

        this.primeTableService.form = this.form;

        this.originArray = this.globals.countryList;

        this.primeTableService.form?.valueChanges.subscribe((data) =>
            setTimeout(() => {
                this.table.reset();
            }, 100),
        );

        this.appLanguage = this.globals.languageJson;
    }

    setStatus() {
        this.primeTableService.origin = this.termStatus;
        this.table.reset();
    }
    search(item) {
        this.primeTableService.searchQuery = item;
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

    availabilityPage(item) {
        return `/green-coffee-management/procured-coffee/${item.id}`;
    }
    sourcingRedirect(item) {
        this.userService.getGreenCoffeeDetails(this.roasterID, item.harvest_id).subscribe((res) => {
            if (res.success) {
                return `/sourcing/coffee-list/${res.result?.estate_id}/${res.result?.harvest_id}`;
            } else {
                this.toastrService.error('Error while getting the Availability details');
            }
        });
    }

    viewOrderPage(item) {
        if (item.type === 'GC_ORDER') {
            return `/ordermanagement/order-booked`;
        } else if (item.type === 'GC_ORDER_SAMPLE') {
            return `/ordermanagement/order-sample`;
        } else if (item.type === 'PREBOOK_LOT') {
            return `/ordermanagement/order-prebook`;
        }
    }
}
