import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
<<<<<<< HEAD
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
=======
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import * as moment from 'moment';
>>>>>>> develop

@Component({
    selector: 'app-generated-keys',
    templateUrl: './generated-keys.component.html',
    styleUrls: ['./generated-keys.component.css'],
})
export class GeneratedKeysComponent implements OnInit {
    @Input() searchRequestId;
    @Input() filterData;
    @Input() dateRange;
    @Input() perPage;
    sortOrder = '';
    sortType = '';
    termStatus: any;
    showStatus = true;
    paginationValue = false;
    modalRef: BsModalRef;
    resumeTemplate = false;
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
        private roasterserviceService: RoasterserviceService,
        public cookieService: CookieService,
    ) {
        this.termStatus = '';
        this.display = '10';
        this.roasterID = this.cookieService.get('roaster_id');
    }
    @ViewChild('deletetemplate') private deletetemplate: any;

    ngOnChanges(): void {
        console.log('filterData', this.filterData);
        console.log('this.date range--.', this.dateRange);
        console.log('per page===>>>', this.perPage);
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
        console.log('event--->>>>', event);
        const page = event.page + 1;
        console.log('page-->>', page);
        this.pageNumber = event.page + 1;
        this.getGeneratedRoKeys();
        // event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
    }

    getGeneratedRoKeys() {
        const data = {
            roaster_id: this.roasterID,
            page: this.pageNumber,
            per_page: this.perPage,
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
        this.roasterserviceService.getGeneratedRoKeys(data).subscribe((res) => {
            console.log('res------->>>>>>', res);
            if (res.success) {
                this.loader = false;
                this.generatedKeyData = res.result;
                this.totalRecords = res.result_info.total_count;
                this.rows = res.result_info.per_page;
                if (this.totalRecords < 10) {
                    this.paginationValue = false;
                } else {
                    this.paginationValue = true;
                }
                console.log('generatedKeyData', this.generatedKeyData);
            }

            setTimeout(() => {
                this.loader = false;
            }, 1000);
        });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    resumeKey(id: any) {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: id,
        };
        this.roasterserviceService.enableRoApiKey(data).subscribe((res) => {
            console.log('res---<>>>', res);
            if (res.success) {
                this.toastrService.success('Key has been reactivated!');
                this.resumeTemplate = false;
            }
        });
    }

    pauseKey(id: any) {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: id,
        };
        this.roasterserviceService.disableRoApiKey(data).subscribe((res) => {
            console.log('res---<>>>', res);
            if (res.success) {
                this.toastrService.success('Key access has been paused');
                this.resumeTemplate = true;
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
        this.roasterserviceService.deleteRoApiKey(data).subscribe((res) => {
            if (res.success) {
                this.toastrService.error('Key has been delete');
                this.modalRef.hide();
            }
        });
    }

    notifyCustomer(id: any) {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: id,
        };
        this.roasterserviceService.notifyRoCustomer(data).subscribe((res) => {
            console.log('res---<>>>', res);
            if (res.success) {
                this.toastrService.success('Key has been reactivated!');
            }
        });
    }
}
