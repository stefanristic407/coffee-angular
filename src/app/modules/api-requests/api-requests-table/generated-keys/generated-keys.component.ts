import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import * as moment from 'moment';
import { ApiRequestService } from 'src/core/services/api/api-request.service';

@Component({
    selector: 'app-generated-keys',
    templateUrl: './generated-keys.component.html',
    styleUrls: ['./generated-keys.component.scss'],
})
export class GeneratedKeysComponent implements OnInit {
    @Input() searchRequestId;
    @Input() filterData;
    @Input() dateRange;
    @Input() perPage;
    @Output() filterType = new EventEmitter<any>();
    sortOrder = '';
    sortType = '';
    termStatus: any;
    showStatus = true;
    paginationValue = false;
    modalRef: BsModalRef;
    totalRecords = 0;
    rows = 10;
    dateFrom: any;
    dateTo: any;
    pageNumber = 1;
    generatedKeyData: any[] = [];

    display: any;
    showDisplay = true;
    roasterID = '';
    loader = true;

    constructor(
        private toastrService: ToastrService,
        private modalService: BsModalService,
        public cookieService: CookieService,
        private apiRequestService: ApiRequestService,
        public globals: GlobalsService,
    ) {
        this.termStatus = '';
        this.display = '10';
        this.roasterID = this.cookieService.get('roaster_id');
    }
    @ViewChild('deletetemplate') private deletetemplate: any;

    ngOnChanges(): void {
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
        this.getGeneratedRoKeys();
    }

    ngOnInit(): void {}

    getData(event) {
        this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
        this.sortType = event.sortField;
        console.log('event-->>>', event);
        if (event.sortField) {
            this.getGeneratedRoKeys();
        }
    }

    paginate(event) {
        const page = event.page + 1;
        this.pageNumber = event.page + 1;
        this.getGeneratedRoKeys();
    }

    getGeneratedRoKeys() {
        const data = {
            roaster_id: this.roasterID,
            page: this.pageNumber,
            per_page: this.perPage,
            org_type: this.filterData,
            query: this.searchRequestId,
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
        this.apiRequestService.getGeneratedRoKeys(data).subscribe((res) => {
            if (res.success) {
                this.loader = false;
                this.generatedKeyData = res.result;
                this.filterType.emit(res.result);
                this.totalRecords = res.result_info.total_count;
                this.rows = res.result_info.per_page;
                if (this.totalRecords < 10) {
                    this.paginationValue = false;
                } else {
                    this.paginationValue = true;
                }
                console.log('generatedKeyData', this.generatedKeyData);
            }
        });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    resumeKey(item: any) {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: item.id,
        };
        this.apiRequestService.enableRoApiKey(data).subscribe((res) => {
            if (res.success) {
                this.toastrService.success('Key has been reactivated!');
                item.is_active = true;
            }
        });
    }

    pauseKey(item: any) {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: item.id,
        };
        this.apiRequestService.disableRoApiKey(data).subscribe((res) => {
            if (res.success) {
                this.toastrService.success('Key access has been paused');
                item.is_active = false;
            }
        });
    }

    deleteKey() {
        this.openModal(this.deletetemplate);
    }

    onConfirm(id: any) {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: id,
        };
        this.apiRequestService.deleteRoApiKey(data).subscribe((res) => {
            if (res.success) {
                this.toastrService.error('Key has been delete');
                const index = this.generatedKeyData.findIndex((item) => item.id === id);
                const temp = JSON.parse(JSON.stringify(this.generatedKeyData));
                temp.splice(index, 1);
                this.generatedKeyData = temp;
                this.modalRef.hide();
            }
        });
    }

    notifyCustomer(id: any) {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: id,
        };
        this.apiRequestService.notifyRoCustomer(data).subscribe((res) => {
            console.log('res---<>>>', res);
            if (res.success) {
                this.toastrService.success('Key has been reactivated!');
            }
        });
    }
}
