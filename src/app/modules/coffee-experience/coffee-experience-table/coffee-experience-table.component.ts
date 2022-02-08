import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from '@app/modules/people/customer-management/customer-service.service';
import { ResizeableComponent } from '@base-components';
import { COUNTRY_LIST } from '@constants';
import { OrderStatus } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, GlobalsService, PrimeTableService, ResizeService, RoasterService } from '@services';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { takeUntil } from 'rxjs/operators';
import { CoffeeExpService } from '../coffee-experience.service';

@Component({
    selector: 'app-coffee-experience-table',
    templateUrl: './coffee-experience-table.component.html',
    styleUrls: ['./coffee-experience-table.component.scss'],
})
export class CoffeeExperienceTableComponent extends ResizeableComponent implements OnInit {
    orderId: any;

    @Input() coffeeExperienceData = [];
    @Input() customerType: any;
    rangeDates: any;
    selectedOrigin: string;
    items = [
        { label: this.globals.languageJson.home, routerLink: '/' },
        { label: this.globals.languageJson.brand_experience },
        { label: this.globals.languageJson.the_coffee_experience },
    ];
    displayItems = [
        { label: 'Display 10', value: 10 },
        { label: 'Display 20', value: 20 },
        { label: 'Display 25', value: 25 },
        { label: 'Display 50', value: 50 },
    ];
    roasterId: any;
    filteredCoffeeData: any[];
    filterDisplay: number;
    termStatus: any;
    display: any;
    startDate: string;
    endDate: string;
    queryParams: any = {};
    roasterID: string;
    mainData: any[] = [];
    originArray: any[] = [];
    procuredCoffeeListArray: any[];
    path: string;
    forms: FormGroup;
    searchString: string;
    @Input('form')
    set form(value: FormGroup) {
        this.forms = value;
    }

    get form() {
        return this.forms;
    }
    readonly searchForm = this.fb.group({
        dates: this.fb.control(''),
    });

    constructor(
        private authService: AuthService,
        private coffeeService: CoffeeExpService,
        private roasterService: RoasterService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        public activeRoute: ActivatedRoute,
        public cookieService: CookieService,
        public customer: CustomerServiceService,
        public fb: FormBuilder,
        public globals: GlobalsService,
        public primeTableService: PrimeTableService,
        public router: Router,
        public toastrService: ToastrService,
    ) {
        super(resizeService);
        this.display = 10;
        this.roasterId = this.authService.getOrgId();
        this.primeTableService.rows = 10;
        this.primeTableService.sortBy = 'created_at';
        this.primeTableService.sortOrder = 'desc';
        this.path = this.activeRoute.snapshot.routeConfig.path;
        if (this.path === 'orders' || this.path === 'mr-orders') {
            this.primeTableService.status = OrderStatus.Received;
        } else {
            this.primeTableService.status = '';
        }
    }

    @ViewChild('coffeeExpTable', { static: true }) table: Table;
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
                    field: 'name',
                    header: 'estate_name',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'origin',
                    header: 'origin',
                    sortable: true,
                    width: 40,
                },
                {
                    field: 'created_at',
                    header: 'ordered_date',
                    sortable: false,
                    width: 50,
                },
            ];
            if (this.path !== 'orders') {
                this.primeTableService.allColumns.splice(2, 1);
            } else {
                this.primeTableService.allColumns[2] = {
                    field: 'origin',
                    header: 'origin',
                    sortable: true,
                    width: 40,
                };
            }
        } else {
            if (this.path === 'orders') {
                this.primeTableService.isMobileView = false;
                this.primeTableService.allColumns = [
                    {
                        field: 'id',
                        header: 'Order ID',
                        sortable: true,
                        width: 55,
                    },
                    {
                        field: 'name',
                        header: 'estate_name',
                        sortable: true,
                        width: 60,
                    },
                    {
                        field: 'origin',
                        header: 'origin',
                        sortable: true,
                        width: 40,
                    },
                    {
                        field: 'created_at',
                        header: 'ordered_date',
                        sortable: true,
                        width: 60,
                    },
                    {
                        field: 'date_received',
                        header: 'recieved_date',
                        sortable: true,
                        width: 65,
                    },
                    {
                        field: 'varieties',
                        header: 'variety',
                        sortable: true,
                        width: 45,
                    },
                    {
                        field: 'quantity',
                        header: 'quantity',
                        sortable: true,
                        width: 50,
                    },
                    {
                        field: 'cup_score',
                        header: 'cupping_score',
                        sortable: true,
                        width: 65,
                    },
                    {
                        field: 'actions',
                        header: 'actions',
                        sortable: false,
                        width: 60,
                    },
                ];
            } else if (this.path === 'mr-orders') {
                this.primeTableService.isMobileView = false;
                this.primeTableService.allColumns = [
                    {
                        field: 'id',
                        header: 'Order ID',
                        sortable: true,
                        width: 45,
                    },
                    {
                        field: 'name',
                        header: 'customer_name',
                        sortable: true,
                        width: 60,
                    },
                    {
                        field: 'product_name',
                        header: 'product_name',
                        sortable: true,
                        width: 60,
                    },
                    {
                        field: 'created_at',
                        header: 'date_ordered',
                        sortable: true,
                        width: 60,
                    },
                    {
                        field: 'varieties',
                        header: 'variety',
                        sortable: true,
                        width: 40,
                    },
                    {
                        field: 'quantity',
                        header: 'quantity',
                        sortable: true,
                        width: 40,
                    },
                    {
                        field: 'cup_score',
                        header: 'cupping_score',
                        sortable: true,
                        width: 60,
                    },
                    {
                        field: 'actions',
                        header: 'actions',
                        sortable: false,
                        width: 50,
                    },
                ];
            } else if (this.path === 'hrc-orders') {
                this.primeTableService.isMobileView = false;
                this.primeTableService.allColumns = [
                    {
                        field: 'id',
                        header: 'Order ID',
                        sortable: true,
                        width: 40,
                    },
                    {
                        field: 'sub_order_id',
                        header: 'Sub Order ID',
                        sortable: true,
                        width: 45,
                    },
                    {
                        field: 'name',
                        header: 'customer_name',
                        sortable: true,
                        width: 50,
                    },
                    {
                        field: 'product_name',
                        header: 'product_name',
                        sortable: true,
                        width: 50,
                    },
                    {
                        field: 'order_date',
                        header: 'date_ordered',
                        sortable: true,
                        width: 45,
                    },
                    {
                        field: 'roast_level',
                        header: 'ro_roast_level',
                        sortable: true,
                        width: 40,
                    },
                    {
                        field: 'quantity',
                        header: 'quantity',
                        sortable: true,
                        width: 40,
                    },
                    {
                        field: 'actions',
                        header: 'actions',
                        sortable: false,
                        width: 45,
                    },
                ];
            } else if (this.path === 'outtake-orders') {
                this.primeTableService.isMobileView = false;
                this.primeTableService.allColumns = [
                    {
                        field: 'id',
                        header: 'Order ID',
                        sortable: false,
                        width: 45,
                    },
                    {
                        field: 'customer_name',
                        header: 'customer_name',
                        sortable: false,
                        width: 70,
                    },
                    {
                        field: 'product_name',
                        header: 'product_name',
                        sortable: false,
                        width: 65,
                    },
                    {
                        field: 'order_date',
                        header: 'date_ordered',
                        sortable: true,
                        width: 50,
                    },
                    {
                        field: 'order_id',
                        header: 'estate_order_id',
                        sortable: false,
                        width: 50,
                    },
                    {
                        field: 'gc_total_quantity',
                        header: 'quantity',
                        sortable: true,
                        width: 40,
                    },
                    {
                        field: 'actions',
                        header: 'actions',
                        sortable: false,
                        width: 45,
                    },
                ];
            }
        }
    }

    ngOnInit(): void {
        this.coffeeService.clearSearch();
        this.coffeeService.search$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res: any) => {
            this.search(res);
        });

        this.primeTableService.url = `/ro/${this.roasterId}/${this.path}`;
        this.initializeTableProcuredCoffee();
        this.primeTableService.form = this.form;
        (this.primeTableService.type = 'GC_ORDER'),
            this.primeTableService.form?.valueChanges.subscribe((data) =>
                setTimeout(() => {
                    this.table.reset();
                }, 100),
            );
        this.searchForm.valueChanges.pipe(takeUntil(this.unsubscribeAll$)).subscribe((value) => {
            this.startDate = value.dates && value.dates[0] ? moment(value.dates[0]).format('yyyy-MM-DD') : '';
            this.endDate =
                value.dates && value.dates[1] ? moment(value.dates[1]).add(1, 'day').format('yyyy-MM-DD') : '';

            if (this.path !== 'outtake-orders') {
                this.queryParams = {
                    ...value,
                    page: 1,
                    start_date: this.startDate,
                    end_date: this.endDate,
                };

                delete this.queryParams.dates;

                this.searchForm.patchValue({ page: 1 }, { emitEvent: false });
                this.primeTableService.start_date = this.startDate;
                this.primeTableService.end_date = this.endDate;
            } else if (this.path === 'outtake-orders') {
                this.queryParams = {
                    ...value,
                    page: 1,
                    from_date: this.startDate,
                    to_date: this.endDate,
                };

                delete this.queryParams.dates;

                this.searchForm.patchValue({ page: 1 }, { emitEvent: false });
                this.primeTableService.from_date = this.startDate;
                this.primeTableService.to_date = this.endDate;
            }

            setTimeout(() => {
                this.table.reset();
            }, 0);
        });
        this.getCoffeeExpOrders();
    }

    setStatus() {
        this.primeTableService.origin = this.termStatus;
        this.table.reset();
    }
    search(item) {
        if (this.path === 'orders' || this.path === 'mr-orders') {
            this.primeTableService.searchQuery = item;
        } else {
            this.primeTableService.query = item;
        }
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
        if (this.path === 'orders') {
            this.router.navigate([`/coffee-experience/coffee-details/`], {
                queryParams: {
                    estate_id: item.id,
                },
            });
        } else if (this.path === 'mr-orders') {
            this.router.navigate([`/coffee-experience/coffee-details/`], {
                queryParams: {
                    micro_roasters_id: item.id,
                },
            });
        } else if (this.path === 'hrc-orders') {
            this.router.navigate([`/coffee-experience/coffee-details/`], {
                queryParams: {
                    hrc_id: item.order_id,
                },
            });
        } else if (this.path === 'outtake-orders') {
            this.router.navigate([`/coffee-experience/coffee-details/`], {
                queryParams: {
                    outtake_orders_id: item.id,
                },
            });
        }
    }

    getData(event) {
        this.primeTableService.getData(event);
        this.getCoffeeExpOrders();
    }

    getCoffeeExpOrders() {
        if (this.path === 'orders') {
            const queryParams = {
                sort_order: 'desc',
                page: this.primeTableService.currentPage,
                per_page: this.primeTableService.rows,
                sort_by: 'created_at',
                order_type: 'GC_ORDER',
                status: 'RECEIVED',
            };
            this.originArray = [];
            this.roasterService
                .getCoffeeExperienceOrders(this.roasterId, this.path, queryParams)
                .subscribe((res: any) => {
                    res.result.map((org) => {
                        COUNTRY_LIST.find((item) => {
                            if (org.origin && item.isoCode && org.origin.toUpperCase() === item.isoCode) {
                                this.originArray.push(item);
                            }
                        });
                    });
                    this.originArray = this.originArray.filter(
                        (v, i, a) => a.findIndex((t) => t.isoCode === v.isoCode) === i,
                    );
                });
        }
    }

    getMenuItems(item) {
        return [
            {
                label: this.translator.instant('view_details'),
                command: () => this.availabilityPage(item),
                visible: this.path === 'orders',
            },
            {
                label: this.translator.instant('update_details'),
                command: () => this.availabilityPage(item),
                visible: this.path !== 'orders',
            },
        ];
    }
}
