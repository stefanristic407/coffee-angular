import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiResponse } from '@models';

@Injectable({
    providedIn: 'root',
})
export class UserService extends ApiService {
    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    // ------------ USER ------------

    // View user profile
    getUserProfile() {
        return this.postWithOrg(this.url, `users/profile`, 'GET');
    }

    // ------------ Privacy & Terms ------------
    // Profile - Privacy and terms status
    getPrivacyTerms() {
        return this.post(this.url, `users/privacy-terms`, 'GET');
    }

    updatePrivacyTerms(data: any): Observable<ApiResponse<any>> {
        return this.post(this.url, '/users/privacy-terms', 'PUT', data);
    }
}
