import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api';
import { Injectable } from '@angular/core';
import { OrganizationType } from '@enums';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
    providedIn: 'root',
})
/**
 * APIs which use ApiService,
 */
export class ChatApiServices extends ApiService {
    constructor(protected http: HttpClient, protected cookieService: CookieService) {
        super(cookieService, http);
    }

    reportUser(user_id: number, org_type: OrganizationType, org_id: number) {
        const payloadData = {
            user_id,
            org_type,
            org_id: org_id || undefined,
            reason: 'Messaging abuse',
            origin: 'Messaging System',
        };
        return this.postWithOrg(this.orgPostUrl, 'report-user', 'POST', payloadData);
    }

    searchUser(key: string) {
        key = encodeURIComponent(key);
        const url = 'users/user-list?query=' + key;
        return this.post(this.postUrl, url, 'GET', null);
    }
}
