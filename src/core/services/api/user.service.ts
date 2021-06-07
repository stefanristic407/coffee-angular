import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiResponse, UserProfile } from '@models';
import { OrganizationType } from '@enums';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class UserService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // ------------ General ------------

    // Display the details of organization
    getOrgDetail() {
        return this.postWithOrg(this.orgPostUrl, `profile`, 'GET');
    }

    // ------------ USER ------------

    // View user profile
    getUserDetail(
        userId: string | number = null,
        orgType: string = this.orgType,
    ): Observable<ApiResponse<UserProfile>> {
        if (userId) {
            return this.post(this.orgPostUrl, `general/${orgType}/users/${userId}`, 'GET');
        } else {
            return this.postWithOrg(this.orgPostUrl, `users/profile`, 'GET');
        }
    }

    // ------------ Privacy & Terms ------------
    // Profile - Privacy and terms status
    getPrivacyTerms() {
        return this.post(this.orgPostUrl, `users/privacy-terms`, 'GET');
    }

    // ------------ ACL ------------

    // List of all permissions of user (duplicates removed)
    getUserPermissions() {
        return this.postWithOrg(this.orgPostUrl, `users/permissions`, 'GET');
    }
}
