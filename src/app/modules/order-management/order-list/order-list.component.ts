import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { MR_ORDER_STATUS_ITEMS, MR_ORDER_TYPE_ITEMS, ORDER_STATUS_ITEMS, ORDER_TYPE_ITEMS } from '@constants';
import { OrganizationType } from '@enums';
import { ApiResponse, Download, LabelValue } from '@models';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { TranslateService } from '@ngx-translate/core';
import { DownloadService, ResizeService } from '@services';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { OrderTableComponent } from './order-table/order-table.component';
import { RequestTableComponent } from './request-table/request-table.component';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent extends ResizeableComponent implements OnInit {
    readonly ORDER_STATUS_ITEMS = ORDER_STATUS_ITEMS;
    readonly MR_ORDER_STATUS_ITEMS = MR_ORDER_STATUS_ITEMS;
    readonly ORDER_TYPE_ITEMS = ORDER_TYPE_ITEMS;
    readonly MR_ORDER_TYPE_ITEMS = MR_ORDER_TYPE_ITEMS;
    readonly OrgType = OrganizationType;

    items: MenuItem[] = [];

    readonly displayOptions: LabelValue[] = [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '25', value: 25 },
        { label: '50', value: 50 },
    ];

    readonly searchForm = this.fb.group({
        origin: this.fb.control(null),
        status: this.fb.control(null),
        search_query: this.fb.control(null),
        order_type: this.fb.control(null),
        dates: this.fb.control(null),
        page: this.fb.control(1),
        per_page: this.fb.control(10),
        sort_by: this.fb.control('created_at'),
        sort_order: this.fb.control('desc'),
    });

    readonly exportForm = this.fb.group({
        from_date: this.fb.control('', [Validators.required]),
        to_date: this.fb.control('', [Validators.required]),
        export_type: this.fb.control('csv'),
    });

    readonly origins$ = this.orderService.originList$.pipe(takeUntil(this.unsubscribeAll$));

    activeIndex = 0;
    orgType = OrganizationType.ESTATE;
    queryParams: any = {};
    displayExportDialog = false;
    isDownloading = false;

    @ViewChild('appOrderTable') appOrderTable: OrderTableComponent;
    @ViewChild('requestTable') requestTable: RequestTableComponent;

    constructor(
        private downloadService: DownloadService,
        private fb: FormBuilder,
        private orderService: OrderManagementService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.orderService.loadOrigins();

        this.searchForm.valueChanges
            .pipe(debounceTime(600))
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((value) => {
                const startDate = value.dates && value.dates[0] ? moment(value.dates[0]).format('yyyy-MM-DD') : '';
                // Adding 1 day to include selected date into API filter range
                const endDate =
                    value.dates && value.dates[1] ? moment(value.dates[1]).add(1, 'day').format('yyyy-MM-DD') : '';

                this.queryParams = {
                    ...value,
                    page: 1,
                    per_page: value.per_page ?? 10,
                    start_date: startDate,
                    end_date: endDate,
                };

                delete this.queryParams.dates;

                setTimeout(() => {
                    if (this.activeIndex > 0) {
                        this.requestTable.loadRequests();
                    } else {
                        this.appOrderTable.loadOrders();
                    }
                }, 0);
            });

        this.route.params.pipe(takeUntil(this.unsubscribeAll$)).subscribe((params) => {
            this.orgType = params.orgType;
            this.activeIndex = 0;
            this.resetFilter();
            if (this.orgType !== OrganizationType.ESTATE && this.orgType !== OrganizationType.MICRO_ROASTER) {
                this.router.navigateByUrl('/orders/es');
            }

            this.items = [
                { label: this.translator.instant('home'), routerLink: '/' },
                { label: this.translator.instant('order_management') }, // Do we need this item while we have no page for it?
                {
                    label:
                        this.orgType === OrganizationType.ESTATE
                            ? 'Purchased orders of estates'
                            : this.translator.instant('orders_by_mr'),
                },
            ];
        });
    }

    showExportDialog(): void {
        this.displayExportDialog = true;
    }

    downloadOrderClicked(): void {
        if (!this.exportForm.valid) {
            this.toastrService.error(this.translator.instant('select_start_end_date_for_order'));
            return;
        }
        const form = this.exportForm.value;
        this.isDownloading = true;
        this.orderService
            .downloadOrders(
                this.orgType,
                form.export_type,
                form.from_date,
                moment(form.to_date).add(1, 'days').format('YYYY-MM-DD'),
            )
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

    resetOriginFilter(): void {
        this.searchForm.patchValue({ origin: null });
    }

    resetFilter(): void {
        this.searchForm.patchValue({
            origin: null,
            status: null,
            search_query: null,
            order_type: null,
            dates: null,
            page: 1,
        });
    }
}
