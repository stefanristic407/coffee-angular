import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonService, OrdersService, ResizeService } from '@core/services';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { ApiResponse, LabelValue, OrderSummary, PageInfo } from '@core/models';
import { ORDER_STATUS_ITEMS, ORDER_TYPE_ITEMS } from '@core/constants';
import { ResizeableComponent } from '@core/base-components';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent extends ResizeableComponent implements OnInit {
    readonly statusItems = ORDER_STATUS_ITEMS;
    readonly orderTypeItems = ORDER_TYPE_ITEMS;
    readonly items: MenuItem[] = [
        { label: 'Home', routerLink: '/features/welcome-aboard' },
        { label: 'Order Management' }, // Do we need this item while we have no page for it?
        { label: 'My Orders' },
    ];

    readonly displayOptions: LabelValue[] = [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '25', value: 25 },
        { label: '50', value: 50 },
    ];

    readonly searchForm = this.fb.group({
        status: this.fb.control(null),
        search_query: this.fb.control(null),
        order_type: this.fb.control(null),
        page: this.fb.control(1),
        per_page: this.fb.control(10),
        sort_by: this.fb.control('date_received'),
        sort_order: this.fb.control('asc'),
    });

    readonly exportForm = this.fb.group({
        from_date: this.fb.control(''),
        to_date: this.fb.control(''),
        export_type: this.fb.control('csv'),
    });

    loading = false;
    orders: OrderSummary[] = [];
    pageInfo: PageInfo = { page: 1, per_page: 10, total_count: 0 };
    selectedOrders: OrderSummary[] = [];

    queryParams: any = {};
    displayExportDialog = false;

    constructor(
        private fb: FormBuilder,
        private orderService: OrdersService,
        protected resizeService: ResizeService,
        public commonService: CommonService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.orderService.orders$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res) => {
            if (res) {
                this.orders = res.result;
                this.pageInfo = res.result_info;
            }

            this.loading = false;
        });

        this.searchForm.valueChanges.pipe(takeUntil(this.unsubscribeAll$)).subscribe((value) => {
            this.queryParams = value;
            this.searchForm.patchValue({ page: 1 }, { emitEvent: false });
            this.loadOrders();
        });
    }

    loadOrders(event?: LazyLoadEvent): void {
        if (event) {
            const page = event.first / event.rows + 1;
            this.searchForm.patchValue(
                {
                    page,
                    sort_order: event.sortOrder === 1 ? 'asc' : 'desc',
                    sort_by: event.sortField,
                },
                { emitEvent: false },
            );
        }

        setTimeout(() => (this.loading = true), 0); // To prevent expression has been checked error
        this.orderService.loadOrders(this.searchForm.value);
    }

    showExportDialog() {
        this.displayExportDialog = true;
    }

    downloadOrderClicked() {
        const form = this.exportForm.value;
        this.orderService
            .downloadOrders(form.export_type, form.from_date, form.to_date)
            .subscribe((response: ApiResponse<any>) => {
                if (response.success) {
                    window.open(response.result.url, '_blank');
                }
            });
    }
}
