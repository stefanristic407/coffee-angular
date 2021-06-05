import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class DashboardService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // ------------ Dashboard ------------

    // Get details for dashboard
    getStats(query: any = null) {
        const params = this.serializeParams(query);
        return this.postWithOrg(this.orgPostUrl, `stats?${params}`, 'GET');
    }
}
