import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { COUNTRY_LIST } from '@constants';
import { OrganizationType } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, ResizeService, RoasterService } from '@services';
import { PrimeTableService } from '@services';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-coffee-procured-tab',
    templateUrl: './coffee-procured-tab.component.html',
    styleUrls: ['./coffee-procured-tab.component.scss'],
})
export class CoffeeProcuredTabComponent extends ResizeableComponent implements OnInit {
    readonly OrgType = OrganizationType;
    termStatus: any;
    selectedEstate: any;
    display: any;
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
    estatesList: any[] = [];
    @Input('form')
    set form(value: FormGroup) {
        this._form = value;
    }

    get form() {
        return this._form;
    }

    constructor(
        private authService: AuthService,
        private roasterService: RoasterService,
        private router: Router,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        public primeTableService: PrimeTableService,
    ) {
        super(resizeService);
        this.display = 10;
        this.roasterID = this.authService.getOrgId();
        this.primeTableService.rows = 10;
        this.primeTableService.sortBy = 'created_at';
        this.primeTableService.sortOrder = 'desc';
        this.primeTableService.origin = null;
        this.primeTableService.searchQuery = null;
    }

    // tslint:disable: variable-name
    public _form: FormGroup;

    @ViewChild('procuredCoffeeTable', { static: true }) table: Table;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTableProcuredCoffee();
    }

    initializeTableProcuredCoffee() {
        this.primeTableService.windowWidth = window.innerWidth;

        if (this.resizeService.isMobile()) {
            this.primeTableService.allColumns = [
                {
                    field: 'id',
                    header: 'order_id',
                },
                {
                    field: 'availability_name',
                    header: 'availability_name',
                },
                {
                    field: 'estate_name',
                    header: 'estate_name',
                },
                {
                    field: 'order_reference',
                    header: 'roaster_ref_no',
                },
                {
                    field: 'quantity',
                    header: 'quantity',
                },
                {
                    field: 'varieties',
                    header: 'variety',
                },
                {
                    field: 'remaining_total_quantity',
                    header: 'remaining_quantity',
                },
            ];
        } else {
            this.primeTableService.allColumns = [
                {
                    field: 'id',
                    header: 'Order ID',
                    width: 9,
                },
                {
                    field: 'availability_name',
                    header: 'availability_name',
                    width: 12,
                },
                {
                    field: 'estate_name',
                    header: 'estate_name',
                    width: 12,
                },
                {
                    field: 'origin',
                    header: 'origin',
                    width: 9,
                },
                {
                    field: 'order_reference',
                    header: 'roaster_ref_no',
                    width: 12,
                },
                {
                    field: 'varieties',
                    header: 'variety',
                    width: 12,
                },
                {
                    field: 'quantity',
                    header: 'quantity',
                    width: 10,
                },
                {
                    field: 'remaining_total_quantity',
                    header: 'remaining_quantity',
                    width: 14,
                },
                {
                    field: 'actions',
                    header: 'actions',
                    width: 10,
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
        this.roasterService.getProcuredCoffeeList().subscribe((res) => {
            (res.result || []).map((org) => {
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
        this.selectedEstate = null;
        this.table.reset();
    }
    setEstate(value) {
        this.primeTableService.searchQuery = value.estate_name;
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
        this.router.navigateByUrl('/green-coffee-management/procured-coffee/' + item.id);
    }

    sourcingRedirect(item) {
        this.router.navigateByUrl(`/sourcing/coffee-details/${item?.harvest_id}`);
    }

    viewOrderPage(item) {
        this.router.navigateByUrl(`/orders/es/${item?.id}`);
    }

    getMenuItemsForItem(item) {
        return [
            {
                label: this.translator.instant('view_order_page'),
                command: () => {
                    this.viewOrderPage(item);
                },
            },
            {
                label: this.translator.instant('go_to_availability_page'),
                command: () => {
                    this.sourcingRedirect(item);
                },
            },
        ];
    }

    getEstatesList(event: any) {
        const searchStr: string = (event?.query || '').trim();
        this.roasterService.getProcuredCoffeeList({ search_query: searchStr }).subscribe((res) => {
            this.estatesList = (res.result || []).filter(
                (v, i, a) => a.findIndex((t) => t.estate_id === v.estate_id) === i,
            );
        });
    }
}
