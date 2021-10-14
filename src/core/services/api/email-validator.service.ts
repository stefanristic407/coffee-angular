import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationType } from '@enums';
import { environment } from '@env/environment';
import { ApiResponse } from '@models';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class ValidateEmailService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    validate(email) {
        const url = `https://api.email-validator.net/api/verify?EmailAddress=${email.replace('+', '%2B')}&APIKey=${
            environment.EMAIL_API_KEY
        }`;
        return this.http.get(url);
    }

    // Get user details by name or email
    getUsersList(typeValue: any, orgType: OrganizationType | string = ''): Observable<ApiResponse<any>> {
        let params = new HttpParams();
        params = params.append('query', typeValue);
        params = params.append('organization', orgType);
        return this.post(this.orgPostUrl, `users/user-list?${params}`);
    }
}
