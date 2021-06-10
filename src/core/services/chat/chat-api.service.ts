import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api';
import { Injectable } from '@angular/core';
import { OrganizationType } from '@enums';
import { AuthService } from '../auth';
@Injectable({
    providedIn: 'root',
})
/**
 * APIs which use ApiService,
 */
export class ChatApiServices extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    reportUser(userId: number, orgType: OrganizationType, orgId: number) {
        const payloadData = {
            user_id: userId,
            org_type: orgType,
            org_id: orgId || undefined,
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
