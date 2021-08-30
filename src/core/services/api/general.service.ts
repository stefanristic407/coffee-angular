import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth';
import { ApiResponse } from '@models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GeneralService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // ------------ General ------------

    // Display the details of estate
    getProfile() {
        return this.postWithOrg(this.orgPostUrl, `profile`, 'GET');
    }

    // Edit organization profile
    updateProfile(body: any) {
        return this.postWithOrg(this.orgPostUrl, `profile`, 'PUT', body);
    }

    // ------------ Roasting Level ------------

    // Common endpoint to get Roasting level details
    getRoastLevels(): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `general/roast-levels`, 'GET');
    }
}
