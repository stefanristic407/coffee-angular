import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService, ApiRequestService } from '@services';
import * as moment from 'moment';
@Component({
    selector: 'app-api-key-requests',
    templateUrl: './api-key-requests.component.html',
    styleUrls: ['./api-key-requests.component.scss'],
})
export class ApiKeyRequestsComponent implements OnInit, OnChanges {
    @Input() searchRequestId;
    @Input() filterData;
    @Input() dateRange;
    @Input() perPage;
    statusFilter = 'PENDING';
    @Output() filterType = new EventEmitter<any>();
    termStatus: any;
    showStatus = true;
    paginationValue = false;
    loader = true;
    totalRecords = 0;
    rows = 10;
    dateFrom: any;
    dateTo: any;
    pageNumber = 1;

    display: any;
    showDisplay = true;
    roasterID = '';
    requestData: any[] = [];
    sortOrder = '';
    sortType = '';
    constructor(
        public cookieService: CookieService,
        private apiRequestService: ApiRequestService,
        public router: Router,
        public globals: GlobalsService,
    ) {
        this.termStatus = '';
        this.display = '10';
        this.roasterID = this.cookieService.get('roaster_id');
    }
    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.dateRange?.length) {
            const [dateFrom, dateTo] = this.dateRange;
            this.dateFrom = dateFrom;
            this.dateTo = dateTo;
        } else {
            this.dateFrom = null;
            this.dateTo = null;
        }
        this.getApiRequestData();
    }

    getApiRequestData() {
        const data = {
            roaster_id: this.roasterID,
            page: this.pageNumber,
            per_page: this.perPage ? this.perPage : 10,
            org_type: this.filterData ? this.filterData : '',
            status: this.statusFilter,
        };
        if (this.dateFrom && this.dateTo) {
            const dateFrom = 'date_from';
            const dateTo = 'date_to';
            data[dateFrom] = moment(this.dateFrom).format('YYYY-MM-DD');
            data[dateTo] = moment(this.dateTo).format('YYYY-MM-DD');
        }
        if (this.searchRequestId) {
            const query = 'query';
            data[query] = this.searchRequestId;
        }
        if (this.sortOrder && this.sortType) {
            const sortBy = 'sort_by';
            data[sortBy] = this.sortType;
            const newLocal = 'sort_order';
            data[newLocal] = this.sortOrder;
        }
        this.apiRequestService.getApiKeysForRo(data).subscribe((res) => {
            if (res.success) {
                this.loader = false;
                this.requestData = res.result;
                this.filterType.emit(res.result);
                this.totalRecords = res.result_info.total_count;
                this.rows = res.result_info.per_page;
                if (this.totalRecords > 10) {
                    this.paginationValue = true;
                } else {
                    this.paginationValue = false;
                }
            }
        });
    }

    getTableData(event) {
        if (event.sortField) {
            this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
            this.sortType = event.sortField;
            const currentPage = event.first / this.rows;
            this.pageNumber = currentPage + 1;
            this.getApiRequestData();
        }
    }
}
