import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResizeableComponent } from '@base-components';
import { COUNTRY_LIST } from '@constants';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, GlobalsService, PrimeTableService, ResizeService } from '@services';
import * as moment from 'moment';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-micro-roaster-invite',
    templateUrl: './micro-roaster-invite.component.html',
    styleUrls: ['./micro-roaster-invite.component.scss'],
})
export class MicroRoasterInviteComponent extends ResizeableComponent implements OnInit {
    searchTerm = '';
    statusItems;
    microRoasterLink = { invite_url: 'www.google.com' };
    breadItems = [
        { label: this.translator.instant('home'), routerLink: '/' },
        { label: this.translator.instant('micro_roaster_invite') },
    ];
    appLanguage?: any;
    originArray: any = [];
    roasterId: any;
    status = [
        { label: this.globals.languageJson?.approved, value: 'approved' },
        { label: this.globals.languageJson?.rejected, value: 'rejected' },
    ];
    forms: FormGroup;
    termStatus: any;
    customerStatus: any;
    termOrigin: any;
    display: number;
    startDate: string;
    endDate: string;
    queryParams: any = {};

    get form() {
        return this.forms;
    }
    readonly searchForm = this.fb.group({
        dates: this.fb.control(''),
    });
    constructor(
        private fb: FormBuilder,
        public globals: GlobalsService,
        public primeTableService: PrimeTableService,
        protected resizeService: ResizeService,
        private authService: AuthService,
        private translator: TranslateService,
        public dialogSrv: DialogService,
    ) {
        super(resizeService);
        this.roasterId = this.authService.getOrgId();
        this.primeTableService.rows = 10;
        this.primeTableService.sortBy = 'order_date';
    }

    @ViewChild('markedTable', { static: true }) table: Table;
    public isMobile = false;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    initializeTable() {
        this.primeTableService.windowWidth = window.innerWidth;

        if (this.primeTableService.windowWidth <= this.primeTableService.responsiveStartsAt) {
            this.primeTableService.isMobileView = true;
            this.primeTableService.allColumns = [
                {
                    field: 'type_of_customer',
                    header: this.globals.languageJson?.company_name,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'customer_name',
                    header: this.globals.languageJson?.customer_name,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'price',
                    header: this.globals.languageJson?.email,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'quantity',
                    header: this.globals.languageJson?.city_name,
                    sortable: false,
                    width: 50,
                },
            ];
        } else {
            this.primeTableService.isMobileView = false;
            this.primeTableService.allColumns = [
                {
                    field: 'product_name',
                    header: this.globals.languageJson?.company_name,
                    sortable: false,
                    width: 80,
                },
                {
                    field: 'customer_name',
                    header: this.globals.languageJson?.customer_name,
                    sortable: false,
                    width: 80,
                },
                {
                    field: 'gc_odrer_id',
                    header: this.globals.languageJson?.email,
                    sortable: false,
                    width: 80,
                },
                {
                    field: 'date_placed',
                    header: this.globals.languageJson?.created_on,
                    sortable: false,
                    width: 60,
                },
                {
                    field: 'price',
                    header: this.globals.languageJson?.city_name,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'quantity',
                    header: this.globals.languageJson?.status,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'actions',
                    header: this.globals.languageJson?.action,
                    sortable: false,
                    width: 40,
                },
            ];
        }
    }

    ngOnInit(): void {
        this.primeTableService.url = `/ro/${this.roasterId}/outtake-orders`;

        this.initializeTable();
        this.originArray = COUNTRY_LIST;
        this.primeTableService.form = this.form;

        this.primeTableService.form?.valueChanges.subscribe((data) =>
            setTimeout(() => {
                this.table.reset();
            }, 100),
        );

        this.appLanguage = this.globals.languageJson;
        this.searchForm.valueChanges.pipe(takeUntil(this.unsubscribeAll$)).subscribe((value) => {
            this.startDate = value.dates && value.dates[0] ? moment(value.dates[0]).format('yyyy-MM-DD') : '';

            this.endDate =
                value.dates && value.dates[1] ? moment(value.dates[1]).add(1, 'day').format('yyyy-MM-DD') : '';

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
            setTimeout(() => {
                this.table.reset();
            }, 0);
        });
    }
    setStatus() {
        this.primeTableService.customer_type = this.customerStatus;
        this.table.reset();
    }
    setOrigin() {
        this.primeTableService.origin = this.termOrigin;
        this.table.reset();
    }
    search() {
        this.primeTableService.query = this.searchTerm;
        this.table.reset();
    }

    onView(item) {
        let link = [];
        link = [`/mr-invite/details`];
        return link;
    }
}
