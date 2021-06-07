import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '@models';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class OriginService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // List the origins of active estates for RO, ES and MR
    getOrigins(query: any = null): Observable<ApiResponse<any>> {
        const params = this.serializeParams(query);
        return this.postWithOrg(this.orgPostUrl, `estates/origins?${params}`, 'GET');
    }
}
