import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import {
    AuthService,
    DownloadService,
    GlobalsService,
    PrimeTableService,
    ResizeService,
    RoasterService,
} from '@services';
import { CookieService } from 'ngx-cookie-service';
import { COUNTRY_LIST } from '@constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { ResizeableComponent } from '@base-components';
import { ApiResponse, Download, LabelValue } from '@models';
import { OrganizationType } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';
import { PopoverDirective } from 'ngx-bootstrap/popover';

@Component({
    selector: 'app-outtake-orders',
    templateUrl: './outtake-orders.component.html',
    styleUrls: ['./outtake-orders.component.scss'],
})
export class OuttakeOrdersComponent extends ResizeableComponent implements OnInit {
    searchTerm = '';
    statusItems;
    breadItems = [
        { label: this.translator.instant('home'), routerLink: '/' },
        { label: this.translator.instant('order_management') },
        { label: this.translator.instant('outtake_order') },
    ];
    appLanguage?: any;
    originArray: any = [];
    roasterId: any;
    displayItems = [
        { label: this.globals.languageJson?.display + ' ' + 10, value: 10 },
        { label: this.globals.languageJson?.display + ' ' + 20, value: 20 },
        { label: this.globals.languageJson?.display + ' ' + 25, value: 25 },
        { label: this.globals.languageJson?.display + ' ' + 50, value: 50 },
    ];

    customerType = [
        { label: this.globals.languageJson?.micro_roaster, value: 'mr' },
        { label: this.globals.languageJson?.horeca, value: 'hrc' },
    ];
    forms: FormGroup;
    termStatus: any;
    customerStatus: any;
    termOrigin: any;
    display: number;
    startDate: string;
    endDate: string;
    queryParams: any = {};
    displayExportDialog = false;
    isDownloading = false;
    @ViewChild('pop') menuPopElement: any;
    readonly OrgType = OrganizationType;
    readonly exportForm = this.fb.group({
        from_date: this.fb.control(''),
        to_date: this.fb.control(''),
        export_type: this.fb.control('csv'),
    });

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
        private fb: FormBuilder,
        private roasterService: RoasterService,
        private cookieService: CookieService,
        public globals: GlobalsService,
        public primeTableService: PrimeTableService,
        private toastrService: ToastrService,
        protected resizeService: ResizeService,
        private authService: AuthService,
        private downloadService: DownloadService,
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
                    header: this.globals.languageJson?.type_of_customer,
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
                    header: this.globals.languageJson?.price,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'quantity',
                    header: this.globals.languageJson?.quantity,
                    sortable: false,
                    width: 50,
                },
            ];
        } else {
            this.primeTableService.isMobileView = false;
            this.primeTableService.allColumns = [
                {
                    field: 'order_id',
                    header: this.globals.languageJson?.order_id,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'product_name',
                    header: this.globals.languageJson?.product_name,
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
                    field: 'type_of_customer',
                    header: this.globals.languageJson?.type_of_customer,
                    sortable: false,
                    width: 80,
                },
                {
                    field: 'gc_odrer_id',
                    header: this.globals.languageJson?.gc_order_id,
                    sortable: false,
                    width: 80,
                },
                {
                    field: 'date_placed',
                    header: this.globals.languageJson?.date_paced,
                    sortable: false,
                    width: 60,
                },
                {
                    field: 'price',
                    header: this.globals.languageJson?.price,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'quantity',
                    header: this.globals.languageJson?.quantity,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'actions',
                    header: this.globals.languageJson?.action,
                    sortable: false,
                    width: 40,
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

            // Adding 1 day to include selected date into API filter range
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
        link = [`/outtake-orders/view-order/${item.id}`];
        return link;
    }

    onGreenCoffee(item) {
        let link = [];
        link = [`/green-coffee-management/procured-coffee/${item.order_id}`];
        return link;
    }

    formatStatus(stringVal) {
        let formatVal = '';
        if (stringVal) {
            formatVal = stringVal.toLowerCase().charAt(0).toUpperCase() + stringVal.slice(1).toLowerCase();
            formatVal = formatVal.replace('_', ' ');
        }
        return formatVal.replace('-', '');
    }

    cancelOrderFromList(rowData: any, popEl: any) {
        popEl.hide();
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: this.translator.instant('confirm_cancel'),
                    desp: this.translator.instant('are_you_sure_want_to_cancel_the_order'),
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.roasterService.cancelOuttakeOrders(this.roasterId, rowData.id).subscribe(
                        (response) => {
                            if (response && response.success) {
                                this.toastrService.success(this.translator.instant('the_order_canceled_successfully'));
                            } else {
                                this.toastrService.error(this.translator.instant('failed_to_cancel_the_order'));
                            }
                        },
                        (err) => {
                            this.toastrService.error(this.translator.instant('failed_to_cancel_the_order'));
                        },
                    );
                }
            });
    }
    showExportDialog(): void {
        this.displayExportDialog = true;
    }

    downloadOrderClicked(): void {
        const form = this.exportForm.value;
        this.isDownloading = true;
        this.roasterService
            .exportOuttakeOrders(this.roasterId, form.export_type, form.from_date, form.to_date)
            .subscribe((res: ApiResponse<any>) => {
                if (res.success && res.result.url) {
                    const url = res.result.url;
                    const fileName = url.split('?')[0].split('/').pop();
                    const mime = form.export_type === 'pdf' ? 'application/pdf' : 'text/plain';

                    this.downloadService.download(res.result.url, fileName, mime).subscribe(
                        (response: Download) => {
                            if (response.state === 'DONE') {
                                this.toastrService.success('Downloaded successfully');
                                this.displayExportDialog = false;
                                this.isDownloading = false;
                            }
                        },
                        (error) => {
                            this.toastrService.error('Download failed');
                            this.isDownloading = false;
                        },
                    );
                }
                this.isDownloading = false;
            });
    }
}
