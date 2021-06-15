import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService, GlobalsService, ResizeService } from '@services';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { MenuItem } from 'primeng/api';
import { ApiResponse, LabelValue } from '@models';
import { ORDER_STATUS_ITEMS, ORDER_TYPE_ITEMS } from '@constants';
import { ResizeableComponent } from '@base-components';
import { takeUntil } from 'rxjs/operators';
import { OrganizationType } from '@enums';
import { OrderTableComponent } from './order-table/order-table.component';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { TabView } from 'primeng/tabview/tabview';
import { RequestTableComponent } from './request-table/request-table.component';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent extends ResizeableComponent implements OnInit {
    readonly statusItems = ORDER_STATUS_ITEMS;
    readonly orderTypeItems = ORDER_TYPE_ITEMS;
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
        from_date: this.fb.control(''),
        to_date: this.fb.control(''),
        export_type: this.fb.control('csv'),
    });

    readonly origins$ = this.orderService.originList$.pipe(takeUntil(this.unsubscribeAll$));

    activeIndex = 0;
    organizationType = OrganizationType.ESTATE;
    queryParams: any = {};
    displayExportDialog = false;

    @ViewChild('appOrderTable') appOrderTable: OrderTableComponent;
    @ViewChild('requestTable') requestTable: RequestTableComponent;

    get customerPropertyName(): string {
        return this.organizationType === OrganizationType.ESTATE ? 'estate' : 'micro-roaster';
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private orderService: OrderManagementService,
        protected resizeService: ResizeService,
        public commonService: CommonService,
        public globals: GlobalsService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.orderService.loadOrigins();

        this.route.params.pipe(takeUntil(this.unsubscribeAll$)).subscribe((params) => {
            this.organizationType = params.orgType;
            if (
                this.organizationType !== OrganizationType.ESTATE &&
                this.organizationType !== OrganizationType.MICRO_ROASTER
            ) {
                this.router.navigateByUrl('/orders/es');
            }

            this.items = [
                { label: 'Home', routerLink: '/features/welcome-aboard' },
                { label: 'Order Management' }, // Do we need this item while we have no page for it?
                {
                    label:
                        this.organizationType === OrganizationType.ESTATE
                            ? 'Purchased Orders of Estates'
                            : this.globals.languageJson?.orders_by_mr,
                },
            ];
        });

        this.searchForm.valueChanges.pipe(takeUntil(this.unsubscribeAll$)).subscribe((value) => {
            const startDate = value.dates && value.dates[0] ? moment(value.dates[0]).format('yyyy-MM-DD') : '';

            // Adding 1 day to include selected date into API filter range
            const endDate =
                value.dates && value.dates[1] ? moment(value.dates[1]).add(1, 'day').format('yyyy-MM-DD') : '';

            this.queryParams = {
                ...value,
                page: 1,
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
    }

    showExportDialog(): void {
        this.displayExportDialog = true;
    }

    downloadOrderClicked(): void {
        const form = this.exportForm.value;
        this.orderService
            .downloadOrders(this.organizationType, form.export_type, form.from_date, form.to_date)
            .subscribe((response: ApiResponse<any>) => {
                if (response.success) {
                    window.open(response.result.url, '_blank');
                }
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
