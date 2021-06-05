import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class EstateService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // ------------ ES ------------

    // List of available estates
    getAvailableEstates(query: any = null) {
        const params = this.serializeParams(query);
        return this.postWithOrg(this.orgPostUrl, `estates/availability?${params}`, 'GET');
    }

    // Get estate details
    getEstate(estateId: number) {
        return this.postWithOrg(this.orgPostUrl, `estates/${estateId}`, 'GET');
    }
}
