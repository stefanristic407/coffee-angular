import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';

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
        return this.postWithOrg(this.orgPostUrl, `users/profile`, 'GET');
    }

    // ------------ Privacy & Terms ------------
    // Profile - Privacy and terms status
    getPrivacyTerms() {
        return this.post(this.orgPostUrl, `users/privacy-terms`, 'GET');
    }
}
