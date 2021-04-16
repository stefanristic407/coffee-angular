import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
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
        const params = this.serializeParams(query);
        return this.postWithOrg(this.orgPostUrl, `stats?${params}`, 'GET');
    }
}
