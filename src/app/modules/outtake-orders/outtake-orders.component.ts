import { isNgTemplate } from '@angular/compiler';
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResizeableComponent } from '@base-components';
import { COUNTRY_LIST } from '@constants';
import { OrganizationType, OuttakeOrderStatus } from '@enums';
import { ApiResponse, Download } from '@models';
import { TranslateService } from '@ngx-translate/core';
import {
    AuthService,
    DownloadService,
    GlobalsService,
    PrimeTableService,
    ResizeService,
    RoasterService,
} from '@services';
import { ConfirmComponent } from '@shared';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-outtake-orders',
    templateUrl: './outtake-orders.component.html',
    styleUrls: ['./outtake-orders.component.scss'],
})
export class OuttakeOrdersComponent extends ResizeableComponent implements OnInit {
    readonly OrgType = OrganizationType;
    searchTerm = '';
    statusItems;
    breadItems = [
        { label: this.translator.instant('home'), routerLink: '/' },
        { label: this.translator.instant('order_management') },
        { label: this.translator.instant('outtake_order') },
    ];
    originArray: any = [];
    roasterId: any;
    displayItems = [
        { label: this.translator.instant('display') + ' ' + 10, value: 10 },
        { label: this.translator.instant('display') + ' ' + 20, value: 20 },
        { label: this.translator.instant('display') + ' ' + 25, value: 25 },
        { label: this.translator.instant('display') + ' ' + 50, value: 50 },
    ];

    customerType = [
        { label: this.translator.instant('micro_roaster'), value: 'mr' },
        { label: this.translator.instant('horeca'), value: 'hrc' },
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
        private authService: AuthService,
        private dialogSrv: DialogService,
        private downloadService: DownloadService,
        private fb: FormBuilder,
        private roasterService: RoasterService,
        private toastrService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        public primeTableService: PrimeTableService,
    ) {
        super(resizeService);
        this.roasterId = this.authService.getOrgId();
        this.primeTableService.rows = 10;
        this.primeTableService.sortBy = 'order_date';
    }

    @ViewChild('markedTable', { static: true }) table: Table;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    initializeTable() {
        this.primeTableService.windowWidth = window.innerWidth;

        if (this.resizeService.isMobile()) {
            this.primeTableService.allColumns = [
                { field: 'product_name', header: 'customer_name' },
                { field: 'id', header: 'order_id' },
                { field: 'type_of_customer', header: 'type_of_customer' },
                { field: 'customer_name', header: 'customer_name' },
                { field: 'price', header: 'price' },
                { field: 'quantity', header: 'quantity' },
            ];
        } else {
            this.primeTableService.allColumns = [
                {
                    field: 'id',
                    header: 'order_id',
                    width: 9,
                },
                {
                    field: 'product_name',
                    header: 'product_name',
                    width: 14,
                },
                {
                    field: 'customer_name',
                    header: 'customer_name',
                    width: 14,
                },
                {
                    field: 'type_of_customer',
                    header: 'type_of_customer',
                    width: 12,
                },
                {
                    field: 'date_placed',
                    header: 'date_paced',
                    width: 11,
                },
                {
                    field: 'price',
                    header: 'price',
                    width: 10,
                },
                {
                    field: 'quantity',
                    header: 'quantity',
                    width: 10,
                },
                {
                    field: 'status',
                    header: 'status',
                    width: 10,
                },
                {
                    field: 'actions',
                    header: 'action',
                    width: 10,
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

    formatStatus(stringVal) {
        let formatVal = '';
        if (stringVal) {
            formatVal = stringVal.toLowerCase().charAt(0).toUpperCase() + stringVal.slice(1).toLowerCase();
            formatVal = formatVal.replace('_', ' ');
        }
        return formatVal.replace('-', '');
    }

    cancelOrderFromList(rowData: any) {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: this.translator.instant('confirm_cancel'),
                    desp: this.translator.instant('are_you_sure_want_to_cancel_the_order'),
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.roasterService.cancelOuttakeOrders(rowData.id).subscribe(
                        (res) => {
                            if (res.success) {
                                this.toastrService.success(this.translator.instant('the_order_canceled_successfully'));
                                this.table.reset();
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
        const params = {
            from_date: form.from_date ? moment(form.from_date).format('yyyy-MM-DD') : '',
            to_date: form.to_date ? moment(form.to_date).format('yyyy-MM-DD') : '',
        };
        this.roasterService.exportOuttakeOrders(form.export_type, params).subscribe((res: ApiResponse<any>) => {
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

    exportOrder(rowData: any) {
        this.roasterService.exportOuttakeOrders('pdf', { id: rowData.id }).subscribe((res: ApiResponse<any>) => {
            if (res.success && res.result.url) {
                const url = res.result.url;
                const fileName = url.split('?')[0].split('/').pop();

                this.downloadService.download(res.result.url, fileName, 'application/pdf').subscribe(
                    (response: Download) => {
                        if (response.state === 'DONE') {
                            this.toastrService.success('Downloaded successfully');
                        }
                    },
                    (error) => {
                        this.toastrService.error('Download failed');
                    },
                );
            }
        });
    }

    getMenuItemsForItem(item) {
        return [
            { label: this.translator.instant('edit'), routerLink: `/outtake-orders/view-order/${item.id}` },
            {
                label: this.translator.instant('view_green_coffee_order'),
                routerLink: `/green-coffee-management/procured-coffee/${item.order_id}`,
            },
            { label: this.translator.instant('export'), command: () => this.exportOrder(item) },
            {
                label: this.translator.instant('cancel'),
                command: () => this.cancelOrderFromList(item),
                visible: item.status !== OuttakeOrderStatus.CANCELLED,
            },
        ];
    }
}
