import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { AuthService, GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { PrimeTableService } from '@services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { COUNTRY_LIST } from '@constants';

@Component({
    selector: 'app-coffee-procured-tab',
    templateUrl: './coffee-procured-tab.component.html',
    styleUrls: ['./coffee-procured-tab.component.scss'],
})
export class CoffeeProcuredTabComponent implements OnInit {
    termStatus: any;
    display: any;
    appLanguage?: any;
    roasterID: number;
    mainData: any[] = [];
    originArray: any[] = [];
    displayItems = [
        { label: 'Display 10', value: 10 },
        { label: 'Display 20', value: 20 },
        { label: 'Display 25', value: 25 },
        { label: 'Display 50', value: 50 },
    ];
    procuredCoffeeListArray: any[];
    disableAction = false;
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
        public primeTableService: PrimeTableService,
        public fb: FormBuilder,
        private authService: AuthService,
    ) {
        this.display = 10;
        this.roasterID = this.authService.getOrgId();
        this.primeTableService.rows = 10;
        this.primeTableService.sortBy = 'created_at';
        this.primeTableService.sortOrder = 'desc';
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
                    header: 'order_id',
                    sortable: false,
                    width: 40,
                },
                {
                    field: 'order_reference',
                    header: 'roaster_ref_no',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'availability_name',
                    header: 'availability_name',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'estate_name',
                    header: 'estate_name',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'quantity',
                    header: 'quantity',
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
                    width: 45,
                },
                {
                    field: 'availability_name',
                    header: 'availability_name',
                    sortable: false,
                    width: 60,
                },
                {
                    field: 'estate_name',
                    header: 'estate_name',
                    sortable: false,
                    width: 70,
                },
                {
                    field: 'origin',
                    header: 'origin',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'order_reference',
                    header: 'roaster_ref_no',
                    sortable: false,
                    width: 60,
                },
                {
                    field: 'varieties',
                    header: 'variety',
                    sortable: false,
                    width: 40,
                },
                {
                    field: 'quantity',
                    header: 'quantity',
                    sortable: false,
                    width: 40,
                },
                {
                    field: 'remaining_total_quantity',
                    header: 'remaining_quantity',
                    sortable: false,
                    width: 70,
                },
                {
                    field: 'actions',
                    header: 'actions',
                    sortable: false,
                    width: 40,
                },
                {
                    field: 'options',
                    header: '',
                    sortable: false,
                    width: 15,
                },
            ];
        }
    }

    ngOnInit(): void {
        this.primeTableService.url = '';
        this.primeTableService.url = `/ro/${this.roasterID}/procured-coffees`;
        this.initializeTableProcuredCoffee();
        this.primeTableService.form = this.form;
        this.primeTableService.form?.valueChanges.subscribe((data) =>
            setTimeout(() => {
                this.table.reset();
            }, 100),
        );
        this.appLanguage = this.globals.languageJson;
        this.roasterService.getProcuredCoffeeList(this.roasterID).subscribe((res) => {
            res.result.map((org) => {
                COUNTRY_LIST.find((item) => {
                    if (org.origin.toUpperCase() === item.isoCode) {
                        this.originArray.push(item);
                    }
                });
            });
            this.originArray = this.originArray.filter((v, i, a) => a.findIndex((t) => t.isoCode === v.isoCode) === i);
        });
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
        if (!this.disableAction) {
            this.router.navigateByUrl('/green-coffee-management/procured-coffee/' + item.id);
        }
    }

    menuClicked() {
        this.disableAction = true;
        setTimeout(() => {
            this.disableAction = false;
        }, 100);
    }

    sourcingRedirect(item) {
        this.router.navigateByUrl(`/sourcing/coffee-details/${item?.estate_id}/${item?.harvest_id}`);
    }

    viewOrderPage(item) {
        this.router.navigateByUrl(`/orders/es/${item?.id}`);
    }
}
