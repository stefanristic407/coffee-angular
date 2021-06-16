import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class OrderTransactionPrimeTableService {
    public url: string = null;
    public loading = true;
    public totalRecords: number;
    public defaultColumns: any[];
    public rows = 10;
    public allColumns: any[];
    public sub: Subscription;
    public result: any = {};
    public records: any[] = [];
    public selectedRecords: any[] = [];
    public currentPage = 0;
    public sortBy: string = null;
    public sortOrder = 'desc';
    public isMobileView = false;
    public windowWidth: number;
    public responsiveStartsAt = 640;
    public paginationValue = false;

    public channel: any;
    public paymentMode: any;
    public documentNumber: any;
    public documentFromDate: any;
    public documentToDate: any;

    public status: any;
    public orderType: any;

    public roasterId: any;

    constructor(public http: HttpClient, private authService: AuthService) {}

    getData(event: any) {
        if (this.sub) {
            this.sub.unsubscribe();
        }

        if (event && event.sortField) {
            this.sortBy = event.sortField;
            this.sortOrder = event.sortOrder === -1 ? 'desc' : 'asc';
        }

        if (event) {
            this.currentPage = event.first / this.rows;
        }

        this.currentPage = this.currentPage + 1;

        this.loading = true;

        let postData = {
            page: this.currentPage,
            per_page: this.rows,
            roaster_id: this.roasterId,
        };

        if (this.sortBy) {
            postData = { ...postData, ...{ sort_by: this.sortBy } };
        }
        if (this.sortOrder) {
            postData = { ...postData, ...{ sort_order: this.sortOrder } };
        }
        if (this.orderType) {
            postData = { ...postData, ...{ order_type: this.orderType } };
        }

        if (this.documentFromDate && this.documentToDate) {
            postData = {
                ...postData,
                ...{ document_date_from: this.documentFromDate, document_date_to: this.documentToDate },
            };
        } else if (!this.documentFromDate && this.documentToDate) {
            postData = { ...postData, ...{ document_date_from: '', document_date_to: this.documentToDate } };
        } else if (this.documentFromDate && !this.documentToDate) {
            postData = { ...postData, ...{ document_date_from: this.documentFromDate, document_date_to: '' } };
        }

        if (this.status) {
            postData = { ...postData, ...{ status: this.status } };
        }
        if (this.documentNumber) {
            postData = { ...postData, ...{ document_number: this.documentNumber } };
        }
        if (this.channel) {
            postData = { ...postData, ...{ channel: this.channel } };
        }
        if (this.paymentMode) {
            postData = { ...postData, ...{ payment_type: this.paymentMode } };
        }

        const data = {
            api_call: this.url + '?' + this.serlialise(postData),
            method: 'GET',
            token: this.authService.token,
        };

        this.sub = this.http
            .post(environment.apiURL + '/ro/api', data)
            .pipe(
                map((res) => {
                    return res as any;
                }),
            )
            .subscribe(
                (result) => {
                    if (result && result.result) {
                        this.result = result.result;
                        this.records = [...this.result.transaction_details];
                        this.totalRecords = result.result_info.total_count;
                        this.currentPage = result.result_info.page;
                        if (this.totalRecords < 10) {
                            this.paginationValue = false;
                        } else {
                            this.paginationValue = true;
                        }
                    } else {
                        this.records = [...[]];
                        this.totalRecords = 0;
                        this.currentPage = 0;
                    }

                    this.loading = false;
                },
                (error) => {
                    this.loading = false;
                },
            );
    }

    serlialise(obj) {
        const str = [];
        for (const p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }

        return str.join('&');
    }

    clean(obj) {
        for (const propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
        return obj;
    }
}
