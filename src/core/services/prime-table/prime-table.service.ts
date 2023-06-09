import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Table } from 'primeng/table';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
// tslint:disable: variable-name
export class PrimeTableService {
    public url: string = null;
    public loading = true;
    public totalRecords: number;
    public defaultColumns: any[];
    public rows = 10;
    public form: FormGroup;
    public _allColumns: any[];
    public roasterId: any;
    public from_date: any;
    public to_date: any;
    set allColumns(value: any[]) {
        this._allColumns = value;
    }
    get allColumns() {
        return this._allColumns;
    }
    public sub: Subscription;
    public records: any[] = [];
    public leadGenerateRecords: any[] = [];
    public selectedRecords: any[] = [];
    public currentPage = 0;
    public sortBy: string = null;
    public sortOrder = 'desc';
    public isMobileView = true;
    public windowWidth: number;
    public responsiveStartsAt = 640;
    public table: Table;
    public paginationValue = false;
    public origin: any;
    public status: any;
    public start_date: any;
    public end_date: any;
    public date: any;
    public query: any;
    public searchQuery: any;
    public type: any;
    public customer_type: any;
    public isMarkedForSale = false;
    constructor(public http: HttpClient, public cookieService: CookieService, private authService: AuthService) {
        this.roasterId = this.authService.getOrgId();
    }

    getData(event: any) {
        if (event && event.sortField) {
            this.sortBy = event.sortField;
            this.sortOrder = event.sortOrder === -1 ? 'desc' : 'asc';
        }

        if (event) {
            this.currentPage = event.first / this.rows;
        }

        this.currentPage = this.currentPage + 1;

        setTimeout(() => (this.loading = true));

        let postData = {
            page: this.currentPage,
            per_page: this.rows,
        };

        // Stop previous is in progress
        if (this.sub) {
            this.sub.unsubscribe();
        }

        // Search submission
        if (this.form) {
            postData = { ...this.clean(this.form.value), ...postData };
        }

        // If sort_order is required
        if (this.sortOrder) {
            postData = { ...postData, ...{ sort_order: this.sortOrder } };
        }

        // If sort_by is required
        if (this.sortBy) {
            postData = { ...postData, ...{ sort_by: this.sortBy } };
        }

        // If origin is required
        if (this.origin) {
            postData = { ...postData, ...{ origin: this.origin } };
        }

        if (this.from_date) {
            postData = { ...postData, ...{ from_date: this.from_date, to_date: '' } };
        }
        if (this.date) {
            postData = { ...postData, ...{ date: this.date } };
        }

        if (this.to_date) {
            postData = { ...postData, ...{ to_date: this.to_date } };
        }

        if (this.start_date) {
            postData = { ...postData, ...{ start_date: this.start_date, end_date: '' } };
        }

        if (this.end_date) {
            postData = { ...postData, ...{ end_date: this.end_date } };
        }

        // If status is required
        if (this.status) {
            postData = { ...postData, ...{ status: this.status } };
        }
        // If search_query is required
        if (this.query) {
            postData = { ...postData, ...{ query: this.query } };
        }

        if (this.searchQuery) {
            postData = { ...postData, ...{ search_query: this.searchQuery } };
        }

        if (this.customer_type) {
            postData = { ...postData, ...{ customer_type: this.customer_type } };
        }

        if (this.type) {
            postData = { ...postData, ...{ order_type: this.type } };
        }

        if (this.isMarkedForSale) {
            postData = { ...postData, ...{ marked_for_sale: 'no' } };
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
                        this.records = [...result.result];
                        if (result.result_info) {
                            this.totalRecords = result.result_info.total_count;
                        } else {
                            this.totalRecords = result.result.length;
                        }
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
                        this.paginationValue = false;
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

    resetOnFormChange() {
        if (this.form) {
            this.form.valueChanges.subscribe(() => {
                this.table.reset();
            });
        }
    }
}
