import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class DashboardService extends ApiService {
    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    // ------------ Dashboard ------------

    // Get details for dashboard
    getStats(query: any = null) {
        return this.postWithOrg(this.url, `stats`, 'GET', query);
    }
}
