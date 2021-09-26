import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ApiResponse } from '@models';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class IdmService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // Get user details by name or email
    getUsersList(typeValue: string, orgTypes: string = ''): Observable<ApiResponse<any>> {
        let params = new HttpParams();
        params = params.append('query', typeValue);
        params = params.append('organization', orgTypes);
        return this.post(this.orgPostUrl, `users/user-list?${params}`);
    }

    // Verify a User Token and return the organisation IDs where the user has role
    verifyToken(): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `users/token/verify`);
    }
}
