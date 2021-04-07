import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiResponse, UserProfile } from '@models';

@Injectable({
    providedIn: 'root',
})
export class UserService extends ApiService {
    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    // ------------ USER ------------

    // View user profile
    getUserProfile(): Observable<ApiResponse<UserProfile>> {
        return this.postWithOrg(this.orgPostUrl, `users/profile`, 'GET');
    }

    // ------------ Privacy & Terms ------------
    // Profile - Privacy and terms status
    getPrivacyTerms() {
        return this.post(this.orgPostUrl, `users/privacy-terms`, 'GET');
    }
}
