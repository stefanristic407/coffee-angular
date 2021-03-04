import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import * as moment from 'moment';
@Component({
    selector: 'app-api-key-requests',
    templateUrl: './api-key-requests.component.html',
    styleUrls: ['./api-key-requests.component.css'],
})
export class ApiKeyRequestsComponent implements OnInit {
    @Input() searchRequestId;
    @Input() filterData;
    @Input() dateRange;
    @Input() perPage;
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

    mainData: any[] = [
        { requested_by: 'Third wave coffee roasters', customer_type: 'Micro-Roaster', date_requested: '24 Jan 2020' },
        { requested_by: 'Home brew coffee', customer_type: 'Micro-Roaster', date_requested: '12 Jan 2020' },
        { requested_by: 'La Barista', customer_type: 'HoReCa', date_requested: '13 Oct 2018' },
        { requested_by: 'BRU coffee roastes', customer_type: 'Micro-Roaster', date_requested: '02 Dec 2019' },
        { requested_by: 'Blue Tokai roasters', customer_type: 'HoReCa', date_requested: '02 Oct 2019' },
        { requested_by: 'La Barista', customer_type: 'HoReCa', date_requested: '19 Sep 2019' },
    ];
    constructor(
        private roasterserviceService: RoasterserviceService,
        public cookieService: CookieService,
        public router: Router,
    ) {
        this.termStatus = '';
        this.display = '10';
        this.roasterID = this.cookieService.get('roaster_id');
    }

    ngOnChanges(changes: SimpleChange): void {
        console.log('changes-->>', changes);
        console.log('filterData', this.filterData);
        console.log('this.date range--.', this.dateRange);
        console.log('perPage---', this.perPage);
        if (this.dateRange?.length) {
            const [dateFrom, dateTo] = this.dateRange;
            this.dateFrom = dateFrom;
            this.dateTo = dateTo;
        } else {
            this.dateFrom = null;
            this.dateTo = null;
        }
        console.log('date from-->>', this.dateFrom);
        console.log('date To-->>', this.dateTo);
        this.getApiRequestData();
    }

    ngOnInit(): void {}

    viewRequestDetails(item: any) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                id: encodeURIComponent(item.id),
                status: encodeURIComponent(item.status),
            },
        };
        this.router.navigate(['/features/api-request-details'], navigationExtras);
    }
    getApiRequestData() {
        const data = {
            roaster_id: this.roasterID,
            page: this.pageNumber,
            per_page: this.perPage,
            org_type: this.filterData,
        };
        if (this.dateFrom && this.dateTo) {
            data['date_from'] = moment(this.dateFrom).format('YYYY-MM-DD');
            data['date_to'] = moment(this.dateTo).format('YYYY-MM-DD');
        }
        if (this.searchRequestId) {
            data['query'] = this.searchRequestId;
        }
        if (this.sortOrder && this.sortType) {
            data['sort_by'] = this.sortType;
            data['sort_order'] = this.sortOrder;
        }
        this.roasterserviceService.getApiKeysForRo(data).subscribe((res) => {
            console.log('res------->>>>>>', res);
            if (res.success) {
                this.loader = false;
                this.requestData = res.result;
                this.filterType.emit(res.result);
                this.totalRecords = res.result_info.total_count;
                this.rows = res.result_info.per_page;
                if (this.totalRecords < 10) {
                    this.paginationValue = false;
                } else {
                    this.paginationValue = true;
                }
                console.log('requestData', this.requestData);
            }
        });
    }

    getData(event) {
        this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
        this.sortType = event.sortField;
        console.log('event-->>>', event);
        if (event.sortField) {
            this.getApiRequestData();
        }
    }

    paginate(event) {
        console.log('event--->>>>', event);
        const page = event.page + 1;
        console.log('page-->>', page);
        this.pageNumber = event.page + 1;
        this.getApiRequestData();
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
    }

    setStatus(term: any) {
        this.termStatus = term;
        console.log(this.termStatus);
    }
    toggleStatus() {
        this.showStatus = !this.showStatus;
        if (this.showStatus === false) {
            document.getElementById('status_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('status_id').style.border = '1px solid #d6d6d6';
        }
    }

    setDisplay(displayData: any) {
        this.display = displayData;
    }
    toggleDisplay() {
        this.showDisplay = !this.showDisplay;
        if (this.showDisplay === false) {
            document.getElementById('display_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('display_id').style.border = '1px solid #d6d6d6';
        }
    }
    // Function Name : CheckAll
    // Description: This function helps to check all roles of the role list.
    checkAll(ev: any) {
        this.mainData.forEach((x) => (x.state = ev.target.checked));
    }

    // Function Name : IsAllchecked
    // Description: This function helps to check single role.
    isAllChecked() {
        return this.mainData.every((_) => _.state);
    }
}
