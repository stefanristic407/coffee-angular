import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Table } from 'primeng/table';

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
    public sortOrder = 'asc';
    public isMobileView = true;
    public windowWidth: number;
    public responsiveStartsAt = 640;
    public table: Table;

    constructor(public http: HttpClient, public cookieService: CookieService) {}

    getData(event: any) {
        if (event && event.sortOrder === 1) {
            this.sortOrder = 'asc';
        } else {
            this.sortOrder = 'desc';
        }

        if (event && event.sortField) {
            this.sortBy = event.sortField;
        }
        if (event) {
            this.currentPage = event.first / this.rows;
        }

        this.currentPage = this.currentPage + 1;

        this.loading = true;

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
            console.log(this.form);
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

        const data = {
            api_call: this.url + '?' + this.serlialise(postData),
            method: 'GET',
            token: this.cookieService.get('Auth'),
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
                        this.totalRecords = result.result_info.total_count;
                        this.currentPage = result.result_info.page;
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

    resetOnFormChange() {
        if (this.form) {
            this.form.valueChanges.subscribe(() => {
                this.table.reset();
            });
        }
    }
}
