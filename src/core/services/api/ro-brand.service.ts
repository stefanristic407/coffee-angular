import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@models';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class RoBrandService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // Return the list of all brands under roaster
    getPublicBrands(orgId: number): Observable<ApiResponse<any>> {
        return this.post(this.postUrl, `general/ro/${orgId}/brands`);
    }
}
