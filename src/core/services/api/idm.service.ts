import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ApiResponse } from '@models';

@Injectable({
    providedIn: 'root',
})
export class IdmService extends ApiService {
    constructor(protected http: HttpClient, protected cookieService: CookieService) {
        super(cookieService, http);
    }

    // Get user details by name or email
    getUsersList(typeValue: any): Observable<ApiResponse<any>> {
        let params = new HttpParams();
        params = params.append('query', typeValue);
        return this.post(this.orgPostUrl, `users/user-list?${params}`);
    }
}
