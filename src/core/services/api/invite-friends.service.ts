import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class InviteFriendsService extends ApiService {
    private readonly endpoint = 'availability-requests';

    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // Invite friends for Organizations
    inviteFriend(body: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `invite-friends`, 'POST', body);
    }
}
