import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '@models';

@Injectable({
    providedIn: 'root',
})
export class OriginService extends ApiService {
    constructor(protected cookieService: CookieService, protected http: HttpClient) {
        super(cookieService, http);
    }

    // List the origins of active estates for RO, ES and MR
    getOrigins(): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `estates/origins`, 'GET');
    }
}
